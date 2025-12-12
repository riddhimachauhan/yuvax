// components/settings/NotificationSettings.tsx
"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationSettings() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
      <header
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-blue-500 rounded" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Notification Settings
          </h2>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </header>
      {open && (
        <div className="p-6 border-t space-y-4">
          <p className="text-gray-600">
            Configure your notification preferences.
          </p>
          <Button variant="outline">Save Preferences</Button>
        </div>
      )}
    </section>
  );
}
