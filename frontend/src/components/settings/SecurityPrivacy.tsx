// components/settings/SecurityPrivacy.tsx
"use client";

import React, { useState, ChangeEvent } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/store/api/authApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

interface Passwords {
  oldPass: string;
  newPass: string;
  confirm: string;
}

export default function SecurityPrivacy() {
  const [open, setOpen] = useState(false);
  const [passwords, setPasswords] = useState<Passwords>({
    oldPass: "",
    newPass: "",
    confirm: "",
  });

  const [resetPassword, { isLoading: resetting }] = useResetPasswordMutation();

  const onChange =
    (key: keyof Passwords) => (e: ChangeEvent<HTMLInputElement>) =>
      setPasswords((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));

  const handleChangePassword = async () => {
    if (!passwords.oldPass || !passwords.newPass || !passwords.confirm) {
      alert("Please fill all fields.");
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      alert("New password and confirm must match.");
      return;
    }

    try {
      // Calls your API: { currentPassword, newPassword }
      await resetPassword({
        currentPassword: passwords.oldPass,
        newPassword: passwords.newPass,
      }).unwrap();
      alert("Password updated.");
      setPasswords({ oldPass: "", newPass: "", confirm: "" });
    } catch (err) {
      const error = err as FetchBaseQueryError | SerializedError | undefined;
      let msg = "Update failed.";

      // RTK Query network error shape: { data: { message?: string } } or data: string
      if (error && "data" in error && error.data) {
        const d = error.data as { message?: string } | string;
        if (typeof d === "string") msg = d;
        else msg = (d as { message?: string }).message ?? msg;
      } else if (
        error &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        msg = error.message;
      }

      alert(msg);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
      <header
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-yellow-500 rounded" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Security and Privacy
          </h2>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </header>

      {open && (
        <div className="p-6 border-t space-y-6">
          <h3 className="text-base font-semibold text-gray-800">
            Password Change
          </h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Old Password
              </label>
              <Input
                type="password"
                value={passwords.oldPass}
                onChange={onChange("oldPass")}
                className="text-gray-900 bg-white border-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                New Password
              </label>
              <Input
                type="password"
                value={passwords.newPass}
                onChange={onChange("newPass")}
                className="text-gray-900 bg-white border-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Re-enter Password
              </label>
              <Input
                type="password"
                value={passwords.confirm}
                onChange={onChange("confirm")}
                className="text-gray-900 bg-white border-gray-200"
              />
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-green-600 text-white px-6"
                onClick={handleChangePassword}
                disabled={resetting}
              >
                {resetting ? "Updating..." : "Change Password"}
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              Terms & Conditions
            </h3>
            <p className="text-gray-600">
              Read and accept our terms and conditions to continue using the
              service.
            </p>
            <div className="flex justify-end mt-4">
              <Button variant="outline">View Terms</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
