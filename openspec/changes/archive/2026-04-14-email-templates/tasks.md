## 1. Environment Configuration

- [x] 1.1 Add `APP_NAME` and `APP_SUPPORT_EMAIL` to `apps/api/.env.example` with default values

## 2. Base Email Layout

- [x] 2.1 Create `apps/api/src/infrastructure/email/templates/base-layout.ts` with `createBaseLayout(content: string)` function
- [x] 2.2 Implement HTML layout with inline styles, app name header (from `APP_NAME`), content area, and footer with support email

## 3. Email Templates

- [x] 3.1 Create `apps/api/src/infrastructure/email/templates/welcome.template.ts` with `renderWelcomeEmail(params: { name: string })` returning `{ subject, html, text }`
- [x] 3.2 Create `apps/api/src/infrastructure/email/templates/verification.template.ts` with `renderVerificationEmail(params: { name: string; url: string })` returning `{ subject, html, text }`
- [x] 3.3 Create `apps/api/src/infrastructure/email/templates/password-reset.template.ts` with `renderPasswordResetEmail(params: { name: string; url: string })` returning `{ subject, html, text }`
- [x] 3.4 Create `apps/api/src/infrastructure/email/templates/index.ts` barrel export

## 4. Better Auth Integration

- [x] 4.1 Configure `emailAndPassword.sendResetPassword` in Better Auth config to use password reset template + `EmailPort`
- [x] 4.2 Configure `emailVerification.sendVerificationEmail` in Better Auth config to use verification template + `EmailPort`
- [x] 4.3 Add `onUserCreated` or signup hook to send welcome email via template + `EmailPort`

## 5. Testing

- [x] 5.1 Add unit tests for each template function verifying returned subject, html, and text fields
- [x] 5.2 Add unit test for `createBaseLayout` verifying it wraps content in HTML with branding

## 6. Verification

- [x] 6.1 Verify password reset email is sent when using recover-password flow
- [x] 6.2 Verify email verification is sent on signup (if email verification is enabled)
- [x] 6.3 Verify welcome email is sent on new user registration
- [x] 6.4 Verify templates use custom `APP_NAME` when set
