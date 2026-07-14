import { createClient } from "@/lib/supabase/server";

export async function getEmployeeByToken(token: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("invite_token", token)
    .single();

  if (error) throw error;

  return data;
}