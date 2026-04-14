## ADDED Requirements

### Requirement: Base email layout

The system SHALL provide a `createBaseLayout` function that wraps email content in a consistent HTML layout with app branding header, content area, and footer with support email.

#### Scenario: Layout uses app branding
- **WHEN** the base layout renders
- **THEN** the header SHALL display the app name from the `APP_NAME` environment variable (default: "SaaS Starter")

#### Scenario: Layout includes footer
- **WHEN** the base layout renders
- **THEN** the footer SHALL include the support email from `APP_SUPPORT_EMAIL` environment variable

#### Scenario: Layout produces valid HTML
- **WHEN** the base layout function is called with content
- **THEN** it SHALL return a complete HTML document with DOCTYPE, inline styles, and the content embedded

### Requirement: Welcome email template

The system SHALL provide a welcome email template function that accepts the user's name and returns subject, html, and text content.

#### Scenario: Welcome email content
- **WHEN** the welcome template is rendered with a user name
- **THEN** the email SHALL include a greeting with the user's name and a brief welcome message

#### Scenario: Welcome email plain text fallback
- **WHEN** the welcome template is rendered
- **THEN** the result SHALL include a `text` field with a plain-text version of the email content

### Requirement: Email verification template

The system SHALL provide an email verification template function that accepts the user's name and a verification URL, and returns subject, html, and text content.

#### Scenario: Verification email content
- **WHEN** the verification template is rendered
- **THEN** the email SHALL include a call-to-action button/link pointing to the verification URL

#### Scenario: Verification URL is clickable
- **WHEN** the verification email is rendered with a verification URL
- **THEN** the HTML SHALL contain an anchor tag with the verification URL as the href

### Requirement: Password reset email template

The system SHALL provide a password reset email template function that accepts the user's name and a reset URL, and returns subject, html, and text content.

#### Scenario: Reset email content
- **WHEN** the password reset template is rendered
- **THEN** the email SHALL include a call-to-action button/link pointing to the reset URL

#### Scenario: Reset email security notice
- **WHEN** the password reset email is rendered
- **THEN** the email SHALL include a notice that the user should ignore the email if they did not request a password reset

### Requirement: Template type safety

Each template function SHALL accept typed parameters and return `{ subject: string; html: string; text: string }`.

#### Scenario: Template return type
- **WHEN** any template function is called
- **THEN** it SHALL return an object with `subject`, `html`, and `text` string fields
