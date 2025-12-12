"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated, selectIsInitialized } from "@/store/slices/authSlice";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsInitialized);
  const user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    console.log('PublicRoute check:', {
    isInitialized,
    isAuthenticated,
    user,
    pathname: window.location.pathname
  });
    if (!isInitialized) return;

    if (isAuthenticated && user) {
      // Redirect based on role
      if(user.role) router.push("/dashboard")
      // if (user?.role === 'Student') {
      //   router.push('/dashboard/student');
      // } else if (user?.role === 'Admin') {
      //   router.push('/dashboard/admin');
      // } 
      else {
        router.push('/');
      }
    }
  }, [isAuthenticated, isInitialized, user, router]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
