import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" && sp.next.startsWith("/") ? sp.next : "/admin";
  const error = sp.error === "invalid" ? "Invalid email or password." : sp.error === "misconfigured" ? "Auth is misconfigured (missing env vars)." : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-md px-6 py-16">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to manage routes, experiments, and analytics.</p>

        {error ? (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</div>
        ) : null}

        <form method="post" action="/api/admin/login" className="mt-6 grid gap-4">
          <input type="hidden" name="next" value={next} />
          <label className="grid gap-1">
            <span className="text-sm font-medium">Email</span>
            <input name="email" type="email" className="h-10 rounded-md border border-slate-300 px-3" required />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Password</span>
            <input name="password" type="password" className="h-10 rounded-md border border-slate-300 px-3" required />
          </label>
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-5 text-sm font-medium text-white"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-xs text-slate-500">
          Need access? Set <span className="font-mono">ADMIN_EMAIL</span>, <span className="font-mono">ADMIN_PASSWORD</span>, and{" "}
          <span className="font-mono">AUTH_SECRET</span> in <span className="font-mono">.env</span>.
        </p>

        <p className="mt-3 text-xs text-slate-500">
          <Link href="/" className="underline">
            Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}

