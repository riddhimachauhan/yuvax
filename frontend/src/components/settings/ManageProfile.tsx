// components/settings/ManageProfile.tsx
"use client";

import React, { useState, ChangeEvent } from "react";
import { ChevronDown, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ProfileData {
  name: string;
  parents: string;
  email: string;
  phone: string;
  dob: string;
  zone: string;
  country: string;
}

export default function ManageProfile() {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState<ProfileData>({
    name: "Garlic",
    parents: "Potato",
    email: "garlicsingh@gmail.com",
    phone: "xxxxxxxxx",
    dob: "dd/mm/yy",
    zone: "south-asia",
    country: "india",
  });

  const onChange =
    (key: keyof ProfileData) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <section className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
      <header
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-orange-500 rounded" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Manage Profile
          </h2>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </header>

      {open && (
        <div className="px-6 pb-6 space-y-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">
            Student Information
          </h3>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <div className="relative">
              <Input
                value={data.name}
                onChange={onChange("name")}
                className="pr-10 text-gray-900 bg-white border-gray-200"
              />
              <Edit className="absolute right-3 top-1/2 w-4 h-4 text-gray-400 -translate-y-1/2" />
            </div>
          </div>

          {/* Parents Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Parents Name
            </label>
            <div className="relative">
              <Input
                value={data.parents}
                onChange={onChange("parents")}
                className="pr-10 text-gray-900 bg-white border-gray-200"
              />
              <Edit className="absolute right-3 top-1/2 w-4 h-4 text-gray-400 -translate-y-1/2" />
            </div>
          </div>

          {/* Email, Phone, DOB */}
          <div className="grid grid-cols-3 gap-4">
            {(
              [
                ["email", "Email"],
                ["phone", "Phone number"],
                ["dob", "Date of birth"],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  {label}
                </label>
                <div className="relative">
                  <Input
                    value={data[key]}
                    onChange={onChange(key)}
                    placeholder={key === "dob" ? "dd/mm/yy" : ""}
                    className="pr-10 text-gray-900 bg-white border-gray-200"
                  />
                  <Edit className="absolute right-3 top-1/2 w-4 h-4 text-gray-400 -translate-y-1/2" />
                </div>
              </div>
            ))}
          </div>

          {/* Zone / Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Zone
              </label>
              <Select
                value={data.zone}
                onValueChange={(v) => setData((d) => ({ ...d, zone: v }))}
              >
                <SelectTrigger className="text-gray-900 bg-white border-gray-200">
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="south-asia">South Asia</SelectItem>
                  <SelectItem value="north-asia">North Asia</SelectItem>
                  <SelectItem value="southeast-asia">
                    Southeast Asia
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Country
              </label>
              <Select
                value={data.country}
                onValueChange={(v) => setData((d) => ({ ...d, country: v }))}
              >
                <SelectTrigger className="text-gray-900 bg-white border-gray-200">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                  <SelectItem value="bangladesh">Bangladesh</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
