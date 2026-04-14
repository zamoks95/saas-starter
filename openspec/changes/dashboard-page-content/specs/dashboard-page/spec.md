## MODIFIED Requirements

### Requirement: Dashboard page at /
The system SHALL render the dashboard page at the `/` route with a structured card-based layout displaying user information, account summary, and quick-start guidance.

#### Scenario: Authenticated user visits /
- **WHEN** an authenticated user navigates to `/`
- **THEN** the system SHALL display the dashboard with welcome card, account summary card, and quick-start guide card

#### Scenario: Welcome card shows user info
- **WHEN** the dashboard loads
- **THEN** the welcome card SHALL display a greeting with the user's name and quick action buttons for navigating to settings and logging out

#### Scenario: Account summary card shows account details
- **WHEN** the dashboard loads
- **THEN** the account summary card SHALL display the user's email, account creation date, and email verification status as a Badge

#### Scenario: Quick-start guide card
- **WHEN** the dashboard loads
- **THEN** the quick-start guide card SHALL display a checklist of starter setup steps relevant to developers forking the project

#### Scenario: Responsive layout
- **WHEN** the user views the dashboard on a desktop viewport
- **THEN** the cards SHALL display in a two-column grid layout

#### Scenario: Mobile layout
- **WHEN** the user views the dashboard on a mobile viewport
- **THEN** the cards SHALL stack in a single-column layout

### Requirement: Navigation bar on dashboard
The system SHALL display a shared navigation bar on the dashboard page containing links to the dashboard (`/`) and settings (`/settings`), and a logout action.

#### Scenario: Navigation bar is visible
- **WHEN** the user is on the dashboard page
- **THEN** the system SHALL render a navigation bar with links to Dashboard, Settings, and a logout button

#### Scenario: Navigate to settings
- **WHEN** the user clicks the Settings link in the navigation bar
- **THEN** the system SHALL navigate to `/settings`
