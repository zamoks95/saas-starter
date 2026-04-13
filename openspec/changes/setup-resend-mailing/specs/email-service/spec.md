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
