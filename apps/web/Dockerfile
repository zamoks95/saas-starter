FROM oven/bun:1 AS base

# Prune the monorepo for this app
FROM base AS pruner
WORKDIR /app
RUN bun add -g turbo
COPY . .
RUN turbo prune @repo/web --docker

# Install dependencies
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN bun install --frozen-lockfile

# Build the app
FROM installer AS builder
COPY --from=pruner /app/out/full/ .
RUN bun run build --filter=@repo/web

# Serve static files with nginx
FROM nginx:alpine AS runner

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# SPA fallback: serve index.html for all routes
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
