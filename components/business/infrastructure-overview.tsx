import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { getInfrastructureOverview } from "@/lib/services/infrastructure.service";

type InfrastructureOverviewData = Awaited<ReturnType<typeof getInfrastructureOverview>>;

export function InfrastructureOverview({ overview }: { overview: InfrastructureOverviewData }) {
  const items = [
    { label: "Website", value: overview.website?.website_url ?? "Not configured", detail: overview.website?.status ?? "Add a website", href: "/websites" },
    { label: "Domain", value: overview.domain?.domain ?? "Not configured", detail: overview.domain?.registrar ?? "Add a domain", href: "/domains" },
    { label: "SSL", value: overview.sslStatus, detail: overview.domain?.ssl_expiry ? `Expires ${overview.domain.ssl_expiry}` : "No expiry date", href: "/domains" },
    { label: "Platform", value: overview.website?.platform ?? "Not configured", detail: "Website platform", href: "/websites" },
    { label: "Business type", value: overview.businessType, detail: "Business profile", href: "/business" },
    { label: "Membership", value: overview.membership?.plan ?? "Not configured", detail: overview.membership?.renewal_date ?? "No renewal date", href: "/membership" },
  ];

  return <Card><CardHeader><CardTitle>Client infrastructure</CardTitle><CardDescription>Website, domain, SSL, and membership at a glance.</CardDescription></CardHeader><CardContent><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <div key={item.label} className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">{item.label}</p><p className="mt-1 truncate font-medium">{item.value}</p><p className="mt-1 text-xs text-muted-foreground">{item.detail}</p><Button asChild variant="link" size="sm" className="mt-2 px-0"><Link href={item.href}>Manage</Link></Button></div>)}</div></CardContent></Card>;
}
