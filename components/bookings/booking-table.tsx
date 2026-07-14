"use client";
interface Booking {
  id: string;
  customer_name: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  status: string;
}

export function BookingTable({
  bookings,
}: {
  bookings: Booking[];
}) {
  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full">
        <thead className="border-b bg-muted">
          <tr>
            <th className="p-4 text-left">Customer</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Time</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-b"
            >
              <td className="p-4">
                {booking.customer_name}
              </td>

              <td className="p-4">
                {booking.phone}
              </td>

              <td className="p-4">
                {booking.booking_date}
              </td>

              <td className="p-4">
                {booking.booking_time}
              </td>

            <td className="p-4">
  <select
    defaultValue={booking.status}
    onChange={async (e) => {
      await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: e.target.value,
        }),
      });

      location.reload();
    }}
    className="rounded border px-2 py-1"
  >
    <option>Pending</option>
    <option>Confirmed</option>
    <option>Completed</option>
    <option>Cancelled</option>
  </select>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}