## ADDED Requirements

### Requirement: Turborepo workspace layout

The project SHALL use Turborepo with Bun workspaces. The monorepo has `apps/` for deployable applications, `packages/` for shared libraries, and root-level tooling configuration. Turborepo pipelines are configured for build, dev, lint, typecheck, and test tasks with correct dependency ordering.

#### Scenario: Fresh clone and install
- **WHEN** a developer clones the repo and runs `bun install`
- **THEN** all workspace dependencies are resolved and linked correctly

#### Scenario: Turbo build pipeline
- **WHEN** `bun run build` is executed at the root
- **THEN** Turborepo builds packages in dependency order (shared -> db -> ui -> apps)

#### Scenario: Turbo dev pipeline
- **WHEN** `bun run dev` is executed at the root
- **THEN** all apps and packages with dev scripts start concurrently

### Requirement: Workspace package structure

Each workspace package SHALL have its own `package.json`, `tsconfig.json`, and source directory. Internal packages use the `@repo/*` namespace (e.g., `@repo/ui`, `@repo/db`, `@repo/shared`).

#### Scenario: Internal package imports
- **WHEN** `apps/api` imports from `@repo/db`
- **THEN** the import resolves to the local workspace package without publishing
