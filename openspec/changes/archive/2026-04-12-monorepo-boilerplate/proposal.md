## Why

This repo will serve as the foundational boilerplate for all future SaaS projects. Each new SaaS will be forked from this starter, so it needs to provide a complete, opinionated foundation: monorepo structure, backend, frontend, database, shared packages, tooling, and deployment scaffolding. Getting this right once means every future project starts with a solid base.

## What Changes

Everything -- this is a greenfield setup. Starting from an empty repo, we will scaffold:

- **Turborepo monorepo** with Bun as the package manager and runtime
- **`apps/api`** -- Bun + Elysia backend with HEX/DDD placeholder structure
- **`apps/web`** -- Bun + Vite + React frontend with HEX/DDD placeholder structure (Inversify for DI)
- **`packages/ui`** -- Shared component library with Tailwind + ShadCN + Storybook
- **`packages/db`** -- Drizzle ORM + PostgreSQL schema, migrations, and client
- **`packages/shared`** -- Zod schemas, shared types, domain primitives
- **Tooling** -- oxlint, Husky, Commitizen, shared TypeScript configs
- **Docker** -- `docker-compose.dev.yml` for local Postgres, Dockerfiles per app for Coolify deployment
- **Auth** -- Better Auth (with Drizzle adapter + Elysia plugin)
- **Testing** -- Bun test runner configured from day one across all packages

## Capabilities

### New Capabilities

- `monorepo-structure`: Turborepo workspace layout with apps/, packages/, and tooling/ directories
- `api-server`: Bun + Elysia backend with HEX/DDD layer placeholders and routing scaffold
- `web-app`: Vite + React frontend with HEX/DDD layer placeholders and Inversify DI setup
- `ui-library`: Shared component package with Tailwind + ShadCN configuration and Storybook
- `database`: Drizzle ORM package with PostgreSQL connection, schema structure, and migrations
- `shared-contracts`: Shared Zod schemas and types consumed by both frontend and backend
- `auth`: Better Auth integration with Drizzle adapter, Elysia plugin, and React hooks
- `dev-tooling`: oxlint, Husky pre-commit hooks, Commitizen, shared tsconfig bases
- `docker-setup`: docker-compose.dev.yml for local Postgres, per-app Dockerfiles for Coolify
- `testing`: Bun test runner configured across all apps and packages

### Modified Capabilities

<!-- None -- greenfield project -->

## Impact

- **Repo structure**: Complete restructure from empty repo to full monorepo
- **Dependencies**: Bun, Turborepo, Elysia, React, Vite, Drizzle, Zod, Better Auth, Tailwind, ShadCN, oxlint, Husky, Commitizen, Inversify, Storybook
- **Infrastructure**: Requires PostgreSQL (local via Docker, prod via Coolify)
- **CI/CD**: Husky hooks enforce linting and commit conventions on every commit
- **Deployment**: Each app gets its own Dockerfile; Coolify points to individual Dockerfiles in the monorepo
