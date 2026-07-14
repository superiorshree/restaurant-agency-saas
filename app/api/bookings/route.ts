import { NextResponse } from "next/server";
import { admin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const supabase = admin;

  const apiKey = request.headers.get("x-api-key");

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing API Key" },
      { status: 401 }
    );
  }

const { data: key, error: keyError } = await supabase
  .from("api_keys")
  .select("*")
  .eq("api_key", apiKey)
  .single();

console.log("Received:", apiKey);
console.log("Database:", key);
console.log("Error:", keyError);

  if (!key || key.status !== "Active") {
    return NextResponse.json(
      { error: "Invalid API Key" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const { error } = await supabase
    .from("bookings")
    .insert({
      business_id: key.business_id,
      customer_name: body.customerName,
      phone: body.phone,
      email: body.email,
      service: body.service,
      booking_date: body.bookingDate,
      booking_time: body.bookingTime,
      guests: body.guests,
      notes: body.notes,
    });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({
    success: true,
  });
}