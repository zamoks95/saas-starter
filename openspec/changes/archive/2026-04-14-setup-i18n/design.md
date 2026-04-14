## Context

The frontend (`apps/web`) follows hexagonal/DDD architecture with Inversify for DI. Currently no domain modules exist — the layers are scaffolded but empty. The app needs i18n before features start landing so every string is translatable from the start.

react-i18next is the industry standard for React internationalization. It provides `useTranslation()` hooks, namespace-based code splitting, and pluggable backends for lazy loading.

## Goals / Non-Goals

**Goals:**
- Configure react-i18next with lazy-loading namespace support
- Create a `common` namespace with generic UI translations (en/es)
- Establish the pattern for future DDD modules to register their own namespaces
- Provide `LanguageSelector` component and `useLanguage` hook
- Persist language preference in localStorage

**Non-Goals:**
- Server-side rendering / SSR i18n (we use Vite SPA)
- Backend API translations (API responses stay in English)
- Abstracting i18next behind a domain port/adapter (over-engineering — nobody swaps i18n libraries)
- Creating stub domain modules just to demonstrate the pattern
- RTL language support (only en/es for now)

## Decisions

### 1. Use react-i18next directly — no Inversify abstraction

**Decision**: Use `useTranslation()` hook directly from react-i18next. Do not wrap it behind a domain port/adapter.

**Rationale**: i18n is a cross-cutting UI concern, not a domain concept. Nobody changes i18n libraries. Adding an Inversify layer would create indirection with zero practical benefit.

**Alternative considered**: Full port/adapter with `I18nPort` in domain → rejected as over-engineering.

### 2. Namespace-per-module with lazy loading

**Decision**: Each future DDD module registers its own i18next namespace. Translations are loaded lazily via a custom i18next backend that resolves `import()` calls by namespace.

**Rationale**: Co-locating translations with their module follows DDD boundaries. Lazy loading avoids bundling all translations upfront. Vite's dynamic imports handle code splitting automatically.

**Pattern for future modules**:
```
infrastructure/
  auth/
    locales/
      en.json    ← namespace: "auth"
      es.json
  billing/
    locales/
      en.json    ← namespace: "billing"
      es.json
```

Each module registers its namespace in i18n config via a simple map.

### 3. Common namespace for shared translations

**Decision**: A `common` namespace in `infrastructure/i18n/locales/` holds generic strings (buttons, form labels, navigation, error messages). It loads eagerly as the default namespace.

**Rationale**: Many UI strings are shared across modules (Save, Cancel, Loading...). A common namespace avoids duplication.

### 4. LanguageSelector lives in packages/ui

**Decision**: The dropdown component lives in `packages/ui/src/components/` as a reusable UI component. It receives `currentLanguage`, `languages`, and `onLanguageChange` as props — no i18next dependency in the UI package.

**Rationale**: `packages/ui` is a presentational package with zero business logic. The i18next wiring happens in `apps/web` via the `useLanguage` hook which passes props down.

### 5. useLanguage hook in application layer

**Decision**: `apps/web/src/application/hooks/use-language.ts` provides `currentLanguage`, `changeLanguage()`, and `availableLanguages`. It wraps `useTranslation().i18n` from react-i18next.

**Rationale**: Thin wrapper that centralizes language-switching logic and localStorage persistence. Components use this hook, not i18next directly for language management.

### 6. Language detection and persistence

**Decision**: Detect language from `localStorage → navigator.language → fallback to "en"`. Persist selection to localStorage on change.

**Rationale**: Simple, client-side only. No server involvement needed for a SPA.

## Risks / Trade-offs

- **Namespace registration is manual** → Each new module must add its namespace to the i18n config. Mitigation: document the pattern clearly and keep the registration simple (one line per module).
- **Translation key drift** → Keys in JSON may not match what's used in code. Mitigation: future tooling (i18next-parser) can detect unused/missing keys. Out of scope for this change.
- **Bundle size with all translations** → Common namespace loads eagerly. Mitigation: common namespace stays small (generic strings only). Module namespaces load lazily.
