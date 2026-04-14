import type { RouteObject } from "react-router";
import { GuestRoute } from "./guards/guest-route";
import { ProtectedRoute } from "./guards/protected-route";
import { AuthenticatedLayout } from "./layouts/authenticated.layout";
import { LoginPage } from "./pages/auth/login.page";
import { RecoverPasswordPage } from "./pages/auth/recover-password.page";
import { SignupPage } from "./pages/auth/signup.page";
import { DashboardPage } from "./pages/dashboard/dashboard.page";
import { SettingsPage } from "./pages/settings/settings.page";

export const routes: RouteObject[] = [
  {
    element: <GuestRoute />,
    children: [
      { path: "/auth", element: <LoginPage /> },
      { path: "/auth/signup", element: <SignupPage /> },
      { path: "/auth/recover-password", element: <RecoverPasswordPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AuthenticatedLayout />,
        children: [
          { path: "/", element: <DashboardPage /> },
          { path: "/settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
];
