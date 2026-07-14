"use client";

import { useState } from "react";

export function AddDomainForm() {
  const [domain, setDomain] = useState("");
  const [provider, setProvider] = useState("");

  async function save() {
    await fetch("/api/domains", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain,
        provider,
      }),
    });

    location.reload();
  }

  return (
    <div className="space-y-4 rounded-xl border p-6">
      <input
        className="w-full rounded border p-2"
        placeholder="example.com"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />

      <input
        className="w-full rounded border p-2"
        placeholder="Cloudflare / GoDaddy / Namecheap"
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
      />

      <button
        onClick={save}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Add Domain
      </button>
    </div>
  );
}