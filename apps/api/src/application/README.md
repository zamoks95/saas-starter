# Application Layer

Use cases and orchestration logic.

## Structure

- `use-cases/` - Application use cases (e.g., CreateUser, GetUserProfile)
- `ports/` - Secondary port interfaces for external concerns (e.g., EmailSender, PaymentGateway)

## Rules

- Depends on `domain/` only
- Uses port interfaces for external concerns (never direct infrastructure imports)
- Each use case is a single class with an `execute()` method
- Dependencies injected via constructor (wired in infrastructure layer)
