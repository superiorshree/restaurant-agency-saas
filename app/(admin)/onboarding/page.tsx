import { AppShell } from "@/components/layout/app-shell";
import { OnboardingStepper } from "@/components/onboarding/onboarding-stepper";
export default function OnboardingPage() {
  return (
    <AppShell>
      <div className="space-y-8">
       <OnboardingStepper currentStep={1} />

<div className="rounded-xl border p-6 mt-6">
  Step 1 Content
</div>
      </div>
    </AppShell>
  );
}