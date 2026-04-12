## ADDED Requirements

### Requirement: Drizzle ORM package

The `packages/db` package SHALL provide the Drizzle ORM client, schema definitions, and migration infrastructure for PostgreSQL. It exports a configured database client and schema types.

#### Scenario: Database client connects
- **WHEN** `apps/api` imports the db client from `@repo/db`
- **THEN** it connects to PostgreSQL using environment-configured connection string

#### Scenario: Schema is defined in Drizzle
- **WHEN** a developer opens `packages/db/src/schema/`
- **THEN** Drizzle table definitions are present and export inferred TypeScript types

### Requirement: Migration support

Drizzle Kit SHALL be configured for generating and running migrations against PostgreSQL.

#### Scenario: Generate migration
- **WHEN** a developer modifies a schema file and runs the migrate command
- **THEN** Drizzle Kit generates a SQL migration file in `packages/db/migrations/`

#### Scenario: Run migrations
- **WHEN** `bun run db:migrate` is executed
- **THEN** pending migrations are applied to the connected PostgreSQL database
