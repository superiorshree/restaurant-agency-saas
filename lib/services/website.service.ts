import { createClient } from "@/lib/supabase/server";

export async function getWebsites(businessId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("business_id", businessId);

  if (error) throw error;

  return data ?? [];
}