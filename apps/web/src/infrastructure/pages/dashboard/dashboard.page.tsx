import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { signOut, useSession } from "../../auth/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card.tsx";
import { Button } from "@repo/ui/components/ui/button.tsx";
import { Badge } from "@repo/ui/components/ui/badge.tsx";

export function DashboardPage() {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = session?.user;

  async function handleLogout() {
    await signOut();
    navigate("/auth");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Welcome Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.welcome.title")}</CardTitle>
            <CardDescription>
              {user?.name
                ? t("dashboard.welcome.greeting", { name: user.name })
                : t("dashboard.welcome.greetingAnonymous")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              {t("dashboard.welcome.description")}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/settings")}>
                {t("dashboard.welcome.settingsButton")}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                {t("dashboard.welcome.logoutButton")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.account.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{t("dashboard.account.email")}</dt>
                <dd>{user?.email ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{t("dashboard.account.memberSince")}</dt>
                <dd>
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  {t("dashboard.account.verificationStatus")}
                </dt>
                <dd>
                  {user?.emailVerified ? (
                    <Badge variant="default">{t("dashboard.account.verified")}</Badge>
                  ) : (
                    <Badge variant="secondary">{t("dashboard.account.unverified")}</Badge>
                  )}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Quick Start Guide Card — spans full width */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t("dashboard.quickStart.title")}</CardTitle>
            <CardDescription>{t("dashboard.quickStart.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {(
                [
                  "cloneRepo",
                  "configureEnv",
                  "runMigrations",
                  "startDev",
                  "exploreDashboard",
                  "readDocs",
                ] as const
              ).map((step) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="mt-0.5 text-muted-foreground">&#9744;</span>
                  <span>{t(`dashboard.quickStart.steps.${step}`)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
