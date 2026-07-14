import { redirect } from "next/navigation";
import { BusinessForm } from "@/components/business/business-form";
import { AppShell } from "@/components/layout/app-shell";
import { BusinessCard } from "@/components/business/business-card";
import { LogoUpload } from "@/components/business/logo-upload";
import { InfrastructureOverview } from "@/components/business/infrastructure-overview";
import { createClient } from "@/lib/supabase/server";
 import { getCurrentBusiness } from "@/lib/services/business.service";
 import { getBusinessTypes } from "@/lib/services/business-type.service";
 import { getInfrastructureOverview } from "@/lib/services/infrastructure.service";

export default async function BusinessPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

const business = await getCurrentBusiness(user.id);
const businessTypes = await getBusinessTypes();

if (!business) {
    return (
      <AppShell>
        <h1 className="text-2xl font-bold">
          No Business Found
        </h1>
      </AppShell>
    );
  }

const infrastructure = await getInfrastructureOverview(
  business.id,
  business.business_type_id,
  businessTypes
);

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
  logo={business.logo}
/>
        <InfrastructureOverview overview={infrastructure} />
        <BusinessForm
  businessTypes={businessTypes}
  business={business}
/>
        <LogoUpload />
      </div>
    </AppShell>
  );
}
