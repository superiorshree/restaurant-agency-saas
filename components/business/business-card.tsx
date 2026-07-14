import { Building2 } from "lucide-react";
import Image from "next/image";
interface Props {
  name: string;
  owner: string;
  email: string;
  logo?: string | null;
}

export function BusinessCard({
  name,
  owner,
  email,
  logo,
}: Props)  {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-4">
       {logo ? (
  <Image
    src={logo}
    alt={name}
    width={60}
    height={60}
    className="rounded-xl object-cover"
  />
) : (
  <Building2 size={28} />
)}

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