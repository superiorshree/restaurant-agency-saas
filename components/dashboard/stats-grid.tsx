import {
  CalendarDays,
  Clock,
  CreditCard,
  BadgeCheck,
} from "lucide-react";

import { StatCard } from "./stat-card";

interface StatsGridProps {
  bookingsToday: number;
  pendingBookings: number;
  plan: string;
  renewalDate: string;
}

export function StatsGrid({
  bookingsToday,
  pendingBookings,
  plan,
  renewalDate,
}: StatsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Today's Bookings"
        value={String(bookingsToday)}
        icon={<CalendarDays size={20} />}
        change=""
      />

      <StatCard
        title="Pending Bookings"
        value={String(pendingBookings)}
        icon={<Clock size={20} />}
        change=""
      />

      <StatCard
        title="Current Plan"
        value={plan}
        icon={<CreditCard size={20} />}
        change=""
      />

      <StatCard
        title="Renewal Date"
        value={renewalDate}
        icon={<BadgeCheck size={20} />}
        change=""
      />
    </div>
  );
}