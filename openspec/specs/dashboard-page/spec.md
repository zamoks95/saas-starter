## ADDED Requirements

### Requirement: Dashboard page at /
The system SHALL render the dashboard page at the `/` route. This is the main authenticated landing page.

#### Scenario: Authenticated user visits /
- **WHEN** an authenticated user navigates to `/`
- **THEN** the system SHALL display the dashboard page with a general summary view

### Requirement: Navigation bar on dashboard
The system SHALL display a shared navigation bar on the dashboard page containing links to the dashboard (`/`) and settings (`/settings`), and a logout action.

#### Scenario: Navigation bar is visible
- **WHEN** the user is on the dashboard page
- **THEN** the system SHALL render a navigation bar with links to Dashboard, Settings, and a logout button

#### Scenario: Navigate to settings
- **WHEN** the user clicks the Settings link in the navigation bar
- **THEN** the system SHALL navigate to `/settings`
