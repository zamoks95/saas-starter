# Domain Layer

Pure business logic. **Zero framework imports.**

## Structure

- `entities/` - Domain entities (e.g., User, Order)
- `value-objects/` - Value objects (e.g., Email, Money)
- `repositories/` - Repository port interfaces (implemented in infrastructure)
- `services/` - Domain services (business logic that doesn't belong to a single entity)

## Rules

- No imports from `infrastructure/` or any framework (Elysia, Drizzle, etc.)
- No imports from `application/` (domain is the innermost layer)
- Only pure TypeScript -- entities, interfaces, and business rules
