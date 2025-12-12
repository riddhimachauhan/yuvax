"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializeAuth, selectIsInitialized, selectIsAuthenticated, selectAuthLoading } from "@/store/slices/authSlice";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { useTokenRefresh } from "@/store/hooks/useTokenRefresh";


export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectIsInitialized);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(state => state.auth.user);
  const isLoading = useAppSelector(selectAuthLoading);


  useEffect(() => {
    console.log('🚀 AuthProvider mounted');
    console.log('📊 Initial state:', { isInitialized, isAuthenticated, user });

    if (!isInitialized) {
      console.log('🔄 Dispatching initializeAuth...');
      dispatch(initializeAuth())
        .unwrap()
        .then((result) => {
          console.log('✅ initializeAuth resolved:', result);
        })
        .catch((error) => {
          console.log('❌ initializeAuth rejected:', error);
        });
    } else {
      console.log('✓ Already initialized');
    }
  }, [dispatch, isInitialized]);

    useTokenRefresh();

  useEffect(() => {
    console.log('📊 Auth state changed:', { isInitialized, isAuthenticated, user });
  }, [isInitialized, isAuthenticated, user]);

  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Image
            src={logo}
            alt="Profile"
            width={95}
            height={40}
            className="w-24 object-contain aminate-pulse"
          />
        </div>
      </div>
    )
  }

  return <>{children}</>;
}