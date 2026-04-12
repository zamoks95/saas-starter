# Infrastructure Layer (Frontend)

Framework adapters, DI wiring, API clients, and UI pages.

## Structure

- `di/` - Inversify container setup and injection tokens
- `api/` - HTTP client adapters implementing domain repository interfaces
- `ui/pages/` - React pages and layouts (imports from `@repo/ui`)
- `auth/` - Better Auth React client

## Rules

- Implements interfaces from `domain/repositories/`
- This is the only layer that imports frameworks (React, Inversify, Better Auth)
- DI wiring happens in `di/container.ts`
