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
