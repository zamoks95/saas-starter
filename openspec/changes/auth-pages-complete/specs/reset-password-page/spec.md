## ADDED Requirements

### Requirement: Reset password page at /auth/reset-password

The system SHALL render a password reset page at `/auth/reset-password`. The page MUST accept a `token` query parameter and allow the user to set a new password.

#### Scenario: User visits reset-password with valid token
- **WHEN** a user navigates to `/auth/reset-password?token=<valid-token>`
- **THEN** the system SHALL display a form with new password and confirm password fields

#### Scenario: User submits new password successfully
- **WHEN** the user enters a valid new password and matching confirmation, then submits
- **THEN** the system SHALL call Better Auth's `resetPassword` with the token and new password, display a success message, and redirect to `/auth`

#### Scenario: Password confirmation mismatch
- **WHEN** the user enters a new password and a non-matching confirm password
- **THEN** the system SHALL display a validation error indicating passwords do not match

#### Scenario: Invalid or expired token
- **WHEN** the `resetPassword` call fails due to an invalid or expired token
- **THEN** the system SHALL display an error message and a link to request a new reset email

#### Scenario: Missing token parameter
- **WHEN** a user navigates to `/auth/reset-password` without a `token` query parameter
- **THEN** the system SHALL display an error message and a link to the recover-password page

#### Scenario: Guest route access
- **WHEN** an authenticated user navigates to `/auth/reset-password`
- **THEN** the system SHALL redirect to `/` (dashboard)
