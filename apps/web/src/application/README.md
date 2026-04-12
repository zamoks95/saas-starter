# Application Layer (Frontend)

Use cases and React hooks that bridge domain logic to the UI.

## Structure

- `use-cases/` - Application use cases
- `hooks/` - React hooks that wrap use cases and connect Inversify DI to React

## Rules

- Depends on `domain/` only for business logic
- Hooks resolve dependencies from Inversify container
- Use cases are framework-agnostic; hooks are the React bridge
