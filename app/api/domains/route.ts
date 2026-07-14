import { NextResponse } from "next/server";
import { requireBusiness } from "@/lib/services/auth.service";
import { createDomain, domainInputSchema } from "@/lib/services/domain.service";

export async function POST(request: Request) {
  const { business } = await requireBusiness();
  const parsed = domainInputSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Provide valid domain details." }, { status: 400 });

  try {
    const domain = await createDomain(business.id, parsed.data);
    return NextResponse.json({ domain }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create the domain." }, { status: 500 });
  }
}
