## ADDED Requirements

### Requirement: Vite + React scaffold

The `apps/web` package SHALL provide a Vite-powered React application with TypeScript. It imports from `@repo/ui` for components and `@repo/shared` for types and schemas.

#### Scenario: Dev server starts
- **WHEN** `bun run dev` is executed in `apps/web`
- **THEN** Vite starts a dev server with hot module replacement

#### Scenario: Production build
- **WHEN** `bun run build` is executed in `apps/web`
- **THEN** Vite produces an optimized static bundle in `dist/`

### Requirement: HEX/DDD directory structure with Inversify

The `apps/web/src` directory SHALL follow hexagonal architecture: `domain/`, `application/`, and `infrastructure/`. Inversify is configured as the dependency injection container. These are placeholder directories with README files explaining their purpose.

#### Scenario: Inversify container is configured
- **WHEN** the application bootstraps
- **THEN** an Inversify container is initialized and available for dependency resolution

#### Scenario: Layer boundaries are documented
- **WHEN** a developer opens `apps/web/src/domain/`
- **THEN** a README explains the domain layer's role in the frontend context
