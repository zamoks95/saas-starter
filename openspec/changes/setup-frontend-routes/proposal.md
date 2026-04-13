## Why

The frontend (`apps/web`) currently has no routing — it renders a single static page. Every SaaS product needs at minimum an auth flow, a dashboard, and a settings page. Setting up these foundational routes now gives every project forked from this starter a working navigation skeleton out of the box.

## What Changes

- Install a React router and set up the routing infrastructure in `apps/web`
- Create three route modules:
  - **`/auth`** — Login, signup, logout, and password recovery. Entry point for unauthenticated users. Redirects to dashboard if already logged in.
  - **`/` (Dashboard)** — Main authenticated area with a navigation bar and a general summary view. Redirects to `/auth` if not logged in.
  - **`/settings`** — Account and profile settings for the authenticated user. Protected route.
- Implement route guards: authenticated routes redirect to `/auth`, and `/auth` redirects to `/` if session exists
- Add a shared navigation bar (layout) for authenticated routes (`/` and `/settings`)

## Capabilities

### New Capabilities
- `auth-pages`: Auth route module — login, signup, logout, password recovery pages and redirect logic for authenticated users
- `dashboard-page`: Dashboard route — main navigation bar, summary layout, and protected route guard
- `settings-page`: Settings route — account/profile settings page, protected route guard
- `route-guards`: Authentication-based route protection and redirection logic

### Modified Capabilities

## Impact

- **`apps/web`**: New router dependency, route structure, page components, layout components, route guards
- **`@repo/ui`**: May consume shared UI components (buttons, inputs, nav) from the UI package
- **Auth integration**: Routes will use the existing `better-auth` client (`useSession`, `signIn`, `signUp`, `signOut`) already configured in `apps/web/src/infrastructure/auth/client.ts`
