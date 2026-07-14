import { createClient } from "@/lib/supabase/server";
import { getDomain } from "@/lib/services/domain.service";
import { z } from "zod";

export const websiteInputSchema = z.object({
  platform: z.enum(["Wix", "WordPress", "Next.js", "Custom"]),
  status: z.enum(["Draft", "In Progress", "Live", "Maintenance", "Archived"]),
  dashboard_url: z.url().or(z.literal("")).transform((value) => value || null),
  website_url: z.url().or(z.literal("")).transform((value) => value || null),
  notes: z.string().trim().max(2_000).nullable().optional(),
  domain_id: z.string().uuid().or(z.literal("")).transform((value) => value || null),
});

export type WebsiteInput = z.infer<typeof websiteInputSchema>;

export interface Website {
  id: string;
  business_id: string;
  platform: WebsiteInput["platform"];
  status: WebsiteInput["status"];
  dashboard_url: string | null;
  website_url: string | null;
  notes: string | null;
  domain_id: string | null;
}

export async function getWebsites(businessId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("business_id", businessId);

  if (error) throw error;

  return (data ?? []) as Website[];
}

export async function getWebsite(businessId: string, websiteId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("business_id", businessId)
    .eq("id", websiteId)
    .maybeSingle();

  if (error) throw error;

  return data as Website | null;
}

export async function createWebsite(businessId: string, input: WebsiteInput) {
  await validateWebsiteDomain(businessId, input.domain_id);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("websites")
    .insert({ business_id: businessId, ...input })
    .select("*")
    .single();

  if (error) throw error;

  return data as Website;
}

export async function updateWebsite(
  businessId: string,
  websiteId: string,
  input: WebsiteInput
) {
  await validateWebsiteDomain(businessId, input.domain_id);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("websites")
    .update(input)
    .eq("business_id", businessId)
    .eq("id", websiteId)
    .select("*")
    .maybeSingle();

  if (error) throw error;

  return data as Website | null;
}

export async function deleteWebsite(businessId: string, websiteId: string) {
  const supabase = await createClient();

  const { error, count } = await supabase
    .from("websites")
    .delete({ count: "exact" })
    .eq("business_id", businessId)
    .eq("id", websiteId);

  if (error) throw error;

  return count === 1;
}

async function validateWebsiteDomain(businessId: string, domainId: string | null) {
  if (!domainId) return;

  const domain = await getDomain(businessId, domainId);
  if (!domain) throw new Error("Selected domain does not belong to this business.");
}
