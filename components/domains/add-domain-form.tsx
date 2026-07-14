"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DNS_RECORD_TYPES, DNS_STATUSES, DOMAIN_STATUSES, VERIFICATION_STATUSES } from "@/lib/constants/domains";
import type { DnsRecord, Domain } from "@/lib/services/domain.service";

interface DomainFormProps { domainRecord?: Domain; }
const emptyRecord: DnsRecord = { type: "A", name: "@", value: "", ttl: 3600, priority: null };

export function DomainForm({ domainRecord }: DomainFormProps) {
  const router = useRouter();
  const [records, setRecords] = useState<DnsRecord[]>(domainRecord?.dns_records ?? []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateRecord(index: number, field: keyof DnsRecord, value: string) {
    setRecords((current) => current.map((record, recordIndex) => {
      if (recordIndex !== index) return record;
      if (field === "ttl" || field === "priority") return { ...record, [field]: value === "" ? null : Number(value) };
      return { ...record, [field]: value } as DnsRecord;
    }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    const response = await fetch(domainRecord ? `/api/domains/${domainRecord.id}` : "/api/domains", {
      method: domainRecord ? "PATCH" : "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        domain: formData.get("domain"), registrar: formData.get("registrar"), provider: formData.get("provider"),
        purchase_date: formData.get("purchase_date"), expiry_date: formData.get("expiry_date"),
        auto_renewal: formData.get("auto_renewal") === "on", status: formData.get("status"),
        ssl_enabled: formData.get("ssl_enabled") === "on", ssl_expiry: formData.get("ssl_expiry"),
        dns_status: formData.get("dns_status"), verification_status: formData.get("verification_status"), dns_records: records,
      }),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? "Unable to save the domain. Please try again.");
      setIsSubmitting(false);
      return;
    }
    if (domainRecord) router.refresh();
    else {
      const { domain } = (await response.json()) as { domain: Domain };
      router.push(`/domains/${domain.id}`);
    }
  }

  return <form onSubmit={submit} className="space-y-6">
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Domain" name="domain" defaultValue={domainRecord?.domain} placeholder="example.com" required />
      <Field label="Registrar" name="registrar" defaultValue={domainRecord?.registrar} placeholder="GoDaddy" required />
      <Field label="DNS provider" name="provider" defaultValue={domainRecord?.provider} placeholder="Cloudflare" required />
      <SelectField label="Status" name="status" values={DOMAIN_STATUSES} defaultValue={domainRecord?.status ?? "Pending"} />
      <Field label="Purchase date" name="purchase_date" type="date" defaultValue={domainRecord?.purchase_date ?? ""} />
      <Field label="Expiry date" name="expiry_date" type="date" defaultValue={domainRecord?.expiry_date ?? ""} />
      <Field label="SSL expiry" name="ssl_expiry" type="date" defaultValue={domainRecord?.ssl_expiry ?? ""} />
      <SelectField label="DNS status" name="dns_status" values={DNS_STATUSES} defaultValue={domainRecord?.dns_status ?? "Pending"} />
      <SelectField label="Verification" name="verification_status" values={VERIFICATION_STATUSES} defaultValue={domainRecord?.verification_status ?? "Pending"} />
    </div>
    <div className="flex flex-wrap gap-6 rounded-lg border border-border bg-muted/30 p-4">
      <Checkbox label="Auto renewal" name="auto_renewal" defaultChecked={domainRecord?.auto_renewal ?? false} />
      <Checkbox label="SSL enabled" name="ssl_enabled" defaultChecked={domainRecord?.ssl_enabled ?? false} />
    </div>
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4"><div><h3 className="font-medium">DNS records</h3><p className="text-sm text-muted-foreground">Add records required to connect this domain.</p></div><Button type="button" variant="outline" size="sm" onClick={() => setRecords((current) => [...current, { ...emptyRecord }])}>Add record</Button></div>
      {records.length ? <div className="space-y-3">{records.map((record, index) => <div key={index} className="grid gap-3 rounded-lg border p-3 md:grid-cols-[100px_1fr_1fr_100px_100px_auto]">
        <select aria-label="Record type" value={record.type} onChange={(event) => updateRecord(index, "type", event.target.value)} className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm">{DNS_RECORD_TYPES.map((type) => <option key={type}>{type}</option>)}</select>
        <Input aria-label="Record name" value={record.name} onChange={(event) => updateRecord(index, "name", event.target.value)} placeholder="@" />
        <Input aria-label="Record value" value={record.value} onChange={(event) => updateRecord(index, "value", event.target.value)} placeholder="Value" />
        <Input aria-label="TTL" type="number" min="60" value={record.ttl} onChange={(event) => updateRecord(index, "ttl", event.target.value)} />
        <Input aria-label="Priority" type="number" min="0" value={record.priority ?? ""} onChange={(event) => updateRecord(index, "priority", event.target.value)} placeholder="Priority" />
        <Button type="button" variant="ghost" size="sm" onClick={() => setRecords((current) => current.filter((_, recordIndex) => recordIndex !== index))}>Remove</Button>
      </div>)}</div> : <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">No DNS records added.</p>}
    </div>
    {error ? <p className="text-sm text-destructive">{error}</p> : null}
    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : domainRecord ? "Save changes" : "Add domain"}</Button>
  </form>;
}

export function AddDomainForm() { return <DomainForm />; }

function Field({ label, name, type = "text", defaultValue, placeholder, required = false }: { label: string; name: string; type?: string; defaultValue?: string; placeholder?: string; required?: boolean }) {
  return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} required={required} /></div>;
}
function SelectField({ label, name, values, defaultValue }: { label: string; name: string; values: readonly string[]; defaultValue: string }) {
  return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><select id={name} name={name} defaultValue={defaultValue} className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">{values.map((value) => <option key={value}>{value}</option>)}</select></div>;
}
function Checkbox({ label, name, defaultChecked }: { label: string; name: string; defaultChecked: boolean }) {
  return <label className="flex items-center gap-2 text-sm font-medium"><input name={name} type="checkbox" defaultChecked={defaultChecked} className="size-4 rounded border-input" />{label}</label>;
}
