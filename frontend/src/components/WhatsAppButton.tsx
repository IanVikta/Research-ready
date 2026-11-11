import React from 'react';

const WHATSAPP_NUMBER = '256749579434';
const DEFAULT_MESSAGE =
  'Hello Expert Research Ready Services, I would like to enquire about academic research support.';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (0749 579 434)"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-corporate-hover transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.359 5l-1.422 5.188 5.313-1.391c1.469.813 3.141 1.234 4.719 1.234 5.516 0 9.969-4.453 9.969-9.969 0-5.516-4.453-10.031-9.969-10.031zm5.828 14.141c-.25.703-1.438 1.344-2 1.422-.516.078-1.188.109-1.922-.125-.453-.141-1.031-.328-1.766-.641-3.109-1.344-5.141-4.484-5.297-4.688-.156-.203-1.266-1.688-1.266-3.219 0-1.531.797-2.281 1.078-2.594.281-.313.609-.391.813-.391.203 0 .406.016.578.016.188 0 .438-.078.688.516.25.609.859 2.094.938 2.25.078.156.125.344.031.547-.094.203-.141.328-.297.5-.156.172-.313.391-.453.516-.141.141-.297.297-.125.594.172.297.766 1.266 1.641 2.047 1.125 1 2.078 1.313 2.375 1.469.297.156.469.125.641-.078.172-.203.734-.859.938-1.156.203-.297.391-.25.656-.156.266.094 1.703.813 1.984.953.281.141.484.219.547.344.078.125.078.734-.172 1.438z" />
      </svg>
    </a>
  );
};
