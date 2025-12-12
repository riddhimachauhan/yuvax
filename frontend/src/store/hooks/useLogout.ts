import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser, selectAuthLoading } from "@/store/slices/authSlice";
import { useState } from "react";

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async (redirectTo: string = "/") => {
    try {
      setError(null);
      
      // Dispatch logout thunk
      await dispatch(logoutUser()).unwrap();
      
      // Redirect to login or specified page
      router.push(redirectTo);
    } catch (err) {
      console.error("Logout error:", err);
      setError(err as string);
      
      // Even if API fails, redirect to login
      router.push(redirectTo);
    }
  };

  return { 
    logout: handleLogout, 
    isLoading,
    error 
  };
};