## ADDED Requirements

### Requirement: Shared Zod schemas and types

The `packages/shared` package SHALL provide Zod validation schemas and inferred TypeScript types used by both `apps/api` and `apps/web`. This serves as the single source of truth for API contracts and domain primitives.

#### Scenario: Schema used in API validation
- **WHEN** `apps/api` imports a Zod schema from `@repo/shared`
- **THEN** it uses the schema to validate incoming request bodies

#### Scenario: Schema used in frontend forms
- **WHEN** `apps/web` imports a Zod schema from `@repo/shared`
- **THEN** it uses the schema for client-side form validation

#### Scenario: Type inference
- **WHEN** a Zod schema is defined in `@repo/shared`
- **THEN** the inferred TypeScript type is exported alongside the schema
