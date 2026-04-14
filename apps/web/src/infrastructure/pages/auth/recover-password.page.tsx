import { type FormEvent, useState } from "react";
import { Link } from "react-router";

export function RecoverPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: Wire up when backend password reset endpoint is available
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">Recover Password</h1>

        {submitted ? (
          <div className="space-y-4 text-center">
            <p className="text-sm">
              If an account exists for <strong>{email}</strong>, you'll receive
              a password reset email.
            </p>
            <Link to="/auth" className="text-sm underline">
              Back to login
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border px-3 py-2 text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50"
              >
                {loading ? "Sending…" : "Send reset link"}
              </button>
            </form>

            <p className="text-center text-sm">
              <Link to="/auth" className="underline">
                Back to login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
