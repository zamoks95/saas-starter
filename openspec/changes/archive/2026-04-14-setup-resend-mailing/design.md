## Context

The SaaS starter currently has no email-sending capability. Transactional emails (welcome, password reset, notifications) are a baseline requirement for any SaaS product. The backend (`apps/api`) follows hexagonal architecture with Elysia's plugin system for DI.

Resend is chosen as the email provider. It offers a clean SDK, generous free tier, and excellent developer experience.

## Goals / Non-Goals

**Goals:**
- Define a domain-level email port (interface) decoupled from any provider
- Implement a Resend adapter in the infrastructure layer
- Register the email service in the Elysia DI plugin so use cases can depend on it
- Add `RESEND_API_KEY` to environment configuration and document it as a required setup step
- Update `README.md` so developers know to configure the API key before running the project

**Non-Goals:**
- Email templates or templating engine (future concern)
- Email queuing, retries, or background job processing
- Webhook handling for delivery status / bounce tracking
- Multi-provider fallback (e.g., Resend + SES)
- Frontend email-related UI

## Decisions

### 1. Domain port as TypeScript interface

**Decision**: Define an `EmailPort` interface in `apps/api/src/domain/ports/` with a `send` method accepting `to`, `from`, `subject`, `html`, and optional `text`.

**Rationale**: Keeps the domain layer free of framework dependencies. Use cases depend on the port; the infrastructure layer provides the Resend implementation. This follows the project's hexagonal architecture.

**Alternatives considered**:
- Placing the email service directly in infrastructure without a port — rejected because it couples use cases to Resend.

### 2. Resend adapter in infrastructure

**Decision**: Create `ResendEmailAdapter` in `apps/api/src/infrastructure/email/resend-email.adapter.ts` implementing `EmailPort`. It reads `RESEND_API_KEY` from `process.env`.

**Rationale**: Standard infrastructure adapter pattern already used in the project.

### 3. DI via Elysia `.decorate()`

**Decision**: Register the `ResendEmailAdapter` as `emailService` in the existing `diPlugin` using `.decorate()`.

**Rationale**: Consistent with the project's DI approach (Elysia-native, no Inversify on backend). Routes and use cases access it via context.

### 4. Environment variable naming

**Decision**: Use `RESEND_API_KEY` as the env var name.

**Rationale**: Matches Resend's own documentation conventions. Clear and self-descriptive.

## Risks / Trade-offs

- **[No validation of API key at startup]** → The adapter will fail at send-time if the key is missing. Mitigation: Document clearly in README and `.env.example`. A startup validation can be added later if needed.
- **[No retries or queue]** → Emails are sent synchronously in the request path. Mitigation: Acceptable for a starter boilerplate; retry/queue can be added as a separate change when needed.
- **[Provider lock-in at adapter level]** → The port interface prevents lock-in at the domain/application layers. Swapping providers only requires a new adapter.
