# Landing Page Experimentation (Single Brand)

V1: a controlled experimentation layer on top of developer-managed templates (no template upload/CMS).

## What ships in this repo
- Same-URL A/B tests (one route per experiment) with sticky assignment (stored in DB).
- Narrow tracking only: `page_view`, `cta_click`, `lead_submit`, `conversion`.
- Mandatory server-side lead capture (`POST /api/lead`) and durable GHL webhook outbox with retries.
- Internal admin UI for routes/experiments and basic experiment reporting.

## Local setup
1. Copy `.env.example` to `.env` and fill required values.
2. Start a Postgres DB and set `DATABASE_URL`.
   - If you use Prisma Dev: `npx prisma dev --detach`, then set `DATABASE_URL` to the TCP URL it prints.
3. Run migrations: `npx prisma migrate dev`
4. Run the app: `npm run dev`

## Admin
- Sign in: `/admin` (Google SSO via NextAuth).
- Register a route: `/admin/routes`
- Create an experiment: `/admin/experiments`

## Templates (developer-managed)
- Add/edit templates in `landing/templates/`.
- Register template keys in `landing/templates/types.ts` and `landing/templates/registry.tsx`.
- Variants and routes reference `templateKey` + JSON config.

## Webhooks (GHL)
- Lead submits create an outbox record (`WebhookDelivery`).
- Dispatch job: `POST /api/internal/webhooks/dispatch`
  - If `INTERNAL_DISPATCH_SECRET` is set, send `Authorization: Bearer <secret>`.
- Webhook logs UI: `/admin/webhooks`
