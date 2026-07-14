import {
  CalendarDays,
  CreditCard,
  Globe,
  Network,
  ShieldCheck,
} from "lucide-react";

import { StatCard } from "./stat-card";

interface StatsGridProps {
  bookingCount: number;
  website: string;
  domain: string;
  sslStatus: string;
  membership: string;
}

export function StatsGrid({
  bookingCount,
  website,
  domain,
  sslStatus,
  membership,
}: StatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard
        title="Website"
        value={website}
        icon={<Globe size={20} />}
        change=""
      />
      <StatCard
        title="Domain"
        value={domain}
        icon={<Network size={20} />}
        change=""
      />
      <StatCard
        title="SSL"
        value={sslStatus}
        icon={<ShieldCheck size={20} />}
        change=""
      />
      <StatCard
        title="Membership"
        value={membership}
        icon={<CreditCard size={20} />}
        change=""
      />
      <StatCard
        title="Today's bookings"
        value={String(bookingCount)}
        icon={<CalendarDays size={20} />}
        change=""
      />
    </div>
  );
}
