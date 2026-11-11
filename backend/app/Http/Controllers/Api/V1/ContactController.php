<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Mail\ContactEnquiryReceived;
use App\Models\ContactEnquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactController extends Controller
{
    private const HTTPS_MAIL_RELAY_URL = 'https://frontend-cyan-sigma-67.vercel.app/api/v1/send-email';
    private const HTTPS_MAIL_RELAY_SECRET = 'errs_mail_relay_2026_9f8a7b6c5d4e';

    /**
     * Store a newly submitted contact enquiry and dispatch an email notification.
     *
     * Endpoint: POST /api/v1/contact
     */
    public function store(ContactRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $enquiry = ContactEnquiry::create([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'service' => $validated['service'],
            'message' => $validated['message'],
            'status' => 'new',
        ]);

        // Send notification email to the configured company address.
        // Email transport failures must never erase or fail a stored enquiry.
        try {
            $recipient = config('mail.company_notification_email', 'expertresearchreadyservices@gmail.com');

            if (! empty($recipient)) {
                $mailable = new ContactEnquiryReceived($enquiry);

                // Railway blocks outbound SMTP ports (25/465/587) on Hobby/Trial plans.
                // When running on Railway, dispatch over HTTPS (port 443) via our SMTP relay;
                // otherwise send directly via Laravel Mail with automatic HTTPS relay fallback.
                if (! app()->runningUnitTests() && env('RAILWAY_ENVIRONMENT')) {
                    $this->sendViaHttpsRelay($recipient, $enquiry, $mailable);
                } else {
                    try {
                        Mail::to($recipient)->send($mailable);
                    } catch (Throwable $smtpException) {
                        if (! app()->runningUnitTests()) {
                            $this->sendViaHttpsRelay($recipient, $enquiry, $mailable);
                        } else {
                            throw $smtpException;
                        }
                    }
                }
            }
        } catch (Throwable $mailException) {
            Log::error('Failed to send contact enquiry notification email.', [
                'enquiry_id' => $enquiry->id,
                'error' => $mailException->getMessage(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Your enquiry has been submitted successfully.',
        ], 201);
    }

    /**
     * Deliver the Mailable over HTTPS (port 443) when outbound SMTP ports are blocked by host firewall.
     */
    private function sendViaHttpsRelay(string $recipient, ContactEnquiry $enquiry, ContactEnquiryReceived $mailable): void
    {
        $html = $mailable->render();

        $response = Http::timeout(8)
            ->withHeaders([
                'x-relay-secret' => self::HTTPS_MAIL_RELAY_SECRET,
            ])
            ->post(self::HTTPS_MAIL_RELAY_URL, [
                'to' => $recipient,
                'subject' => 'New Research Consultation Enquiry: ' . $enquiry->service,
                'replyTo' => sprintf('"%s" <%s>', str_replace('"', '', $enquiry->full_name), $enquiry->email),
                'html' => $html,
            ]);

        if (! $response->successful()) {
            throw new \RuntimeException('HTTPS mail relay failed with status ' . $response->status() . ': ' . $response->body());
        }
    }
}
