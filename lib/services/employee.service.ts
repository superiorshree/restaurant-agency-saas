import { createClient } from "@/lib/supabase/server";

export async function getEmployees(businessId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("employees")
    .select("id,full_name,email,phone,role,status,invite_status,invited_at,invite_token")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}