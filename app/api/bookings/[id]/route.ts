import { NextResponse } from "next/server";
import { admin } from "@/lib/supabase/admin";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const { error } = await admin
    .from("bookings")
    .update({
      status: body.status,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({
    success: true,
  });
}