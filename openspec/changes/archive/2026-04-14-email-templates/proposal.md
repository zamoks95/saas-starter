## Why

The Resend email adapter is functional but there are no email templates. Better Auth triggers emails for verification, password reset, and welcome flows, but without templates these emails either don't send or use raw default content. A SaaS starter needs polished, branded email templates that forked projects can customize.

## What Changes

- Create a base email template system with shared layout (header, footer, branding)
- Add welcome email template (sent after signup)
- Add email verification template (sent when user needs to verify email)
- Add password reset template (sent when user requests password recovery)
- Wire templates into Better Auth's email configuration hooks
- Make templates configurable (app name, logo URL, colors via env vars or config)

## Capabilities

### New Capabilities

- `email-templates`: Reusable HTML email templates with shared layout, configurable branding, and Better Auth integration

### Modified Capabilities

- `email-service`: Add requirements for template rendering and Better Auth email hook integration

## Impact

- **`apps/api`**: Add template files, template renderer, wire into Better Auth config
- **`apps/api/infrastructure/email`**: Add template rendering alongside the existing Resend adapter
- **`packages/shared`**: No changes
- **Environment**: Add optional env vars for email branding (`APP_NAME`, `APP_LOGO_URL`)
