import { NextResponse } from "next/server";
import { requireBusiness } from "@/lib/services/auth.service";
import { deleteDomain, domainInputSchema, updateDomain } from "@/lib/services/domain.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteContext) {
  const { business } = await requireBusiness();
  const parsed = domainInputSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Provide valid domain details." }, { status: 400 });

  try {
    const { id } = await params;
    const domain = await updateDomain(business.id, id, parsed.data);
    if (!domain) return NextResponse.json({ error: "Domain not found." }, { status: 404 });
    return NextResponse.json({ domain });
  } catch {
    return NextResponse.json({ error: "Unable to update the domain." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { business } = await requireBusiness();
  try {
    const { id } = await params;
    const deleted = await deleteDomain(business.id, id);
    if (!deleted) return NextResponse.json({ error: "Domain not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete the domain." }, { status: 500 });
  }
}
