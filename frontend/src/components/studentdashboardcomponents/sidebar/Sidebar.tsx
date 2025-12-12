"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SidebarProps } from "@/lib/types/studentdashboard/types";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import pic2 from "@/assets/herogirlsvg.svg";
import logo from "@/assets/logo.svg";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { setCurrentPage, selectUserRole } from "@/store/slices/dashboardSlice";
import { getNavigationByRole } from "@/components/config/dashboardNavigation";

export default function Sidebar({ className = "" }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const userRole = useAppSelector(selectUserRole);

  // Get navigation items based on user role
  const navigationItems = getNavigationByRole(userRole);

  const handleNavigation = (path: string, label: string, id: string) => {
    // Update Redux state
    dispatch(setCurrentPage({ page: id, label }));
    // Navigate to the page
    router.push(path);
  };

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }

    const normalizedPath = path.replace(/\/$/, '');
    const normalizedPathname = pathname.replace(/\/$/, '');

    // Exact match
    if (normalizedPathname === normalizedPath) return true;

    // Child route match - pathname starts with path + '/'
    if (normalizedPathname.startsWith(normalizedPath + '/')) {
      return true;
    }

    return false;
  };

  // Set initial page on mount
  useEffect(() => {
    const currentNav = navigationItems.find((item) => isActive(item.path));
    if (currentNav) {
      dispatch(
        setCurrentPage({ page: currentNav.id, label: currentNav.label })
      );
    }
  }, [pathname, navigationItems, dispatch]);

  return (
    <aside
      className={`fixed left-3 top-2 bottom-2 w-[204px] bg-white rounded-[22px] p-2 flex flex-col gap-2 shadow-lg z-10 ${className}`}
    >
      {/* Logo */}
      <div className="flex justify-center">
        <div>
          <Image
            src={logo}
            alt="Profile"
            width={95}
            height={40}
            className="w-14 object-contain"
          />
        </div>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <Image
            src={pic2}
            alt="Profile"
            width={50}
            height={50}
            className="w-[90px] h-[90px]  bg-gray-300 rounded-full"
          />
        </div>
        <div className="text-center">
          <div className="font-bold text-lg text-[#333]">
            {user?.full_name}
          </div>
          <div className="text-sm text-[#666]">{user?.country}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-hidden p-1">
        <ul className="flex flex-col gap-1">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className={`flex items-center justify-between w-full px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors relative cursor-pointer ${active ? "bg-[rgba(28,166,114,0.12)]" : ""
                    }`}
                  onClick={() =>
                    handleNavigation(item.path, item.label, item.id)
                  }
                >
                  <div className="flex items-center gap-4 flex-1">
                    <item.icon
                      className={`w-3 h-3 ${active ? "text-[#1CA672]" : "text-[#666]"
                        }`}
                    />
                    <span
                      className={`text-[14px] ${active ? "text-[#333] font-semibold" : "text-[#666]"
                        }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Badge */}
                  {item.badge && (
                    <Badge className="bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full min-w-4 h-4">
                      {item.badge}
                    </Badge>
                  )}

                  {/* Active indicator */}
                  {active && (
                    <div className="w-1 h-10 rounded-lg bg-[#1CA672] absolute right-0" />
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}