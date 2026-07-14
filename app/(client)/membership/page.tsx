import { redirect } from "next/navigation";
import { MembershipCard } from "@/components/membership/membership-card";
import { AppShell } from "@/components/layout/app-shell";
import { createClient } from "@/lib/supabase/server";
import { RenewButton } from "@/components/membership/renew-button";
import { ExpiryBanner } from "@/components/membership/expiry-banner";
import {
  getCurrentBusiness,} from "@/lib/services/business.service";
import { getMembership,} from "@/lib/services/membership.service";
export default async function MembershipPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

const business = await getCurrentBusiness(user.id);

const membership = await getMembership(business.id);
if (!business) {
  return (
    <AppShell>
      <h1 className="text-2xl font-bold">
        Business not found
      </h1>
    </AppShell>
  );
}
  return (
    <AppShell>
        <ExpiryBanner
  renewalDate={membership.renewal_date}
/>
      <MembershipCard
  plan={membership.plan}
  status={membership.status}
  renewal={membership.renewal_date}
  payment={membership.payment_status}
  price={membership.price}
/>
<RenewButton />
    </AppShell>
  );
}