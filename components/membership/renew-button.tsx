"use client";

import { Button } from "@/components/ui/button";

export function RenewButton() {
  async function renew() {
    alert("Razorpay integration coming next.");
  }

  return (
    <Button onClick={renew}>
      Renew Membership
    </Button>
  );
}