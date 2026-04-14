## Context

The frontend (`apps/web`) is a Vite + React app with no routing. It has a `better-auth` client already configured (`useSession`, `signIn`, `signUp`, `signOut`) and uses Inversify for DI. The UI package (`@repo/ui`) provides ShadCN components. The app needs foundational routes that every SaaS product shares: auth, dashboard, and settings.

## Goals / Non-Goals

**Goals:**
- Install and configure a client-side router
- Define three route modules: `/auth`, `/` (dashboard), `/settings`
- Implement auth-based route guards (protect dashboard/settings, redirect from auth if logged in)
- Create an authenticated layout with a shared navigation bar for `/` and `/settings`
- Pages are skeleton/placeholder — focus is on routing structure, not full UI

**Non-Goals:**
- Full-featured auth forms (styled, validated) — those come in a separate change
- Dashboard widgets or real data — just the layout and placeholder content
- Settings form implementation — just the page structure
- Server-side rendering or code splitting optimization
- Mobile-responsive navigation (future concern)

## Decisions

### 1. Router: React Router v7

**Decision**: Use `react-router` (v7) with `BrowserRouter` and route objects.

**Rationale**: React Router is the most mature, widely-adopted router for React SPAs. v7 supports both data-loader patterns and classic component-based routing. It has excellent TypeScript support and is well-documented.

**Alternatives considered**:
- TanStack Router — excellent type safety but smaller ecosystem, more opinionated. Better for greenfield apps with complex data loading. Overkill for a starter boilerplate.
- Wouter — minimalist, but lacks layout nesting and guards out of the box.

### 2. Route structure: file-based convention (manual)

**Decision**: Organize pages under `src/infrastructure/pages/` grouped by route module, with route definitions in `src/infrastructure/routes.tsx`.

```
src/infrastructure/
  routes.tsx                    → Central route definitions
  layouts/
    authenticated.layout.tsx    → Nav bar + Outlet for protected routes
  pages/
    auth/
      login.page.tsx
      signup.page.tsx
      recover-password.page.tsx
    dashboard/
      dashboard.page.tsx
    settings/
      settings.page.tsx
```

**Rationale**: Keeps the infrastructure layer responsible for routing (framework concern). Pages are thin — they compose application-layer hooks and UI components.

### 3. Route guards via wrapper components

**Decision**: Create `<ProtectedRoute>` and `<GuestRoute>` wrapper components that use `useSession()` to check auth state and redirect accordingly.

- `<ProtectedRoute>`: If no session → redirect to `/auth`
- `<GuestRoute>`: If session exists → redirect to `/`

**Rationale**: Simple, declarative, composable. No need for middleware abstractions. Leverages the existing `useSession` hook from `better-auth/react`.

**Alternatives considered**:
- Route loader pattern (react-router data loaders) — more powerful but adds complexity for a simple session check. Can migrate later if needed.

### 4. Authenticated layout with shared nav

**Decision**: Create an `AuthenticatedLayout` component that renders a navigation bar and an `<Outlet />`. Both `/` and `/settings` routes are nested under this layout.

**Rationale**: Avoids duplicating the nav bar across pages. Standard React Router nested layout pattern.

## Risks / Trade-offs

- **[Session loading state]** → `useSession()` is async; there's a brief moment where auth state is unknown. Mitigation: Show a loading spinner in route guards until session is resolved. Prevents flash of wrong page.
- **[No lazy loading]** → All pages are eagerly loaded in the initial bundle. Mitigation: Acceptable for a starter with 3 pages. Lazy loading can be added per-route as the app grows.
- **[Password recovery requires backend endpoint]** → The recover-password page will need a backend API that may not exist yet. Mitigation: Create the page as a placeholder; wire it up when the backend endpoint is available.
