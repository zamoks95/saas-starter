## ADDED Requirements

### Requirement: Login page at /auth
The system SHALL render a login page at the `/auth` route (or `/auth/login`). The page MUST provide email and password fields and a submit action that calls `signIn` from the auth client.

#### Scenario: User visits /auth unauthenticated
- **WHEN** an unauthenticated user navigates to `/auth`
- **THEN** the system SHALL display the login form with email and password fields

#### Scenario: Successful login
- **WHEN** the user submits valid credentials
- **THEN** the system SHALL call `signIn` and redirect to `/` (dashboard)

#### Scenario: Failed login
- **WHEN** the user submits invalid credentials
- **THEN** the system SHALL display an error message and remain on the login page

### Requirement: Signup page at /auth/signup
The system SHALL render a signup page at `/auth/signup`. The page MUST provide fields for creating a new account and call `signUp` from the auth client.

#### Scenario: User visits signup page
- **WHEN** an unauthenticated user navigates to `/auth/signup`
- **THEN** the system SHALL display the signup form

#### Scenario: Successful signup
- **WHEN** the user submits valid registration data
- **THEN** the system SHALL call `signUp` and redirect to `/` (dashboard)

#### Scenario: Failed signup
- **WHEN** the user submits invalid or duplicate data
- **THEN** the system SHALL display an error message and remain on the signup page

### Requirement: Logout action
The system SHALL provide a logout mechanism that calls `signOut` from the auth client and redirects to `/auth`.

#### Scenario: User logs out
- **WHEN** the user triggers the logout action
- **THEN** the system SHALL call `signOut`, clear the session, and redirect to `/auth`

### Requirement: Recover password page at /auth/recover-password
The system SHALL render a password recovery page at `/auth/recover-password`. The page MUST provide an email field to request a password reset.

#### Scenario: User requests password recovery
- **WHEN** the user enters their email and submits the recovery form
- **THEN** the system SHALL trigger the password recovery flow and display a confirmation message

### Requirement: Navigation between auth pages
The system SHALL provide links to navigate between login, signup, and recover-password pages.

#### Scenario: Login page links
- **WHEN** the user is on the login page
- **THEN** the system SHALL display links to the signup page and the recover-password page

#### Scenario: Signup page links
- **WHEN** the user is on the signup page
- **THEN** the system SHALL display a link to the login page
