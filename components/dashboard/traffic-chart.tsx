"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", visitors: 120 },
  { day: "Tue", visitors: 210 },
  { day: "Wed", visitors: 170 },
  { day: "Thu", visitors: 280 },
  { day: "Fri", visitors: 320 },
  { day: "Sat", visitors: 450 },
  { day: "Sun", visitors: 390 },
];

export function TrafficChart() {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">
        Traffic Overview
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#2563EB"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}