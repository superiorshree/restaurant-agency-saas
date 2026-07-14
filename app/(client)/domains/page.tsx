import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddDomainForm } from "@/components/domains/add-domain-form";
import { requireBusiness } from "@/lib/services/auth.service";
import { getDomains, getSslStatus } from "@/lib/services/domain.service";

export default async function DomainsPage() {
  const { business } = await requireBusiness();
  const domains = await getDomains(business.id);
  return <AppShell><div className="space-y-8">
    <div><h1 className="text-3xl font-bold">Domains</h1><p className="mt-1 text-muted-foreground">Manage registration, SSL, and DNS configuration in one place.</p></div>
    <Card><CardHeader><CardTitle>Add domain</CardTitle><CardDescription>Add a domain and its provider information.</CardDescription></CardHeader><CardContent><AddDomainForm /></CardContent></Card>
    <div className="overflow-x-auto rounded-xl border"><table className="w-full min-w-[760px] text-sm"><thead className="border-b"><tr><th className="p-4 text-left">Domain</th><th className="p-4 text-left">Registrar</th><th className="p-4 text-left">DNS</th><th className="p-4 text-left">Status</th><th className="p-4 text-left">SSL</th><th className="p-4 text-right">Actions</th></tr></thead>
      <tbody>{domains.map((domain) => <tr key={domain.id} className="border-b"><td className="p-4 font-medium">{domain.domain}</td><td className="p-4">{domain.registrar}</td><td className="p-4">{domain.dns_status}</td><td className="p-4">{domain.status}</td><td className="p-4">{getSslStatus(domain)}</td><td className="p-4 text-right"><Button asChild size="sm" variant="outline"><Link href={`/domains/${domain.id}`}>View</Link></Button></td></tr>)}{domains.length === 0 ? <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No domains have been added yet.</td></tr> : null}</tbody>
    </table></div>
  </div></AppShell>;
}
