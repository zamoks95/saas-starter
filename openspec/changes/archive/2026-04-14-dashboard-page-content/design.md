## Context

The dashboard at `/` shows a welcome message with the user's name and a placeholder card. It's the main authenticated landing page. The session data from Better Auth provides user name, email, and creation date. ShadCN Card, Badge, and Button components are available. The dashboard should serve as a template that forked projects replace with domain-specific content.

## Goals / Non-Goals

**Goals:**
- Provide a structured, card-based dashboard layout that demonstrates the widget pattern
- Show useful account information (email, member since, verification status)
- Include quick action links (settings, logout)
- Add a "Quick Start" guide card relevant to developers forking the starter
- Use ShadCN components for consistent styling
- Support i18n for all dashboard content

**Non-Goals:**
- Real-time data or charts (no domain data exists yet)
- Customizable widget positions or drag-and-drop
- Activity feed or notifications panel (separate feature)
- Analytics or metrics dashboard

## Decisions

### 1. Layout structure

**Decision**: Use a responsive CSS grid layout with Card components. Two columns on desktop, single column on mobile. Cards are: Welcome + Quick Actions, Account Summary, Quick Start Guide.

**Rationale**: Grid of cards is the most common SaaS dashboard pattern. It's simple to understand and easy for forked projects to replace individual cards with domain-specific widgets.

**Alternatives considered**:
- Single column layout — wastes horizontal space on desktop
- Complex dashboard framework (e.g., react-grid-layout) — overkill for a starter template

### 2. Content strategy

**Decision**: The dashboard content is starter-specific (setup checklist, getting started). Forked projects are expected to replace these cards entirely. Each card is a self-contained component to make replacement trivial.

**Rationale**: A SaaS starter dashboard can't show real business data. Instead, it demonstrates the pattern and provides value to developers during initial setup.

**Alternatives considered**:
- Empty dashboard with Lorem ipsum — unhelpful, doesn't demonstrate the pattern
- Mock data dashboard — misleading, developers might think data integration exists

### 3. Component extraction

**Decision**: Keep all dashboard cards inline in `dashboard.page.tsx` rather than extracting separate component files.

**Rationale**: The cards are simple and starter-specific — they'll be replaced by forked projects. Extracting them into separate files adds navigation overhead for no reuse benefit.

**Alternatives considered**:
- Separate widget components — over-engineering for content that will be replaced

## Risks / Trade-offs

- **[Starter-specific content becomes stale]** → The Quick Start guide references setup steps that may change. Mitigation: keep the guide generic and reference the README for detailed instructions.
- **[No real data to display]** → Dashboard may feel empty compared to production SaaS apps. Mitigation: the cards provide structure and context; forked projects add real content.
