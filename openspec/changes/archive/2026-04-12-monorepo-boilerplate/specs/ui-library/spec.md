## ADDED Requirements

### Requirement: Tailwind + ShadCN component package

The `packages/ui` package SHALL provide a shared component library built with Tailwind CSS and ShadCN. It exports components, the Tailwind config, and CSS utilities for consumption by `apps/web`.

#### Scenario: Component import from app
- **WHEN** `apps/web` imports a component from `@repo/ui`
- **THEN** the component renders with correct Tailwind styles

#### Scenario: Tailwind config is shared
- **WHEN** `apps/web` extends the Tailwind config from `@repo/ui`
- **THEN** both packages use consistent design tokens (colors, spacing, typography)

### Requirement: Storybook integration

Storybook SHALL be configured inside `packages/ui` to develop and document components in isolation.

#### Scenario: Storybook starts
- **WHEN** `bun run storybook` is executed in `packages/ui`
- **THEN** Storybook launches and renders component stories

#### Scenario: Component stories exist
- **WHEN** a shared component is created in `packages/ui`
- **THEN** a corresponding `.stories.tsx` file exists alongside it
