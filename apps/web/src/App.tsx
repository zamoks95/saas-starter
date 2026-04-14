import { BrowserRouter, useRoutes } from "react-router";
import { routes } from "./infrastructure/routes";

function AppRoutes() {
  return useRoutes(routes);
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
