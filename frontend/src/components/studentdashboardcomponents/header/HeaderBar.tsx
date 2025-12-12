"use client";

import React, { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import type { HeaderProps } from "@/lib/types/studentdashboard/types";
import logoutIcon from "@/assets/logouticon.svg";
import dayStreakIcon from "@/assets/daystreak.svg";
import xpimage from "@/assets/xpimage.svg";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import {
  selectCurrentPage,
  selectCurrentPageLabel,
} from "@/store/slices/dashboardSlice";
import { useLogout } from "@/store/hooks/useLogout";

export default function Header({ className = "" }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const currentPage = useAppSelector(selectCurrentPage);
  const currentPageLabel = useAppSelector(selectCurrentPageLabel);
  const { logout } = useLogout();

  const handleLogout = () => {
    logout("/");
  };

  // Show greeting only on overview/dashboard page
  const isOverviewPage = currentPage === "overview";
  const headerText = isOverviewPage
    ? `Hi! ${user?.full_name},`
    : currentPageLabel;

  return (
    <Card
      className={`p-4 rounded-2xl shadow-xl border-none bg-white ${className} sticky top-2 z-[99]`}
    >
      <div className="flex items-center justify-between">
        {/* Desktop Greeting/Page Title */}
        <h1 className="hidden md:block text-[24px] font-semibold text-[#111]">
          {headerText}
        </h1>

        {/* Hamburger / Close Icon for Mobile */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-[#100C08]" />
          ) : (
            <Menu className="w-6 h-6 text-[#100C08]" />
          )}
        </button>

        <div className="flex gap-3">
          <div
            className="rounded-xl flex px-3 py-2 items-center justify-center"
            style={{ background: "linear-gradient(90deg,#FFE100,#FF8800)" }}
            aria-label="Streak Days"
          >
            <div className="text-sm text-center font-bold text-white leading-none">
              500
            </div>
            <div className="">
              <Image
                src={dayStreakIcon}
                alt="Day Streak"
                className="w-6 h-6 object-contain"
                priority
              />
            </div>
          </div>

          <div
            className="rounded-xl flex px-3 py-2 items-center justify-center"
            style={{ background: "linear-gradient(90deg,#5CB0FF,#005092)" }}
            aria-label="XP"
          >
            <div className="text-sm text-center font-bold text-white leading-none">
              10
            </div>
            <div className="">
              <Image
                src={xpimage}
                alt="XP"
                className="w-6 h-6 object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center bg-[#F5F6FA] rounded-full px-2 py-2 gap-2">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none px-2 text-sm"
            />
            <Search className="w-5 h-5 text-[#100C08]" />
          </div>

          {/* Notifications */}
          <div className="flex items-center bg-[#F5F6FA] rounded-full px-3 py-2 relative">
            <Bell className="w-4 h-4 text-[#100C08]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#DC3545] rounded-full" />
          </div>

          {/* Logout */}
          <div
            className="flex items-center bg-[#F5F6FA] rounded-full px-3 py-2 cursor-pointer"
            onClick={handleLogout}
          >
            <Image
              src={logoutIcon}
              alt="Logout"
              className="w-4 h-4"
              priority
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="mt-4 space-y-4 md:hidden">
          {/* Mobile Greeting/Page Title */}
          <h1 className="text-lg font-bold text-[#111]">{headerText}</h1>

          {/* Mobile Search */}
          <div className="flex items-center bg-[#F5F6FA] rounded-full px-2 py-2 gap-2">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none px-2 text-sm w-full"
            />
            <Search className="w-5 h-5 text-[#100C08]" />
          </div>

          {/* Mobile Notifications */}
          <button className="flex items-center bg-[#F5F6FA] rounded-full px-3 py-2 w-full justify-between">
            <Bell className="w-5 h-5 text-[#100C08]" />
            <span className="w-2 h-2 bg-[#DC3545] rounded-full" />
            <span className="ml-auto text-sm text-[#100C08]">
              Notifications
            </span>
          </button>

          {/* Mobile Logout */}
          <button
            className="flex items-center bg-[#F5F6FA] rounded-full px-3 py-2 w-full justify-between"
            onClick={handleLogout}
          >
            <Image src={logoutIcon} alt="Logout" className="w-5 h-5" priority />
            <span className="ml-auto text-sm text-[#100C08]">Logout</span>
          </button>
        </div>
      )}
    </Card>
  );
}

