import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("invite_token", token)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Invalid invite" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}