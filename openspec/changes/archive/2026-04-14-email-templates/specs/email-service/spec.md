## MODIFIED Requirements

### Requirement: Better Auth email integration

The system SHALL configure Better Auth's email hooks to use the email templates and the Resend adapter for sending verification and password reset emails.

#### Scenario: Email verification triggers template
- **WHEN** Better Auth triggers an email verification event
- **THEN** the system SHALL render the email verification template with the user's name and verification URL, and send it via the `EmailPort`

#### Scenario: Password reset triggers template
- **WHEN** Better Auth triggers a password reset event
- **THEN** the system SHALL render the password reset template with the user's name and reset URL, and send it via the `EmailPort`

#### Scenario: Welcome email on signup
- **WHEN** a new user signs up successfully
- **THEN** the system SHALL send the welcome email template to the user's email address via the `EmailPort`

### Requirement: Email service registered in DI
The system SHALL register the `ResendEmailAdapter` instance as `emailService` in the Elysia DI plugin using `.decorate()`, making it available to all routes and use cases via the Elysia context.

#### Scenario: Route accesses email service
- **WHEN** a route handler destructures `emailService` from the Elysia context
- **THEN** it SHALL receive an instance implementing `EmailPort`

### Requirement: Email environment configuration

The system SHALL support `APP_NAME` and `APP_SUPPORT_EMAIL` environment variables for email template branding.

#### Scenario: Default branding values
- **WHEN** `APP_NAME` is not set
- **THEN** the email templates SHALL use "SaaS Starter" as the default app name

#### Scenario: Custom branding
- **WHEN** `APP_NAME` is set to a custom value
- **THEN** the email templates SHALL use that value in the email header and subject lines
