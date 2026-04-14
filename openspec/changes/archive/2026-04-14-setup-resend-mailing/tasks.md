## 1. Environment Configuration

- [x] 1.1 Add `RESEND_API_KEY=your-resend-api-key` to `apps/api/.env.example`
- [x] 1.2 Add `RESEND_API_KEY` to `apps/api/.env` with a placeholder value

## 2. Domain Layer

- [x] 2.1 Create `apps/api/src/domain/ports/email.port.ts` with the `EmailPort` interface (`send` method returning `Promise<{ id: string }>`)

## 3. Infrastructure Layer

- [x] 3.1 Install `resend` package in `apps/api` (`bun add resend`)
- [x] 3.2 Create `apps/api/src/infrastructure/email/resend-email.adapter.ts` implementing `EmailPort` using the Resend SDK
- [x] 3.3 Register `ResendEmailAdapter` as `emailService` in `apps/api/src/infrastructure/plugins/di.plugin.ts` via `.decorate()`

## 4. Documentation

- [x] 4.1 Update `README.md` with a setup step for obtaining and configuring `RESEND_API_KEY` before running the project

## 5. Verification

- [x] 5.1 Verify the API server starts without errors with a valid `RESEND_API_KEY`
- [x] 5.2 Verify `emailService` is accessible from route context
