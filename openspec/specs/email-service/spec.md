## ADDED Requirements

### Requirement: Email port interface
The system SHALL define an `EmailPort` interface in the domain layer with a `send` method that accepts `to` (string), `from` (string), `subject` (string), `html` (string), and optionally `text` (string). The method SHALL return a promise resolving to `{ id: string }` on success.

#### Scenario: Port is framework-agnostic
- **WHEN** the `EmailPort` interface is inspected
- **THEN** it SHALL have zero imports from Resend, Elysia, or any infrastructure framework

### Requirement: Resend adapter implements EmailPort
The system SHALL provide a `ResendEmailAdapter` class in the infrastructure layer that implements `EmailPort` using the Resend SDK. It SHALL read the API key from `process.env.RESEND_API_KEY`.

#### Scenario: Sending an email successfully
- **WHEN** `send` is called with valid `to`, `from`, `subject`, and `html`
- **THEN** the adapter SHALL call the Resend API and return `{ id: string }` with the Resend message ID

#### Scenario: Resend API returns an error
- **WHEN** `send` is called and the Resend API returns an error
- **THEN** the adapter SHALL throw an error with the Resend error message

### Requirement: Email service registered in DI
The system SHALL register the `ResendEmailAdapter` instance as `emailService` in the Elysia DI plugin using `.decorate()`, making it available to all routes and use cases via the Elysia context.

#### Scenario: Route accesses email service
- **WHEN** a route handler destructures `emailService` from the Elysia context
- **THEN** it SHALL receive an instance implementing `EmailPort`

### Requirement: RESEND_API_KEY in environment configuration
The system SHALL add `RESEND_API_KEY` to `apps/api/.env.example` with a placeholder value.

#### Scenario: Developer clones the project
- **WHEN** a developer copies `.env.example` to `.env`
- **THEN** they SHALL see `RESEND_API_KEY` listed with a placeholder indicating it must be set

### Requirement: README documents API key setup
The system SHALL update the project `README.md` to include a step instructing developers to set `RESEND_API_KEY` before running the project.

#### Scenario: Developer reads setup instructions
- **WHEN** a developer reads the README setup section
- **THEN** they SHALL find instructions to obtain and configure a Resend API key before starting the project

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

### Requirement: Email environment configuration

The system SHALL support `APP_NAME` and `APP_SUPPORT_EMAIL` environment variables for email template branding.

#### Scenario: Default branding values
- **WHEN** `APP_NAME` is not set
- **THEN** the email templates SHALL use "SaaS Starter" as the default app name

#### Scenario: Custom branding
- **WHEN** `APP_NAME` is set to a custom value
- **THEN** the email templates SHALL use that value in the email header and subject lines
