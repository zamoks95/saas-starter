# Domain Layer (Frontend)

Pure business logic for the frontend. **Zero framework imports.**

## Structure

- `entities/` - Domain entities (often a subset of backend entities)
- `value-objects/` - Value objects (reuse from `@repo/shared` when possible)
- `repositories/` - Repository port interfaces (implemented by HTTP adapters in infrastructure)

## Rules

- No imports from `infrastructure/` or any framework (React, Inversify, etc.)
- Only pure TypeScript -- entities, interfaces, and business rules
- Prefer reusing domain primitives from `@repo/shared`
