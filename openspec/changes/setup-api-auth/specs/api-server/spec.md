## ADDED Requirements

### Requirement: DI plugin wired with repositories

The `diPlugin` in `infrastructure/plugins/di.plugin.ts` SHALL register repository instances via `.decorate()`, making them available to route handlers through the Elysia context.

#### Scenario: Repository available in route handler
- **WHEN** a route handler destructures `{ userRepo }` from context
- **THEN** it receives the `DrizzleUserRepository` instance registered by the DI plugin

### Requirement: Protected route group

A route group for authenticated endpoints SHALL compose the `authPlugin` and `guardPlugin`, ensuring all routes within require a valid session.

#### Scenario: /me routes are protected
- **WHEN** the server registers `/me` routes
- **THEN** they are grouped under a route group that requires authentication
