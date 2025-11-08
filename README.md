# GoCart E-Commerce Website

full-stack MERN project for GoCart with:

- Backend: Express, MongoDB (Mongoose), auth, products, orders, Stripe webhook, admin routes
- Frontend: Next.js skeleton with pages (home, product, checkout, admin), Clerk placeholder integration, Stripe client flow (clientSecret)

How to run locally:

1. Install Node.js (v18+), MongoDB. Start MongoDB.
2. Backend:
   - cd backend
   - cp .env.example .env (fill values)
   - npm install
   - npm run seed
   - npm run dev
3. Frontend:
   - cd frontend
   - cp .env.local.example .env.local (fill values)
   - npm install
   - npm run dev

Notes:

- This bundle includes Clerk placeholders. For real Clerk OAuth, set up Clerk account and follow their docs.
- Stripe: set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET. Use Stripe CLI to forward webhooks during local development.
- Images are stored in /uploads when uploading via admin product creation.
