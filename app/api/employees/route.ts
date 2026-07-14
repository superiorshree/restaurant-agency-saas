import { NextResponse } from "next/server";
import { requireBusiness } from "@/lib/services/auth.service";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { business } = await requireBusiness();

  const body = await request.json();

  const supabase = await createClient();

  const { error } = await supabase
    .from("employees")
    .insert({
  business_id: business.id,
  full_name: body.full_name,
  email: body.email,
  phone: body.phone,
  role: body.role,
  invite_status: "Pending",
  invited_at: new Date().toISOString(),
})
.select()
.single();

if (error) {
  console.error(error);
 if (error) {
  console.log("SUPABASE ERROR:", JSON.stringify(error, null, 2));

  return NextResponse.json(
    {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    },
    { status: 500 }
  );
};
}}