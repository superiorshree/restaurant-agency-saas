import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { TrafficChart } from "@/components/dashboard/traffic-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { requireBusiness } from "@/lib/services/auth.service";
export default async function DashboardPage() {
 const { user, business } = await requireBusiness();

const supabase = await createClient();
const today = new Date().toISOString().split("T")[0];

const { count: bookingsToday } = await supabase
  .from("bookings")
  .select("*", { count: "exact", head: true })
  .eq("business_id", business.id)
  .eq("booking_date", today);

const { count: pendingBookings } = await supabase
  .from("bookings")
  .select("*", { count: "exact", head: true })
  .eq("business_id", business.id)
  .eq("status", "Pending");

const { data: membership } = await supabase
  .from("memberships")
  .select("plan, renewal_date")
  .eq("business_id", business.id)
  .single();
  return (
    <AppShell>
      <div className="space-y-8">
  <div>
    <h1 className="text-3xl font-bold">
      Welcome back 👋
    </h1>

    <p className="mt-2 text-muted-foreground">
      {user.email}
    </p>
  </div>

  <StatsGrid
  bookingsToday={bookingsToday ?? 0}
  pendingBookings={pendingBookings ?? 0}
  plan={membership?.plan ?? "-"}
  renewalDate={membership?.renewal_date ?? "-"}
/>
  <TrafficChart />
  <RecentActivity />
</div>
    </AppShell>
  );
}
