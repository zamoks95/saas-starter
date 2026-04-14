## Context

Both `apps/api` and `apps/web` follow HEX/DDD architecture with domain/application/infrastructure layers, but only the User module exists as a reference. Developers forking this starter need a clear, complete example of how to add a new domain module — from database schema through API routes to frontend hooks. The notification module is chosen because it's universally useful in SaaS apps, simple to understand, and exercises all architectural layers.

## Goals / Non-Goals

**Goals:**
- Demonstrate the full vertical slice: entity → repository port → use case → persistence adapter → HTTP routes → shared contracts → frontend adapter → hook → page integration
- Keep the notification module simple enough to serve as a template
- Exercise patterns not yet demonstrated: list endpoints with pagination, entity status transitions, Drizzle relations (notification → user)
- Add the notification table to the Drizzle schema with a proper migration

**Non-Goals:**
- Real-time notifications (WebSockets/SSE)
- Push notifications (browser/mobile)
- Notification preferences or subscription management
- Email notifications (handled by the email-templates change)
- Complex notification types or rich content

## Decisions

### 1. Notification entity design

**Decision**: A `Notification` entity with fields: `id`, `userId`, `type` (enum: `info`, `warning`, `success`), `title`, `message`, `read` (boolean), `createdAt`. Minimal but demonstrates entity design, value objects (type enum), and state transitions (unread → read).

**Rationale**: Simple enough to understand at a glance, complex enough to demonstrate entity patterns, state management, and typed enums.

**Alternatives considered**:
- More complex entity (e.g., Project, Invoice) — too domain-specific, harder to understand as a template
- Simpler entity (e.g., Note with just title/body) — too trivial, doesn't demonstrate enough patterns

### 2. API endpoints

**Decision**: Three endpoints under `/notifications`:
- `GET /notifications` — list current user's notifications (paginated, uses `PaginationSchema` from shared-contracts-expansion)
- `PATCH /notifications/:id/read` — mark a notification as read
- `GET /notifications/unread-count` — get count of unread notifications

**Rationale**: Demonstrates list with pagination, single-resource update, and a computed endpoint. All are protected by the auth guard.

**Alternatives considered**:
- Full CRUD — users shouldn't create their own notifications; that's a system concern
- Batch operations (mark all read) — nice but adds complexity beyond the template's purpose

### 3. Frontend integration

**Decision**: Add a `NotificationRepository` port in `apps/web/domain`, an HTTP adapter in infrastructure, and a `useNotifications` hook via Inversify. The dashboard page shows an unread notification count badge in the nav bar.

**Rationale**: Demonstrates the complete frontend HEX/DDD cycle including Inversify DI registration, hook creation, and component consumption — the exact pattern developers need to replicate.

**Alternatives considered**:
- Dedicated notifications page — overkill for a reference module; a badge + dropdown is sufficient
- No frontend integration — would miss half the architectural demonstration

### 4. Seed data

**Decision**: Add a seed script or migration that creates sample notifications for development, so the module has visible data immediately after setup.

**Rationale**: Developers forking the starter should see the notification module working out of the box without having to create test data manually.

## Risks / Trade-offs

- **[Module may be removed by forks]** → Forked projects may not need notifications. Mitigation: the module is self-contained; removing it is a clean delete of its files + migration rollback.
- **[Adds schema complexity]** → New Drizzle table and migration. Mitigation: the notification table is simple and independent of other tables (only FK to user).
- **[Pagination dependency]** → Uses `PaginationSchema` from the shared-contracts-expansion change. Mitigation: that change should be implemented first, or the schemas can be added inline.
