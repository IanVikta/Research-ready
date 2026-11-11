# Expert Research Ready Services — Corporate Website & REST API

A professional, responsive single-page corporate website and standalone Laravel REST API built for **Expert Research Ready Services**, an academic research support consultancy.

---

## Architecture Overview

The project is strictly separated into two independent applications:

1. **`frontend/` — React + TypeScript + Vite + Tailwind CSS SPA**
   - Corporate brand identity built around **Primary Navy (`#142B45`)**, **Muted Gold (`#B9975B`)**, **Light Surface (`#F6F7F9`)**, and **Plus Jakarta Sans / Inter** typography.
   - Modular, reusable section components (`Navbar`, `Hero`, `About`, `Services`, `Approach`, `WhyChooseUs`, `ContactForm`, `Footer`).
   - Scroll-triggered animations powered by **AOS** (`once: true`, subtle 750ms transitions, full `prefers-reduced-motion` accessibility support).
   - Client-side validation and state management using **React Hook Form** and **Axios** connected to the Laravel REST API (`POST /api/v1/contact`).

2. **`backend/` — Standalone Laravel 13 JSON REST API**
   - Pure JSON API architecture (no Blade frontend views).
   - Versioned endpoint: `POST /api/v1/contact`.
   - Server-side validation via `ContactRequest` returning structured `422` validation responses.
   - MySQL persistence via `ContactEnquiry` Eloquent model and `contact_enquiries` table migration.
   - Email notifications via `ContactEnquiryReceived` Mailable with graceful fault isolation (email transport errors are logged and never erase or fail a stored enquiry).
   - Security features: CORS configured for the React origin, IP rate limiting (`5` submissions per minute), input sanitization, and honeypot spam protection (`website_url`).

---

## Quick Start Instructions

### 1. Start the Laravel REST API (`backend/`)

```bash
cd backend
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --port=8000
```

The API will be available at `http://localhost:8000/api/v1/contact`.

### 2. Start the React Frontend (`frontend/`)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### 3. Run Automated Tests

```bash
# Run Laravel Feature & API Tests
php backend/vendor/phpunit/phpunit/phpunit --configuration backend/phpunit.xml

# Verify TypeScript & Production Frontend Build
npm run build --prefix frontend
```

