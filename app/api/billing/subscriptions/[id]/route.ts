import { NextResponse } from "next/server";
import { requireBusiness } from "@/lib/services/auth.service";
import { subscriptionUpdateSchema, updateSubscription } from "@/lib/services/billing.service";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { business } = await requireBusiness();
  const parsed = subscriptionUpdateSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid subscription update." }, { status: 400 });
  const { id } = await params;
  const subscription = await updateSubscription(business.id, id, parsed.data);
  return subscription ? NextResponse.json({ subscription }) : NextResponse.json({ error: "Subscription not found." }, { status: 404 });
}
