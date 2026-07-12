import { redirect } from "next/navigation";
import { BusinessForm } from "@/components/business/business-form";
import { AppShell } from "@/components/layout/app-shell";
import { BusinessCard } from "@/components/business/business-card";

import { createClient } from "@/lib/supabase/server";

export default async function BusinessPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: business, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  if (error || !business) {
    return (
      <AppShell>
        <h1 className="text-2xl font-bold">
          No Business Found
        </h1>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">
          Business Profile
        </h1>

        <BusinessCard
          name={business.name}
          owner={business.owner}
          email={business.email}
        />
        <BusinessForm />
      </div>
    </AppShell>
  );
}