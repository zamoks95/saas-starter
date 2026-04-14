## 1. Domain Primitives

- [ ] 1.1 Create `packages/shared/src/domain/primitives.ts` with `EmailSchema`, `PasswordSchema` (min 8 chars), and `NameSchema` (non-empty, max 100 chars)
- [ ] 1.2 Export types alongside schemas: `Email`, `Password`, `Name`
- [ ] 1.3 Add unit tests in `packages/shared/src/domain/primitives.test.ts`

## 2. Auth Contracts

- [ ] 2.1 Create `packages/shared/src/contracts/auth/auth.ts` with `SignupRequestSchema` composing `NameSchema`, `EmailSchema`, `PasswordSchema` + confirmPassword refinement
- [ ] 2.2 Add `ForgotPasswordRequestSchema` with `EmailSchema`
- [ ] 2.3 Add `ResetPasswordRequestSchema` with token, `PasswordSchema` for newPassword + confirmPassword refinement
- [ ] 2.4 Export all schemas and inferred types
- [ ] 2.5 Add unit tests in `packages/shared/src/contracts/auth/auth.test.ts` covering valid data, validation errors, and password mismatch

## 3. Pagination Contracts

- [ ] 3.1 Create `packages/shared/src/contracts/common/pagination.ts` with `PaginationParamsSchema` (page default 1, limit default 20)
- [ ] 3.2 Add `createPaginatedResponseSchema(itemSchema)` factory function returning schema with `items`, `total`, `page`, `limit`, `hasMore`
- [ ] 3.3 Export types: `PaginationParams`, `PaginatedResponse<T>`
- [ ] 3.4 Add unit tests in `packages/shared/src/contracts/common/pagination.test.ts`

## 4. Exports

- [ ] 4.1 Create `packages/shared/src/contracts/auth/index.ts` barrel export
- [ ] 4.2 Create `packages/shared/src/contracts/common/index.ts` barrel export
- [ ] 4.3 Create `packages/shared/src/domain/index.ts` barrel export
- [ ] 4.4 Update `packages/shared/src/contracts/index.ts` to include new auth and common exports
- [ ] 4.5 Update `packages/shared/src/index.ts` to include domain exports

## 5. Refactor Existing Schemas

- [ ] 5.1 Update `UpdateProfileRequestSchema` to use `NameSchema` from domain primitives (optional field)
- [ ] 5.2 Update `ChangePasswordRequestSchema` to use `PasswordSchema` from domain primitives
- [ ] 5.3 Verify existing tests still pass after refactor

## 6. Verification

- [ ] 6.1 Run `bun test` in `packages/shared` and verify all tests pass
- [ ] 6.2 Run `bun run build` to verify the package compiles and exports correctly
- [ ] 6.3 Verify `apps/api` and `apps/web` can import new schemas without errors
