## Why

`@repo/shared` currently only has contracts for health, user, and error responses. As the starter grows with settings forms, auth pages, and email templates, the contract layer needs to cover all API interactions — ensuring frontend and backend stay in sync through a single source of truth for request/response validation.

## What Changes

- Add `SignupRequestSchema` for signup form validation (name, email, password, confirmPassword)
- Add `ResetPasswordRequestSchema` for password reset form (token, newPassword, confirmPassword)
- Add `ForgotPasswordRequestSchema` for password recovery (email)
- Add `PaginationSchema` as a reusable pagination primitive (page, limit, total, hasMore)
- Add `ApiResponseSchema` generic wrapper for consistent API responses
- Add shared domain primitives: `EmailSchema`, `PasswordSchema` (min length, complexity rules), `NameSchema`
- Ensure all schemas export both the Zod schema and the inferred TypeScript type

## Capabilities

### New Capabilities

- `domain-primitives`: Reusable Zod schemas for common field types (email, password, name) used across multiple contracts

### Modified Capabilities

- `shared-contracts`: Add requirements for auth-related request schemas, pagination, API response wrapper, and domain primitives

## Impact

- **`packages/shared`**: Add new contract files and domain primitive schemas
- **`apps/web`**: Can import new schemas for form validation (signup, reset password)
- **`apps/api`**: Can import new schemas for request validation
- **No breaking changes** — all additions are new exports
