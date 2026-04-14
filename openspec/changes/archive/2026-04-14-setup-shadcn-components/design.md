## Context

The `packages/ui` package has shadcn initialized with New York style (`components.json` exists) but zero components installed. Storybook is configured (`.storybook/main.ts` and `preview.ts` exist) but has no stories. The package already has `class-variance-authority`, `clsx`, and `tailwind-merge` as dependencies, and Tailwind CSS v4 as a dev dependency.

## Goals / Non-Goals

**Goals:**
- Install every shadcn/ui component via the official CLI into `packages/ui`
- Create comprehensive Storybook stories for each component (multiple variants, states, edge cases)
- Export all components from the package barrel file

**Non-Goals:**
- Custom theme customization beyond the default New York style
- Building composite/page-level components from shadcn primitives
- Setting up visual regression testing for Storybook
- Creating documentation beyond what Storybook provides

## Decisions

### 1. Install via shadcn CLI, not manual file creation
**Decision**: Use `bunx --bun shadcn@latest add <component>` for every component.
**Rationale**: The CLI handles correct file placement, Radix dependency installation, and Tailwind config. Manual creation risks missing dependencies or incorrect imports.
**Alternative considered**: Copying component files manually - rejected because it bypasses dependency management and is error-prone.

### 2. Install components individually, not `shadcn add --all`
**Decision**: Install components one by one or in small batches.
**Rationale**: This gives visibility into what each component adds and makes it easier to debug if any installation fails. The `--all` flag may not be available or reliable across versions.
**Alternative considered**: `shadcn add --all` - may work but gives less control and harder to troubleshoot.

### 3. Story file co-location
**Decision**: Place `.stories.tsx` files next to their component files in `src/components/ui/`.
**Rationale**: Matches the project convention in CLAUDE.md ("test files co-located") and the Storybook config already looks for `../src/**/*.stories.@(ts|tsx)`.

### 4. Comprehensive stories with Controls
**Decision**: Each story file includes multiple stories covering: default state, all variants/sizes, interactive states (hover, focus, disabled), and composition examples where applicable.
**Rationale**: User explicitly requested comprehensive stories. This maximizes the value of Storybook as a living design system reference.

## Risks / Trade-offs

- **Large dependency footprint** → Accepted trade-off. All shadcn components bring Radix primitives. This is expected for a full component library.
- **Some components may need additional setup** (e.g., `toast` needs a provider, `form` needs react-hook-form) → Document any component-specific setup needs in the stories.
- **CLI version changes** → Pin to `@latest` at time of install. The generated component files are owned by us after installation.
- **Storybook story maintenance** → Stories may need updates when components are customized in downstream projects. This is a known SaaS starter trade-off.
