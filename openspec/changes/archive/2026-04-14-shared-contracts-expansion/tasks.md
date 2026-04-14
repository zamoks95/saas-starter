## 1. Domain Primitives

- [x] 1.1 Create `packages/shared/src/domain/primitives.ts` with `EmailSchema`, `PasswordSchema` (min 8 chars), and `NameSchema` (non-empty, max 100 chars)
- [x] 1.2 Export types alongside schemas: `Email`, `Password`, `Name`
- [x] 1.3 Add unit tests in `packages/shared/src/domain/primitives.test.ts`

## 2. Auth Contracts

- [x] 2.1 Create `packages/shared/src/contracts/auth/auth.ts` with `SignupRequestSchema` composing `NameSchema`, `EmailSchema`, `PasswordSchema` + confirmPassword refinement
- [x] 2.2 Add `ForgotPasswordRequestSchema` with `EmailSchema`
- [x] 2.3 Add `ResetPasswordRequestSchema` with token, `PasswordSchema` for newPassword + confirmPassword refinement
- [x] 2.4 Export all schemas and inferred types
- [x] 2.5 Add unit tests in `packages/shared/src/contracts/auth/auth.test.ts` covering valid data, validation errors, and password mismatch

## 3. Pagination Contracts

- [x] 3.1 Create `packages/shared/src/contracts/common/pagination.ts` with `PaginationParamsSchema` (page default 1, limit default 20)
- [x] 3.2 Add `createPaginatedResponseSchema(itemSchema)` factory function returning schema with `items`, `total`, `page`, `limit`, `hasMore`
- [x] 3.3 Export types: `PaginationParams`, `PaginatedResponse<T>`
- [x] 3.4 Add unit tests in `packages/shared/src/contracts/common/pagination.test.ts`

## 4. Exports

- [x] 4.1 Create `packages/shared/src/contracts/auth/index.ts` barrel export
- [x] 4.2 Create `packages/shared/src/contracts/common/index.ts` barrel export
- [x] 4.3 Create `packages/shared/src/domain/index.ts` barrel export
- [x] 4.4 Update `packages/shared/src/contracts/index.ts` to include new auth and common exports
- [x] 4.5 Update `packages/shared/src/index.ts` to include domain exports

## 5. Refactor Existing Schemas

- [x] 5.1 Update `UpdateProfileRequestSchema` to use `NameSchema` from domain primitives (optional field)
- [x] 5.2 Update `ChangePasswordRequestSchema` to use `PasswordSchema` from domain primitives
- [x] 5.3 Verify existing tests still pass after refactor

## 6. Verification

- [x] 6.1 Run `bun test` in `packages/shared` and verify all tests pass
- [x] 6.2 Run `bun run build` to verify the package compiles and exports correctly
- [x] 6.3 Verify `apps/api` and `apps/web` can import new schemas without errors
