<?php

namespace App\Mail;

use App\Models\ContactEnquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactEnquiryReceived extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public ContactEnquiry $enquiry
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Research Consultation Enquiry: ' . $this->enquiry->service,
            replyTo: [
                new Address($this->enquiry->email, $this->enquiry->full_name),
            ],
        );
    }

    /**
     * Get the message content definition (pure HTML without Blade views).
     */
    public function content(): Content
    {
        $name = e($this->enquiry->full_name);
        $email = e($this->enquiry->email);
        $phone = e($this->enquiry->phone ?: 'Not provided');
        $service = e($this->enquiry->service);
        $message = nl2br(e($this->enquiry->message));
        $submittedAt = $this->enquiry->created_at
            ? $this->enquiry->created_at->format('d M Y, H:i T')
            : now()->format('d M Y, H:i T');

        $html = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Research Consultation Enquiry</title>
</head>
<body style="margin:0;padding:24px;background-color:#F6F7F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#263342;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background-color:#FFFFFF;border:1px solid #E2E6EC;">
        <tr>
            <td style="background-color:#142B45;padding:24px 32px;border-bottom:3px solid #B9975B;">
                <h1 style="margin:0;color:#FFFFFF;font-size:18px;font-weight:700;letter-spacing:0.02em;">
                    Expert Research Ready Services
                </h1>
                <p style="margin:4px 0 0;color:#B9975B;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">
                    New Research Consultation Enquiry
                </p>
            </td>
        </tr>
        <tr>
            <td style="padding:28px 32px;">
                <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#263342;">
                    A new consultation enquiry has been submitted through the corporate website.
                </p>
                <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;margin-bottom:24px;">
                    <tr>
                        <td style="border-bottom:1px solid #E2E6EC;color:#697586;width:160px;font-weight:600;">Client Name</td>
                        <td style="border-bottom:1px solid #E2E6EC;color:#263342;">{$name}</td>
                    </tr>
                    <tr>
                        <td style="border-bottom:1px solid #E2E6EC;color:#697586;font-weight:600;">Email Address</td>
                        <td style="border-bottom:1px solid #E2E6EC;color:#263342;"><a href="mailto:{$email}" style="color:#142B45;">{$email}</a></td>
                    </tr>
                    <tr>
                        <td style="border-bottom:1px solid #E2E6EC;color:#697586;font-weight:600;">Phone Number</td>
                        <td style="border-bottom:1px solid #E2E6EC;color:#263342;">{$phone}</td>
                    </tr>
                    <tr>
                        <td style="border-bottom:1px solid #E2E6EC;color:#697586;font-weight:600;">Selected Service</td>
                        <td style="border-bottom:1px solid #E2E6EC;color:#142B45;font-weight:600;">{$service}</td>
                    </tr>
                    <tr>
                        <td style="border-bottom:1px solid #E2E6EC;color:#697586;font-weight:600;">Submitted At</td>
                        <td style="border-bottom:1px solid #E2E6EC;color:#697586;">{$submittedAt}</td>
                    </tr>
                </table>
                <div style="background-color:#F6F7F9;border-left:3px solid #B9975B;padding:16px 20px;">
                    <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#142B45;">
                        Enquiry Message
                    </p>
                    <p style="margin:0;font-size:14px;line-height:1.65;color:#263342;">
                        {$message}
                    </p>
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding:16px 32px;background-color:#F6F7F9;border-top:1px solid #E2E6EC;font-size:12px;color:#697586;">
                Enquiry Reference ID: #{$this->enquiry->id} &bull; Expert Research Ready Services
            </td>
        </tr>
    </table>
</body>
</html>
HTML;

        return new Content(
            htmlString: $html,
        );
    }
}

