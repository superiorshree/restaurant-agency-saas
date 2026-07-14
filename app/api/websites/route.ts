import { NextResponse } from "next/server";
import { requireBusiness } from "@/lib/services/auth.service";
import { createWebsite, websiteInputSchema } from "@/lib/services/website.service";

export async function POST(request: Request) {
  const { business } = await requireBusiness();
  const parsed = websiteInputSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Provide valid website details." }, { status: 400 });
  }

  try {
    const website = await createWebsite(business.id, parsed.data);
    return NextResponse.json({ website }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create the website." }, { status: 500 });
  }
}
