## ADDED Requirements

### Requirement: Settings page at /settings
The system SHALL render the settings page at `/settings`. The page MUST provide account and profile settings for the authenticated user.

#### Scenario: Authenticated user visits /settings
- **WHEN** an authenticated user navigates to `/settings`
- **THEN** the system SHALL display the settings page with account/profile configuration options

### Requirement: Navigation bar on settings page
The system SHALL display the same shared navigation bar as the dashboard, maintaining consistent navigation across authenticated routes.

#### Scenario: Navigation bar is visible on settings
- **WHEN** the user is on the settings page
- **THEN** the system SHALL render the navigation bar with links to Dashboard, Settings, and a logout button

#### Scenario: Navigate back to dashboard
- **WHEN** the user clicks the Dashboard link in the navigation bar
- **THEN** the system SHALL navigate to `/`
