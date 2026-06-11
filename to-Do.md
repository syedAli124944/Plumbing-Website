# Backend & Integration To-Do List

This document tracks the remaining tasks required to fully complete the backend system and integrate it seamlessly with the frontend.

## 🗄️ 1. Database & ORM (Prisma)
- [ ] **Run Initial Migrations**: Execute `npx prisma migrate dev` to generate the SQLite database structure from `schema.prisma`.
- [ ] **Seed Database**: Create a `prisma/seed.ts` script to populate initial mock data for Services, Blog Posts, and a Super Admin user.
- [ ] **Production DB Setup**: Plan migration from SQLite (`dev.db`) to a production-ready database like PostgreSQL if needed.

## 🔌 2. Frontend-to-Backend Integration
Currently, the frontend relies on mock data and `localStorage` (e.g., `testimonials.ts`). These need to be wired up to the live NestJS endpoints:
- [ ] **Testimonials**: Replace `localStorage` logic with `GET /testimonials` and `POST /testimonials` using Axios.
- [ ] **Contact Form**: Connect the Contact Us page form to `POST /contact`.
- [ ] **Emergency & Booking Service**: Connect the "Book a Session" and "Emergency" forms to `POST /appointments` and `POST /service-requests`.
- [ ] **Quotes**: Hook up the "Get a Quote" forms to `POST /quotes`.

## 🔐 3. Authentication & Authorization
- [ ] **Admin Login Setup**: Connect the `/admin` login screen to the NestJS `POST /auth/login` endpoint.
- [ ] **JWT Management**: Implement secure HTTP-only cookies or local storage token handling in the frontend Axios interceptors (`lib/axios.ts`).
- [ ] **Role Guards**: Ensure NestJS route guards (`@Roles('ADMIN')`) are properly protecting sensitive endpoints (like deleting appointments or approving testimonials).

## 📧 4. Notifications & Emails
- [ ] **Nodemailer Configuration**: Set up SMTP credentials in `.env`.
- [ ] **Customer Confirmations**: Trigger an automated email to the customer when they successfully book an appointment or request a quote.
- [ ] **Admin Alerts**: Send an email/SMS alert to the admin/technicians when a new `isEmergency: true` ServiceRequest is created.

## 🛠️ 5. Admin Dashboard Completion
- [ ] **Dashboard Analytics**: Create a backend endpoint (e.g., `GET /admin/stats`) to return aggregate data (total open requests, recent quotes, pending appointments) for the frontend Admin Dashboard widgets.
- [ ] **Data Tables**: Connect frontend data grids in the Admin Dashboard to fetch real-time `Customers`, `Appointments`, and `Quotes` with pagination.
- [ ] **Approval Workflows**: Add functionality for admins to toggle `isApproved` and `isPublished` on `Testimonial` records.

## 🚀 6. Deployment & DevOps
- [ ] **Environment Variables**: Finalize the `.env.production` file (Database URL, JWT Secret, Frontend URL for CORS).
- [ ] **Docker Compose**: Verify the `docker-compose.yml` and `docker-compose.prod.yml` setups work correctly for running both the Node server and NGINX reverse proxy.
- [ ] **Health Checks**: Ensure the NestJS `@nestjs/terminus` health endpoints are responding correctly for load balancers.
