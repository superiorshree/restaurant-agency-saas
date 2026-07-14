import { createClient } from "@/lib/supabase/server";

export async function getBookings(businessId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("business_id", businessId)
    .order("booking_date", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}