## 1. Environment Configuration

- [ ] 1.1 Add `RESEND_API_KEY=your-resend-api-key` to `apps/api/.env.example`
- [ ] 1.2 Add `RESEND_API_KEY` to `apps/api/.env` with a placeholder value

## 2. Domain Layer

- [ ] 2.1 Create `apps/api/src/domain/ports/email.port.ts` with the `EmailPort` interface (`send` method returning `Promise<{ id: string }>`)

## 3. Infrastructure Layer

- [ ] 3.1 Install `resend` package in `apps/api` (`bun add resend`)
- [ ] 3.2 Create `apps/api/src/infrastructure/email/resend-email.adapter.ts` implementing `EmailPort` using the Resend SDK
- [ ] 3.3 Register `ResendEmailAdapter` as `emailService` in `apps/api/src/infrastructure/plugins/di.plugin.ts` via `.decorate()`

## 4. Documentation

- [ ] 4.1 Update `README.md` with a setup step for obtaining and configuring `RESEND_API_KEY` before running the project

## 5. Verification

- [ ] 5.1 Verify the API server starts without errors with a valid `RESEND_API_KEY`
- [ ] 5.2 Verify `emailService` is accessible from route context
