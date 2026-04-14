## ADDED Requirements

### Requirement: Email domain primitive

The system SHALL provide an `EmailSchema` Zod schema that validates email format and exports the inferred `Email` TypeScript type.

#### Scenario: Valid email passes validation
- **WHEN** a valid email string is parsed against `EmailSchema`
- **THEN** the validation SHALL succeed

#### Scenario: Invalid email fails validation
- **WHEN** an invalid email string is parsed against `EmailSchema`
- **THEN** the validation SHALL fail with a descriptive error message

### Requirement: Password domain primitive

The system SHALL provide a `PasswordSchema` Zod schema that enforces a minimum length of 8 characters and exports the inferred `Password` TypeScript type.

#### Scenario: Valid password passes validation
- **WHEN** a string of 8 or more characters is parsed against `PasswordSchema`
- **THEN** the validation SHALL succeed

#### Scenario: Short password fails validation
- **WHEN** a string of fewer than 8 characters is parsed against `PasswordSchema`
- **THEN** the validation SHALL fail with a message indicating the minimum length requirement

### Requirement: Name domain primitive

The system SHALL provide a `NameSchema` Zod schema that enforces a non-empty string with a maximum length and exports the inferred `Name` TypeScript type.

#### Scenario: Valid name passes validation
- **WHEN** a non-empty string within the length limit is parsed against `NameSchema`
- **THEN** the validation SHALL succeed

#### Scenario: Empty name fails validation
- **WHEN** an empty string is parsed against `NameSchema`
- **THEN** the validation SHALL fail with a descriptive error message
