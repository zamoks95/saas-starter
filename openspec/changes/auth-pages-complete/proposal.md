## Why

The signup and recover-password pages have basic form structures but lack polish: they use plain HTML inputs instead of ShadCN components, signup has no password confirmation or strength validation, and the password recovery flow is a stub (`// TODO: Wire up`). These are critical user-facing flows that directly affect conversion and trust.

## What Changes

- Upgrade signup page to use ShadCN form components with password confirmation field
- Wire recover-password page to Better Auth's `forgetPassword` API
- Add a reset-password page (`/auth/reset-password`) that handles the token from the reset email
- Add client-side validation with Zod schemas from `@repo/shared`
- Add i18n translations for all auth form labels, errors, and messages
- Add loading states, error handling, and success feedback with toasts

## Capabilities

### New Capabilities

- `reset-password-page`: New page at `/auth/reset-password` that accepts a reset token and allows setting a new password

### Modified Capabilities

- `auth-pages`: Add requirements for ShadCN components, password confirmation on signup, wired password recovery flow, and i18n support

## Impact

- **`apps/web`**: Rewrite `signup.page.tsx` and `recover-password.page.tsx`; add new `reset-password.page.tsx`; update routes
- **`apps/web/infrastructure/auth`**: May need to expose `forgetPassword` and `resetPassword` from Better Auth client
- **`packages/shared`**: Add `SignupRequestSchema` and `ResetPasswordRequestSchema` contracts
- **`apps/api`**: No changes — Better Auth handles password reset endpoints natively
