import { BrowserRouter, useRoutes } from "react-router";
import { routes } from "./infrastructure/routes";
import { I18nProvider } from "./infrastructure/i18n";

function AppRoutes() {
  return useRoutes(routes);
}

export function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </I18nProvider>
  );
}
