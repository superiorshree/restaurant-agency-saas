import { createClient } from "@/lib/supabase/server";

export async function getMembership(businessId: string) {
  const membership = await getOptionalMembership(businessId);

  if (!membership) throw new Error("Membership not found");

  return membership;
}

export async function getOptionalMembership(businessId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("memberships")
    .select("*")
    .eq("business_id", businessId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
