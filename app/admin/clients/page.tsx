import { AppShell } from "@/components/layout/app-shell";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminClientsPage() {
  const supabase = await createClient();

  const { data: businesses } = await supabase
    .from("businesses")
    .select("id,name,owner,email,role")
    .order("created_at", { ascending: false });

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Clients
        </h1>

        <div className="rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted border-b">
              <tr>
                <th className="p-4 text-left">Business</th>
                <th className="p-4 text-left">Owner</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
              </tr>
            </thead>

            <tbody>
              {businesses?.map((business) => (
                <tr key={business.id} className="border-b">
                  <td className="p-4">
  <Link
    href={`/admin/clients/${business.id}`}
    className="text-blue-600 hover:underline"
  >
    {business.name}
  </Link>
</td>
                  <td className="p-4">{business.owner}</td>
                  <td className="p-4">{business.email}</td>
                  <td className="p-4">{business.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}