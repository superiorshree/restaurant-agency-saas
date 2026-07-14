import { AppShell } from "@/components/layout/app-shell";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { TrafficChart } from "@/components/dashboard/traffic-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { requireBusiness } from "@/lib/services/auth.service";
import { getBookingDashboardStats } from "@/lib/services/booking.service";
import { getInfrastructureOverview } from "@/lib/services/infrastructure.service";
export default async function DashboardPage() {
 const { user, business } = await requireBusiness();
 const [bookingStats, infrastructure] = await Promise.all([
  getBookingDashboardStats(business.id),
  getInfrastructureOverview(business.id, business.business_type_id ?? null, []),
 ]);
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
  bookingCount={bookingStats.bookingsToday}
  website={infrastructure.website?.website_url ?? "Not configured"}
  domain={infrastructure.domain?.domain ?? "Not configured"}
  sslStatus={infrastructure.sslStatus}
  membership={infrastructure.membership?.plan ?? "Not configured"}
/>
  <TrafficChart />
  <RecentActivity />
</div>
    </AppShell>
  );
}
