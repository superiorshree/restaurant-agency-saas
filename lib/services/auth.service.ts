import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentBusiness } from "./business.service";

export async function requireUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return user;
}

export async function requireBusiness() {
  const user = await requireUser();

  const business = await getCurrentBusiness(user.id);

  if (!business) redirect("/business");

  return { user, business };
}

export async function requireSuperAdmin() {
  const { business } = await requireBusiness();

  if (business.role !== "super_admin") {
    redirect("/dashboard");
  }

  return business;
}