"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DayStrick from "@/assets/daystreak.svg"
import ExpIcon from "@/assets/exp.svg";
import pic2 from "@/assets/herogirlsvg.svg";
import XPBreakdownPopup from "./XPBreakdownPopup";
import StreakPopup from "./StreakPopup";
import StreakWeakFire1 from "@/assets/strickweakfire1.svg";
import StreakWeakFire2 from "@/assets/streakweakfire2.svg";

const ProfileHeaderCard: React.FC = () => {
  const daysOfWeek = [
    { day: "M", completed: true },
    { day: "T", completed: true },
    { day: "W", completed: true },
    { day: "T", completed: true },
    { day: "F", completed: false },
    { day: "S", completed: false },
    { day: "S", completed: false },
  ];

  // Local state to control the XP popup
  const [isXpOpen, setIsXpOpen] = useState(false);
  // Local state to control the Streak popup
  const [isStreakOpen, setIsStreakOpen] = useState(false);

  return (
    // Keep the same container sizing so we don't affect outer layout
    <section className="relative w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      {/* ====== New: Centered Joining Date (top middle between avatar and content) ====== */}
      <div
        className="absolute left-[38%] transform -translate-x-1/2 top-[16%] select-none pointer-events-none"
        aria-hidden
      >
        <span
          className="text-[16px] leading-[140%] text-[#999999] font-normal"
          style={{ fontFamily: 'Lato, sans-serif', letterSpacing: '0' }}
        >
          Joining Date: 24/10/2026
        </span>
      </div>

      {/* ====== New: Centered Manage Profile button (middle area) ====== */}
      <div className="absolute left-[38%] transform -translate-x-1/2 top-[80%] -translate-y-1/2">
        <Link href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-black text-white rounded-full shadow-sm hover:opacity-95 transition-opacity">
          {/* Pencil icon (inline SVG to avoid extra imports) */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor"/>
            <path d="M20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
          </svg>
          <span className="text-[13px] md:text-sm font-medium">Manage Profile</span>
        </Link>
      </div>

      {/* Layout matches image: left profile, then two right cards */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
        {/* Profile Section (left) */}
        <div className="flex items-center gap-3 md:gap-4">
          <Image
            src={pic2}
            alt="Profile"
            width={140}
            height={140}
            className="w-24 h-24 md:w-28 md:h-28 lg:w-[140px] lg:h-[140px] bg-[#9CF7F6] rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h1 className="text-[32px] font-bold text-[#333333] leading-[150%]" style={{ fontFamily: 'Lato, sans-serif', letterSpacing: '0%' }}>Garlic Potato</h1>
            <p className="text-[28px] font-medium text-[#666666] leading-[160%]" style={{ fontFamily: 'Lato, sans-serif', letterSpacing: '0%' }}>10th Grade</p>
          </div>
        </div>

        {/* Cards Container (right) */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full lg:w-auto">
          {/* XP Card */}
          <div className="relative flex-1 sm:flex-none sm:w-[260px] border border-[#E2E2E2] rounded-2xl bg-white shadow-[0_0_9.8px_0_rgba(0,0,0,0.06)] p-3 md:p-4 overflow-visible">
            {/* Decorative big "EXP" behind content */}
            <div
              className="absolute top-3 left-3 pointer-events-none select-none font-vt323 text-[72px] leading-none text-transparent bg-clip-text -z-10"
              style={{
                backgroundImage: "linear-gradient(90deg, rgba(0,30,255,0.12), rgba(0,229,168,0.12))",
                WebkitTextStroke: "0px transparent",
                opacity: 0.95,
                transform: "translateY(-6px)",
                letterSpacing: "-2px",
              }}
            >
              EXP
            </div>

            <div className="flex flex-col items-center gap-3 md:gap-4">
              {/* EXP Badge */}
              <div className="relative w-[104px] h-[127px]">
                <Image
                  src={ExpIcon}
                  alt="EXP"
                  className="absolute top-[20%] left-0 w-[104px] h-auto"
                  priority
                />
                <div
                  className="absolute left-[11%] top-[48%] text-3xl font-extrabold text-white"
                  style={{ WebkitTextStroke: "2px #001EFF" }}
                >
                  2,500
                </div>
              </div>

              {/* Progress Section */}
              <div className="w-full space-y-3 pb-3 border-b border-transparent">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#333]">Level 5</span>
                  <span className="text-sm font-medium text-[#666]">2650 XP</span>
                </div>
                <div className="relative h-2 bg-[rgba(0,30,255,0.16)] rounded-xl overflow-hidden">
                  <div className="absolute left-0 top-[-2px] h-3 bg-[#001EFF] rounded-[29px]" style={{ width: "55%" }} />
                </div>
                <p className="text-xs text-[#999] text-right leading-[150%]">123 XP left for level 6!</p>
              </div>

              {/* Open popup using Link as requested */}
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsXpOpen(true);
                }}
                className="text-[8px] text-[#999] underline hover:text-[#666] transition-colors"
              >
                View More
              </Link>
            </div>
          </div>

          {/* Day Streak Card */}
          <div className="flex-1 sm:flex-none sm:w-[260px] border border-[#E2E2E2] rounded-2xl bg-white shadow-[0_0_9.8px_0_rgba(0,0,0,0.06)] p-3 md:p-4">
            <div className="flex flex-col items-center gap-4 md:gap-5">
              {/* Fire Icon and Number */}
              <div className="flex flex-col items-center gap-0">
                <div className="relative w-[89px] h-[110px]">
                  <Image
                    src={DayStrick}
                    alt="Fire streak"
                    className="absolute bottom-[32%] right-[11%] w-[89px] h-[82px] "
                  />
                  <div
                    className="absolute left-[34px] top-[47px] text-white "
                    style={{
                      WebkitTextStroke: "2px #ED5602",
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 800,
                      fontSize: '36px',
                      lineHeight: '160%',
                      letterSpacing: '0',
                    }}
                  >
                    8
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#ED5602] leading-[150%]">Day Streak</span>
              </div>

              {/* Week Days */}
              <div className="flex flex-col items-center gap-3 w-full">
                <div className="flex items-end gap-3 md:gap-4">
                  {daysOfWeek.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-1.5">
                      <span
                        className={`text-[10px] font-bold leading-[160%] ${
                          item.completed ? "text-[#FF663C]" : "text-[#999]"
                        }`}
                      >
                        {item.day}
                      </span>
                      {item.completed ? (
                        <Image
                          src={StreakWeakFire1}
                          alt="Day completed"
                          className="w-[15.564px] h-[16.979px]"
                        />
                      ) : (
                        <Image
                          src={StreakWeakFire2}
                          alt="Day not completed"
                          className="w-[15.564px] h-[15.564px]"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-[#666] text-center leading-[131%] max-w-[126px]">You&apos;re on fire!<br />Keep the streak alive!</p>
              </div>

              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsStreakOpen(true);
                }}
                className="text-[8px] text-[#999] underline hover:text-[#666] transition-colors"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Render popup */}
      <XPBreakdownPopup open={isXpOpen} onClose={() => setIsXpOpen(false)} />
      <StreakPopup open={isStreakOpen} onClose={() => setIsStreakOpen(false)} />
    </section>
  );
};

export default ProfileHeaderCard;
