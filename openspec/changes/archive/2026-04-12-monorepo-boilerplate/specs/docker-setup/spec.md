## ADDED Requirements

### Requirement: Local development Docker Compose

A `docker-compose.dev.yml` SHALL provide a PostgreSQL instance for local development with persistent volume and preconfigured credentials via environment variables.

#### Scenario: Start local database
- **WHEN** `docker compose -f docker/docker-compose.dev.yml up` is executed
- **THEN** a PostgreSQL container starts and accepts connections on the configured port

#### Scenario: Data persists across restarts
- **WHEN** the Postgres container is stopped and restarted
- **THEN** previously stored data is still present via the Docker volume

### Requirement: Per-app Dockerfiles for Coolify deployment

Each app (`apps/web`, `apps/api`) SHALL have its own Dockerfile optimized for production deployment via Coolify. The Dockerfiles build from the repo root to access monorepo workspace dependencies and use `turbo prune` for minimal images.

#### Scenario: Build API Docker image
- **WHEN** `docker build -f apps/api/Dockerfile .` is executed from repo root
- **THEN** a production-ready image is created containing only the API and its dependencies

#### Scenario: Build Web Docker image
- **WHEN** `docker build -f apps/web/Dockerfile .` is executed from repo root
- **THEN** a production-ready image is created serving the static Vite build
