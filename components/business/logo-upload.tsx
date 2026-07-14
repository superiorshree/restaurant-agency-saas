"use client";

import { ChangeEvent } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export function LogoUpload() {
const supabase = createClient();

  async function upload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("business-assets")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      return;
    }

    const {
  data: { publicUrl },
} = supabase.storage
  .from("business-assets")
  .getPublicUrl(fileName);

await fetch("/api/business", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    logo: publicUrl,
  }),
});

alert("Logo uploaded");
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={upload}
    />
  );
}