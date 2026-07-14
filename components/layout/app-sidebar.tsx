"use client";

import Link from "next/link";
import { KeyRound } from "lucide-react";
import { Shield } from "lucide-react";
import { Users } from "lucide-react";
import { LayoutDashboard, BarChart3, Globe, CalendarDays, QrCode, Folder, CreditCard, Settings } from "lucide-react";
import { Building2 } from "lucide-react";
import { UserPlus } from "lucide-react";
import { BadgeCheck } from "lucide-react";
const items = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
  { title: "Websites", href: "/websites", icon: Globe },
  { title: "Bookings",href: "/bookings", icon: CalendarDays },
  { title: "QR Codes", href: "/qr-codes", icon: QrCode },
  { title: "Files", href: "/files", icon: Folder },
  { title: "Membership", href: "/membership", icon: CreditCard },
  { title: "Settings", href: "/settings", icon: Settings },
  {title: "Business",href: "/business",icon: Building2,},
  {title: "Developers",href: "/developers",icon: KeyRound,},
  {title: "Admin",href: "/admin",icon: Shield,},
  {title: "Onboarding",href: "/onboarding",icon: UserPlus,},
  { title: "Domains", href: "/domains", icon: BadgeCheck,},
  {title: "Employees",href: "/employees",icon: Users,}
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