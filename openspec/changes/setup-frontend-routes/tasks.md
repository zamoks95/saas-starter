## 1. Router Setup

- [ ] 1.1 Install `react-router` in `apps/web` (`bun add react-router`)
- [ ] 1.2 Create `src/infrastructure/routes.tsx` with route definitions for `/auth/*`, `/`, and `/settings`
- [ ] 1.3 Update `src/App.tsx` to render `BrowserRouter` with the route configuration

## 2. Route Guards

- [ ] 2.1 Create `src/infrastructure/guards/protected-route.tsx` — redirects to `/auth` if no session
- [ ] 2.2 Create `src/infrastructure/guards/guest-route.tsx` — redirects to `/` if session exists
- [ ] 2.3 Both guards MUST show a loading indicator while session state is resolving

## 3. Authenticated Layout

- [ ] 3.1 Create `src/infrastructure/layouts/authenticated.layout.tsx` with a navigation bar (Dashboard, Settings links, logout button) and `<Outlet />`

## 4. Auth Pages

- [ ] 4.1 Create `src/infrastructure/pages/auth/login.page.tsx` with email/password form calling `signIn`, links to signup and recover-password
- [ ] 4.2 Create `src/infrastructure/pages/auth/signup.page.tsx` with registration form calling `signUp`, link to login
- [ ] 4.3 Create `src/infrastructure/pages/auth/recover-password.page.tsx` with email field for password reset request
- [ ] 4.4 Wrap all `/auth/*` routes with `<GuestRoute>`

## 5. Dashboard Page

- [ ] 5.1 Create `src/infrastructure/pages/dashboard/dashboard.page.tsx` with placeholder summary content
- [ ] 5.2 Wrap `/` route with `<ProtectedRoute>` and `AuthenticatedLayout`

## 6. Settings Page

- [ ] 6.1 Create `src/infrastructure/pages/settings/settings.page.tsx` with placeholder account/profile settings
- [ ] 6.2 Wrap `/settings` route with `<ProtectedRoute>` and `AuthenticatedLayout`

## 7. Verification

- [ ] 7.1 Verify the dev server starts without errors
- [ ] 7.2 Verify unauthenticated users are redirected from `/` and `/settings` to `/auth`
- [ ] 7.3 Verify authenticated users are redirected from `/auth` to `/`
- [ ] 7.4 Verify navigation between dashboard and settings works via the nav bar
