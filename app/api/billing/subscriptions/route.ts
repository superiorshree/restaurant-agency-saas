import { NextResponse } from "next/server";
import { requireBusiness } from "@/lib/services/auth.service";
import { createSubscription, subscriptionInputSchema } from "@/lib/services/billing.service";
export async function POST(request: Request) { const { business } = await requireBusiness(); const parsed = subscriptionInputSchema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Invalid subscription." }, { status: 400 }); try { return NextResponse.json({ subscription: await createSubscription(business.id, parsed.data) }, { status: 201 }); } catch { return NextResponse.json({ error: "Unable to create subscription." }, { status: 500 }); } }
