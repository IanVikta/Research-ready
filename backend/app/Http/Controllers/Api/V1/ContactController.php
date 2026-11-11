<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Mail\ContactEnquiryReceived;
use App\Models\ContactEnquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactController extends Controller
{
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
            $recipient = config('mail.company_notification_email', 'enquiries@expertresearchready.com');

            if (! empty($recipient)) {
                Mail::to($recipient)->send(new ContactEnquiryReceived($enquiry));
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
}

