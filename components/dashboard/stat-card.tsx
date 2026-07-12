import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change?: string;
}

export function StatCard({
  title,
  value,
  icon,
  change,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {title}
        </span>

        {icon}
      </div>

      <h2 className="mt-4 text-3xl font-bold">
        {value}
      </h2>

      {change && (
        <p className="mt-2 text-sm text-green-600">
          {change}
        </p>
      )}
    </div>
  );
}