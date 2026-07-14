import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteWebsiteButton } from "@/components/websites/delete-website-button";
import { WebsiteForm } from "@/components/websites/website-form";
import { requireBusiness } from "@/lib/services/auth.service";
import { getWebsite } from "@/lib/services/website.service";
import { getDomains } from "@/lib/services/domain.service";

export default async function WebsiteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { business } = await requireBusiness();
  const { id } = await params;
  const [website, domains] = await Promise.all([getWebsite(business.id, id), getDomains(business.id)]);

  if (!website) notFound();

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Website details</h1>
            <p className="mt-1 text-muted-foreground">Manage platform access, production details, and notes.</p>
          </div>
          <DeleteWebsiteButton id={website.id} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Website configuration</CardTitle>
            <CardDescription>Changes are applied to this website only.</CardDescription>
          </CardHeader>
          <CardContent><WebsiteForm website={website} domains={domains} /></CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
