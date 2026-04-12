# Infrastructure Layer

Framework adapters, HTTP handlers, persistence, and external services.

## Structure

- `http/routes/` - Elysia route plugins
- `plugins/` - Elysia DI plugins (`.decorate()` wiring)
- `persistence/` - Drizzle repository implementations
- `services/` - External service adapters (email, payments, etc.)
- `auth/` - Better Auth configuration

## Rules

- Implements interfaces from `domain/repositories/` and `application/ports/`
- This is the only layer that imports frameworks (Elysia, Drizzle, Better Auth)
- DI wiring happens here via Elysia `.decorate()` and `.derive()` plugins
