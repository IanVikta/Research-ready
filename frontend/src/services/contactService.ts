import axios from 'axios';
import apiClient from './api';
import {
  ContactFormValues,
  ContactApiSuccessResponse,
  ContactApiErrorResponse,
} from '../types/contact';

export class ApiValidationError extends Error {
  public status: number;
  public errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiValidationError';
    this.status = status;
    this.errors = errors;
  }
}

export async function submitContactEnquiry(
  payload: ContactFormValues
): Promise<ContactApiSuccessResponse> {
  try {
    const response = await apiClient.post<ContactApiSuccessResponse>('/contact', {
      full_name: payload.full_name.trim(),
      email: payload.email.trim(),
      phone: payload.phone ? payload.phone.trim() : null,
      service: payload.service,
      message: payload.message.trim(),
      website_url: payload.website_url || '',
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ContactApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      const data = error.response?.data;

      if (status === 422 && data) {
        throw new ApiValidationError(
          data.message || 'Please review the submitted information.',
          422,
          data.errors
        );
      }

      if (status === 429) {
        throw new ApiValidationError(
          data?.message ||
            'Too many enquiry attempts. Please wait a moment before trying again.',
          429
        );
      }

      if (data?.message) {
        throw new ApiValidationError(data.message, status, data.errors);
      }

      if (error.code === 'ERR_NETWORK' || !error.response) {
        throw new ApiValidationError(
          'Unable to reach the server. Please check your connection or try again shortly.',
          0
        );
      }
    }

    throw new ApiValidationError(
      'An unexpected error occurred while submitting your enquiry. Please try again.',
      500
    );
  }
}

