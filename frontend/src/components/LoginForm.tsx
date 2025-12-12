"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
// import { useLoginMutation } from "@/store/api/authApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearError, loginUser, selectAuthError, selectAuthLoading } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

type Props = {
  onSuccess?: () => void; // optional callback when used in modal
  redirectTo?: string; // optional redirect path when used standalone
};

const LoginFormModal: React.FC<Props> = ({ onSuccess, redirectTo = "/dashboard" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const router = useRouter();

  // const [login, { isLoading }] = useLoginMutation();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;
  //   dispatch(setLoading(true));
  //   setErrors({});
  //   try {
  //     const result = await login({ identifier: email, password }).unwrap();
  //     dispatch(setCredentials({ user: result.user, token: result.token }));
  //     localStorage.setItem("yuvax_token", result.token);
  //     localStorage.setItem("yuvax_refresh_token", result.refreshToken);
  //     onSuccess?.();
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       setErrors({ general: error.message });
  //     } else {
  //       setErrors({ general: "Login failed. Please try again." });
  //     }
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    dispatch(clearError());
    setErrors({});

    // Validate form
    if (!validateForm()) return;

    try {
   


      // Success - redirect or call callback
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(redirectTo);
      }
    } catch (error) {
      // Error is handled by the reducer and displayed via authError
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-2">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"}`}
              placeholder="Enter email"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`block w-full pl-9 pr-10 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.password ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"}`}
              placeholder="Enter password"
            />
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute inset-y-0 right-0 pr-2 flex items-center">
              {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-xs">
            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <span className="ml-2 text-xs text-gray-600">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-500">Forgot?</a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginFormModal;
