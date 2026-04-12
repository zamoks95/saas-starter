## ADDED Requirements

### Requirement: oxlint configuration

oxlint SHALL be configured at the root level to lint all TypeScript and TSX files across the monorepo. A turbo pipeline task runs linting across all workspaces.

#### Scenario: Lint all packages
- **WHEN** `bun run lint` is executed at the root
- **THEN** oxlint checks all workspaces and reports errors

### Requirement: Husky pre-commit hooks

Husky SHALL be configured to run pre-commit hooks that enforce code quality before commits are created.

#### Scenario: Pre-commit hook triggers
- **WHEN** a developer runs `git commit`
- **THEN** Husky runs oxlint and type checking on staged files

### Requirement: Commitizen conventional commits

Commitizen SHALL be configured to enforce conventional commit messages. A commit-msg hook validates the format.

#### Scenario: Interactive commit
- **WHEN** a developer runs `bun run commit` (or the cz command)
- **THEN** Commitizen prompts for a conventional commit message (type, scope, description)

#### Scenario: Commit message validation
- **WHEN** a commit message does not follow conventional format
- **THEN** the commit-msg hook rejects the commit

### Requirement: Shared TypeScript configuration

A base `tsconfig.json` SHALL be defined (in `tooling/typescript-config/` or root) and extended by all workspaces for consistent compiler options.

#### Scenario: Consistent TS config
- **WHEN** a new workspace is added
- **THEN** it extends the shared base tsconfig for consistent strictness, paths, and target settings
