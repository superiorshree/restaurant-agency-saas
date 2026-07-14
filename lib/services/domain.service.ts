import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const optionalDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).or(z.literal("")).transform((value) => value || null);

export const dnsRecordSchema = z.object({
  type: z.enum(["A", "AAAA", "CNAME", "TXT", "MX"]),
  name: z.string().trim().min(1).max(255),
  value: z.string().trim().min(1).max(1_000),
  ttl: z.coerce.number().int().min(60).max(86_400),
  priority: z.coerce.number().int().min(0).max(65_535).nullable().optional(),
});

export const domainInputSchema = z.object({
  domain: z.string().trim().toLowerCase().transform((value) => value.replace(/^https?:\/\//, "").replace(/\/$/, "")).pipe(z.string().regex(/^(?=.{1,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/)),
  registrar: z.string().trim().min(1).max(100),
  provider: z.string().trim().min(1).max(100),
  purchase_date: optionalDate,
  expiry_date: optionalDate,
  auto_renewal: z.boolean(),
  status: z.enum(["Active", "Pending", "Expired", "Transferred", "Cancelled"]),
  ssl_enabled: z.boolean(),
  ssl_expiry: optionalDate,
  dns_status: z.enum(["Pending", "Configured", "Failed"]),
  verification_status: z.enum(["Pending", "Verified", "Failed"]),
  dns_records: z.array(dnsRecordSchema).max(50),
});

export type DnsRecord = z.infer<typeof dnsRecordSchema>;
export type DomainInput = z.infer<typeof domainInputSchema>;
export interface Domain extends DomainInput { id: string; business_id: string; }

function normalizeDomain(domain: Domain): Domain { return { ...domain, dns_records: domain.dns_records ?? [] }; }

export function getSslStatus(domain: Pick<Domain, "ssl_enabled" | "ssl_expiry">) {
  if (!domain.ssl_enabled) return "Pending";
  if (domain.ssl_expiry && new Date(`${domain.ssl_expiry}T23:59:59`) < new Date()) return "Expired";
  return "Enabled";
}

export async function getDomains(businessId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("domains").select("*").eq("business_id", businessId).order("domain");
  if (error) throw error;
  return (data ?? []).map((domain) => normalizeDomain(domain as Domain));
}

export async function getDomain(businessId: string, domainId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("domains").select("*").eq("business_id", businessId).eq("id", domainId).maybeSingle();
  if (error) throw error;
  return data ? normalizeDomain(data as Domain) : null;
}

export async function createDomain(businessId: string, input: DomainInput) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("domains").insert({ business_id: businessId, ...input }).select("*").single();
  if (error) throw error;
  return normalizeDomain(data as Domain);
}

export async function updateDomain(businessId: string, domainId: string, input: DomainInput) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("domains").update(input).eq("business_id", businessId).eq("id", domainId).select("*").maybeSingle();
  if (error) throw error;
  return data ? normalizeDomain(data as Domain) : null;
}

export async function deleteDomain(businessId: string, domainId: string) {
  const supabase = await createClient();
  const { error, count } = await supabase.from("domains").delete({ count: "exact" }).eq("business_id", businessId).eq("id", domainId);
  if (error) throw error;
  return count === 1;
}
