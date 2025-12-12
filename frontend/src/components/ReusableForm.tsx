"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { FormField } from "./popupConfig";
import { useAppSelector } from "@/store/hooks";
import { selectAuthError } from "@/store/slices/authSlice";

interface Props {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => Promise<void> | void;
  initialData?: Record<string, string>;
  submitButtonText?: string;
  isThirdStep?: boolean;
  isLoginMode?: boolean;
  isForgotPasswordMode?: boolean;
  onForgotPasswordClick?: () => void;
  onThirdStepAttempt?: (result: "success" | "mismatch") => void;
  // Optional inline login link just below the submit button (used on first signup step)
  showBelowButtonLoginLink?: boolean;
  onLoginClick?: () => void;
  // Optional inline create-account link below the button (used on login step)
  showBelowButtonCreateLink?: boolean;
  onCreateAccountClick?: () => void;
  // Optional inline back-to-login link (used on forgot password step)
  showBelowButtonBackToLoginLink?: boolean;
  authError?: string | null;
}

const inputBase =
  "w-full rounded-[12px] border border-[#C2C5C6] px-3 py-2 text-sm sm:text-sm md:text-base focus:outline-none focus:ring-0 focus:ring-offset-0 hover:border-[#1CA672] focus:border-[#1CA672] placeholder-[#C2C5C6] hover:placeholder-[#111111]";

const ReusableForm: React.FC<Props> = ({
  fields,
  onSubmit,
  initialData = {},
  submitButtonText = "Continue",
  isThirdStep = false,
  isLoginMode = false,
  isForgotPasswordMode = false,
  onForgotPasswordClick,
  onThirdStepAttempt,
  showBelowButtonLoginLink,
  onLoginClick,
  showBelowButtonCreateLink,
  onCreateAccountClick,
  showBelowButtonBackToLoginLink,
}) => {
  const [form, setForm] = useState<Record<string, string>>(initialData);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showPwd, setShowPwd] = useState<Record<string, boolean>>({});
   const authError = useAppSelector(selectAuthError);



  useEffect(() => {
    setForm((f) => ({ ...initialData, ...f }));
  }, [initialData]);

  // Determine if all required fields for this form are filled (non-empty)
  const allRequiredFilled = fields.every((fld) => {
    if (!fld.required) return true;
    const v = (form[fld.id] ?? "").trim();
    return v !== "";
  });

  const validate = (): boolean => {
    const next: Record<string, string | undefined> = {};
    fields.forEach((fld) => {
      const v = (form[fld.id] ?? "").trim();
      if (fld.required && !v) next[fld.id] = `${fld.label} is required`;
      if (fld.validation && v) {
        const msg = fld.validation(v);
        if (msg) next[fld.id] = msg;
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (id: string, value: string) => {
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((e) => ({ ...e, [id]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      // swallow - parent handles errors
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPwd((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      <div className={`grid gap-[14.31px] ${fields.some((f) => f.gridCols === 2) ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
        {fields.map((field) => (
          <div key={field.id} className={`${field.gridCols === 2 ? "sm:col-span-2" : ""}`}>
            <label htmlFor={field.id} className="block text-xs sm:text-sm md:text-sm font-medium text-[#666666] mb-3">
              {field.label}{field.required ? <span className="text-red-500"> *</span> : null}
            </label>

            {field.type === "select" ? (
              <div className="relative">
                <select
                  id={field.id}
                  value={form[field.id] ?? ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className={`${inputBase} border-[#C2C5C6] bg-gray-50 appearance-none ${(form[field.id] ?? "") === "" ? "text-black/80" : "text-[#111111]"}`}
                >
                <option value="">{field.placeholder || "Select"}</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ) : field.type === "date" ? (
              <input
                id={field.id}
                type="date"
                value={form[field.id] ?? ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={`${inputBase} border-[#C2C5C6]  bg-white`}
              />
            ) : (
              // text/email/tel/password with optional eye toggle
              (() => {
                const isPasswordField = field.type === "password";
                // Show eye only in: third signup step (confirm password page) OR login step (when not in forgot password mode)
                const shouldShowEye = isPasswordField && ((isThirdStep) || (isLoginMode && !isForgotPasswordMode));
                if (!shouldShowEye) {
                  return (
                    <input
                      id={field.id}
                      type={field.type === "tel" ? "tel" : field.type === "password" ? "password" : field.type === "email" ? "email" : "text"}
                      value={form[field.id] ?? ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className={`${inputBase} border-[#C2C5C6]  bg-gray-50`}
                    />
                  );
                }
                const visible = !!showPwd[field.id];
                return (
                  <div className="relative">
                    <input
                      id={field.id}
                      type={visible ? "text" : "password"}
                      value={form[field.id] ?? ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className={`${inputBase} border-[#C2C5C6]  bg-gray-50 pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field.id)}
                      className="absolute right-2 top-[45%] -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                      aria-label={visible ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                );
              })()
            )}

            {errors[field.id] && <p className="mt-1 text-xs text-red-600">{errors[field.id]}</p>}
          </div>
        ))}
      </div>

      {/* small helper row for forgot password when in login mode */}
      {isLoginMode && !isForgotPasswordMode && (
        <div className="flex justify-end text-xs sm:text-sm pt-4">
          <button type="button" onClick={onForgotPasswordClick} className="text-blue-600 hover:underline cursor-pointer">
            Forgot password?
          </button>
        </div>
      )}

      {authError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600 font-medium">{authError}</p>
        </div>
      )}

      {/* submit */}
      <div className={`${(isLoginMode && !isForgotPasswordMode) || isForgotPasswordMode ? "pt-4" : "pt-[17.31px]"}`}>
        <button
          type="submit"
          disabled={submitting}
          className={`w-full ${allRequiredFilled ? "bg-[#111111]" : "bg-[#999999]"} text-white py-4 rounded-[12px] text-sm sm:text-sm md:text-base disabled:opacity-60 cursor-pointer`}
        >
          {submitting ? "Please wait..." : submitButtonText}
        </button>
      </div>

      {/* Optional inline login link directly under the button (first signup step) */}
      {showBelowButtonLoginLink && (
        <p className="text-center text-gray-600 pt-[14.31px] text-xs sm:text-sm">
          Already have your account?{" "}
          <button
            type="button"
            onClick={onLoginClick}
            className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
          >
            Log In
          </button>
        </p>
      )}

      {/* Optional inline create-account link directly under the button (login step) */}
      {showBelowButtonCreateLink && (
        <p className="text-center text-gray-600 pt-[14.31px] text-xs sm:text-sm">
          Dont have your account?{" "}
          <button
            type="button"
            onClick={onCreateAccountClick}
            className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
          >
            Create Account
          </button>
        </p>
      )}

      {/* Optional inline back-to-login link directly under the button (forgot password step) */}
      {showBelowButtonBackToLoginLink && (
        <div className="pt-[14.31px] text-xs sm:text-sm text-gray-600 flex  justify-center gap-2">
          <span className="text-gray-400">{"<"}</span>
          <span>
            Changed your mind?{" "}
            <button type="button" onClick={onLoginClick} className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer">
              Log in instead
            </button>
          </span>
        </div>
      )}

      {/* optional third-step hook */}
      {isThirdStep && onThirdStepAttempt && (
        <div className="text-center text-xs text-gray-500">
          {/* This is a place where you might show password mismatch, etc. */}
        </div>
      )}
    </form>
  );
};

export default ReusableForm;
