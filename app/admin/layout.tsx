import { getAdminIdentity } from "@/server/admin";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdminIdentity();
  if (!admin) redirect("/login?next=/admin");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-sm font-semibold">
              Experiments
            </Link>
            <Link href="/admin/routes" className="text-sm font-semibold">
              Routes
            </Link>
            <Link href="/admin/analytics" className="text-sm font-semibold">
              Analytics
            </Link>
            <Link href="/admin/webhooks" className="text-sm font-semibold">
              Webhooks
            </Link>
            <Link href="/admin/integrations" className="text-sm font-semibold">
              Integrations
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-600">{admin.email}</div>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="text-xs font-semibold text-slate-700 underline">
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
