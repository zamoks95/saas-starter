import type { BackendModule, ReadCallback, Services } from "i18next";

/**
 * Registry mapping namespace names to dynamic import functions.
 * Each DDD module registers its locales here.
 *
 * Pattern for future modules:
 *   namespaceRegistry.auth = (lang) => import(`../auth/locales/${lang}.json`);
 */
const namespaceRegistry: Record<
  string,
  (language: string) => Promise<{ default: Record<string, unknown> }>
> = {
  common: (language: string) =>
    import(`./locales/common/${language}.json`),
};

export function registerNamespace(
  namespace: string,
  loader: (language: string) => Promise<{ default: Record<string, unknown> }>,
): void {
  namespaceRegistry[namespace] = loader;
}

export const LazyBackend: BackendModule = {
  type: "backend",

  init(_services: Services, _backendOptions: object) {
    // no-op — registry is module-scoped
  },

  read(language: string, namespace: string, callback: ReadCallback) {
    const loader = namespaceRegistry[namespace];
    if (!loader) {
      callback(new Error(`No loader registered for namespace "${namespace}"`), false);
      return;
    }

    loader(language)
      .then((mod) => callback(null, mod.default))
      .catch((err) => callback(err as Error, false));
  },
};
