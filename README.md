# SaaS Starter

Opinionated monorepo boilerplate for building SaaS applications. Fork this repo to start a new project.

## Tech Stack

- **Runtime**: Bun
- **Monorepo**: Turborepo
- **Backend**: Elysia
- **Frontend**: Vite + React
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: Better Auth
- **UI**: Tailwind CSS + ShadCN + Storybook
- **Validation**: Zod (shared schemas)
- **Linting**: oxlint
- **Testing**: Bun test runner
- **Commits**: Husky + Commitizen

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.x)
- [Docker](https://docker.com) (for local PostgreSQL)

### Setup

```bash
# Install dependencies
bun install

# Start the local database
cp docker/.env.example docker/.env
docker compose -f docker/docker-compose.dev.yml up -d

# Configure environment variables
cp apps/api/.env.example apps/api/.env
cp packages/db/.env.example packages/db/.env
# Set your Resend API key in apps/api/.env
# Get one at https://resend.com/api-keys

# Run database migrations
bun run db:migrate

# Start all apps in dev mode
bun run dev
```

The API runs at `http://localhost:3000` and the web app at `http://localhost:5173`.

## Project Structure

```
apps/
  api/              Bun + Elysia backend
  web/              Vite + React frontend
packages/
  db/               Drizzle ORM schema, migrations, client
  shared/           Zod schemas, shared types, domain primitives
  ui/               Tailwind + ShadCN components + Storybook
docker/
  docker-compose.dev.yml   Local PostgreSQL
```

## Commands

| Command | Description |
|---|---|
| `bun run dev` | Start all apps in dev mode |
| `bun run build` | Build all packages and apps |
| `bun run lint` | Lint all workspaces with oxlint |
| `bun run typecheck` | Type check all workspaces |
| `bun run test` | Run tests across all workspaces |
| `bun run commit` | Interactive conventional commit |
| `bun run db:migrate` | Run Drizzle database migrations |
| `bun run storybook` | Start Storybook (packages/ui) |

## Architecture

Both `apps/api` and `apps/web` follow hexagonal architecture (HEX) with DDD-inspired layers:

```
src/
  domain/           Pure business logic (entities, value objects, repository ports)
  application/      Use cases and orchestration
  infrastructure/   Framework adapters (HTTP routes, DB repos, auth, DI wiring)
```

Dependencies flow inward: `infrastructure` -> `application` -> `domain`.

- **Backend DI**: Elysia-native (`.decorate()`, `.derive()`, `.guard()`, plugins)
- **Frontend DI**: Inversify

Shared Zod schemas in `packages/shared` serve as the single source of truth for API contracts, used by both frontend (form validation) and backend (request validation).

## Forking for a New Project

1. Fork this repo
2. Update `package.json` names if desired (internal `@repo/*` namespace works as-is)
3. Update `docker/.env` and `apps/api/.env` with your database credentials
4. Start building your domain in the `domain/` and `application/` layers

## License

MIT
