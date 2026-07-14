import { NextResponse } from "next/server";
import { requireBusiness } from "@/lib/services/auth.service";
import { deleteWebsite, updateWebsite, websiteInputSchema } from "@/lib/services/website.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteContext) {
  const { business } = await requireBusiness();
  const parsed = websiteInputSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Provide valid website details." }, { status: 400 });
  }

  try {
    const { id } = await params;
    const website = await updateWebsite(business.id, id, parsed.data);

    if (!website) return NextResponse.json({ error: "Website not found." }, { status: 404 });

    return NextResponse.json({ website });
  } catch {
    return NextResponse.json({ error: "Unable to update the website." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { business } = await requireBusiness();

  try {
    const { id } = await params;
    const deleted = await deleteWebsite(business.id, id);

    if (!deleted) return NextResponse.json({ error: "Website not found." }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete the website." }, { status: 500 });
  }
}
