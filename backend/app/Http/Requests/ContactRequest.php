<?php

namespace App\Http\Requests;

use App\Models\ContactEnquiry;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'full_name' => is_string($this->input('full_name')) ? trim(strip_tags($this->input('full_name'))) : $this->input('full_name'),
            'email' => is_string($this->input('email')) ? strtolower(trim($this->input('email'))) : $this->input('email'),
            'phone' => is_string($this->input('phone')) && trim($this->input('phone')) !== ''
                ? trim(strip_tags($this->input('phone')))
                : null,
            'service' => is_string($this->input('service')) ? trim($this->input('service')) : $this->input('service'),
            'message' => is_string($this->input('message')) ? trim(strip_tags($this->input('message'))) : $this->input('message'),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'min:2', 'max:150'],
            'email' => ['required', 'string', 'email:rfc', 'max:150'],
            'phone' => ['nullable', 'string', 'max:30', 'regex:/^[0-9+\-\s()]{6,30}$/'],
            'service' => ['required', 'string', 'max:100', Rule::in(ContactEnquiry::ALLOWED_SERVICES)],
            'message' => ['required', 'string', 'min:15', 'max:5000'],
            // Honeypot field for automated spam protection: must be absent or empty
            'website_url' => ['nullable', 'string', 'max:0'],
        ];
    }

    /**
     * Get custom validation error messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'full_name.required' => 'Please enter your full name.',
            'full_name.min' => 'Your full name must be at least 2 characters.',
            'full_name.max' => 'Your full name may not exceed 150 characters.',
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'Your email address may not exceed 150 characters.',
            'phone.max' => 'Your phone number may not exceed 30 characters.',
            'phone.regex' => 'Please enter a valid phone number format.',
            'service.required' => 'Please select a service of interest.',
            'service.in' => 'Please select a valid service from the available options.',
            'message.required' => 'Please enter details regarding your research enquiry.',
            'message.min' => 'Please provide at least 15 characters describing your research needs.',
            'message.max' => 'Your message may not exceed 5000 characters.',
            'website_url.max' => 'Spam submission detected.',
        ];
    }

    /**
     * Handle a failed validation attempt with the required JSON envelope.
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Please review the submitted information.',
                'errors' => $validator->errors()->toArray(),
            ], 422)
        );
    }
}

