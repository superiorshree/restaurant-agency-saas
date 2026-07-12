import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <AppShell>
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          {user.email}
        </p>
      </div>
    </AppShell>
  );
}