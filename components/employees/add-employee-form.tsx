"use client";

import { useState } from "react";

export function AddEmployeeForm() {
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.currentTarget);

    await fetch("/api/employees", {
      method: "POST",
      body: JSON.stringify({
        full_name: form.get("full_name"),
        email: form.get("email"),
        phone: form.get("phone"),
        role: form.get("role"),
      }),
    });

    location.reload();
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-xl border p-6"
    >
      <input
        name="full_name"
        placeholder="Full Name"
        className="w-full border rounded p-2"
      />

      <input
        name="email"
        placeholder="Email"
        className="w-full border rounded p-2"
      />

      <input
        name="phone"
        placeholder="Phone"
        className="w-full border rounded p-2"
      />

      <select
        name="role"
        className="w-full border rounded p-2"
      >
        <option value="staff">Staff</option>
        <option value="manager">Manager</option>
      </select>

      <button
        className="rounded bg-black text-white px-4 py-2"
        disabled={loading}
      >
        Add Employee
      </button>
    </form>
  );
}