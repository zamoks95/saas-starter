## ADDED Requirements

### Requirement: i18next initialization

The application SHALL initialize react-i18next with the following configuration: fallback language `en`, supported languages `en` and `es`, default namespace `common`, and lazy loading enabled for all namespaces.

#### Scenario: App boots with default language
- **WHEN** the application starts and no language preference is stored
- **THEN** i18next initializes with `en` as the active language

#### Scenario: App boots with stored preference
- **WHEN** the application starts and localStorage contains a language preference of `es`
- **THEN** i18next initializes with `es` as the active language

#### Scenario: Browser language detection
- **WHEN** the application starts, no localStorage preference exists, and the browser language is `es`
- **THEN** i18next initializes with `es` as the active language

### Requirement: I18nextProvider wraps the app

The `I18nextProvider` SHALL wrap the application component tree so that `useTranslation()` is available in all components.

#### Scenario: Provider is mounted
- **WHEN** the React app renders
- **THEN** `I18nextProvider` is present in the component tree above all routed components

### Requirement: Common namespace with shared translations

A `common` namespace SHALL exist with translations for generic UI strings (buttons, form labels, navigation items, error messages) in both `en` and `es`.

#### Scenario: Common translations load eagerly
- **WHEN** the application initializes
- **THEN** the `common` namespace translations are available immediately without additional network requests

#### Scenario: Common translations are complete
- **WHEN** a developer checks the `common` namespace JSON files
- **THEN** both `en.json` and `es.json` contain identical keys

### Requirement: Lazy loading namespace backend

The i18n system SHALL provide a custom backend that loads translation namespaces on demand via dynamic `import()`. Each namespace corresponds to a DDD module's locales directory.

#### Scenario: Module namespace loads on first use
- **WHEN** a component calls `useTranslation("auth")` for a namespace not yet loaded
- **THEN** the backend dynamically imports the corresponding locale file and makes the translations available

#### Scenario: Already loaded namespace reuses cache
- **WHEN** a component calls `useTranslation("auth")` for a namespace that was previously loaded
- **THEN** no additional import is triggered and cached translations are returned

### Requirement: Module namespace registration pattern

The i18n configuration SHALL provide a clear mechanism for future DDD modules to register their translation namespaces by adding a mapping entry that points a namespace name to its locale directory.

#### Scenario: New module registers translations
- **WHEN** a developer creates a new module (e.g., `billing`) with `infrastructure/billing/locales/en.json` and `infrastructure/billing/locales/es.json`
- **THEN** adding a single entry to the namespace registry makes the translations available via `useTranslation("billing")`

### Requirement: Language persistence

The selected language SHALL be persisted to localStorage so it survives page reloads and new sessions.

#### Scenario: Language change is persisted
- **WHEN** the user changes the language to `es`
- **THEN** the selection is saved to localStorage

#### Scenario: Persisted language is restored
- **WHEN** the application starts after a language was previously selected
- **THEN** the persisted language is used as the active language
