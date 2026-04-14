## Why

The entire codebase revolves around the auth/user module. When developers fork this starter to build a real product, they have no reference for how to add a second domain module following the established HEX/DDD patterns. A concrete example module — simple enough to understand, complex enough to demonstrate all layers — removes guesswork and ensures architectural consistency across future features.

## What Changes

- Add a reference "Notification" domain module across API and web apps, demonstrating the full vertical slice pattern
- **API domain**: `Notification` entity, `NotificationRepository` port, `NotificationType` value object
- **API application**: `ListNotificationsUseCase`, `MarkNotificationReadUseCase`
- **API infrastructure**: Drizzle persistence adapter, HTTP routes (`GET /notifications`, `PATCH /notifications/:id/read`)
- **Web domain**: `Notification` entity, `NotificationRepository` port
- **Web application**: `useNotifications` hook via Inversify DI
- **Web infrastructure**: HTTP adapter implementing the repository port
- Add shared contracts for notification request/response schemas
- Add Drizzle migration for `notification` table

## Capabilities

### New Capabilities

- `notification-module`: Reference implementation of a complete domain module demonstrating HEX/DDD patterns across both apps

### Modified Capabilities

_None — existing capabilities are not changed._

## Impact

- **`apps/api`**: New domain/application/infrastructure files for notification module
- **`apps/web`**: New domain/application/infrastructure files for notification module
- **`packages/shared`**: New notification contracts (schemas + types)
- **`packages/db`**: New `notification` table schema + migration
- **Documentation**: Add module creation guide in domain README files
