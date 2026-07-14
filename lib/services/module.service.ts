import { BUSINESS_MODULES } from "@/lib/constants/modules";

export function getModules(slug: string) {
  return (
    BUSINESS_MODULES[
      slug as keyof typeof BUSINESS_MODULES
    ] ?? []
  );
}