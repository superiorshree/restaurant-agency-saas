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

export async function getBookingDashboardStats(businessId: string) {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const [{ count: bookingsToday, error: todayError }, { count: pendingBookings, error: pendingError }] = await Promise.all([
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("business_id", businessId).eq("booking_date", today),
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("business_id", businessId).eq("status", "Pending"),
  ]);

  if (todayError) throw todayError;
  if (pendingError) throw pendingError;

  return { bookingsToday: bookingsToday ?? 0, pendingBookings: pendingBookings ?? 0 };
}
