## Why

Better Auth routes exist (`/api/auth/*`) but no routes are protected and there's no way to get the current user's profile. Without an auth guard and user endpoints, the frontend can't build any authenticated feature. This is the foundational API layer that everything else depends on.

## What Changes

- Create an auth guard middleware using Elysia `.derive()` + `.guard()` that extracts the current user from Better Auth session cookies
- Wire the DI plugin (`di.plugin.ts`) with repository decorations
- Add user profile endpoints behind the auth guard:
  - `GET /me` — return current user profile
  - `PATCH /me` — update profile fields (name, image)
  - `DELETE /me` — delete account (cleanup domain data + revoke sessions + remove account)
  - `PATCH /me/password` — change password (delegates to Better Auth API)
- Create Zod contracts in `packages/shared` for all request/response schemas (`UserResponse`, `UpdateProfileRequest`, `ChangePasswordRequest`, `ErrorResponse`)
- Implement the hexagonal layers: domain entity, repository port, use cases, Drizzle adapter

## Capabilities

### New Capabilities
- `auth-guard`: Elysia middleware that extracts and validates the current user session, protecting routes that require authentication
- `user-profile-api`: CRUD endpoints for the authenticated user's profile and account settings
- `api-error-handling`: Global error handling middleware with structured error responses
- `api-contracts`: Zod schemas in packages/shared for auth-related request/response types

### Modified Capabilities
- `auth`: Adding server-side session verification via the auth guard and password change delegation
- `api-server`: Adding the DI plugin wiring and protected route groups

## Impact

- **apps/api**: New middleware, routes, domain entities, use cases, and repository implementations
- **packages/shared**: New Zod contracts for user profile and error responses
- **packages/db**: May need to read from existing Better Auth schema tables (user, session, account)
- **apps/web** (future): Frontend will consume these endpoints — not in scope for this change but the contracts enable it
