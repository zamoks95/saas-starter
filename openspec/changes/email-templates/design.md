## Context

The Resend email adapter (`ResendEmailAdapter`) implements `EmailPort` and can send emails with raw HTML. Better Auth triggers emails for email verification and password reset but currently has no templates configured — these emails either use Better Auth's bare defaults or fail silently. The email service is registered in the Elysia DI plugin as `emailService`.

## Goals / Non-Goals

**Goals:**
- Create a reusable base email layout (header with app name, content area, footer)
- Implement welcome, email verification, and password reset email templates
- Wire templates into Better Auth's `sendEmail` configuration
- Make branding configurable via environment variables (app name, support email)
- Keep templates as simple string-based HTML (no heavy templating engine)

**Non-Goals:**
- MJML or React Email framework (too heavy for a starter)
- Email preview/testing UI
- Transactional email analytics or tracking
- Marketing or newsletter emails

## Decisions

### 1. Templating approach

**Decision**: Use plain TypeScript functions that return HTML strings. Each template function accepts typed parameters and returns `{ subject: string; html: string; text: string }`.

**Rationale**: No additional dependencies. Easy to understand, easy to customize. TypeScript gives type safety on template parameters. Forked projects can swap in React Email or MJML later if needed.

**Alternatives considered**:
- React Email — excellent DX but adds a build step and dependencies for email rendering
- MJML — great for responsive emails but adds a compilation step
- Handlebars/EJS — unnecessary abstraction for a handful of templates

### 2. Template structure

**Decision**: A `createBaseLayout(content: string)` function provides the shared HTML wrapper (DOCTYPE, head styles, header, footer). Individual templates call this function and pass their content block.

**Rationale**: DRY approach that ensures consistent branding. Changing the header/footer updates all emails at once.

**Alternatives considered**:
- Each template is fully self-contained — leads to duplicated layout code
- CSS framework for emails — unnecessary complexity for simple transactional emails

### 3. Better Auth integration

**Decision**: Configure Better Auth's `emailAndPassword.sendResetPassword` and `emailVerification.sendVerificationEmail` hooks to use the email templates + Resend adapter.

**Rationale**: Better Auth provides these hooks specifically for custom email sending. We compose our template functions with the existing `EmailPort` to send through Resend.

**Alternatives considered**:
- Override Better Auth's internal email sending — fragile and undocumented
- Separate email sending outside Better Auth — would miss auth-triggered events

### 4. Configuration

**Decision**: Use environment variables `APP_NAME` (default: "SaaS Starter") and `APP_SUPPORT_EMAIL` (default: `noreply@` + domain) for template branding.

**Rationale**: Environment variables are the established configuration mechanism. Defaults ensure emails work without configuration.

## Risks / Trade-offs

- **[Plain HTML limitations]** → No responsive email framework means emails may render inconsistently across clients. Mitigation: use simple table-based layouts and inline styles; keep templates minimal.
- **[No preview mechanism]** → Developers can't preview emails without sending them. Mitigation: templates are simple functions that return strings — they can be logged or rendered in a browser during development.
