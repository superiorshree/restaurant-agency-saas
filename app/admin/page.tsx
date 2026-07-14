import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { requireSuperAdmin } from "@/lib/services/auth.service";
export default async function AdminPage() {
  const supabase = await createClient();



await requireSuperAdmin();
  return (
    <AppShell>
      <h1 className="text-3xl font-bold">
        Admin Panel
      </h1>
    </AppShell>
  );
}