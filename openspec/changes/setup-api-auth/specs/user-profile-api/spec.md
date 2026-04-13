## ADDED Requirements

### Requirement: Get current user profile

`GET /me` SHALL return the authenticated user's profile information as a `UserResponse`.

#### Scenario: Authenticated user requests profile
- **WHEN** an authenticated user sends `GET /me`
- **THEN** the server responds with 200 and a JSON body containing `id`, `name`, `email`, `emailVerified`, `image`, and `createdAt`

#### Scenario: Unauthenticated request
- **WHEN** an unauthenticated request is sent to `GET /me`
- **THEN** the server responds with 401

### Requirement: Update user profile

`PATCH /me` SHALL update the authenticated user's profile fields. Only `name` and `image` are updatable. The endpoint SHALL accept partial updates.

#### Scenario: Update name
- **WHEN** an authenticated user sends `PATCH /me` with `{ "name": "New Name" }`
- **THEN** the user's name is updated and the server responds with 200 and the updated `UserResponse`

#### Scenario: Update image
- **WHEN** an authenticated user sends `PATCH /me` with `{ "image": "https://example.com/avatar.png" }`
- **THEN** the user's image URL is updated and the server responds with 200 and the updated `UserResponse`

#### Scenario: Empty update body
- **WHEN** an authenticated user sends `PATCH /me` with `{}`
- **THEN** the server responds with 400 and an error indicating at least one field must be provided

#### Scenario: Invalid fields are rejected
- **WHEN** an authenticated user sends `PATCH /me` with `{ "email": "new@email.com" }`
- **THEN** the server responds with 400 (email is not updatable via this endpoint)

### Requirement: Delete user account

`DELETE /me` SHALL permanently delete the authenticated user's account, revoke all sessions, and remove all associated data.

#### Scenario: Account deletion
- **WHEN** an authenticated user sends `DELETE /me`
- **THEN** the user account is deleted, all sessions are revoked, and the server responds with 204

#### Scenario: Deleted user cannot authenticate
- **WHEN** a deleted user attempts to sign in
- **THEN** authentication fails

### Requirement: Change password

`PATCH /me/password` SHALL change the authenticated user's password by delegating to Better Auth's password change API.

#### Scenario: Successful password change
- **WHEN** an authenticated user sends `PATCH /me/password` with `{ "currentPassword": "old", "newPassword": "new123" }`
- **THEN** the password is updated and the server responds with 200

#### Scenario: Wrong current password
- **WHEN** an authenticated user sends `PATCH /me/password` with an incorrect `currentPassword`
- **THEN** the server responds with 400 and an error message

#### Scenario: Weak new password
- **WHEN** an authenticated user sends `PATCH /me/password` with a `newPassword` that is too short
- **THEN** the server responds with 400 and a validation error
