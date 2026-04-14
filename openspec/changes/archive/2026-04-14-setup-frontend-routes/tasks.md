## 1. Router Setup

- [x] 1.1 Install `react-router` in `apps/web` (`bun add react-router`)
- [x] 1.2 Create `src/infrastructure/routes.tsx` with route definitions for `/auth/*`, `/`, and `/settings`
- [x] 1.3 Update `src/App.tsx` to render `BrowserRouter` with the route configuration

## 2. Route Guards

- [x] 2.1 Create `src/infrastructure/guards/protected-route.tsx` — redirects to `/auth` if no session
- [x] 2.2 Create `src/infrastructure/guards/guest-route.tsx` — redirects to `/` if session exists
- [x] 2.3 Both guards MUST show a loading indicator while session state is resolving

## 3. Authenticated Layout

- [x] 3.1 Create `src/infrastructure/layouts/authenticated.layout.tsx` with a navigation bar (Dashboard, Settings links, logout button) and `<Outlet />`

## 4. Auth Pages

- [x] 4.1 Create `src/infrastructure/pages/auth/login.page.tsx` with email/password form calling `signIn`, links to signup and recover-password
- [x] 4.2 Create `src/infrastructure/pages/auth/signup.page.tsx` with registration form calling `signUp`, link to login
- [x] 4.3 Create `src/infrastructure/pages/auth/recover-password.page.tsx` with email field for password reset request
- [x] 4.4 Wrap all `/auth/*` routes with `<GuestRoute>`

## 5. Dashboard Page

- [x] 5.1 Create `src/infrastructure/pages/dashboard/dashboard.page.tsx` with placeholder summary content
- [x] 5.2 Wrap `/` route with `<ProtectedRoute>` and `AuthenticatedLayout`

## 6. Settings Page

- [x] 6.1 Create `src/infrastructure/pages/settings/settings.page.tsx` with placeholder account/profile settings
- [x] 6.2 Wrap `/settings` route with `<ProtectedRoute>` and `AuthenticatedLayout`

## 7. Verification

- [x] 7.1 Verify the dev server starts without errors
- [x] 7.2 Verify unauthenticated users are redirected from `/` and `/settings` to `/auth`
- [x] 7.3 Verify authenticated users are redirected from `/auth` to `/`
- [x] 7.4 Verify navigation between dashboard and settings works via the nav bar
