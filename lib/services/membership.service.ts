import { createClient } from "@/lib/supabase/server";

export async function getMembership(businessId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("memberships")
    .select("*")
    .eq("business_id", businessId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}