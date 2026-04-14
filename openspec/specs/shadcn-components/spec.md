## Requirements

### Requirement: All shadcn components installed via CLI

All shadcn/ui components SHALL be installed into `packages/ui/src/components/ui/` using the official shadcn CLI (`bunx --bun shadcn@latest add <component>`). Components MUST NOT be created manually.

#### Scenario: Component files exist after installation
- **WHEN** the shadcn CLI installation is complete
- **THEN** every shadcn/ui component has a corresponding `.tsx` file in `packages/ui/src/components/ui/`

#### Scenario: Dependencies are installed
- **WHEN** a shadcn component requires Radix primitives or other peer dependencies
- **THEN** those dependencies are automatically added to `packages/ui/package.json` by the CLI

### Requirement: Complete component list

The following shadcn/ui components SHALL be installed: accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, combobox, command, context-menu, data-table, date-picker, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toggle, toggle-group, tooltip.

#### Scenario: All components available
- **WHEN** a developer checks `packages/ui/src/components/ui/`
- **THEN** all listed components have corresponding files

### Requirement: Components are exported

All installed components SHALL be re-exported from the `packages/ui` package so downstream apps can import them via `@repo/ui`.

#### Scenario: Import from downstream app
- **WHEN** `apps/web` imports a component like `import { Button } from "@repo/ui/components/ui/button"`
- **THEN** the import resolves and the component is available
