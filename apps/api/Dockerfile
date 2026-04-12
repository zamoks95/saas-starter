FROM oven/bun:1 AS base

# Prune the monorepo for this app
FROM base AS pruner
WORKDIR /app
RUN bun add -g turbo
COPY . .
RUN turbo prune @repo/api --docker

# Install dependencies
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN bun install --frozen-lockfile

# Build the app
FROM installer AS builder
COPY --from=pruner /app/out/full/ .
RUN bun run build --filter=@repo/api

# Production runtime
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 app && \
    adduser --system --uid 1001 app
USER app

COPY --from=builder --chown=app:app /app/apps/api/dist ./dist
COPY --from=builder --chown=app:app /app/apps/api/package.json ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["bun", "run", "dist/index.js"]
