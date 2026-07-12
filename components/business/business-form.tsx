"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function BusinessForm() {
  const [name, setName] = useState("");

  async function save() {
    await fetch("/api/business", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    alert("Saved");
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Business Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <Button onClick={save}>
        Save
      </Button>
    </div>
  );
}