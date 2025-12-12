"use client";

import { useEffect } from "react";
import Header from "@/components/studentdashboardcomponents/header/HeaderBar";
import Sidebar from "@/components/studentdashboardcomponents/sidebar/Sidebar";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { setUserRole, UserRole } from "@/store/slices/dashboardSlice";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  // Set user role from auth state
  useEffect(() => {
    if (user?.role) {
      dispatch(setUserRole(user.role as UserRole));
    }
  }, [user, dispatch]);

  return (
    <div className="min-h-screen bg-[#F4FAFC]">
      <Header className="ml-[249px] mr-4" />
      <Sidebar />
      {children}
    </div>
  );
}