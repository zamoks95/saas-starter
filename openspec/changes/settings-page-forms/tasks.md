## 1. Infrastructure Layer (HTTP Adapter)

- [ ] 1.1 Add `updateProfile` method to user HTTP adapter calling `PATCH /me` with `UpdateProfileRequest` body
- [ ] 1.2 Add `changePassword` method to user HTTP adapter calling `PATCH /me/password` with `ChangePasswordRequest` body
- [ ] 1.3 Register adapter methods in Inversify container if not already exposed through the user repository port

## 2. Application Layer (Hooks)

- [ ] 2.1 Create `useUpdateProfile` hook via Inversify that exposes `updateProfile` with loading/error state
- [ ] 2.2 Create `useChangePassword` hook via Inversify that exposes `changePassword` with loading/error state

## 3. Settings Page Rewrite

- [ ] 3.1 Install `@hookform/resolvers` in `apps/web` (`bun add @hookform/resolvers`)
- [ ] 3.2 Rewrite `settings.page.tsx` with two ShadCN Card sections: "Profile" and "Security"
- [ ] 3.3 Implement profile form using ShadCN Form + Input + Button with `UpdateProfileRequestSchema` validation
- [ ] 3.4 Pre-populate profile form with current session data (name, image)
- [ ] 3.5 Implement password form using ShadCN Form + Input + Button with `ChangePasswordRequestSchema` validation plus client-side confirmPassword match
- [ ] 3.6 Add Sonner toast notifications for success and error feedback on both forms
- [ ] 3.7 Add loading/disabled states on submit buttons during API calls

## 4. Internationalization

- [ ] 4.1 Add i18n keys for settings page labels, placeholders, and messages in `en` and `es` locales

## 5. Verification

- [ ] 5.1 Verify profile update form submits successfully and updates session data
- [ ] 5.2 Verify password change form submits successfully and clears after success
- [ ] 5.3 Verify validation errors display inline for invalid inputs
- [ ] 5.4 Verify error toasts appear for API failures
- [ ] 5.5 Verify the page renders correctly on mobile viewports
