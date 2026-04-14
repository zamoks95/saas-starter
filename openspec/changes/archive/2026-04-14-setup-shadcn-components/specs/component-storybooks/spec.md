## ADDED Requirements

### Requirement: Every component has a Storybook story

Every shadcn/ui component installed in `packages/ui` SHALL have a corresponding `.stories.tsx` file co-located in the same directory.

#### Scenario: Story file exists for each component
- **WHEN** a shadcn component exists at `src/components/ui/<component>.tsx`
- **THEN** a story file exists at `src/components/ui/<component>.stories.tsx`

#### Scenario: Stories render in Storybook
- **WHEN** `bun run storybook` is executed in `packages/ui`
- **THEN** all component stories load and render without errors

### Requirement: Comprehensive story coverage

Each component story file SHALL include multiple stories covering variants, states, and edge cases.

#### Scenario: Default story exists
- **WHEN** a component story file is opened
- **THEN** it includes a `Default` story showing the component in its default state

#### Scenario: Variant stories exist
- **WHEN** a component supports variants (e.g., Button has `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`)
- **THEN** the story file includes a story demonstrating all variants

#### Scenario: Size stories exist
- **WHEN** a component supports size props (e.g., `sm`, `default`, `lg`, `icon`)
- **THEN** the story file includes a story demonstrating all sizes

#### Scenario: State stories exist
- **WHEN** a component supports interactive states (disabled, loading, error)
- **THEN** the story file includes stories for those states

#### Scenario: Composition examples
- **WHEN** a component is commonly used with other components (e.g., Card with CardHeader, CardContent)
- **THEN** the story file includes a composition example showing typical usage

### Requirement: Stories use Storybook Controls

All stories SHALL use Storybook `args` and `argTypes` to enable interactive Controls panel exploration.

#### Scenario: Controls are interactive
- **WHEN** a user views a component story in Storybook
- **THEN** the Controls panel allows modifying props and the component updates live
