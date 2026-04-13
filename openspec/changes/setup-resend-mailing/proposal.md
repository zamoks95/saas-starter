## Why

The SaaS starter needs a transactional email service for user-facing communications (welcome emails, password resets, notifications). Resend provides a developer-friendly API with excellent DX, and integrating it now into the boilerplate means every future project forked from this starter gets email capabilities out of the box.

## What Changes

- Add `RESEND_API_KEY` to `.env.example` files and document it in `README.md` as a required setup step
- Create an email service in the API backend following hexagonal architecture (domain port + Resend infrastructure adapter)
- Register the email service in Elysia's DI plugin so it's available to all routes/use cases
- Add `resend` npm package as a dependency to `apps/api`

## Capabilities

### New Capabilities
- `email-service`: Domain port (interface) for sending emails, Resend infrastructure adapter, DI registration, and environment configuration

### Modified Capabilities

## Impact

- **`apps/api`**: New domain port, infrastructure adapter, DI plugin update, new dependency (`resend`)
- **Environment**: New `RESEND_API_KEY` env var required before running the API
- **Documentation**: `README.md` updated with setup instructions for the Resend API key
- **`.env.example`**: Updated in `apps/api` with the new variable
