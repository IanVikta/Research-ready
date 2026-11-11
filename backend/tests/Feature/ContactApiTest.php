<?php

namespace Tests\Feature;

use App\Mail\ContactEnquiryReceived;
use App\Models\ContactEnquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use RuntimeException;
use Tests\TestCase;

class ContactApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_stores_a_valid_contact_enquiry_and_sends_notification_email(): void
    {
        Mail::fake();

        $payload = [
            'full_name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+256700000000',
            'service' => 'Research Proposal Writing',
            'message' => 'I need assistance with my research proposal and methodology chapter.',
        ];

        $response = $this->postJson('/api/v1/contact', $payload);

        $response->assertStatus(201)
            ->assertExactJson([
                'success' => true,
                'message' => 'Your enquiry has been submitted successfully.',
            ]);

        $this->assertDatabaseHas('contact_enquiries', [
            'full_name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+256700000000',
            'service' => 'Research Proposal Writing',
            'status' => 'new',
        ]);

        Mail::assertSent(ContactEnquiryReceived::class, function (ContactEnquiryReceived $mail) {
            return $mail->enquiry->email === 'john@example.com'
                && $mail->enquiry->service === 'Research Proposal Writing';
        });
    }

    public function test_it_returns_structured_422_validation_errors_for_invalid_input(): void
    {
        $response = $this->postJson('/api/v1/contact', [
            'full_name' => '',
            'email' => 'not-an-email',
            'service' => 'Invalid Service Name',
            'message' => 'Too short',
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Please review the submitted information.',
                'errors' => [
                    'email' => ['Please enter a valid email address.'],
                ],
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'errors' => [
                    'full_name',
                    'email',
                    'service',
                    'message',
                ],
            ]);

        $this->assertDatabaseCount('contact_enquiries', 0);
    }

    public function test_it_blocks_honeypot_spam_submissions(): void
    {
        $response = $this->postJson('/api/v1/contact', [
            'full_name' => 'Spam Bot',
            'email' => 'bot@example.com',
            'service' => 'Academic Research Assistance',
            'message' => 'Automated spam message trying to submit the form.',
            'website_url' => 'https://spam-link.example.com',
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('success', false);

        $this->assertDatabaseCount('contact_enquiries', 0);
    }

    public function test_email_transport_failure_does_not_erase_stored_enquiry(): void
    {
        Mail::shouldReceive('to')
            ->once()
            ->andThrow(new RuntimeException('Simulated SMTP transport error'));

        $payload = [
            'full_name' => 'Dr. Grace Achieng',
            'email' => 'grace.achieng@university.edu',
            'phone' => null,
            'service' => 'Literature Review and Data Analysis',
            'message' => 'Seeking guidance on thematic synthesis and quantitative data interpretation.',
        ];

        $response = $this->postJson('/api/v1/contact', $payload);

        $response->assertStatus(201)
            ->assertExactJson([
                'success' => true,
                'message' => 'Your enquiry has been submitted successfully.',
            ]);

        $this->assertDatabaseHas('contact_enquiries', [
            'full_name' => 'Dr. Grace Achieng',
            'email' => 'grace.achieng@university.edu',
            'service' => 'Literature Review and Data Analysis',
            'status' => 'new',
        ]);
    }

    public function test_it_enforces_rate_limiting_on_repeated_submissions(): void
    {
        Mail::fake();

        $payload = [
            'full_name' => 'Rate Limit Tester',
            'email' => 'tester@example.com',
            'service' => 'Thesis and Dissertation Assistance',
            'message' => 'Testing rate limit threshold for consultation endpoint.',
        ];

        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/v1/contact', $payload)->assertStatus(201);
        }

        $sixthResponse = $this->postJson('/api/v1/contact', $payload);
        $sixthResponse->assertStatus(429)
            ->assertJson([
                'success' => false,
            ]);
    }
}

