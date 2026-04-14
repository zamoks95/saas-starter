## ADDED Requirements

### Requirement: LanguageSelector component

A `LanguageSelector` component SHALL exist in `packages/ui` that renders a dropdown allowing the user to switch between available languages. The component SHALL be presentational — it receives props and emits events, with no direct dependency on i18next.

#### Scenario: Renders available languages
- **WHEN** the LanguageSelector is rendered with `languages: [{code: "en", label: "English"}, {code: "es", label: "Español"}]`
- **THEN** the dropdown displays both options

#### Scenario: Shows current language
- **WHEN** the LanguageSelector is rendered with `currentLanguage: "es"`
- **THEN** "Español" is displayed as the selected value

#### Scenario: Emits language change
- **WHEN** the user selects a different language from the dropdown
- **THEN** the `onLanguageChange` callback is called with the selected language code

### Requirement: LanguageSelector Storybook story

The `LanguageSelector` component SHALL have a comprehensive Storybook story file.

#### Scenario: Story covers default state
- **WHEN** a developer opens the LanguageSelector stories in Storybook
- **THEN** a Default story shows the selector with English selected

#### Scenario: Story covers language switch
- **WHEN** a developer interacts with the LanguageSelector in Storybook
- **THEN** the Controls panel allows changing `currentLanguage` and `languages` props

### Requirement: useLanguage hook

A `useLanguage` hook SHALL exist in `apps/web/src/application/hooks/` that provides the current language, a function to change language, and the list of available languages.

#### Scenario: Returns current language
- **WHEN** `useLanguage()` is called
- **THEN** it returns the current active language code (e.g., `"en"`)

#### Scenario: Changes language
- **WHEN** `changeLanguage("es")` is called from the hook
- **THEN** i18next switches to Spanish, all translated components re-render, and the preference is persisted to localStorage

#### Scenario: Returns available languages
- **WHEN** `useLanguage()` is called
- **THEN** it returns `availableLanguages` containing `[{code: "en", label: "English"}, {code: "es", label: "Español"}]`
