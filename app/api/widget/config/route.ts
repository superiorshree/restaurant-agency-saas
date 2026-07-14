import { NextResponse } from "next/server";
import { admin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const apiKey = searchParams.get("apiKey");

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing API Key" },
      { status: 400 }
    );
  }

  const { data } = await admin
    .from("api_keys")
    .select(`
      business_id,
      businesses (
        id,
        name
      )
    `)
    .eq("api_key", apiKey)
    .single();

  if (!data) {
    return NextResponse.json(
      { error: "Invalid API Key" },
      { status: 401 }
    );
  }

  return NextResponse.json(data);
}