"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WEBSITE_PLATFORMS, WEBSITE_STATUSES } from "@/lib/constants/websites";
import type { Website } from "@/lib/services/website.service";
import type { Domain } from "@/lib/services/domain.service";

interface WebsiteFormProps {
  website?: Website;
  domains: Pick<Domain, "id" | "domain">[];
}

export function WebsiteForm({ website, domains }: WebsiteFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await fetch(website ? `/api/websites/${website.id}` : "/api/websites", {
      method: website ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform: formData.get("platform"),
        status: formData.get("status"),
        dashboard_url: formData.get("dashboard_url"),
        website_url: formData.get("website_url"),
        notes: formData.get("notes") || null,
        domain_id: formData.get("domain_id"),
      }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? "Unable to save the website. Please try again.");
      setIsSubmitting(false);
      return;
    }

    if (website) {
      router.refresh();
    } else {
      const createdWebsite = (await response.json()) as { website: Website };
      router.push(`/websites/${createdWebsite.website.id}`);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="platform">Platform</Label>
          <select id="platform" name="platform" defaultValue={website?.platform ?? "Wix"} className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
            {WEBSITE_PLATFORMS.map((platform) => <option key={platform}>{platform}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select id="status" name="status" defaultValue={website?.status ?? "Draft"} className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
            {WEBSITE_STATUSES.map((status) => <option key={status}>{status}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="domain_id">Linked domain</Label>
        <select id="domain_id" name="domain_id" defaultValue={website?.domain_id ?? ""} className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
          <option value="">No domain linked</option>
          {domains.map((domain) => <option key={domain.id} value={domain.id}>{domain.domain}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="website_url">Production URL</Label>
        <Input id="website_url" name="website_url" type="url" placeholder="https://example.com" defaultValue={website?.website_url ?? ""} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dashboard_url">Website dashboard URL</Label>
        <Input id="dashboard_url" name="dashboard_url" type="url" placeholder="https://manage.example.com" defaultValue={website?.dashboard_url ?? ""} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <textarea id="notes" name="notes" rows={4} maxLength={2000} defaultValue={website?.notes ?? ""} className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" placeholder="Deployment, access, or maintenance notes" />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : website ? "Save changes" : "Create website"}</Button>
    </form>
  );
}
