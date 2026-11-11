export type ServiceOption =
  | 'Academic Research Assistance'
  | 'Thesis and Dissertation Assistance'
  | 'Research Proposal Writing'
  | 'Literature Review and Data Analysis'
  | 'Business Research Proposals'
  | 'Content Humanization and Plagiarism Checking'
  | 'Other';

export interface ContactFormValues {
  full_name: string;
  email: string;
  phone?: string;
  service: ServiceOption | '';
  message: string;
  /** Honeypot field for spam protection — must remain empty */
  website_url?: string;
}

export interface ContactApiSuccessResponse {
  success: true;
  message: string;
}

export interface ContactApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export type ContactApiResponse = ContactApiSuccessResponse | ContactApiErrorResponse;

export interface ServiceItem {
  id: string;
  number: string;
  title: ServiceOption;
  description: string;
  highlights: string[];
}
