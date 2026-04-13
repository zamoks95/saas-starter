## ADDED Requirements

### Requirement: Session extraction middleware

An `authPlugin` SHALL extract the current user and session from the request by calling Better Auth's `auth.api.getSession()` with the request headers. The extracted user and session SHALL be injected into the Elysia request context via `.derive()`.

#### Scenario: Valid session cookie present
- **WHEN** a request includes a valid Better Auth session cookie
- **THEN** `ctx.user` contains the authenticated user object and `ctx.session` contains the session object

#### Scenario: No session cookie present
- **WHEN** a request has no session cookie
- **THEN** `ctx.user` is `null` and `ctx.session` is `null`

#### Scenario: Expired session cookie
- **WHEN** a request includes an expired session cookie
- **THEN** `ctx.user` is `null` and `ctx.session` is `null`

### Requirement: Route protection guard

A `guardPlugin` SHALL reject unauthenticated requests with a 401 status code and a structured `ErrorResponse` body. Routes that require authentication MUST compose this guard.

#### Scenario: Authenticated request passes guard
- **WHEN** a request hits a protected route and `ctx.user` is not null
- **THEN** the request proceeds to the route handler

#### Scenario: Unauthenticated request is rejected
- **WHEN** a request hits a protected route and `ctx.user` is null
- **THEN** the server responds with 401 and `{ code: "UNAUTHORIZED", message: "Authentication required" }`

### Requirement: Auth plugins are composable

The auth and guard plugins SHALL be independent Elysia plugins that can be composed with `.use()`. Routes that need auth compose both; routes that are public skip the guard.

#### Scenario: Protected route composition
- **WHEN** a route group uses `.use(authPlugin).use(guardPlugin)`
- **THEN** all routes in the group require authentication

#### Scenario: Public route remains accessible
- **WHEN** a route does not use the guard plugin (e.g., `/health`)
- **THEN** the route remains accessible without authentication
