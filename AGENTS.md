# SPNIX Agency Platform

## Project

SPNIX is a multi-business Agency SaaS.

Businesses Supported

- Restaurant
- Salon
- Clinic
- Dentist
- Architect
- Gym
- Hotel
- Cafe
- Lawyer
- Consultant
- Real Estate

---


## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- App Router

---

## Architecture

- Service Layer
- Server Components by default
- Client Components only when needed
- API Routes
- Supabase Auth
- RLS Enabled

---

## Folder Rules

app/
components/
lib/
    services/
    supabase/
    constants/
    templates/
types/

Never create duplicate folders.

---

## Coding Rules

- Reuse existing components.
- Never duplicate Supabase queries.
- Put database logic inside lib/services.
- Strong TypeScript typing.
- Production-ready code.
- Mobile responsive.
- Clean UI.
- Do not break existing architecture.

---

## UI

Theme

- Premium
- Minimal
- Modern

Reference

Stripe
Shopify
Vercel
Notion

---

## Before Every Change

Always:

- Inspect existing code.
- Reuse services.
- Preserve functionality.
- Fix TypeScript errors.
- Keep imports clean.

---

## Output Rules

When creating files:

Always provide PowerShell commands.

Example

New-Item -ItemType File -Path "lib/services/example.ts" -Force

Never explain basic concepts unless asked.
Read CONTRIBUTING.md before making any changes.