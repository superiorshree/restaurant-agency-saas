# Development Rules

- Never duplicate components.
- Never duplicate API routes.
- Never duplicate services.
- Reuse shadcn/ui components.
- Keep business logic inside lib/services.
- Use Zod for validation.
- Prefer Server Components.
- Use Client Components only when required.
- Every database change requires:
  - SQL migration
  - RLS policies
- Every feature must include:
  - UI
  - API
  - Service
  - Validation