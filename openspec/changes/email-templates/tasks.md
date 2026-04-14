## 1. Environment Configuration

- [ ] 1.1 Add `APP_NAME` and `APP_SUPPORT_EMAIL` to `apps/api/.env.example` with default values

## 2. Base Email Layout

- [ ] 2.1 Create `apps/api/src/infrastructure/email/templates/base-layout.ts` with `createBaseLayout(content: string)` function
- [ ] 2.2 Implement HTML layout with inline styles, app name header (from `APP_NAME`), content area, and footer with support email

## 3. Email Templates

- [ ] 3.1 Create `apps/api/src/infrastructure/email/templates/welcome.template.ts` with `renderWelcomeEmail(params: { name: string })` returning `{ subject, html, text }`
- [ ] 3.2 Create `apps/api/src/infrastructure/email/templates/verification.template.ts` with `renderVerificationEmail(params: { name: string; url: string })` returning `{ subject, html, text }`
- [ ] 3.3 Create `apps/api/src/infrastructure/email/templates/password-reset.template.ts` with `renderPasswordResetEmail(params: { name: string; url: string })` returning `{ subject, html, text }`
- [ ] 3.4 Create `apps/api/src/infrastructure/email/templates/index.ts` barrel export

## 4. Better Auth Integration

- [ ] 4.1 Configure `emailAndPassword.sendResetPassword` in Better Auth config to use password reset template + `EmailPort`
- [ ] 4.2 Configure `emailVerification.sendVerificationEmail` in Better Auth config to use verification template + `EmailPort`
- [ ] 4.3 Add `onUserCreated` or signup hook to send welcome email via template + `EmailPort`

## 5. Testing

- [ ] 5.1 Add unit tests for each template function verifying returned subject, html, and text fields
- [ ] 5.2 Add unit test for `createBaseLayout` verifying it wraps content in HTML with branding

## 6. Verification

- [ ] 6.1 Verify password reset email is sent when using recover-password flow
- [ ] 6.2 Verify email verification is sent on signup (if email verification is enabled)
- [ ] 6.3 Verify welcome email is sent on new user registration
- [ ] 6.4 Verify templates use custom `APP_NAME` when set
