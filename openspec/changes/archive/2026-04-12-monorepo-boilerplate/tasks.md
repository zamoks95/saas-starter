## 1. Monorepo Foundation

- [x] 1.1 Initialize Bun workspace: root `package.json` with `workspaces` field pointing to `apps/*` and `packages/*`
- [x] 1.2 Create `turbo.json` with tasks: build, dev, lint, typecheck, test (per design D1)
- [x] 1.3 Create root `tsconfig.json` base config (strict, ESNext, Bun types) and per-workspace tsconfigs that extend it
- [x] 1.4 Create `.gitignore` with node_modules, dist, .env, .turbo, coverage

## 2. Shared Packages (packages first -- apps depend on these)

- [x] 2.1 Scaffold `packages/shared`: package.json (`@repo/shared`), tsconfig, `src/index.ts`, placeholder `src/domain/` and `src/contracts/` dirs with README files
- [x] 2.2 Add Zod dependency to `packages/shared` and create an example schema (e.g., `src/contracts/health/health.ts` with a `HealthResponse` schema)
- [x] 2.3 Scaffold `packages/db`: package.json (`@repo/db`), tsconfig, Drizzle + postgres.js dependencies
- [x] 2.4 Create `packages/db/drizzle.config.ts`, `src/client.ts` (db connection), `src/schema/index.ts` (empty schema barrel), and `migrations/` dir
- [x] 2.5 Create `packages/db/.env.example` with `DATABASE_URL` placeholder
- [x] 2.6 Scaffold `packages/ui`: package.json (`@repo/ui`), tsconfig, Tailwind CSS v4 + ShadCN init
- [x] 2.7 Configure Storybook inside `packages/ui` with Vite builder: `.storybook/main.ts`, `.storybook/preview.ts`, add storybook scripts to package.json

## 3. Backend App

- [x] 3.1 Scaffold `apps/api`: package.json (`@repo/api`), tsconfig, Elysia + cors dependencies, `src/index.ts` entry point with health check route
- [x] 3.2 Create HEX/DDD placeholder directories: `src/domain/`, `src/application/`, `src/infrastructure/` each with a README explaining the layer's purpose
- [x] 3.3 Create `src/infrastructure/http/routes/` directory with health route extracted as an Elysia plugin
- [x] 3.4 Create `src/infrastructure/plugins/` directory with a placeholder DI plugin using `.decorate()`
- [x] 3.5 Add `@repo/db` and `@repo/shared` as workspace dependencies, verify imports work

## 4. Frontend App

- [x] 4.1 Scaffold `apps/web` using `bun create vite` with React + TypeScript template, update package.json name to `@repo/web`
- [x] 4.2 Create HEX/DDD placeholder directories: `src/domain/`, `src/application/`, `src/infrastructure/` each with a README explaining the layer's purpose in frontend context
- [x] 4.3 Add Inversify dependency, create `src/infrastructure/di/container.ts` and `src/infrastructure/di/types.ts` with empty container setup
- [x] 4.4 Add `@repo/ui` and `@repo/shared` as workspace dependencies, verify imports work
- [x] 4.5 Configure Tailwind in `apps/web` extending the config from `@repo/ui`

## 5. Auth Integration

- [x] 5.1 Add Better Auth dependencies to `packages/db` and `apps/api` (better-auth, @better-auth/drizzle-adapter)
- [x] 5.2 Create `apps/api/src/infrastructure/auth/auth.ts` with Better Auth config using Drizzle adapter
- [x] 5.3 Create `apps/api/src/infrastructure/http/routes/auth.routes.ts` with catch-all Elysia handler for `/api/auth/*`
- [x] 5.4 Add Better Auth React client to `apps/web`: create `src/infrastructure/auth/client.ts` with `createAuthClient`, export `signIn`, `signUp`, `signOut`, `useSession`
- [x] 5.5 Generate Better Auth Drizzle schema (auth tables) and add to `packages/db/src/schema/`

## 6. Dev Tooling

- [x] 6.1 Create root `oxlintrc.json` with TypeScript and React plugins, add `lint` scripts to root and each workspace package.json
- [x] 6.2 Install and configure Husky: `bun add -D husky`, `bunx husky init`, create `.husky/pre-commit` hook running `bun run lint && bun run typecheck`
- [x] 6.3 Install and configure Commitizen + commitlint: `bun add -D @commitlint/cli @commitlint/config-conventional commitizen cz-conventional-changelog`, create `.commitlintrc`, `.czrc`, `.husky/commit-msg` hook, add `commit` script to root package.json

## 7. Testing Setup

- [x] 7.1 Add `test` scripts to each workspace package.json using `bun test`
- [x] 7.2 Create a sample test in `packages/shared` (e.g., test the example Zod schema)
- [x] 7.3 Create a sample test in `apps/api` (e.g., test health endpoint using Elysia's test utilities)

## 8. Docker

- [x] 8.1 Create `docker/docker-compose.dev.yml` with PostgreSQL 16 service, named volume, `.env` reference for credentials
- [x] 8.2 Create `docker/.env.example` with `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT`
- [x] 8.3 Create `apps/api/Dockerfile` with multi-stage build: prune stage (turbo prune), install stage, build stage, runtime stage
- [x] 8.4 Create `apps/web/Dockerfile` with multi-stage build: prune, install, Vite build, serve with nginx

## 9. Final Verification

- [x] 9.1 Run `bun install` from root -- all workspace deps resolve
- [x] 9.2 Run `docker compose -f docker/docker-compose.dev.yml up -d` -- Postgres starts
- [x] 9.3 Run `bun run dev` -- both apps start (api responds on /health, web shows React page)
- [x] 9.4 Run `bun run lint` -- oxlint passes across all workspaces
- [x] 9.5 Run `bun run test` -- all sample tests pass
- [x] 9.6 Run `bun run build` -- Turbo builds in correct dependency order
