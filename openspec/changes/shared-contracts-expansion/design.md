## Context

`@repo/shared` currently exports three contract groups: `HealthResponseSchema`, `UserResponseSchema` (with `UpdateProfileRequest` and `ChangePasswordRequest`), and `ErrorResponseSchema`. As auth pages and settings forms need client-side validation, the shared package must grow to cover signup, password reset, and common field validation patterns. The package follows the pattern: `contracts/<resource>/<resource>.ts` with co-located tests.

## Goals / Non-Goals

**Goals:**
- Add auth-related request schemas (signup, forgot password, reset password)
- Extract reusable domain primitives (email, password, name) that multiple schemas compose
- Add a pagination schema as a reusable pattern for future list endpoints
- Maintain the existing naming and export conventions
- Ensure every schema exports both the Zod schema and the inferred TypeScript type

**Non-Goals:**
- Response schemas for endpoints that don't exist yet
- API versioning strategy
- Runtime schema registry or schema documentation generation
- Breaking changes to existing schemas

## Decisions

### 1. Domain primitives location

**Decision**: Create `packages/shared/src/domain/primitives.ts` for reusable field schemas (`EmailSchema`, `PasswordSchema`, `NameSchema`). These are composed into contract schemas via `.extend()` or spread.

**Rationale**: Centralizes validation rules (e.g., password minimum length = 8) so changes propagate to all schemas. Follows the existing `domain/` directory in the shared package structure.

**Alternatives considered**:
- Inline validation in each schema — duplicates rules, risks inconsistency
- Separate package for primitives — over-engineering for shared field validators

### 2. Auth contract schemas

**Decision**: Add `contracts/auth/auth.ts` with `SignupRequestSchema`, `ForgotPasswordRequestSchema`, and `ResetPasswordRequestSchema`. These live under `auth/` because they represent auth-specific flows, distinct from the existing `user/` contracts which handle profile management.

**Rationale**: Separating auth flows from user profile management follows the domain boundary. Signup, forgot-password, and reset-password are authentication concerns.

**Alternatives considered**:
- Add to existing `user/user.ts` — mixes auth and profile concerns
- One file per schema — too granular for related schemas

### 3. Pagination schema

**Decision**: Create `contracts/common/pagination.ts` with `PaginationParamsSchema` (input: page, limit) and `PaginatedResponseSchema` (output: items, total, page, limit, hasMore). `PaginatedResponseSchema` is a generic factory function that wraps any item schema.

**Rationale**: Pagination is a cross-cutting concern that every list endpoint will need. Defining the contract once ensures consistent pagination UX.

**Alternatives considered**:
- Cursor-based pagination — more complex, not needed for the starter's scale
- No pagination primitive — each endpoint would reinvent the pattern

### 4. confirmPassword handling

**Decision**: `SignupRequestSchema` and `ResetPasswordRequestSchema` include a `confirmPassword` field with a `.refine()` that checks it matches `password`/`newPassword`. These schemas are for client-side validation only — the API strips `confirmPassword` before processing.

**Rationale**: The confirmation field exists for UX validation, not for the API. Keeping it in the shared schema means frontend forms get the refinement for free.

## Risks / Trade-offs

- **[Schema versioning]** → Adding schemas is backwards-compatible, but modifying existing ones could break consumers. Mitigation: this change only adds new schemas; existing ones are untouched.
- **[Primitives coupling]** → Changing a domain primitive (e.g., password min length) affects all schemas using it. Mitigation: this is intentional — single source of truth for field rules.
