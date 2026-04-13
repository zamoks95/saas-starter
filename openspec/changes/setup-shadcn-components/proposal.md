## Why

The `packages/ui` package has shadcn initialized (`components.json` configured with New York style) but no components installed yet. Without the full component library in place, frontend development is blocked - every new feature requires manually adding components on demand, slowing velocity and creating inconsistent patterns. Installing all shadcn components upfront and creating comprehensive Storybook stories establishes a complete, documented design system from day one.

## What Changes

- Install all shadcn/ui components into `packages/ui/src/components/ui/` via the shadcn CLI (`bunx --bun shadcn@latest add`)
- Add all required shadcn peer dependencies (e.g., `lucide-react`, `@radix-ui/*`, `recharts`, `react-day-picker`, etc.)
- Create comprehensive Storybook stories (`.stories.tsx`) for every installed component, covering variants, states, sizes, and edge cases
- Export all components from `packages/ui` for consumption by `apps/web`

## Capabilities

### New Capabilities
- `shadcn-components`: Installation of all shadcn/ui components via CLI into the ui package
- `component-storybooks`: Comprehensive Storybook stories for every shadcn component covering multiple variants, states, and edge cases

### Modified Capabilities
- `ui-library`: Adding concrete component implementations and stories to fulfill the existing ui-library spec requirements

## Impact

- **packages/ui**: Major additions - all shadcn component files, story files, new dependencies
- **package.json**: New dependencies for Radix primitives, lucide-react, and other shadcn peer deps
- **exports**: All new components must be exported from the package for downstream consumption
- **Storybook**: Significant expansion of stories - every component gets comprehensive coverage
