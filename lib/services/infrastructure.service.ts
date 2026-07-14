import { getDomains, getSslStatus, type Domain } from "@/lib/services/domain.service";
import { getOptionalMembership } from "@/lib/services/membership.service";
import { getWebsites, type Website } from "@/lib/services/website.service";

type BusinessType = { id: string; name: string };

export async function getInfrastructureOverview(
  businessId: string,
  businessTypeId: string | null,
  businessTypes: BusinessType[]
) {
  const [websites, domains, membership] = await Promise.all([
    getWebsites(businessId),
    getDomains(businessId),
    getOptionalMembership(businessId),
  ]);

  const website = selectPrimaryWebsite(websites);
  const domain = selectPrimaryDomain(website, domains);

  return {
    website,
    domain,
    sslStatus: domain ? getSslStatus(domain) : "Not configured",
    membership,
    businessType: businessTypes.find((type) => type.id === businessTypeId)?.name ?? "Not set",
  };
}

function selectPrimaryWebsite(websites: Website[]) {
  return websites.find((website) => website.status === "Live") ?? websites[0] ?? null;
}

function selectPrimaryDomain(website: Website | null, domains: Domain[]) {
  if (website?.domain_id) return domains.find((domain) => domain.id === website.domain_id) ?? null;
  return domains[0] ?? null;
}
