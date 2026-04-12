## ADDED Requirements

### Requirement: Elysia server scaffold

The `apps/api` package SHALL provide a Bun + Elysia HTTP server with a health check endpoint. The server is configured with CORS and structured to support modular route registration.

#### Scenario: Server starts
- **WHEN** `bun run dev` is executed in `apps/api`
- **THEN** the Elysia server starts and responds to requests on a configurable port

#### Scenario: Health check
- **WHEN** a GET request is made to `/health`
- **THEN** the server responds with 200 and a JSON body indicating healthy status

### Requirement: HEX/DDD directory structure

The `apps/api/src` directory SHALL follow hexagonal architecture with DDD-inspired layer separation: `domain/`, `application/`, and `infrastructure/`. These are placeholder directories with README files explaining their purpose.

#### Scenario: Layer boundaries are documented
- **WHEN** a developer opens `apps/api/src/domain/`
- **THEN** a README explains the domain layer's role (entities, value objects, repository ports)

#### Scenario: Infrastructure layer contains Elysia routes
- **WHEN** the developer looks at `apps/api/src/infrastructure/`
- **THEN** the Elysia HTTP routes and adapters live here, separate from domain logic
