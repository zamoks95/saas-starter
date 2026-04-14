## 1. Shared contracts

- [x] 1.1 Create `packages/shared/src/contracts/user/user.ts` with `UserResponse` Zod schema and type (id, name, email, emailVerified, image, createdAt)
- [x] 1.2 Create `UpdateProfileRequest` Zod schema (name?, image?, at least one required)
- [x] 1.3 Create `ChangePasswordRequest` Zod schema (currentPassword, newPassword with min 8 chars)
- [x] 1.4 Create `packages/shared/src/contracts/error/error.ts` with `ErrorResponse` Zod schema (code, message, details?)
- [x] 1.5 Export new contracts from `packages/shared/src/contracts/index.ts`

## 2. Domain layer

- [x] 2.1 Create `apps/api/src/domain/entities/user.entity.ts` — User domain entity mapping to Better Auth's user table fields
- [x] 2.2 Create `apps/api/src/domain/repositories/user.repository.ts` — UserRepository port interface (findById, update, delete)
- [x] 2.3 Create `apps/api/src/domain/errors/domain-errors.ts` — NotFoundError, ValidationError base classes

## 3. Application layer

- [x] 3.1 Create `apps/api/src/application/use-cases/get-profile.use-case.ts` — fetches user by ID from repository
- [x] 3.2 Create `apps/api/src/application/use-cases/update-profile.use-case.ts` — validates and updates name/image
- [x] 3.3 Create `apps/api/src/application/use-cases/delete-account.use-case.ts` — orchestrates domain cleanup + Better Auth deletion

## 4. Infrastructure — Auth middleware

- [x] 4.1 Create `apps/api/src/infrastructure/plugins/auth.plugin.ts` — `.derive()` that calls `auth.api.getSession({ headers })` and injects user/session into context
- [x] 4.2 Create `apps/api/src/infrastructure/plugins/guard.plugin.ts` — `.guard({ beforeHandle })` that rejects if user is null with 401

## 5. Infrastructure — Persistence

- [x] 5.1 Create `apps/api/src/infrastructure/persistence/drizzle-user.repository.ts` — implements UserRepository port using Drizzle ORM against the user table

## 6. Infrastructure — DI & Error handling

- [x] 6.1 Wire `apps/api/src/infrastructure/plugins/di.plugin.ts` — `.decorate('userRepo', new DrizzleUserRepository(db))`
- [x] 6.2 Update `apps/api/src/infrastructure/di/types.ts` if DI tokens are needed
- [x] 6.3 Create `apps/api/src/infrastructure/plugins/error.plugin.ts` — global error handler mapping domain errors to ErrorResponse

## 7. Infrastructure — Routes

- [x] 7.1 Create `apps/api/src/infrastructure/http/routes/me.routes.ts` — `GET /me`, `PATCH /me`, `DELETE /me`, `PATCH /me/password` with auth guard composition
- [x] 7.2 Wire `meRoutes` into `apps/api/src/index.ts` with DI plugin, auth plugin, and error plugin

## 8. Tests

- [x] 8.1 Unit test domain entity and domain errors
- [x] 8.2 Unit test use cases with mocked repository
- [x] 8.3 Integration test `/me` routes (authenticated + unauthenticated scenarios)
- [x] 8.4 Unit test shared contracts (Zod schema validation)

## 9. Verification

- [x] 9.1 Run `bun run typecheck` across all workspaces — no type errors
- [x] 9.2 Run `bun run lint` — no lint issues
- [x] 9.3 Run `bun run test` — all tests pass
