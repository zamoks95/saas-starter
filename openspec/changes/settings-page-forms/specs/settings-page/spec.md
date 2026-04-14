## MODIFIED Requirements

### Requirement: Settings page at /settings
The system SHALL render the settings page at `/settings`. The page MUST provide functional forms for profile management and password changes for the authenticated user.

#### Scenario: Authenticated user visits /settings
- **WHEN** an authenticated user navigates to `/settings`
- **THEN** the system SHALL display the settings page with a profile form and a password change form

#### Scenario: Profile form displays current values
- **WHEN** the settings page loads
- **THEN** the profile form SHALL be pre-populated with the user's current name and image URL from the session

#### Scenario: User updates profile successfully
- **WHEN** the user modifies their name or image URL and submits the profile form
- **THEN** the system SHALL call `PATCH /me` with the updated fields and display a success toast notification

#### Scenario: Profile update validation fails
- **WHEN** the user submits the profile form with invalid data
- **THEN** the system SHALL display inline validation errors using the `UpdateProfileRequestSchema` from `@repo/shared`

#### Scenario: Profile update API error
- **WHEN** the profile update API call fails
- **THEN** the system SHALL display an error toast notification with the error message

#### Scenario: User changes password successfully
- **WHEN** the user fills in current password, new password, and confirm password, and submits the security form
- **THEN** the system SHALL call `PATCH /me/password` and display a success toast notification and clear the form

#### Scenario: Password confirmation mismatch
- **WHEN** the user enters a new password and a non-matching confirm password
- **THEN** the system SHALL display a validation error indicating passwords do not match

#### Scenario: Password change API error
- **WHEN** the current password is incorrect
- **THEN** the system SHALL display an error toast notification indicating the current password is wrong

#### Scenario: Loading states during submission
- **WHEN** either form is being submitted
- **THEN** the submit button SHALL show a loading state and be disabled until the request completes

### Requirement: Navigation bar on settings page
The system SHALL display the same shared navigation bar as the dashboard, maintaining consistent navigation across authenticated routes.

#### Scenario: Navigation bar is visible on settings
- **WHEN** the user is on the settings page
- **THEN** the system SHALL render the navigation bar with links to Dashboard, Settings, and a logout button

#### Scenario: Navigate back to dashboard
- **WHEN** the user clicks the Dashboard link in the navigation bar
- **THEN** the system SHALL navigate to `/`
