## ADDED Requirements

### Requirement: Structured error responses

All API error responses SHALL use a consistent `ErrorResponse` format with `code` (machine-readable string), `message` (human-readable description), and optional `details` (validation errors or additional context).

#### Scenario: Domain error maps to HTTP status
- **WHEN** a use case throws a `NotFoundError`
- **THEN** the server responds with 404 and `{ code: "NOT_FOUND", message: "..." }`

#### Scenario: Validation error includes details
- **WHEN** request body validation fails
- **THEN** the server responds with 400 and `{ code: "VALIDATION_ERROR", message: "...", details: [...] }`

#### Scenario: Unhandled error returns 500
- **WHEN** an unexpected error occurs in a route handler
- **THEN** the server responds with 500 and `{ code: "INTERNAL_ERROR", message: "An unexpected error occurred" }` without leaking stack traces

### Requirement: Domain error classes

The domain layer SHALL define error classes that use cases throw. Infrastructure maps these to HTTP responses.

#### Scenario: NotFoundError thrown
- **WHEN** a use case cannot find the requested resource
- **THEN** it throws a `NotFoundError` with a descriptive message

#### Scenario: ValidationError thrown
- **WHEN** a use case receives invalid domain input
- **THEN** it throws a `ValidationError` with details about what is invalid
