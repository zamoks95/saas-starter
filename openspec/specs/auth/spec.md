## ADDED Requirements

### Requirement: Better Auth integration

Authentication SHALL be handled by Better Auth with the Drizzle adapter for session/user storage and the Elysia plugin for route integration. The frontend consumes auth state via Better Auth's React client.

#### Scenario: Auth routes are registered
- **WHEN** the Elysia server starts
- **THEN** Better Auth endpoints (sign-in, sign-up, sign-out, session) are available

#### Scenario: Session persistence
- **WHEN** a user signs in
- **THEN** a session is created in PostgreSQL via the Drizzle adapter

#### Scenario: Frontend auth state
- **WHEN** the React app loads
- **THEN** Better Auth React hooks provide current session and user info

### Requirement: Server-side session verification

Better Auth's server-side API SHALL be used to verify sessions from request headers. The `auth.api.getSession()` method extracts and validates the session cookie.

#### Scenario: Valid session verified
- **WHEN** `auth.api.getSession({ headers })` is called with a valid session cookie
- **THEN** it returns the user and session objects

#### Scenario: Invalid session returns null
- **WHEN** `auth.api.getSession({ headers })` is called with an invalid or missing cookie
- **THEN** it returns null

### Requirement: Password change via Better Auth API

Password changes SHALL be delegated to Better Auth's `auth.api.changePassword()` method, not reimplemented in the domain layer.

#### Scenario: Password changed via Better Auth
- **WHEN** `PATCH /me/password` is called with valid credentials
- **THEN** the route handler delegates to Better Auth's password change API

### Requirement: Account deletion via Better Auth API

Account deletion SHALL use Better Auth's API to revoke all sessions and remove the user, ensuring auth-managed tables (session, account, verification) are properly cleaned up.

#### Scenario: Account deleted via Better Auth
- **WHEN** `DELETE /me` is called
- **THEN** Better Auth's delete user API removes the user and all related auth records
