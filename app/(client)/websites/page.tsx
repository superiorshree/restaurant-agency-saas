import { AppShell } from "@/components/layout/app-shell";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WebsiteForm } from "@/components/websites/website-form";
import { requireBusiness } from "@/lib/services/auth.service";
import { getWebsites } from "@/lib/services/website.service";
import { getDomains } from "@/lib/services/domain.service";

export default async function WebsitesPage() {
  const { business } = await requireBusiness();

  const [websites, domains] = await Promise.all([getWebsites(business.id), getDomains(business.id)]);

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Websites</h1>
          <p className="mt-1 text-muted-foreground">Manage your website platforms, access URLs, and production status.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Add website</CardTitle>
            <CardDescription>Create a website record for this business.</CardDescription>
          </CardHeader>
          <CardContent><WebsiteForm domains={domains} /></CardContent>
        </Card>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="border-b">
              <tr>
                <th className="p-4 text-left">Platform</th>
                <th className="p-4 text-left">Production URL</th>
                <th className="p-4 text-left">Dashboard</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {websites.map((website) => (
                <tr key={website.id} className="border-b">
                  <td className="p-4">{website.platform}</td>
                  <td className="max-w-52 truncate p-4">{website.website_url ?? "-"}</td>
                  <td className="max-w-52 truncate p-4">{website.dashboard_url ?? "-"}</td>
                  <td className="p-4">{website.status}</td>
                  <td className="p-4 text-right"><Button asChild size="sm" variant="outline"><Link href={`/websites/${website.id}`}>View</Link></Button></td>
                </tr>
              ))}
              {websites.length === 0 ? <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No websites have been added yet.</td></tr> : null}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
