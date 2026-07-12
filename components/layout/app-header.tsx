"use client";

import { Bell, Search, Moon } from "lucide-react";

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <h2 className="text-lg font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <Search size={20} />
        <Bell size={20} />
        <Moon size={20} />
      </div>
    </header>
  );
}