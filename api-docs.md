# JobPilot REST API Reference & OpenAPI Specification

All endpoints are prefixed with `/api/v1`. Bearer JWT authentication is required for secured endpoints.

## Authentication Endpoints

- `POST /api/v1/auth/register`: Register new account with email, password, full name.
- `POST /api/v1/auth/login`: Authenticate with email/password and obtain JWT access token.

## Job Discovery & Match Endpoints

- `GET /api/v1/jobs`: Get discovered jobs matching age criteria. Optional `search` query param.
- `GET /api/v1/jobs/{id}/match-score`: Get transparent match score and reason breakdown for logged in user.
- `POST /api/v1/jobs/{id}/apply`: Enqueue Playwright browser application job into RabbitMQ.

## Application Tracking

- `GET /api/v1/applications`: Get list of user applications and their automation statuses.

## Subscription & Billing

- `GET /api/v1/subscription`: Get active subscription status and expiry.
- `POST /api/v1/subscription/create-order`: Initialize ₹999/yr Razorpay/Stripe checkout.
- `POST /api/v1/subscription/verify-payment`: Confirm payment signature and activate subscription.

## Admin Endpoints (ROLE_ADMIN)

- `GET /api/v1/admin/metrics`: Get system health, queue throughput, and active user metrics.
