## MODIFIED Requirements

### Requirement: Shared Zod schemas and types

The `packages/shared` package SHALL provide Zod validation schemas and inferred TypeScript types used by both `apps/api` and `apps/web`. This serves as the single source of truth for API contracts, domain primitives, and auth-related request validation.

#### Scenario: Schema used in API validation
- **WHEN** `apps/api` imports a Zod schema from `@repo/shared`
- **THEN** it uses the schema to validate incoming request bodies

#### Scenario: Schema used in frontend forms
- **WHEN** `apps/web` imports a Zod schema from `@repo/shared`
- **THEN** it uses the schema for client-side form validation

#### Scenario: Type inference
- **WHEN** a Zod schema is defined in `@repo/shared`
- **THEN** the inferred TypeScript type is exported alongside the schema

## ADDED Requirements

### Requirement: Signup request schema

The system SHALL provide a `SignupRequestSchema` Zod schema with fields: `name` (using `NameSchema`), `email` (using `EmailSchema`), `password` (using `PasswordSchema`), and `confirmPassword`. A refinement SHALL validate that `password` and `confirmPassword` match.

#### Scenario: Valid signup data passes validation
- **WHEN** valid signup data with matching passwords is parsed
- **THEN** the validation SHALL succeed

#### Scenario: Mismatched passwords fail validation
- **WHEN** signup data with non-matching password and confirmPassword is parsed
- **THEN** the validation SHALL fail with an error on the confirmPassword field

### Requirement: Forgot password request schema

The system SHALL provide a `ForgotPasswordRequestSchema` Zod schema with an `email` field using `EmailSchema`.

#### Scenario: Valid email passes validation
- **WHEN** a valid email is parsed against `ForgotPasswordRequestSchema`
- **THEN** the validation SHALL succeed

### Requirement: Reset password request schema

The system SHALL provide a `ResetPasswordRequestSchema` Zod schema with fields: `token` (non-empty string), `newPassword` (using `PasswordSchema`), and `confirmPassword`. A refinement SHALL validate that `newPassword` and `confirmPassword` match.

#### Scenario: Valid reset data passes validation
- **WHEN** valid reset data with matching passwords is parsed
- **THEN** the validation SHALL succeed

#### Scenario: Missing token fails validation
- **WHEN** reset data without a token is parsed
- **THEN** the validation SHALL fail

### Requirement: Pagination schemas

The system SHALL provide `PaginationParamsSchema` (input: `page` number, `limit` number with defaults) and a `createPaginatedResponseSchema` factory function that wraps any item schema into a paginated response with `items`, `total`, `page`, `limit`, and `hasMore` fields.

#### Scenario: Default pagination values
- **WHEN** `PaginationParamsSchema` is parsed with no input
- **THEN** the validation SHALL succeed with default values for `page` (1) and `limit` (20)

#### Scenario: Paginated response wraps items
- **WHEN** `createPaginatedResponseSchema` is called with a Zod schema
- **THEN** it SHALL return a schema with `items` (array of the wrapped type), `total`, `page`, `limit`, and `hasMore` fields
