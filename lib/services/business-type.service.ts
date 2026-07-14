import { createClient } from "@/lib/supabase/server";

export async function getBusinessTypes() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("business_types")
    .select("*")
    .order("name");

  if (error) throw error;

  return data ?? [];
}
