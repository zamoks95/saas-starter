## 1. Dependencies

- [ ] 1.1 Install `i18next` and `react-i18next` in `apps/web`
- [ ] 1.2 Install `i18next-browser-languagedetector` in `apps/web` for localStorage/browser language detection

## 2. i18n infrastructure

- [ ] 2.1 Create `apps/web/src/infrastructure/i18n/locales/common/en.json` with shared UI translations (buttons, navigation, form labels, error messages)
- [ ] 2.2 Create `apps/web/src/infrastructure/i18n/locales/common/es.json` with matching Spanish translations
- [ ] 2.3 Create `apps/web/src/infrastructure/i18n/lazy-backend.ts` — custom i18next backend plugin that resolves namespaces via dynamic `import()`
- [ ] 2.4 Create `apps/web/src/infrastructure/i18n/config.ts` — i18next initialization with: fallback `en`, supported `[en, es]`, default namespace `common`, language detector (localStorage + navigator), and lazy backend
- [ ] 2.5 Create `apps/web/src/infrastructure/i18n/provider.tsx` — React component that wraps children with `I18nextProvider`
- [ ] 2.6 Create `apps/web/src/infrastructure/i18n/index.ts` — barrel export

## 3. App integration

- [ ] 3.1 Wire `I18nProvider` into `apps/web/src/main.tsx` or `App.tsx` so it wraps the component tree

## 4. useLanguage hook

- [ ] 4.1 Create `apps/web/src/application/hooks/use-language.ts` exposing `currentLanguage`, `changeLanguage()`, and `availableLanguages`

## 5. LanguageSelector component

- [ ] 5.1 Create `packages/ui/src/components/language-selector.tsx` — presentational dropdown with props: `currentLanguage`, `languages`, `onLanguageChange`
- [ ] 5.2 Create `packages/ui/src/components/language-selector.stories.tsx` — comprehensive Storybook stories (default, with Spanish selected, interactive controls)

## 6. Verification

- [ ] 6.1 Run `bun run typecheck` in `apps/web` — no type errors
- [ ] 6.2 Run `bun run storybook` in `packages/ui` — LanguageSelector story renders
- [ ] 6.3 Run `bun run dev` — app boots with i18n, language switching works between en/es
