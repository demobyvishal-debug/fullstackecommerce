# Commerce Core

A functional Next.js/PostgreSQL commerce foundation: customer accounts, catalog, persistent cart, saved addresses, transactional checkout with stock checks, cash on delivery, Razorpay order creation and signature verified webhooks, order history and server protected admin APIs. All money values are integer paise.

## Setup

Node.js 20+ and PostgreSQL required. Run `npm install`, copy `.env.example` to `.env`, configure `DATABASE_URL`, `NEXTAUTH_URL` and a 32+ character random `NEXTAUTH_SECRET`. Run `npx prisma migrate dev --name init`, then `npm run db:seed`, then `npm run dev`. To create the first admin, set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` (12+ characters) before seeding and remove them afterward. Never commit `.env`.

For online payments, set Razorpay keys and webhook secret, and subscribe the HTTPS endpoint `/api/webhooks/razorpay` to `payment.captured`. Test with gateway test keys before live use. Deploy to a host that runs Next.js server code, configure the server environment variables and run `npm run db:deploy` before `npm run build && npm start`. GitHub Pages cannot run this backend.

## Scope and limits

This is a working foundation, not the complete 35-section specification. Product editing, image upload, reviews, wishlist UI, advanced filters, reset email, rate limiting, invoice PDF, customer notifications, returns/refunds, admin auditing and automatic expired-order cleanup are not implemented. A gateway initialization failure can leave reserved stock on a pending order; resolve manually until cleanup is added. Tax is currently zero and shipping is a simple flat rate. Do not accept live paid orders before completing these operational flows and end-to-end payment testing.
