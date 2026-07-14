import { AppShell } from "@/components/layout/app-shell";
import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  Building2,
  CreditCard,
  CalendarDays,
  Users,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { count: clients } = await supabase
    .from("businesses")
    .select("*", { count: "exact", head: true });

  const { count: memberships } = await supabase
    .from("memberships")
    .select("*", { count: "exact", head: true });

  const { count: bookings } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true });

  const { count: employees } = await supabase
    .from("businesses")
    .select("*", { count: "exact", head: true })
    .eq("role", "employee");

  return (
    <AppShell>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Clients"
            value={String(clients ?? 0)}
            icon={<Building2 size={20} />}
          />

          <StatCard
            title="Memberships"
            value={String(memberships ?? 0)}
            icon={<CreditCard size={20} />}
          />

          <StatCard
            title="Bookings"
            value={String(bookings ?? 0)}
            icon={<CalendarDays size={20} />}
          />

          <StatCard
            title="Employees"
            value={String(employees ?? 0)}
            icon={<Users size={20} />}
          />
        </div>
      </div>
    </AppShell>
  );
}