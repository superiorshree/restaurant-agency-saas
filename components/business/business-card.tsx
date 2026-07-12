import { Building2 } from "lucide-react";

interface Props {
  name: string;
  owner: string;
  email: string;
}

export function BusinessCard({
  name,
  owner,
  email,
}: Props) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Building2 size={28} />

        <div>
          <h2 className="text-xl font-semibold">
            {name}
          </h2>

          <p className="text-muted-foreground">
            {owner}
          </p>

          <p className="text-sm">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
}