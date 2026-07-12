"use client";

import Link from "next/link";
import { LayoutDashboard, BarChart3, Globe, CalendarDays, QrCode, Folder, CreditCard, Settings } from "lucide-react";

const items = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
  { title: "Website", href: "/website", icon: Globe },
  { title: "Reservations", href: "/reservations", icon: CalendarDays },
  { title: "QR Codes", href: "/qr-codes", icon: QrCode },
  { title: "Files", href: "/files", icon: Folder },
  { title: "Membership", href: "/membership", icon: CreditCard },
  { title: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <aside className="w-64 border-r bg-background">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">SPNIX</h1>
      </div>

      <nav className="space-y-1 p-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}