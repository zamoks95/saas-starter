## ADDED Requirements

### Requirement: Protected routes redirect unauthenticated users
The system SHALL redirect unauthenticated users to `/auth` when they attempt to access protected routes (`/`, `/settings`).

#### Scenario: Unauthenticated user visits dashboard
- **WHEN** an unauthenticated user navigates to `/`
- **THEN** the system SHALL redirect to `/auth`

#### Scenario: Unauthenticated user visits settings
- **WHEN** an unauthenticated user navigates to `/settings`
- **THEN** the system SHALL redirect to `/auth`

### Requirement: Auth routes redirect authenticated users
The system SHALL redirect authenticated users to `/` (dashboard) when they attempt to access auth routes (`/auth`, `/auth/signup`, `/auth/recover-password`).

#### Scenario: Authenticated user visits /auth
- **WHEN** an authenticated user navigates to `/auth`
- **THEN** the system SHALL redirect to `/`

#### Scenario: Authenticated user visits /auth/signup
- **WHEN** an authenticated user navigates to `/auth/signup`
- **THEN** the system SHALL redirect to `/`

### Requirement: Loading state during session check
The system SHALL display a loading indicator while the session state is being resolved, preventing a flash of the wrong page.

#### Scenario: Session is loading
- **WHEN** the user navigates to any route and the session state is not yet resolved
- **THEN** the system SHALL display a loading indicator instead of the target page content
