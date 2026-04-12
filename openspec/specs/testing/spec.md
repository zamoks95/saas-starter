## ADDED Requirements

### Requirement: Bun test runner configured

Bun's built-in test runner SHALL be configured across all apps and packages. A turbo pipeline task runs tests across all workspaces.

#### Scenario: Run all tests
- **WHEN** `bun run test` is executed at the root
- **THEN** Turborepo runs tests in all workspaces that have test scripts

#### Scenario: Watch mode for development
- **WHEN** `bun run test:watch` is executed in a specific workspace
- **THEN** Bun test runner watches for file changes and reruns affected tests

#### Scenario: Test files are co-located
- **WHEN** a source file exists at `src/domain/entity.ts`
- **THEN** its test file is at `src/domain/entity.test.ts` (co-located pattern)
