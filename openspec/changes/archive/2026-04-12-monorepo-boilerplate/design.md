## Context

Starting from an empty repo (just a LICENSE and initial commit). This change scaffolds the entire SaaS starter monorepo that will be forked for every future SaaS project. Every decision here becomes a default for all downstream projects.

**Current state:** Empty repo, no code, no dependencies.

**Constraints:**
- Bun as sole runtime and package manager (no Node.js fallbacks)
- Must work with Coolify for production deployment (Docker-based)
- Must support forking workflow (clean separation, no project-specific code)
- oxlint only (no ESLint) -- accepts gaps in exchange for speed

## Goals / Non-Goals

**Goals:**
- Scaffold a fully working Turborepo monorepo with all apps and packages
- Establish HEX/DDD directory conventions with placeholder READMEs
- Wire up all tooling (lint, test, commits, Docker) so it works from day one
- Set up Better Auth with Drizzle + Elysia + React integration
- Ensure `bun install && bun run dev` works end-to-end after scaffolding

**Non-Goals:**
- Building actual features (no real entities, no real pages beyond health check / hello world)
- Defining the full HEX/DDD layer details (deferred -- placeholders only)
- ShadCN component library (setup only, no components beyond what ShadCN init provides)
- CI/CD pipeline (Coolify deploys from Dockerfiles, no GitHub Actions yet)
- Environment variable management beyond basic `.env.example` files

## Decisions

### D1: Monorepo structure and Turborepo config

**Choice:** Standard Turborepo layout with `apps/` and `packages/` directories. Bun workspaces via root `package.json`.

**Alternatives considered:**
- Nx: More features but heavier, more opinionated. Turborepo is simpler and sufficient.
- pnpm workspaces without Turbo: Loses task caching and dependency-aware pipelines.

**turbo.json tasks:**
- `build`: depends on `^build` (packages first), outputs `dist/**`
- `dev`: persistent, no cache
- `lint`: no dependencies (can run in parallel)
- `typecheck`: depends on `^build` (needs built packages for type resolution)
- `test`: no dependencies (can run in parallel)

### D2: Package namespace `@repo/*`

**Choice:** All internal packages use `@repo/` prefix: `@repo/ui`, `@repo/db`, `@repo/shared`.

**Rationale:** Convention from Turborepo starters. Clear distinction from npm packages. When forking, the namespace stays the same (it's internal, never published).

### D3: Backend DI via Elysia-native patterns (no Inversify)

**Choice:** Use Elysia's `.decorate()`, `.derive()`, `.guard()`, and plugin composition for dependency injection on the backend.

**Alternatives considered:**
- Inversify on backend: Adds unnecessary abstraction. Elysia's plugin system already provides DI semantics with full type safety.
- tsyringe: Similar concern -- extra layer when Elysia handles it natively.

**Pattern:**
```typescript
// infrastructure/plugins/di.plugin.ts
export const diPlugin = new Elysia({ name: 'di' })
  .decorate('userRepo', new DrizzleUserRepo(db))

// infrastructure/http/routes/user.routes.ts
export const userRoutes = new Elysia()
  .use(diPlugin)
  .post('/users', ({ userRepo, body }) => ...)
```

### D4: Frontend DI via Inversify

**Choice:** Inversify for frontend DI. Container configured in `infrastructure/di/`.

**Rationale:** React doesn't have a native DI mechanism beyond context. Inversify provides proper IoC with constructor injection, making the hexagonal architecture enforceable. Decorators require `experimentalDecorators` in tsconfig.

### D5: Drizzle ORM with drizzle-kit for migrations

**Choice:** Drizzle ORM with `drizzle-kit generate` for migration generation and a custom migrate script.

**Config:** `packages/db/drizzle.config.ts` with `dialect: "postgresql"`, schema path pointing to `src/schema/index.ts`, migrations output to `migrations/`.

**Connection:** `postgres` driver from `drizzle-orm/postgres-js` with `postgres` (postgres.js) as the connection driver -- lightweight, Bun-compatible.

### D6: Better Auth setup

**Choice:** Better Auth with built-in Drizzle adapter (`better-auth/adapters/drizzle`) and a catch-all Elysia route handler.

**Pattern:**
```typescript
// Backend: infrastructure/auth/auth.ts
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
})

// Backend: infrastructure/http/routes/auth.routes.ts
const betterAuthView = (context: Context) => {
  if (["POST", "GET"].includes(context.request.method))
    return auth.handler(context.request)
  context.error(405)
}
new Elysia().all("/api/auth/*", betterAuthView)

// Frontend: infrastructure/auth/client.ts
export const authClient = createAuthClient({ baseURL: "..." })
export const { signIn, signUp, signOut, useSession } = authClient
```

### D7: Storybook inside packages/ui

**Choice:** Storybook configured within `packages/ui/` with Vite builder. Theme config (Tailwind) lives here too.

**Rationale:** Components and their stories are co-located. The theme is defined here and exported for `apps/web` to consume.

### D8: Docker strategy

**Choice:**
- `docker/docker-compose.dev.yml`: PostgreSQL 16 with named volume, `.env` for credentials
- `apps/api/Dockerfile`: Multi-stage build from repo root, uses `turbo prune --scope=@repo/api`
- `apps/web/Dockerfile`: Multi-stage build, Vite static build served by nginx/caddy

**Rationale:** Separate Dockerfiles per app for independent Coolify deployment. `turbo prune` keeps images lean by only including the dependency subgraph for each app.

### D9: oxlint configuration

**Choice:** Root-level `oxlintrc.json` with TypeScript and React plugins enabled. No ESLint.

**Known gaps:** oxlint doesn't support `react-hooks/exhaustive-deps` or import ordering. Accepted tradeoff for speed. Can revisit if gaps become painful.

### D10: Testing co-location

**Choice:** Test files co-located with source (`foo.test.ts` next to `foo.ts`). Bun test runner, no additional test framework.

**Rationale:** Reduces friction -- you see the test right next to the code. Bun's test runner is zero-config with Jest-compatible API.

## Risks / Trade-offs

**[oxlint gaps]** → Accept for now. Monitor oxlint releases. Can add ESLint for specific rules later if needed.

**[Inversify + decorators on frontend]** → Requires `experimentalDecorators: true` in tsconfig. Decorator proposal has changed (TC39 stage 3 vs legacy). Inversify uses legacy decorators. → Pin Inversify version, use `experimentalDecorators` (not the new decorator spec).

**[Better Auth maturity]** → Relatively new library. → It's actively maintained, has good Drizzle/Elysia support, and is replaceable (auth is isolated in infrastructure layer thanks to HEX).

**[Bun compatibility]** → Some npm packages may not work perfectly with Bun. → Drizzle, Elysia, Vite, and Better Auth all have explicit Bun support. Monitor edge cases.

**[turbo prune in Docker]** → Requires Turborepo installed in the Docker build stage. → Use a multi-stage build: first stage runs prune, second stage builds from pruned output.

## Open Questions

- **Elysia version:** Pin to latest stable (1.x) at implementation time. Check for breaking changes.
- **ShadCN init method:** `bunx shadcn@latest init` -- need to verify it works with the monorepo package structure (may need `--cwd` flag).
- **Better Auth schema generation:** Better Auth can auto-generate Drizzle schema for its tables. Decide: use their generated schema or manually define the auth tables in `packages/db`.
