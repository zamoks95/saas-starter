## ADDED Requirements

### Requirement: Notification entity

The system SHALL define a `Notification` entity with fields: `id` (string), `userId` (string), `type` (enum: `info`, `warning`, `success`), `title` (string), `message` (string), `read` (boolean), `createdAt` (Date). The entity SHALL reside in the domain layer with zero framework imports.

#### Scenario: Entity is framework-agnostic
- **WHEN** the `Notification` entity is inspected
- **THEN** it SHALL have zero imports from Elysia, Drizzle, or any infrastructure framework

### Requirement: Notification repository port

The system SHALL define a `NotificationRepository` interface in the domain layer with methods: `findByUserId(userId, pagination)`, `findById(id)`, `markAsRead(id)`, and `countUnread(userId)`.

#### Scenario: Repository port is an interface
- **WHEN** the `NotificationRepository` is inspected
- **THEN** it SHALL be a TypeScript interface with no concrete implementation

### Requirement: List notifications API endpoint

The system SHALL expose `GET /notifications` as a protected endpoint that returns the current user's notifications with pagination.

#### Scenario: Authenticated user lists notifications
- **WHEN** an authenticated user calls `GET /notifications`
- **THEN** the system SHALL return a paginated list of the user's notifications ordered by `createdAt` descending

#### Scenario: Pagination parameters
- **WHEN** the request includes `page` and `limit` query parameters
- **THEN** the system SHALL paginate the results accordingly

#### Scenario: Unauthenticated request
- **WHEN** an unauthenticated request calls `GET /notifications`
- **THEN** the system SHALL return 401 Unauthorized

### Requirement: Mark notification as read API endpoint

The system SHALL expose `PATCH /notifications/:id/read` as a protected endpoint that marks a notification as read.

#### Scenario: Mark own notification as read
- **WHEN** an authenticated user calls `PATCH /notifications/:id/read` for their own notification
- **THEN** the system SHALL set the notification's `read` field to `true` and return the updated notification

#### Scenario: Notification not found
- **WHEN** the notification ID does not exist or belongs to another user
- **THEN** the system SHALL return 404 Not Found

### Requirement: Unread notification count API endpoint

The system SHALL expose `GET /notifications/unread-count` as a protected endpoint that returns the count of unread notifications for the current user.

#### Scenario: User has unread notifications
- **WHEN** an authenticated user calls `GET /notifications/unread-count`
- **THEN** the system SHALL return `{ count: <number> }` with the number of unread notifications

### Requirement: List notifications use case

The system SHALL implement a `ListNotificationsUseCase` in the application layer that retrieves paginated notifications for a given user ID via the `NotificationRepository` port.

#### Scenario: Use case delegates to repository
- **WHEN** the use case is executed with a user ID and pagination parameters
- **THEN** it SHALL call `findByUserId` on the repository and return the paginated result

### Requirement: Mark notification read use case

The system SHALL implement a `MarkNotificationReadUseCase` in the application layer that marks a notification as read via the `NotificationRepository` port.

#### Scenario: Use case validates ownership
- **WHEN** the use case is executed with a notification ID and user ID
- **THEN** it SHALL verify the notification belongs to the user before marking it as read

#### Scenario: Notification not found
- **WHEN** the notification does not exist
- **THEN** the use case SHALL throw a `NotFoundError`

### Requirement: Drizzle notification table

The system SHALL define a `notification` table in the Drizzle schema with columns matching the `Notification` entity and a foreign key reference to the `user` table.

#### Scenario: Migration creates table
- **WHEN** `bun run db:migrate` is executed
- **THEN** the `notification` table SHALL be created in PostgreSQL

### Requirement: Notification shared contracts

The system SHALL provide `NotificationResponseSchema`, `NotificationListResponseSchema` (paginated), and `UnreadCountResponseSchema` in `@repo/shared`.

#### Scenario: Contracts used in API responses
- **WHEN** the notification API endpoints return data
- **THEN** the response SHALL conform to the shared notification schemas

### Requirement: Frontend notification integration

The system SHALL provide a `NotificationRepository` port in the web domain layer, an HTTP adapter in infrastructure, and a `useNotifications` hook via Inversify DI that the dashboard can consume.

#### Scenario: Dashboard shows unread count
- **WHEN** the dashboard loads
- **THEN** the navigation bar SHALL display a badge with the unread notification count (if greater than zero)

#### Scenario: Hook provides notification data
- **WHEN** the `useNotifications` hook is called
- **THEN** it SHALL return the list of notifications, unread count, and a `markAsRead` function

### Requirement: Notification seed data

The system SHALL include seed data that creates sample notifications for development, so the module has visible data after initial setup.

#### Scenario: Seed data exists after setup
- **WHEN** a developer runs the seed script
- **THEN** sample notifications of different types (info, warning, success) SHALL be created for the first user
