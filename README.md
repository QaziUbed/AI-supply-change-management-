# AI Supply Chain Management

Next.js supply-chain dashboard with **simple application-level auth** and local/mock operational data.

## Environment variables

Create a `.env.local` file from `.env.example`.

Required for production auth:

- `SIMPLE_AUTH_EMAIL`
- `SIMPLE_AUTH_PASSWORD`
- `SIMPLE_AUTH_SESSION_SECRET`
- `SIMPLE_AUTH_ROLE` (optional, defaults to `Planner`; valid: `Admin`, `Planner`, `Manager`)

Optional:

- `GEMINI_API_KEY` (enables Gemini responses in AI chat)

### Development fallback

If `SIMPLE_AUTH_EMAIL` and `SIMPLE_AUTH_PASSWORD` are not set and `NODE_ENV !== production`, login falls back to:

- email: `admin@example.com`
- password: `dev-password`

Use this for local development only.

## Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Authentication behavior

- `POST /api/auth/login` validates credentials server-side and sets an HTTP-only session cookie.
- `GET /api/auth/session` returns current authenticated user for client hydration.
- `POST /api/auth/logout` clears the cookie.
- Middleware protects app routes and private API routes; unauthenticated browser requests redirect to `/login`, API requests return `401`.
- Demo login remains available in the UI and is clearly marked as demo mode.

## Data behavior (no Supabase required)

Dashboard, inventory, landing stats, and AI context use local mock data from `src/lib/mock-data.ts`, so the app builds and runs without a database URL or Supabase keys.

## Gemini behavior when key is missing

If `GEMINI_API_KEY` is not configured, AI chat still works using local fallback analysis and returns a clear message indicating Gemini is not configured.

## Build and lint

```bash
npm run lint
npm run build
```

## Deploy

Deploy as a standard Next.js app (Vercel, Docker, etc.) with the simple-auth environment variables above. No Supabase URL/key is required.
