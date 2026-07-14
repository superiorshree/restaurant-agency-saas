import { createClient } from "@/lib/supabase/server";

export async function getCurrentBusiness(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}