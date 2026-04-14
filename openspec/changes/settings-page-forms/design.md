## Context

The settings page at `/settings` renders read-only account info (email, name). The API already exposes `PATCH /me` (update profile) and `PATCH /me/password` (change password) with full Zod validation via `@repo/shared`. ShadCN form components (Input, Button, Card, Form, Label) are installed in `@repo/ui`. The frontend uses Inversify for DI and has an auth client via Better Auth.

## Goals / Non-Goals

**Goals:**
- Provide a functional profile update form (name, image URL)
- Provide a password change form (current password, new password, confirm)
- Reuse Zod schemas from `@repo/shared` for client-side validation
- Follow existing HEX/DDD patterns (HTTP adapter → repository port → use case → hook → page)
- Provide clear success/error feedback

**Non-Goals:**
- Image upload (URL input is sufficient for the starter)
- Account deletion UI (can be added later)
- Email change flow (requires verification, out of scope)
- Two-factor authentication settings

## Decisions

### 1. Form library approach

**Decision**: Use ShadCN Form component (built on react-hook-form) with Zod resolvers for validation.

**Rationale**: ShadCN's Form component is already installed and provides accessible, styled form fields with built-in error display. Using `@hookform/resolvers/zod` connects directly to the shared Zod schemas.

**Alternatives considered**:
- Raw controlled inputs — already used in current pages, but lacks validation UX and is verbose
- Formik — adds another dependency when react-hook-form is already a ShadCN peer dep

### 2. API communication

**Decision**: Add `updateProfile` and `changePassword` methods to the existing user HTTP adapter in the infrastructure layer, callable through the Inversify DI container.

**Rationale**: Follows the established pattern where infrastructure adapters implement domain repository ports, and application hooks bridge DI → React.

**Alternatives considered**:
- Direct fetch calls in the page component — violates HEX/DDD layering
- Using Better Auth client for profile updates — Better Auth handles auth flows, not profile CRUD

### 3. Page layout

**Decision**: Split the settings page into two distinct Card sections — "Profile" and "Security" — stacked vertically.

**Rationale**: Keeps concerns separated visually, matches common SaaS settings patterns. Each card has its own submit button and independent form state.

**Alternatives considered**:
- Tab-based layout — over-engineered for two sections
- Single form for everything — mixes profile and password concerns, confusing UX

### 4. Feedback mechanism

**Decision**: Use Sonner toast notifications for success/error feedback.

**Rationale**: Sonner is already installed with ShadCN. Toasts are non-intrusive and don't require page state management for success messages.

## Risks / Trade-offs

- **[Optimistic UI vs wait-for-response]** → We wait for the API response before showing success. This is simpler and safer for a starter, though slightly slower. Mitigation: show loading states on submit buttons.
- **[Password confirmation not in shared schema]** → `ChangePasswordRequestSchema` doesn't include `confirmPassword` — we validate confirmation match on the client side only, then send only `currentPassword` and `newPassword` to the API. Mitigation: this is standard practice; the server doesn't need the confirm field.
