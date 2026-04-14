## Context

The backend has Better Auth configured with email/password auth and routes at `/api/auth/*`, but all other routes are unprotected. The DI plugin is scaffolded but empty. The hexagonal layers (domain/application/infrastructure) exist as empty directories. We need to build the first real domain feature: authenticated user profile management.

The database already has Better Auth tables: `user`, `session`, `account`, `verification` — defined in `packages/db/src/schema/auth.ts`.

## Goals / Non-Goals

**Goals:**
- Auth guard middleware that extracts current user from Better Auth session
- Protected user profile endpoints (GET/PATCH/DELETE /me, PATCH /me/password)
- First hexagonal implementation: domain entity → use case → repository port → Drizzle adapter
- DI plugin wired with repositories via `.decorate()`
- Zod contracts in packages/shared for all request/response types
- Global error handling with structured error responses

**Non-Goals:**
- Role-based access control (RBAC) — just authenticated/unauthenticated for now
- User management admin endpoints (list users, ban, etc.)
- OAuth providers (only email/password is configured)
- Rate limiting
- API versioning

## Decisions

### 1. Auth guard via Elysia .derive() + .guard()

**Decision**: Create an `authPlugin` that uses `.derive()` to extract the user from Better Auth's session API on every request, then a `guardPlugin` that rejects unauthenticated requests with 401.

**Rationale**: Elysia's plugin system is the DI mechanism (per CLAUDE.md). `.derive()` runs per-request and injects context. `.guard()` provides beforeHandle checks. This is idiomatic Elysia.

**Implementation**:
- `authPlugin` uses `.derive()` → calls `auth.api.getSession({ headers })` → injects `{ user, session }` or `{ user: null, session: null }` into context
- `guardPlugin` uses `.guard({ beforeHandle })` → rejects if `user` is null
- Routes compose: `.use(authPlugin).use(guardPlugin).get("/me", ...)`

**Alternative considered**: Custom JWT middleware — rejected because Better Auth already manages sessions and cookies.

### 2. Hybrid approach for profile vs auth operations

**Decision**: Profile data (name, image) flows through our hexagonal layers. Auth operations (password change) delegate directly to Better Auth API.

**Rationale**: Better Auth owns authentication concerns (password hashing, session revocation). Our domain owns user profile data. This avoids reimplementing what Better Auth already does while keeping domain logic clean.

- `GET /me` → `GetProfileUseCase` → `UserRepository` → Drizzle (reads user table)
- `PATCH /me` → `UpdateProfileUseCase` → `UserRepository` → Drizzle (updates name, image)
- `DELETE /me` → `DeleteAccountUseCase` → `UserRepository` + Better Auth API (revoke sessions, delete user)
- `PATCH /me/password` → delegates to `auth.api.changePassword()` directly in the route handler

### 3. User domain entity reads from Better Auth's user table

**Decision**: The `User` domain entity maps directly to Better Auth's `user` table. No separate user table.

**Rationale**: Better Auth already created the user table with id, name, email, emailVerified, image, createdAt, updatedAt. These are exactly the fields we need. Creating a second table would mean syncing data.

**Future extension**: If the domain needs custom fields (locale, preferences, subscription tier), we can either extend Better Auth's user table or create a `user_profile` table that references it. That decision is deferred.

### 4. DI plugin wires repositories as decorations

**Decision**: The `diPlugin` uses `.decorate()` to register repository instances, making them available in route handlers via context.

```
diPlugin
  .decorate('userRepo', new DrizzleUserRepository(db))
```

Routes access via destructuring: `({ userRepo, user }) => ...`

**Rationale**: This is the pattern documented in CLAUDE.md. Elysia plugins ARE the DI container on the backend.

### 5. Global error handling

**Decision**: Create an error plugin that catches domain errors and maps them to HTTP responses with a consistent `ErrorResponse` shape.

**Error mapping**:
- `NotFoundError` → 404
- `ValidationError` → 400
- `UnauthorizedError` → 401
- Unhandled errors → 500

**Rationale**: Every API needs structured error responses. Doing this now sets the pattern for all future endpoints.

### 6. Contracts in packages/shared

**Decision**: All request/response types live as Zod schemas in `packages/shared/src/contracts/user/`. Both backend (validation) and frontend (type safety) consume them.

**Schemas**:
- `UserResponse` — id, name, email, emailVerified, image, createdAt
- `UpdateProfileRequest` — name?, image? (partial update)
- `ChangePasswordRequest` — currentPassword, newPassword
- `ErrorResponse` — code, message, details?

**Rationale**: Single source of truth pattern established by the existing `HealthResponse` contract.

## Risks / Trade-offs

- **Reading directly from Better Auth's user table** → If Better Auth changes its schema in a major version, our queries break. Mitigation: Drizzle schema is already defined in `packages/db`, pinned to our migration. We control the schema.
- **No RBAC yet** → All authenticated users have equal access. Mitigation: acceptable for user settings (users only access their own data). RBAC is a separate future change.
- **Delete account cascading** → Deleting a user must cascade to sessions, accounts, and verification records. Mitigation: Better Auth's delete user API handles its own tables. Our use case only needs to clean up domain-specific data (none yet).
