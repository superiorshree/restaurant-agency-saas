import { BUSINESS_TEMPLATES } from "@/lib/templates/business-templates";

export function getTemplates(slug: string) {
  return (
    BUSINESS_TEMPLATES[
      slug as keyof typeof BUSINESS_TEMPLATES
    ] ?? []
  );
}