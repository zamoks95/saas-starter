## Why

The SaaS starter needs internationalization from day one. Adding i18n retroactively is painful — every string literal becomes tech debt. Setting up react-i18next now with a `common` namespace and the pattern for per-module lazy loading means every future feature gets i18n for free. Initial languages: English (default) and Spanish.

## What Changes

- Install `react-i18next` and `i18next` as dependencies in `apps/web`
- Create i18n infrastructure in `apps/web/src/infrastructure/i18n/` (config, provider, lazy loading backend)
- Create a `common` namespace with shared translations (en/es) for generic UI strings (buttons, navigation, errors)
- Establish the convention for future DDD modules to register their own translation namespaces (e.g., `Auth/assets/locales/en.json`)
- Create `LanguageSelector` component in `packages/ui` — a dropdown to switch between languages
- Create `useLanguage` hook in `apps/web/src/application/hooks/` — thin wrapper for language switching and detection
- Wire `I18nextProvider` into the app's component tree

## Capabilities

### New Capabilities
- `i18n-infrastructure`: Core i18next configuration, lazy loading backend, provider setup, and the per-module namespace registration pattern
- `i18n-ui`: LanguageSelector component and useLanguage hook for interacting with the i18n system

### Modified Capabilities

_(none)_

## Impact

- **apps/web**: New dependencies (`react-i18next`, `i18next`), new infrastructure module, provider wrapping `<App />`
- **packages/ui**: New `LanguageSelector` component + Storybook story
- **apps/web/src/infrastructure/di/**: New DI tokens for i18n configuration if needed
- **Future modules**: Each domain module will follow the established pattern to add its own `locales/` directory with namespaced translations
