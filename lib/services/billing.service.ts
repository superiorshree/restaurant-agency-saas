import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export const subscriptionInputSchema = z.object({ plan_id: z.string().uuid(), billing_cycle: z.enum(["monthly", "yearly"]), auto_renew: z.boolean(), status: z.enum(["Active", "Trial", "Expired", "Suspended", "Cancelled"]), start_date: z.string().date(), renewal_date: z.string().date() });
export const subscriptionUpdateSchema = z.object({ status: z.enum(["Active", "Trial", "Expired", "Suspended", "Cancelled"]), auto_renew: z.boolean() });
export const paymentInputSchema = z.object({ invoice_id: z.string().uuid(), transaction_id: z.string().trim().min(1).max(120), amount: z.coerce.number().positive(), currency: z.string().length(3).default("INR"), method: z.string().trim().min(1).max(50), status: z.enum(["Success", "Failed", "Pending", "Refunded"]), provider: z.literal("razorpay").default("razorpay") });

export type Subscription = { id: string; business_id: string; plan_id: string; billing_cycle: "monthly" | "yearly"; status: string; start_date: string; renewal_date: string; auto_renew: boolean; plan?: Plan | null };
export type Plan = { id: string; name: string; monthly_price: number; yearly_price: number; features: string[]; limits: Record<string, number> };
export type Invoice = { id: string; business_id: string; invoice_number: string; plan_name: string; subtotal: number; gst_amount: number; amount: number; due_date: string; paid_date: string | null; status: string; currency: string };

export async function getPlans() { const supabase = await createClient(); const { data, error } = await supabase.from("subscription_plans").select("*").order("monthly_price"); if (error) throw error; return (data ?? []) as Plan[]; }
export async function getBillingOverview(businessId: string) {
  const supabase = await createClient();
  const [{ data: subscription, error: subscriptionError }, { data: invoices, error: invoicesError }] = await Promise.all([
    supabase.from("subscriptions").select("*, plan:subscription_plans(*)").eq("business_id", businessId).order("created_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("invoices").select("*").eq("business_id", businessId).order("created_at", { ascending: false }),
  ]);
  if (subscriptionError) throw subscriptionError; if (invoicesError) throw invoicesError;
  const typedSubscription = subscription as Subscription | null;
  const daysRemaining = typedSubscription ? Math.max(0, Math.ceil((new Date(`${typedSubscription.renewal_date}T00:00:00`).getTime() - Date.now()) / 86_400_000)) : null;
  return { subscription: typedSubscription, invoices: (invoices ?? []) as Invoice[], daysRemaining };
}
export async function createSubscription(businessId: string, input: z.infer<typeof subscriptionInputSchema>) {
  const supabase = await createClient();
  const { data: plan, error: planError } = await supabase.from("subscription_plans").select("*").eq("id", input.plan_id).single(); if (planError) throw planError;
  const { error: previousError } = await supabase.from("subscriptions").update({ status: "Cancelled", auto_renew: false }).eq("business_id", businessId).in("status", ["Active", "Trial", "Suspended"]); if (previousError) throw previousError;
  const { data: subscription, error } = await supabase.from("subscriptions").insert({ business_id: businessId, ...input }).select("*").single(); if (error) throw error;
  const baseAmount = input.billing_cycle === "yearly" ? plan.yearly_price : plan.monthly_price; const gstAmount = Number((baseAmount * 0.18).toFixed(2));
  const invoiceNumber = `INV-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const { error: invoiceError } = await supabase.from("invoices").insert({ business_id: businessId, subscription_id: subscription.id, invoice_number: invoiceNumber, plan_name: plan.name, subtotal: baseAmount, gst_amount: gstAmount, amount: baseAmount + gstAmount, due_date: input.renewal_date, status: "Pending", currency: "INR" }); if (invoiceError) throw invoiceError;
  return subscription as Subscription;
}
export async function updateSubscription(businessId: string, subscriptionId: string, input: z.infer<typeof subscriptionUpdateSchema>) { const supabase = await createClient(); const { data, error } = await supabase.from("subscriptions").update(input).eq("business_id", businessId).eq("id", subscriptionId).select("*").maybeSingle(); if (error) throw error; if (!data) return null; if (input.status === "Cancelled") await createBillingNotification(businessId, "Membership Cancelled", "Your membership has been cancelled."); return data as Subscription; }
export async function getInvoice(businessId: string, invoiceId: string) { const supabase = await createClient(); const { data, error } = await supabase.from("invoices").select("*").eq("business_id", businessId).eq("id", invoiceId).maybeSingle(); if (error) throw error; return data as Invoice | null; }
export async function recordPayment(businessId: string, input: z.infer<typeof paymentInputSchema>) {
  const supabase = await createClient();
  const { data: invoice, error: invoiceError } = await supabase.from("invoices").select("*").eq("id", input.invoice_id).eq("business_id", businessId).single(); if (invoiceError) throw invoiceError;
  const { data: payment, error } = await supabase.from("payments").insert({ business_id: businessId, ...input }).select("*").single(); if (error) throw error;
  if (input.status === "Success") { const { error: updateError } = await supabase.from("invoices").update({ status: "Paid", paid_date: new Date().toISOString().slice(0, 10) }).eq("id", invoice.id); if (updateError) throw updateError; await createBillingNotification(businessId, "Payment Success", `Payment received for invoice ${invoice.invoice_number}.`); }
  if (input.status === "Failed") await createBillingNotification(businessId, "Payment Failed", `Payment failed for invoice ${invoice.invoice_number}.`);
  return payment;
}
export async function createBillingNotification(businessId: string, type: string, message: string) { const supabase = await createClient(); const { error } = await supabase.from("billing_notifications").insert({ business_id: businessId, type, message }); if (error) throw error; }
export async function getAdminBillingMetrics() {
  const supabase = await createClient(); const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);
  const [{ data: paid }, { count: activePlans }, { count: expiredPlans }, { count: failedPayments }] = await Promise.all([
    supabase.from("invoices").select("amount").eq("status", "Paid").gte("paid_date", monthStart), supabase.from("subscriptions").select("*", { count: "exact", head: true }).eq("status", "Active"), supabase.from("subscriptions").select("*", { count: "exact", head: true }).eq("status", "Expired"), supabase.from("payments").select("*", { count: "exact", head: true }).eq("status", "Failed"),
  ]); return { monthlyRevenue: (paid ?? []).reduce((total, invoice) => total + Number(invoice.amount), 0), activePlans: activePlans ?? 0, expiredPlans: expiredPlans ?? 0, failedPayments: failedPayments ?? 0 };
}
