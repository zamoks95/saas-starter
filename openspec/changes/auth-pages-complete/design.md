## Context

The login page is functional with Better Auth's `signIn.email`. The signup page works with `signUp.email` but uses plain HTML inputs, has no password confirmation, and lacks validation. The recover-password page is a stub with a `// TODO` comment. Better Auth provides built-in `forgetPassword` and `resetPassword` APIs that handle token generation and validation — these just need to be wired up. All 56 ShadCN components are installed and available.

## Goals / Non-Goals

**Goals:**
- Upgrade all auth pages to use ShadCN form components with Zod validation
- Add password confirmation field to signup
- Wire recover-password to Better Auth's `forgetPassword` API
- Add a new reset-password page that handles the token from the reset email link
- Add i18n support for all auth form content
- Provide consistent loading states and error handling

**Non-Goals:**
- OAuth/social login (separate feature)
- Email verification page (Better Auth handles this via redirect)
- CAPTCHA or rate limiting on auth forms
- Custom password strength meter UI

## Decisions

### 1. Password recovery flow

**Decision**: Use Better Auth's built-in `forgetPassword` and `resetPassword` client methods. The flow is: user enters email → receives email with reset link → link navigates to `/auth/reset-password?token=<token>` → user enters new password → `resetPassword` is called with token and new password.

**Rationale**: Better Auth handles all the security concerns (token generation, expiration, single-use). We just need UI pages and to wire the client methods.

**Alternatives considered**:
- Custom password reset implementation — unnecessary when Better Auth provides it out of the box
- Magic link login instead of password reset — different UX paradigm, can be added later

### 2. Shared validation schemas

**Decision**: Add `SignupRequestSchema` (name, email, password, confirmPassword) and `ResetPasswordRequestSchema` (token, newPassword, confirmPassword) to `@repo/shared`. The `confirmPassword` field exists only in these client-facing schemas, not in the API schemas.

**Rationale**: Keeps validation in the shared package as a single source of truth. The `confirmPassword` refinement ensures passwords match before the form submits.

**Alternatives considered**:
- Inline validation in pages — breaks the shared contracts pattern

### 3. Form component approach

**Decision**: Use ShadCN Form (react-hook-form + zod resolver) for all auth forms, consistent with the settings page approach.

**Rationale**: Consistency across the application. Same pattern, same components, same validation approach.

### 4. Reset password page routing

**Decision**: Add `/auth/reset-password` route as a guest route (accessible without authentication). The page reads the `token` query parameter from the URL.

**Rationale**: Users clicking the reset link from their email are not authenticated. The token in the URL is the authentication mechanism for this specific action.

## Risks / Trade-offs

- **[Token in URL]** → Reset tokens appear in the URL query string. Mitigation: this is standard practice; Better Auth tokens are single-use and short-lived.
- **[Email delivery dependency]** → Password recovery depends on the Resend email adapter being configured. Mitigation: the email-templates change will address template content; the adapter is already wired.
