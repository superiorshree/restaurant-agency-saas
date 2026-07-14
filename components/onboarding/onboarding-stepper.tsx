"use client";

interface Props {
  currentStep: number;
}

const steps = [
  "Business",
  "Type",
  "Plan",
  "Domain",
  "Website",
];

export function OnboardingStepper({
  currentStep,
}: Props) {
  return (
    <div className="flex gap-4">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`rounded-lg border px-4 py-2 ${
            index + 1 === currentStep
              ? "bg-black text-white"
              : ""
          }`}
        >
          {index + 1}. {step}
        </div>
      ))}
    </div>
  );
}