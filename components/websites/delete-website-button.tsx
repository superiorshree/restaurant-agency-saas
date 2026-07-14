"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function DeleteWebsiteButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function removeWebsite() {
    if (!window.confirm("Delete this website? This cannot be undone.")) return;

    setIsDeleting(true);
    const response = await fetch(`/api/websites/${id}`, { method: "DELETE" });

    if (response.ok) {
      router.push("/websites");
      router.refresh();
      return;
    }

    setIsDeleting(false);
  }

  return <Button type="button" variant="destructive" onClick={removeWebsite} disabled={isDeleting}>{isDeleting ? "Deleting..." : "Delete website"}</Button>;
}
