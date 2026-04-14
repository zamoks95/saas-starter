## MODIFIED Requirements

### Requirement: Signup page at /auth/signup
The system SHALL render a signup page at `/auth/signup`. The page MUST use ShadCN form components with Zod validation and provide fields for creating a new account including password confirmation.

#### Scenario: User visits signup page
- **WHEN** an unauthenticated user navigates to `/auth/signup`
- **THEN** the system SHALL display the signup form with name, email, password, and confirm password fields using ShadCN Input and Form components

#### Scenario: Successful signup
- **WHEN** the user submits valid registration data with matching passwords
- **THEN** the system SHALL call `signUp` and redirect to `/` (dashboard)

#### Scenario: Failed signup
- **WHEN** the user submits invalid or duplicate data
- **THEN** the system SHALL display an error message and remain on the signup page

#### Scenario: Password confirmation mismatch on signup
- **WHEN** the user enters a password and a non-matching confirm password
- **THEN** the system SHALL display a client-side validation error before submitting

#### Scenario: Client-side validation on signup
- **WHEN** the user submits the signup form
- **THEN** the system SHALL validate fields against `SignupRequestSchema` from `@repo/shared` and display inline errors for invalid fields

#### Scenario: Loading state during signup
- **WHEN** the signup form is being submitted
- **THEN** the submit button SHALL show a loading state and be disabled

### Requirement: Recover password page at /auth/recover-password
The system SHALL render a password recovery page at `/auth/recover-password`. The page MUST call Better Auth's `forgetPassword` API to trigger the password reset email flow.

#### Scenario: User requests password recovery
- **WHEN** the user enters their email and submits the recovery form
- **THEN** the system SHALL call Better Auth's `forgetPassword` method and display a confirmation message regardless of whether the email exists

#### Scenario: Loading state during recovery
- **WHEN** the recovery form is being submitted
- **THEN** the submit button SHALL show a loading state and be disabled

#### Scenario: Recovery form uses ShadCN components
- **WHEN** the recover-password page renders
- **THEN** the form SHALL use ShadCN Input, Button, Label, and Card components

### Requirement: Login page at /auth
The system SHALL render a login page at the `/auth` route. The page MUST use ShadCN form components for consistent styling with other auth pages.

#### Scenario: User visits /auth unauthenticated
- **WHEN** an unauthenticated user navigates to `/auth`
- **THEN** the system SHALL display the login form with email and password fields using ShadCN components

#### Scenario: Successful login
- **WHEN** the user submits valid credentials
- **THEN** the system SHALL call `signIn` and redirect to `/` (dashboard)

#### Scenario: Failed login
- **WHEN** the user submits invalid credentials
- **THEN** the system SHALL display an error message and remain on the login page

### Requirement: Navigation between auth pages
The system SHALL provide links to navigate between login, signup, recover-password, and reset-password pages.

#### Scenario: Login page links
- **WHEN** the user is on the login page
- **THEN** the system SHALL display links to the signup page and the recover-password page

#### Scenario: Signup page links
- **WHEN** the user is on the signup page
- **THEN** the system SHALL display a link to the login page

#### Scenario: Recover password page links
- **WHEN** the user is on the recover-password page
- **THEN** the system SHALL display a link back to the login page

### Requirement: Logout action
The system SHALL provide a logout mechanism that calls `signOut` from the auth client and redirects to `/auth`.

#### Scenario: User logs out
- **WHEN** the user triggers the logout action
- **THEN** the system SHALL call `signOut`, clear the session, and redirect to `/auth`
