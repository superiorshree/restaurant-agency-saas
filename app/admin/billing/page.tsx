import { AppShell } from "@/components/layout/app-shell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireSuperAdmin } from "@/lib/services/auth.service";
import { getAdminBillingMetrics } from "@/lib/services/billing.service";
export default async function AdminBillingPage() { await requireSuperAdmin(); const metrics = await getAdminBillingMetrics(); return <AppShell><div className="space-y-8"><div><h1 className="text-3xl font-bold">Billing</h1><p className="mt-1 text-muted-foreground">Revenue and subscription health.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric title="Monthly revenue" value={`₹${metrics.monthlyRevenue}`} /><Metric title="Active plans" value={String(metrics.activePlans)} /><Metric title="Expired plans" value={String(metrics.expiredPlans)} /><Metric title="Failed payments" value={String(metrics.failedPayments)} /></div></div></AppShell>; }
function Metric({ title, value }: { title: string; value: string }) { return <Card><CardHeader><CardDescription>{title}</CardDescription><CardTitle>{value}</CardTitle></CardHeader></Card>; }
