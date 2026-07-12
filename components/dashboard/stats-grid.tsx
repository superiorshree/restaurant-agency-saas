import {
  Users,
  QrCode,
  Phone,
  IndianRupee,
} from "lucide-react";

import { StatCard } from "./stat-card";

export function StatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Visitors"
        value="1,245"
        icon={<Users size={20} />}
        change="+12%"
      />

      <StatCard
        title="QR Scans"
        value="543"
        icon={<QrCode size={20} />}
        change="+8%"
      />

      <StatCard
        title="Calls"
        value="89"
        icon={<Phone size={20} />}
        change="+5%"
      />

      <StatCard
        title="Revenue"
        value="₹12,500"
        icon={<IndianRupee size={20} />}
        change="+18%"
      />
    </div>
  );
}