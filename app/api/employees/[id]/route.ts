import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireBusiness } from "@/lib/services/auth.service";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireBusiness();

  const { id } = await params;

  const supabase = await createClient();

  const { error } = await supabase
    .from("employees")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({ success: true });
}