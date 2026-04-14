import { Navigate, Outlet } from "react-router";
import { useSession } from "../auth/client";

export function GuestRoute() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
