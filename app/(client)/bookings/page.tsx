import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { BookingTable } from "@/components/bookings/booking-table";
import { createClient } from "@/lib/supabase/server";
import { getCurrentBusiness } from "@/lib/services/business.service";
import { getBookings } from "@/lib/services/booking.service";
export default async function BookingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

const business = await getCurrentBusiness(user.id);

  if (!business) {
    return (
      <AppShell>
        <h1>Business not found</h1>
      </AppShell>
    );
  }

const bookings = await getBookings(business.id);
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Bookings
        </h1>

        <BookingTable
          bookings={bookings ?? []}
        />
      </div>
    </AppShell>
  );
}