/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#142B45',
          navyDark: '#0D1E31',
          navyLight: '#1E3D5F',
          gold: '#B9975B',
          goldLight: '#D0B47F',
          goldMuted: '#F5EFE4',
          surface: '#F6F7F9',
          textPrimary: '#263342',
          textSecondary: '#697586',
          border: '#E2E6EC',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', '"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'corporate': '0 4px 20px -2px rgba(20, 43, 69, 0.06), 0 1px 3px 0 rgba(20, 43, 69, 0.04)',
        'corporate-hover': '0 12px 28px -4px rgba(20, 43, 69, 0.10), 0 4px 8px -2px rgba(20, 43, 69, 0.05)',
        'navbar': '0 2px 16px -2px rgba(20, 43, 69, 0.07)',
      },
      maxWidth: {
        'container': '1240px',
      },
    },
  },
  plugins: [],
};

