import { useSession } from "../../auth/client";

export function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}.
      </p>
      <div className="rounded border p-6">
        <p className="text-sm text-muted-foreground">
          Dashboard summary content will go here.
        </p>
      </div>
    </div>
  );
}
