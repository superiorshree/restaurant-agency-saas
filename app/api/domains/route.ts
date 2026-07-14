import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireBusiness } from "@/lib/services/auth.service";

export async function POST(request: Request) {
  const { business } = await requireBusiness();

  const body = await request.json();

  const supabase = await createClient();

  const { error } = await supabase
    .from("domains")
    .insert({
      business_id: business.id,
      domain: body.domain,
      provider: body.provider,
    });

 if (error) {
  console.log("DOMAIN ERROR:", JSON.stringify(error, null, 2));

  return NextResponse.json(
    {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    },
    { status: 500 }
  );
}

  return NextResponse.json({
    success: true,
  });
}