## Why

The dashboard is the first thing users see after login, but it currently shows only a welcome message and a placeholder box. For a SaaS starter, the dashboard should demonstrate a reusable layout pattern with widget/card slots that forked projects can replace with domain-specific content — without being opinionated about what that content is.

## What Changes

- Replace the placeholder dashboard with a structured widget-based layout
- Add a welcome card with user info and quick actions (go to settings, logout)
- Add an account summary card (email, member since, email verification status)
- Add a "Quick Start" card with starter-specific guidance (setup checklist for developers forking the repo)
- Use ShadCN Card, Button, Badge components for consistent styling
- Add i18n translations for all dashboard content

## Capabilities

### New Capabilities

_None — this change enhances an existing capability._

### Modified Capabilities

- `dashboard-page`: Add requirements for widget-based layout with user info card, account summary, and quick-start guide

## Impact

- **`apps/web`**: Rewrite `dashboard.page.tsx` with card-based layout; potentially extract widget components
- **`packages/ui`**: No changes — Card, Badge, Button already installed
- **`packages/shared`**: No changes — `UserResponse` already covers needed fields
