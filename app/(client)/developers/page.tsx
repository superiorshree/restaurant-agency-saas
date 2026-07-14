import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { createClient } from "@/lib/supabase/server";

export default async function DevelopersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: business } = await supabase
    .from("businesses")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (!business) {
    return (
      <AppShell>
        <h1 className="text-2xl font-bold">Business not found</h1>
      </AppShell>
    );
  }

  const { data: key } = await supabase
    .from("api_keys")
    .select("*")
    .eq("business_id", business.id)
    .single();

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">API Keys</h1>

        <div className="rounded-xl border p-6">
          <p className="font-mono break-all">
            {key?.api_key}
          </p>
        </div>
      </div>
    </AppShell>
  );
}