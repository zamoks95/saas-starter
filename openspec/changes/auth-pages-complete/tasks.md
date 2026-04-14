## 1. Shared Contracts

- [ ] 1.1 Add `SignupRequestSchema` (name, email, password, confirmPassword with refinement) to `packages/shared/src/contracts/auth/auth.ts`
- [ ] 1.2 Add `ForgotPasswordRequestSchema` (email) to same file
- [ ] 1.3 Add `ResetPasswordRequestSchema` (token, newPassword, confirmPassword with refinement) to same file
- [ ] 1.4 Export new schemas from `packages/shared/src/contracts/index.ts` and `packages/shared/src/index.ts`
- [ ] 1.5 Add unit tests for new schemas in `packages/shared/src/contracts/auth/auth.test.ts`

## 2. Better Auth Client Exports

- [ ] 2.1 Expose `forgetPassword` from Better Auth client in `apps/web/src/infrastructure/auth/client.ts`
- [ ] 2.2 Expose `resetPassword` from Better Auth client in same file

## 3. Signup Page Upgrade

- [ ] 3.1 Install `@hookform/resolvers` in `apps/web` if not already installed
- [ ] 3.2 Rewrite `signup.page.tsx` to use ShadCN Form + Input + Button + Card + Label components
- [ ] 3.3 Add confirmPassword field with validation using `SignupRequestSchema`
- [ ] 3.4 Add loading state on submit button and error display via toast

## 4. Recover Password Page Upgrade

- [ ] 4.1 Rewrite `recover-password.page.tsx` to use ShadCN components
- [ ] 4.2 Wire form submission to Better Auth's `forgetPassword` client method
- [ ] 4.3 Display confirmation message after submission regardless of email existence

## 5. Reset Password Page (New)

- [ ] 5.1 Create `reset-password.page.tsx` in `apps/web/src/infrastructure/pages/auth/`
- [ ] 5.2 Read `token` from URL query parameters
- [ ] 5.3 Implement new password + confirm password form with `ResetPasswordRequestSchema` validation
- [ ] 5.4 Wire submission to Better Auth's `resetPassword` client method
- [ ] 5.5 Handle success (redirect to `/auth` with success message) and error (invalid/expired token)
- [ ] 5.6 Handle missing token (show error and link to recover-password page)

## 6. Routing

- [ ] 6.1 Add `/auth/reset-password` route as a guest route in `apps/web/src/infrastructure/routes.tsx`

## 7. Login Page Upgrade

- [ ] 7.1 Upgrade `login.page.tsx` to use ShadCN Form + Input + Button + Card + Label components for visual consistency

## 8. Internationalization

- [ ] 8.1 Add i18n keys for all auth page labels, placeholders, errors, and messages in `en` and `es` locales

## 9. Verification

- [ ] 9.1 Verify signup flow with password confirmation works end-to-end
- [ ] 9.2 Verify recover-password triggers Better Auth's forgetPassword API
- [ ] 9.3 Verify reset-password page handles valid token and sets new password
- [ ] 9.4 Verify reset-password page shows error for invalid/expired token
- [ ] 9.5 Verify all auth pages use consistent ShadCN styling
- [ ] 9.6 Verify navigation links between all auth pages work correctly
