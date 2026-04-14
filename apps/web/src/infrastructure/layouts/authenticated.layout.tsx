import { Link, Outlet, useNavigate } from "react-router";
import { signOut } from "../auth/client";

export function AuthenticatedLayout() {
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate("/auth");
  }

  return (
    <div className="min-h-screen">
      <nav className="border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-lg">SaaS Starter</span>
          <Link to="/" className="text-sm hover:underline">
            Dashboard
          </Link>
          <Link to="/settings" className="text-sm hover:underline">
            Settings
          </Link>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm hover:underline cursor-pointer"
        >
          Logout
        </button>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
