import { AppShell } from "@/components/layout/app-shell";
import { requireBusiness } from "@/lib/services/auth.service";
import { getDomains } from "@/lib/services/domain.service";
import { AddDomainForm } from "@/components/domains/add-domain-form";
export default async function DomainsPage() {
  const { business } = await requireBusiness();

  const domains = await getDomains(business.id);

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Domains
        </h1>
       <AddDomainForm />
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="p-4 text-left">Domain</th>
                <th className="p-4 text-left">Provider</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">SSL</th>
              </tr>
            </thead>

            <tbody>
              {domains.map((domain) => (
                <tr key={domain.id} className="border-b">
                  <td className="p-4">{domain.domain}</td>
                  <td className="p-4">{domain.provider}</td>
                  <td className="p-4">{domain.status}</td>
                  <td className="p-4">
                    {domain.ssl_enabled ? "✅" : "❌"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}