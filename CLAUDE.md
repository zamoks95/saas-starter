# SaaS Starter - Project Conventions

## Overview

This is a foundational SaaS boilerplate monorepo. Each new SaaS project is forked from this starter. Every decision here propagates to all future projects.

## Tech Stack

- **Runtime & Package Manager**: Bun
- **Monorepo**: Turborepo
- **Backend**: Elysia (Bun-native HTTP framework)
- **Frontend**: Vite + React
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: Better Auth (Drizzle adapter + Elysia plugin + React client)
- **UI**: Tailwind CSS + ShadCN (shared via `packages/ui`)
- **Component Dev**: Storybook (inside `packages/ui`)
- **Validation**: Zod (shared schemas in `packages/shared`)
- **Linting**: oxlint (no ESLint)
- **Testing**: Bun test runner
- **Commits**: Husky + Commitizen (conventional commits)
- **Deployment**: Dockerfiles per app, deployed via Coolify

## Monorepo Layout

```
apps/
  api/          → Bun + Elysia backend
  web/          → Vite + React frontend
packages/
  ui/           → Tailwind + ShadCN components + Storybook
  db/           → Drizzle schema, migrations, client
  shared/       → Zod schemas, shared types, domain primitives
```

Internal packages use the `@repo/*` namespace: `@repo/ui`, `@repo/db`, `@repo/shared`.

## Architecture: HEX/DDD

Both `apps/api` and `apps/web` follow hexagonal architecture with DDD-inspired layers.

### Layer Structure (both apps)

```
src/
  domain/           → Entities, value objects, repository ports (interfaces)
  application/      → Use cases, orchestration logic
  infrastructure/   → Framework adapters, HTTP, persistence, external services
```

**Rules:**
- `domain/` has ZERO framework imports. Pure TypeScript only.
- `application/` depends on `domain/` only. Uses ports (interfaces) for external concerns.
- `infrastructure/` implements ports and wires everything together.
- Dependencies flow inward: infrastructure → application → domain.

### Backend DI (Elysia-native)

Elysia's plugin system IS the dependency injection mechanism. Do NOT use Inversify on the backend.

- `.decorate()` → register singletons (repositories, services)
- `.derive()` → per-request context (current user, tenant)
- `.guard()` → middleware/auth checks
- `.use(plugin)` → compose modules

```typescript
// Infrastructure wiring example
const diPlugin = new Elysia({ name: 'di' })
  .decorate('userRepo', new DrizzleUserRepo(db))

// Route uses it
new Elysia()
  .use(diPlugin)
  .post('/users', ({ userRepo, body }) => ...)
```

### Frontend DI (Inversify)

The React frontend uses Inversify for dependency injection.

- Container is configured in `infrastructure/di/container.ts`
- Injection tokens in `infrastructure/di/types.ts`
- Adapters (HTTP clients) implement domain repository interfaces
- React hooks in `application/hooks/` bridge DI → React

## Shared Contracts (`packages/shared`)

Single source of truth for API contracts and domain primitives.

```
packages/shared/src/
  domain/          → Shared value objects, domain errors
  contracts/       → Zod request/response schemas per resource
```

- Every Zod schema exports both the schema and the inferred TypeScript type.
- Backend uses schemas for request validation.
- Frontend uses schemas for form validation.
- Name pattern: `CreateUserRequest`, `CreateUserResponse`, `GetUserParams`.

## Key Commands

```bash
bun install          # Install all workspace dependencies
bun run dev          # Start all apps + packages in dev mode
bun run build        # Build all (dependency-ordered via Turbo)
bun run lint         # oxlint across all workspaces
bun run test         # Bun test runner across all workspaces
bun run commit       # Commitizen interactive commit
bun run db:migrate   # Run Drizzle migrations
bun run storybook    # Start Storybook (from packages/ui)
```

## Naming Conventions

- **Files**: kebab-case (`create-user.ts`, `user.repository.ts`)
- **Classes/Interfaces**: PascalCase (`UserRepository`, `CreateUserUseCase`)
- **Zod schemas**: PascalCase with suffix (`CreateUserRequest`, `UserResponse`)
- **Elysia plugins**: camelCase (`authPlugin`, `diPlugin`)
- **Test files**: co-located (`entity.test.ts` next to `entity.ts`)
- **Packages**: `@repo/<name>`

## Testing

- Use Bun's built-in test runner (`bun test`)
- Test files co-located with source: `foo.test.ts` next to `foo.ts`
- Domain and application layers should have unit tests
- Infrastructure adapters tested via integration tests

## Commit Convention

Conventional commits enforced by Husky + Commitizen:
- `feat:` new feature
- `fix:` bug fix
- `refactor:` code restructuring
- `docs:` documentation
- `test:` adding/updating tests
- `chore:` tooling, deps, config

## Docker

- `docker/docker-compose.dev.yml` → local PostgreSQL only
- `apps/api/Dockerfile` → production API image (for Coolify)
- `apps/web/Dockerfile` → production web image (for Coolify)
- Dockerfiles build from repo root (monorepo needs full context)
- Use `turbo prune --scope=<app>` for lean images
