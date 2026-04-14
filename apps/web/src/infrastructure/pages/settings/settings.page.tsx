import { useSession } from "../../auth/client";

export function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="rounded border p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Account</h2>
          <p className="text-sm text-muted-foreground">
            Email: {session?.user?.email ?? "—"}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="text-sm text-muted-foreground">
            Name: {session?.user?.name ?? "—"}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Account and profile settings will be configurable here.
        </p>
      </div>
    </div>
  );
}
