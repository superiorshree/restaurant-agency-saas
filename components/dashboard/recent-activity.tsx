const activities = [
  {
    title: "Website visited",
    time: "2 minutes ago",
  },
  {
    title: "QR Code scanned",
    time: "12 minutes ago",
  },
  {
    title: "Customer called restaurant",
    time: "28 minutes ago",
  },
  {
    title: "Table reservation created",
    time: "1 hour ago",
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-center justify-between border-b pb-3 last:border-none"
          >
            <span>{activity.title}</span>

            <span className="text-sm text-muted-foreground">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}