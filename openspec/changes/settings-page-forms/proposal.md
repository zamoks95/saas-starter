## Why

The settings page currently displays account info as read-only text. Users have no way to update their profile (name, avatar) or change their password from the UI, even though the API endpoints (`PATCH /me`, `PATCH /me/password`) already exist and are fully functional.

## What Changes

- Replace the read-only settings display with functional forms using ShadCN components
- Add a profile update form (name, image URL) that calls `PATCH /me`
- Add a password change form (current password, new password, confirm) that calls `PATCH /me/password`
- Add client-side validation using Zod schemas from `@repo/shared`
- Add success/error feedback via toast notifications
- Add i18n translations for all settings form labels and messages

## Capabilities

### New Capabilities

_None — this change enhances an existing capability._

### Modified Capabilities

- `settings-page`: Add requirements for functional profile and password forms with validation, API integration, and user feedback

## Impact

- **`apps/web`**: Rewrite `settings.page.tsx` with form components; add HTTP adapter methods for `PATCH /me` and `PATCH /me/password`
- **`packages/shared`**: No changes — `UpdateProfileRequestSchema` and `ChangePasswordRequestSchema` already exist
- **`packages/ui`**: No changes — ShadCN components (Input, Button, Card, Form, Label) already installed
