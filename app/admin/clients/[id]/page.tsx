import { AppShell } from "@/components/layout/app-shell";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function ClientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .single();

  if (!business) notFound();

  const { data: membership } = await supabase
    .from("memberships")
    .select("*")
    .eq("business_id", id)
    .single();

  const { count: bookings } = await supabase
    .from("bookings")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("business_id", id);

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          {business.name}
        </h1>

        <div className="rounded-xl border p-6 space-y-2">
          <p><strong>Owner:</strong> {business.owner}</p>
          <p><strong>Email:</strong> {business.email}</p>
          <p><strong>Plan:</strong> {membership?.plan}</p>
          <p><strong>Status:</strong> {membership?.status}</p>
          <p><strong>Total Bookings:</strong> {bookings ?? 0}</p>
        </div>
      </div>
    </AppShell>
  );
}