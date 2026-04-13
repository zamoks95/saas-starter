## ADDED Requirements

### Requirement: User response contract

A `UserResponse` Zod schema SHALL exist in `packages/shared/src/contracts/user/` defining the shape of user profile responses. It SHALL export both the schema and the inferred TypeScript type.

#### Scenario: Schema matches API response
- **WHEN** `GET /me` returns a user profile
- **THEN** the response body validates against `UserResponse` schema

#### Scenario: Schema is importable by frontend
- **WHEN** `apps/web` imports `UserResponse` from `@repo/shared`
- **THEN** the type is available for type-safe API consumption

### Requirement: Update profile request contract

An `UpdateProfileRequest` Zod schema SHALL exist defining the allowed fields for `PATCH /me`: `name` (optional string) and `image` (optional string URL). At least one field MUST be present.

#### Scenario: Valid partial update
- **WHEN** a request body with `{ "name": "New" }` is validated against `UpdateProfileRequest`
- **THEN** validation passes

#### Scenario: Empty body rejected
- **WHEN** an empty `{}` body is validated against `UpdateProfileRequest`
- **THEN** validation fails

### Requirement: Change password request contract

A `ChangePasswordRequest` Zod schema SHALL exist defining `currentPassword` (required string) and `newPassword` (required string, minimum 8 characters).

#### Scenario: Valid password change request
- **WHEN** a body with `{ "currentPassword": "old", "newPassword": "newpass123" }` is validated
- **THEN** validation passes

#### Scenario: Short password rejected
- **WHEN** a body with `{ "currentPassword": "old", "newPassword": "abc" }` is validated
- **THEN** validation fails with minimum length error

### Requirement: Error response contract

An `ErrorResponse` Zod schema SHALL exist defining `code` (string), `message` (string), and `details` (optional array). All API errors use this shape.

#### Scenario: Error response validates
- **WHEN** an API returns `{ "code": "NOT_FOUND", "message": "User not found" }`
- **THEN** the response validates against `ErrorResponse` schema
