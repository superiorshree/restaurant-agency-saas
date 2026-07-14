"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BusinessTypeSelect } from "./business-type-select";

interface BusinessType {
  id: string;
  name: string;
}

interface Business {
  name: string;
  business_type_id: string | null;
}

interface Props {
  businessTypes: BusinessType[];
  business: Business;
}

export function BusinessForm({
  businessTypes,
  business,
}: Props) {
  const [name, setName] = useState(business.name ?? "");
  const [businessType, setBusinessType] = useState(
    business.business_type_id ?? ""
  );

  async function save() {
    await fetch("/api/business", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        business_type_id: businessType,
      }),
    });

    alert("Saved");
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Business Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <BusinessTypeSelect
        types={businessTypes}
        value={businessType}
        onChange={setBusinessType}
      />

      <Button onClick={save}>
        Save
      </Button>
    </div>
  );
}