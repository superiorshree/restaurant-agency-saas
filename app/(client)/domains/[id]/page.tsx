import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteDomainButton } from "@/components/domains/delete-domain-button";
import { DomainForm } from "@/components/domains/add-domain-form";
import { requireBusiness } from "@/lib/services/auth.service";
import { getDomain, getSslStatus } from "@/lib/services/domain.service";

function displayDate(value: string | null) { return value ? new Date(`${value}T00:00:00`).toLocaleDateString() : "—"; }

export default async function DomainDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { business } = await requireBusiness();
  const { id } = await params;
  const domain = await getDomain(business.id, id);
  if (!domain) notFound();

  return <AppShell><div className="mx-auto max-w-5xl space-y-6">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-3xl font-bold">{domain.domain}</h1><p className="mt-1 text-muted-foreground">Domain registration, SSL, and DNS configuration.</p></div><DeleteDomainButton id={domain.id} /></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><SummaryCard title="Registrar" value={domain.registrar} /><SummaryCard title="SSL" value={getSslStatus(domain)} description={domain.ssl_expiry ? `Expires ${displayDate(domain.ssl_expiry)}` : undefined} /><SummaryCard title="DNS" value={domain.dns_status} /><SummaryCard title="Verification" value={domain.verification_status} /></div>
    <Card><CardHeader><CardTitle>DNS records</CardTitle><CardDescription>{domain.dns_records.length ? "Configured records for this domain." : "No DNS records have been added."}</CardDescription></CardHeader><CardContent>{domain.dns_records.length ? <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-sm"><thead className="border-b text-left"><tr><th className="p-3">Type</th><th className="p-3">Name</th><th className="p-3">Value</th><th className="p-3">TTL</th><th className="p-3">Priority</th></tr></thead><tbody>{domain.dns_records.map((record, index) => <tr className="border-b last:border-0" key={`${record.type}-${record.name}-${index}`}><td className="p-3 font-medium">{record.type}</td><td className="p-3">{record.name}</td><td className="max-w-80 truncate p-3">{record.value}</td><td className="p-3">{record.ttl}</td><td className="p-3">{record.priority ?? "—"}</td></tr>)}</tbody></table></div> : null}</CardContent></Card>
    <Card><CardHeader><CardTitle>Domain configuration</CardTitle><CardDescription>Update registration, SSL, verification, and DNS settings.</CardDescription></CardHeader><CardContent><DomainForm domainRecord={domain} /></CardContent></Card>
  </div></AppShell>;
}

function SummaryCard({ title, value, description }: { title: string; value: string; description?: string }) {
  return <Card size="sm"><CardHeader><CardDescription>{title}</CardDescription><CardTitle>{value}</CardTitle>{description ? <CardDescription>{description}</CardDescription> : null}</CardHeader></Card>;
}
