"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function DeleteDomainButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  async function deleteCurrentDomain() {
    if (!window.confirm("Delete this domain? This cannot be undone.")) return;
    setIsDeleting(true);
    const response = await fetch(`/api/domains/${id}`, { method: "DELETE" });
    if (response.ok) { router.push("/domains"); router.refresh(); return; }
    setIsDeleting(false);
  }
  return <Button type="button" variant="destructive" onClick={deleteCurrentDomain} disabled={isDeleting}>{isDeleting ? "Deleting..." : "Delete domain"}</Button>;
}
