# Contracts

Zod request/response schemas for API contracts. Single source of truth consumed by both `apps/api` (request validation) and `apps/web` (form validation).

## Convention

Each resource gets its own directory with schemas:

```
contracts/
  user/
    create-user.ts   → CreateUserRequest, CreateUserResponse
    get-user.ts      → GetUserParams, GetUserResponse
```

Every schema exports both the Zod schema and its inferred TypeScript type.
