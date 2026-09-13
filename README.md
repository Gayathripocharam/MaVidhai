# MaVidhai

MaVidhai is a full-stack, transactional e-commerce platform demonstrating secure, server‑authoritative commerce flows, robust payment state machines, and AI-driven features.

This project was built as an internship showcase, prioritizing engineering depth, architectural integrity, and end-to-end user journeys over simple frontend scaffolding.

## 1. Project Overview
MaVidhai provides a complete modern e-commerce experience. It isolates users via JWT authentication, drives all pricing and stock logic authoritatively from the backend, and handles complex asynchronous flows like payment processing via WhatsApp and AI chatbot interactions.

## 2. Key Features
- **Secure Commerce Flows**: Full catalog, cart, and wishlist functionality with server-enforced pricing and inventory rules.
- **WhatsApp Payments**: Provider-agnostic payment architecture integrated deeply with WhatsApp for seamless checkouts.
- **AI Chatbot**: Gemini-powered conversational assistant to help users navigate and query products.
- **Internationalization**: Integrated language selection and translation.
- **Robust State Management**: Immutable order history and PostgreSQL-backed cart/wishlist persistence.
- **Admin Dashboard**: Analytics and vendor tools to manage the platform.

## 3. Architecture
MaVidhai is designed as a modular monorepo.
- The **Frontend** is a React/Next.js application responsible for UI, routing, and client-side state.
- The **Backend** is a FastAPI/Python service responsible for business logic, database transactions, and integrations (AI, WhatsApp, Payments).
- The **Database** is PostgreSQL, using Alembic for schema migrations and SQLAlchemy for ORM.

## 4. Tech Stack
- **Frontend**: Next.js 16 (App Router), React, TailwindCSS
- **Backend**: FastAPI, Python, SQLAlchemy, Alembic
- **Database**: PostgreSQL
- **Integrations**: Google Gemini API (AI Chatbot), WhatsApp API (Payments)

## 5. User Journey
1. **Discovery**: Users browse the catalog, utilize the search function, or ask the AI Chatbot for recommendations.
2. **Selection**: Items are added to the persistent cart or saved to the wishlist.
3. **Checkout**: Upon checking out, the backend calculates authoritative pricing, reserves stock, and creates an immutable order snapshot.
4. **Payment**: The order enters a `pending` state and hands off to the WhatsApp payment architecture.
5. **Fulfillment**: A webhook confirms payment, updating the order to `paid` and finalizing the transaction.

## 6. Payment Architecture — WhatsApp
MaVidhai uses a generic, provider-agnostic `PaymentProvider` abstraction. The current production adapter routes payments through **WhatsApp**. 

- **Checkout Polling**: The frontend seamlessly polls the backend for payment status updates.
- **Webhook Idempotency**: The backend enforces idempotent, signature-verified webhooks to ensure payments cannot be double-counted or forged.
- **Captured → Failed Protection**: Strict state machine rules prevent a successful payment from being overridden by a delayed failure webhook.
- **Cross-Order Protection**: Payments are strictly correlated to specific `order_id`s.

*(Note: Real external-provider staging validation is the final remaining production gate before live deployment.)*

## 7. AI Chatbot
MaVidhai features an integrated AI Chatbot powered by the Google Gemini API. It provides a conversational interface for users to find products, get styling advice, or ask questions about the platform, directly integrated into the main navigation layout.

## 8. Frontend/Backend Structure
```text
MaVidhai/
├── src/                # Next.js frontend (App Router, Components, Hooks)
├── backend/            # FastAPI backend (Routes, Models, Schemas, Services)
├── team-projects/      # Additional contributor projects (IntelliAssist-AI, plantpulse-app)
├── public/             # Static frontend assets
└── package.json        # Frontend dependencies
```

## 9. Local Setup

### Backend (Python)
```bash
cd backend
python -m venv .venv
# Activate virtual environment
source .venv/bin/activate      # Linux/Mac
.\.venv\Scripts\activate       # Windows
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

### Frontend (Next.js)
```bash
# From the repository root
npm install
npm run dev
```

## 10. Environment Variables
You need to configure environment variables for both the frontend and backend.
- **Backend**: See `backend/.env.example`. Requires Database URL, JWT secret, and WhatsApp webhook secrets.
- **Frontend**: See `.env.local.example`. Requires API URLs and `GEMINI_API_KEY`.

## 11. Testing
The backend is verified by a comprehensive automated test suite (92 tests) covering critical paths, state transitions, concurrency, and security boundaries.

```bash
cd backend
pytest -q
```

## 12. Deployment
- **Frontend**: Configured for Vercel deployment.
- **Backend**: Configured for Render deployment (`render.yaml` provided).
- **Database**: Managed PostgreSQL instance (e.g., Supabase, Neon).

## 13. Project Status / Release Status
| Gate                             | Status |
| -------------------------------- | ------ |
| Unified frontend integration     | ✅ |
| Backend API baseline             | ✅ |
| AI chatbot integration           | ✅ |
| WhatsApp payment architecture    | ✅ |
| Payment security tests           | ✅ |
| Backend regression (92/92)       | ✅ |
| Production frontend build        | ✅ |
| External payment provider staging| ⏳ |

## 14. Team / Contributors
Built collaboratively by the MaVidhai team:
- **Gayathri Pocharam** (Architecture & Core Backend)
- **Sukriti** (Frontend UI/UX)
- **Sameer** (AI Integrations)
- **Bharath** (Commerce Features)

*(Additional team projects can be found in the `team-projects/` directory.)*

## 15. Future Roadmap
- Execute real staging payment webhook validation.
- Migrate JWT authentication from `localStorage` to `HttpOnly` cookies.
- Enhance real-time inventory tracking and concurrency control.
- Finalize production deployment to Vercel/Render.
