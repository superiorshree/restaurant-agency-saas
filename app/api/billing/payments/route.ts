import { NextResponse } from "next/server";
import { requireBusiness } from "@/lib/services/auth.service";
import { paymentInputSchema, recordPayment } from "@/lib/services/billing.service";
export async function POST(request: Request) { const { business } = await requireBusiness(); const parsed = paymentInputSchema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Invalid payment." }, { status: 400 }); try { return NextResponse.json({ payment: await recordPayment(business.id, parsed.data) }, { status: 201 }); } catch { return NextResponse.json({ error: "Unable to record payment." }, { status: 500 }); } }
