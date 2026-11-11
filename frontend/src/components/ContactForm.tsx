import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
} from 'lucide-react';
import { ContactFormValues, ServiceOption } from '../types/contact';
import {
  submitContactEnquiry,
  ApiValidationError,
} from '../services/contactService';

interface ContactFormProps {
  selectedService?: ServiceOption | '';
}

const SERVICE_OPTIONS: ServiceOption[] = [
  'Academic Research Assistance',
  'Thesis and Dissertation Assistance',
  'Research Proposal Writing',
  'Literature Review and Data Analysis',
  'Other',
];

// Configurable corporate contact details (placeholders ready for production values)
const COMPANY_CONTACT_CONFIG = {
  email: 'expertresearchreadyservices@gmail.com',
  phone: '+256 (0) 766 892 024',
  hours: 'Monday – Friday: 8:30 AM – 6:00 PM (EAT)',
  location: 'Academic Consultation Office (By Appointment & Remote Worldwide)',
};

export const ContactForm: React.FC<ContactFormProps> = ({ selectedService }) => {
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [serverMessage, setServerMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      website_url: '',
    },
    mode: 'onBlur',
  });

  // Update the dropdown when a user clicks "Enquire About This Service" in the Services section
  useEffect(() => {
    if (selectedService) {
      setValue('service', selectedService, { shouldValidate: true });
    }
  }, [selectedService, setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    if (isSubmitting || submitStatus === 'submitting') {
      return;
    }

    setSubmitStatus('submitting');
    setServerMessage('');

    try {
      const response = await submitContactEnquiry(data);
      setSubmitStatus('success');
      setServerMessage(
        response.message || 'Your enquiry has been submitted successfully.'
      );
      reset({
        full_name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        website_url: '',
      });
    } catch (err) {
      setSubmitStatus('error');

      if (err instanceof ApiValidationError) {
        setServerMessage(err.message);
        if (err.errors) {
          Object.entries(err.errors).forEach(([field, messages]) => {
            if (
              messages &&
              messages.length > 0 &&
              (field === 'full_name' ||
                field === 'email' ||
                field === 'phone' ||
                field === 'service' ||
                field === 'message')
            ) {
              setError(field, {
                type: 'server',
                message: messages[0],
              });
            }
          });
        }
      } else {
        setServerMessage(
          'An unexpected error occurred while submitting your enquiry. Please try again.'
        );
      }
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 lg:py-28 bg-brand-surface border-b border-brand-border"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Consultation Context & Configurable Contact Details */}
          <div className="lg:col-span-5" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-brand-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy">
                Consultation &amp; Enquiries
              </span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-navy leading-tight mb-4">
              Let&apos;s Discuss Your Research Needs.
            </h2>

            <p className="text-brand-textSecondary text-base leading-relaxed mb-8">
              Have a research project or academic assignment that requires
              professional support? Get in touch with our team and tell us how
              we can assist.
            </p>

            {/* Direct Contact Information Card */}
            <div className="bg-white border border-brand-border rounded-sm p-6 sm:p-7 shadow-corporate space-y-6 mb-6">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-brand-navy pb-3 border-b border-brand-border">
                Direct Contact Channels
              </h3>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-sm bg-brand-surface border border-brand-border flex items-center justify-center text-brand-navy shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-textSecondary">
                    Email Enquiries
                  </p>
                  <a
                    href={`mailto:${COMPANY_CONTACT_CONFIG.email}`}
                    className="text-sm font-medium text-brand-navy hover:text-brand-gold transition-colors break-all"
                  >
                    {COMPANY_CONTACT_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-sm bg-brand-surface border border-brand-border flex items-center justify-center text-brand-navy shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-textSecondary">
                    Telephone / Consultation Line
                  </p>
                  <p className="text-sm font-medium text-brand-navy">
                    {COMPANY_CONTACT_CONFIG.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-sm bg-brand-surface border border-brand-border flex items-center justify-center text-brand-navy shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-textSecondary">
                    Consultation Hours
                  </p>
                  <p className="text-sm font-medium text-brand-navy">
                    {COMPANY_CONTACT_CONFIG.hours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-sm bg-brand-surface border border-brand-border flex items-center justify-center text-brand-navy shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-textSecondary">
                    Consultation Availability
                  </p>
                  <p className="text-sm font-medium text-brand-navy">
                    {COMPANY_CONTACT_CONFIG.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Confidentiality Notice */}
            <div className="flex items-start gap-3 p-4 bg-white/80 border border-brand-border rounded-sm text-xs text-brand-textSecondary leading-relaxed">
              <Shield className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <span>
                All consultation enquiries and research details shared with
                Expert Research Ready Services are treated with strict
                confidentiality and used solely to evaluate and support your
                academic enquiry.
              </span>
            </div>
          </div>

          {/* Right Column: Contact Form Connected to Laravel API */}
          <div className="lg:col-span-7" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-white border border-brand-border rounded-sm p-6 sm:p-9 shadow-corporate">
              <div className="mb-6 pb-4 border-b border-brand-border">
                <h3 className="font-heading text-xl font-bold text-brand-navy">
                  Submit a Research Consultation Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-brand-textSecondary mt-1">
                  Fields marked with an asterisk (
                  <span className="text-red-600 font-semibold">*</span>) are
                  required.
                </p>
              </div>

              {/* Success Alert Banner */}
              {submitStatus === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mb-6 p-5 bg-emerald-50/90 border border-emerald-300 rounded-sm flex items-start gap-3.5 text-emerald-950"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-heading text-sm font-bold text-emerald-950">
                      Enquiry Received
                    </h4>
                    <p className="text-sm text-emerald-900 mt-1 leading-relaxed">
                      {serverMessage}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitStatus('idle')}
                      className="mt-3 text-xs font-semibold uppercase tracking-wider text-emerald-800 underline hover:text-emerald-950"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </div>
              )}

              {/* Error Alert Banner */}
              {submitStatus === 'error' && serverMessage && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mb-6 p-4 bg-red-50 border border-red-300 rounded-sm flex items-start gap-3 text-red-950"
                >
                  <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading text-sm font-bold text-red-950">
                      Unable to Complete Submission
                    </h4>
                    <p className="text-sm text-red-800 mt-0.5 leading-relaxed">
                      {serverMessage}
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                {/* Honeypot anti-spam field (visually hidden from real users) */}
                <div
                  className="hidden"
                  aria-hidden="true"
                  style={{ display: 'none' }}
                >
                  <label htmlFor="website_url">Website URL</label>
                  <input
                    id="website_url"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('website_url')}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="full_name"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-navy mb-2"
                    >
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="full_name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Dr. Sarah Namuganza"
                      disabled={isSubmitting}
                      aria-invalid={errors.full_name ? 'true' : 'false'}
                      aria-describedby={
                        errors.full_name ? 'full_name-error' : undefined
                      }
                      className={`w-full px-4 py-3 text-sm bg-brand-surface/60 border rounded-sm text-brand-textPrimary placeholder:text-brand-textSecondary/60 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy ${errors.full_name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-brand-border focus:border-brand-navy'
                        }`}
                      {...register('full_name', {
                        required: 'Please enter your full name.',
                        minLength: {
                          value: 2,
                          message: 'Full name must be at least 2 characters.',
                        },
                        maxLength: {
                          value: 150,
                          message: 'Full name must not exceed 150 characters.',
                        },
                      })}
                    />
                    {errors.full_name && (
                      <p
                        id="full_name-error"
                        className="mt-1.5 text-xs text-red-600 font-medium"
                      >
                        {errors.full_name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-navy mb-2"
                    >
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@university.ac"
                      disabled={isSubmitting}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={
                        errors.email ? 'email-error' : undefined
                      }
                      className={`w-full px-4 py-3 text-sm bg-brand-surface/60 border rounded-sm text-brand-textPrimary placeholder:text-brand-textSecondary/60 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy ${errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-brand-border focus:border-brand-navy'
                        }`}
                      {...register('email', {
                        required: 'Please enter your email address.',
                        maxLength: {
                          value: 150,
                          message: 'Email address must not exceed 150 characters.',
                        },
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email address.',
                        },
                      })}
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="mt-1.5 text-xs text-red-600 font-medium"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone Number (Optional) */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-navy mb-2"
                    >
                      Phone Number{' '}
                      <span className="text-brand-textSecondary font-normal lowercase">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+256 700 000 000"
                      disabled={isSubmitting}
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={
                        errors.phone ? 'phone-error' : undefined
                      }
                      className={`w-full px-4 py-3 text-sm bg-brand-surface/60 border rounded-sm text-brand-textPrimary placeholder:text-brand-textSecondary/60 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy ${errors.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-brand-border focus:border-brand-navy'
                        }`}
                      {...register('phone', {
                        maxLength: {
                          value: 30,
                          message: 'Phone number must not exceed 30 characters.',
                        },
                      })}
                    />
                    {errors.phone && (
                      <p
                        id="phone-error"
                        className="mt-1.5 text-xs text-red-600 font-medium"
                      >
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Service of Interest */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-navy mb-2"
                    >
                      Service of Interest <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="service"
                      disabled={isSubmitting}
                      aria-invalid={errors.service ? 'true' : 'false'}
                      aria-describedby={
                        errors.service ? 'service-error' : undefined
                      }
                      className={`w-full px-4 py-3 text-sm bg-brand-surface/60 border rounded-sm text-brand-textPrimary transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy ${errors.service
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-brand-border focus:border-brand-navy'
                        }`}
                      {...register('service', {
                        required: 'Please select a service of interest.',
                      })}
                    >
                      <option value="">Select a research service...</option>
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p
                        id="service-error"
                        className="mt-1.5 text-xs text-red-600 font-medium"
                      >
                        {errors.service.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-brand-navy mb-2"
                  >
                    Research Project Details / Message{' '}
                    <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    disabled={isSubmitting}
                    placeholder="Briefly describe your academic level, research topic or area of study, timeline and the type of research support you require..."
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={
                      errors.message ? 'message-error' : undefined
                    }
                    className={`w-full px-4 py-3 text-sm bg-brand-surface/60 border rounded-sm text-brand-textPrimary placeholder:text-brand-textSecondary/60 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy resize-y ${errors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-brand-border focus:border-brand-navy'
                      }`}
                    {...register('message', {
                      required: 'Please provide details about your research enquiry.',
                      minLength: {
                        value: 15,
                        message:
                          'Please provide at least 15 characters describing your research needs.',
                      },
                      maxLength: {
                        value: 5000,
                        message: 'Message must not exceed 5000 characters.',
                      },
                    })}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1.5 text-xs text-red-600 font-medium"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-navy hover:bg-brand-navyLight disabled:bg-brand-navy/60 disabled:cursor-not-allowed text-white font-medium text-sm sm:text-base px-8 py-3.5 rounded-sm transition-all duration-200 shadow-sm hover:shadow-corporate focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-navy"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                        <span>Submitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Consultation Enquiry</span>
                        <Send className="w-4 h-4 text-brand-gold" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

