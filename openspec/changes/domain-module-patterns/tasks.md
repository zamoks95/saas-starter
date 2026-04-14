## 1. Shared Contracts

- [ ] 1.1 Create `packages/shared/src/contracts/notification/notification.ts` with `NotificationResponseSchema`, `NotificationTypeSchema` (enum: info, warning, success)
- [ ] 1.2 Add `NotificationListResponseSchema` using `createPaginatedResponseSchema(NotificationResponseSchema)`
- [ ] 1.3 Add `UnreadCountResponseSchema` with `count` field
- [ ] 1.4 Export all schemas and types from barrel files
- [ ] 1.5 Add unit tests for notification contracts

## 2. Database Schema

- [ ] 2.1 Create `packages/db/src/schema/notification.ts` with Drizzle table definition (id, userId FK, type enum, title, message, read, createdAt)
- [ ] 2.2 Export notification table from `packages/db/src/schema/index.ts`
- [ ] 2.3 Generate Drizzle migration via `bun run db:generate`

## 3. API Domain Layer

- [ ] 3.1 Create `apps/api/src/domain/entities/notification.entity.ts` with `Notification` interface
- [ ] 3.2 Create `apps/api/src/domain/value-objects/notification-type.ts` with `NotificationType` enum
- [ ] 3.3 Create `apps/api/src/domain/repositories/notification.repository.ts` with `NotificationRepository` interface (findByUserId, findById, markAsRead, countUnread)

## 4. API Application Layer

- [ ] 4.1 Create `apps/api/src/application/use-cases/list-notifications.use-case.ts`
- [ ] 4.2 Create `apps/api/src/application/use-cases/mark-notification-read.use-case.ts` with ownership validation
- [ ] 4.3 Add unit tests for both use cases

## 5. API Infrastructure Layer

- [ ] 5.1 Create `apps/api/src/infrastructure/persistence/drizzle-notification.repository.ts` implementing `NotificationRepository`
- [ ] 5.2 Create `apps/api/src/infrastructure/http/routes/notification.routes.ts` with `GET /notifications`, `PATCH /notifications/:id/read`, `GET /notifications/unread-count`
- [ ] 5.3 Register `NotificationRepository` in DI plugin via `.decorate('notificationRepo', ...)`
- [ ] 5.4 Mount notification routes in `apps/api/src/index.ts`

## 6. Web Domain Layer

- [ ] 6.1 Create `apps/web/src/domain/entities/notification.entity.ts` with `Notification` interface
- [ ] 6.2 Create `apps/web/src/domain/repositories/notification.repository.ts` with `NotificationRepository` interface

## 7. Web Infrastructure Layer

- [ ] 7.1 Create `apps/web/src/infrastructure/http/notification-http.adapter.ts` implementing `NotificationRepository` via fetch calls
- [ ] 7.2 Register notification adapter in Inversify container (`apps/web/src/infrastructure/di/container.ts`)
- [ ] 7.3 Add injection token for `NotificationRepository` in `apps/web/src/infrastructure/di/types.ts`

## 8. Web Application Layer

- [ ] 8.1 Create `apps/web/src/application/hooks/use-notifications.ts` hook via Inversify DI
- [ ] 8.2 Hook SHALL expose: notifications list, unread count, markAsRead function, loading state

## 9. Dashboard Integration

- [ ] 9.1 Add unread notification count badge to the navigation bar in `AuthenticatedLayout`
- [ ] 9.2 Use `useNotifications` hook to fetch unread count on layout mount

## 10. Seed Data

- [ ] 10.1 Create seed script at `packages/db/src/seed/notifications.ts` that inserts sample notifications of each type
- [ ] 10.2 Add `db:seed` script to `packages/db/package.json`

## 11. Verification

- [ ] 11.1 Run `bun run db:migrate` and verify notification table is created
- [ ] 11.2 Run seed script and verify sample notifications exist
- [ ] 11.3 Verify `GET /notifications` returns paginated results for authenticated user
- [ ] 11.4 Verify `PATCH /notifications/:id/read` marks notification as read
- [ ] 11.5 Verify `GET /notifications/unread-count` returns correct count
- [ ] 11.6 Verify dashboard nav bar shows unread count badge
- [ ] 11.7 Run `bun test` across all workspaces and verify all tests pass
