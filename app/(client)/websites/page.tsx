import { AppShell } from "@/components/layout/app-shell";
import { requireBusiness } from "@/lib/services/auth.service";
import { getWebsites } from "@/lib/services/website.service";

export default async function WebsitesPage() {
  const { business } = await requireBusiness();

  const websites = await getWebsites(business.id);

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Websites
        </h1>

        <div className="rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="p-4 text-left">Platform</th>
                <th className="p-4 text-left">Website</th>
                <th className="p-4 text-left">Dashboard</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {websites.map((website) => (
                <tr key={website.id} className="border-b">
                  <td className="p-4">{website.platform}</td>
                  <td className="p-4">{website.website_url ?? "-"}</td>
                  <td className="p-4">{website.dashboard_url ?? "-"}</td>
                  <td className="p-4">{website.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}