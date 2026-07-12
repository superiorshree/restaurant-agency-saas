import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const { error } = await supabase
    .from("businesses")
    .update(body)
    .eq("owner_id", user.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({
    success: true,
  });
}