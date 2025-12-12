"use client";
import React, { useState, useEffect } from "react";
import { createUserPopupConfigs, formFieldConfigs } from "../config/adminUserFormConfig";
import axios from "axios";
import { Eye, EyeOff, Copy, RefreshCw } from "lucide-react";
import PopupLayout from "../PopupLayout";
import ReusableForm from "../ReusableForm";

interface CreateUserContentProps {
  onClose?: () => void;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const CreateUserContent: React.FC<CreateUserContentProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [allFormData, setAllFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);

  // Generate random password
  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  // Initialize with auto-generated password on mount
  useEffect(() => {
    // Only run once on mount
    const newPassword = generatePassword();
    setAllFormData({ password: newPassword, role: "Teacher" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegeneratePassword = () => {
    const newPassword = generatePassword();
    setAllFormData((prev) => ({ ...prev, password: newPassword }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add toast notification here
  };

  const calculateAge = (dateString: string): string => {
    if (!dateString) return "";
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const onFormSubmit = async (formData: Record<string, string>) => {
    // Merge form data
    setAllFormData((prev) => ({ ...prev, ...formData }));

    // If not final step, go to next step
    if (currentStep < 2) {
      setCurrentStep((s) => s + 1);
      return;
    }

    // Final step - create user
    const mergedData = { ...allFormData, ...formData };

    setLoading(true);

    try {
      const payload = {
        email: mergedData.email,
        password: mergedData.password || generatePassword(),
        confirm_password: mergedData.password || generatePassword(),
        full_name: mergedData.fullName,
        phone: mergedData.phoneNumber,
        gender: mergedData.gender,
        role: mergedData.role || "Teacher",
        date_of_birth: mergedData.dateOfBirth,
        country: mergedData.country,
        zone: mergedData.zone,
        parents_name: mergedData.parentsName || "",
        age: calculateAge(mergedData.dateOfBirth),
      };

      await axios.post(
        "http://localhost:5000/api/admin/users",
        payload,
        { withCredentials: true }
      );

      // Show success overlay
      setCreatedCredentials({
        email: payload.email,
        password: payload.password,
      });
      setShowSuccessOverlay(true);

    } catch (err) {
      const apiError = err as ApiError;
      console.error("Create user error:", apiError);
      alert(apiError.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleCloseModal = () => {
    // Reset everything
    setCurrentStep(0);
    setAllFormData({ role: "Teacher", password: generatePassword() });
    setCreatedCredentials(null);
    setShowSuccessOverlay(false);
    onClose?.();
  };

  const handleSuccessClose = () => {
    handleCloseModal();
  };

  return (
    <>
      <PopupLayout
        config={createUserPopupConfigs[currentStep]}
        onClose={handleCloseModal}
        onBack={currentStep > 0 ? handleBack : undefined}
        showBackButton={currentStep > 0}
        isSecondStep={currentStep === 1}
        isThirdStep={currentStep === 2}
        isLoginMode={false}
        isForgotPasswordMode={false}
      >
        <div className="space-y-6">
          {/* Role Selection (only on first step) */}
          {currentStep === 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Role <span className="text-red-500">*</span>
              </label>
              <select
                value={allFormData.role || "Teacher"}
                onChange={(e) => setAllFormData((prev) => ({ ...prev, role: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="Teacher">Teacher</option>
                <option value="Sales">Sales</option>
                <option value="Student">Student</option>
              </select>
            </div>
          )}

          {/* Password Display (on last step) */}
          {currentStep === 2 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Auto-generated Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={allFormData.password || ""}
                  readOnly
                  className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-xl bg-gray-50 font-mono text-sm"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleRegeneratePassword}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Regenerate password"
                  >
                    <RefreshCw className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                This password will be shared with the user after creation
              </p>
            </div>
          )}

          {/* Reusable Form */}
          <ReusableForm
            fields={formFieldConfigs[currentStep]}
            onSubmit={onFormSubmit}
            initialData={allFormData}
            submitButtonText={
              currentStep === 2
                ? (loading ? "Creating..." : "Create User")
                : "Continue"
            }
            isThirdStep={currentStep === 2}
            isLoginMode={false}
            isForgotPasswordMode={false}
          />
        </div>
      </PopupLayout>

      {/* Success Overlay - matches your design pattern */}
      {showSuccessOverlay && createdCredentials && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleSuccessClose}
          />
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                User Created Successfully! 🎉
              </h2>
              <p className="text-gray-600 mb-8">
                Share these credentials with the user
              </p>

              {/* Credentials */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                {/* Email */}
                <div className="text-left">
                  <label className="text-sm text-gray-600 block mb-2">Email</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={createdCredentials.email}
                      readOnly
                      className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(createdCredentials.email)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Copy email"
                    >
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Password */}
                <div className="text-left">
                  <label className="text-sm text-gray-600 block mb-2">Password</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={createdCredentials.password}
                      readOnly
                      className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 font-mono text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(createdCredentials.password)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Copy password"
                    >
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Done Button */}
              <button
                onClick={handleSuccessClose}
                className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUserContent;