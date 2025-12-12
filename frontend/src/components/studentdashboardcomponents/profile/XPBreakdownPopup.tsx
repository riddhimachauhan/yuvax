"use client";

import React from "react";
import Image from "next/image";
import exppopup1 from "@/assets/exppopup1.svg";
import exppopup2 from "@/assets/exppopup2.svg";
import exppopup3 from "@/assets/exppopup3.svg";
import exppopup4 from "@/assets/exppopup4.svg";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function XPBreakdownPopup({ open, onClose }: Props) {
  if (!open) return null;

  const xpBreakdown = [
    {
      title: "Quizzes",
      xp: "177 XP",
      icon: (
        <div className="w-10 h-11 relative">
          <Image src={exppopup1} alt="Quiz icon" fill className="object-contain" />
        </div>
      ),
      gradient: "bg-gradient-to-b from-[#6BACFF] to-[#368AF8]",
    },
    {
      title: "Assignments",
      xp: "94 XP",
      icon: (
        <div className="w-[42px] h-[38px] relative">
          <Image src={exppopup2} alt="Assignment icon" fill className="object-contain" />
        </div>
      ),
      gradient: "bg-gradient-to-b from-[#FF3232] to-[#D23913]",
    },
    {
      title: "Games",
      xp: "50 XP",
      icon: (
        <Image src={exppopup3} alt="Games icon" width={50} height={50} className="w-[50px] h-[50px]" />
      ),
      gradient: "bg-gradient-to-b from-[#CF9FFF] to-[#9646EE]",
    },
    {
      title: "Streak",
      xp: "50 XP",
      icon: (
        <div className="w-[34px] h-[42px] relative">
          <Image src={exppopup4} alt="Streak icon" fill className="object-contain" />
        </div>
      ),
      gradient: "bg-gradient-to-br from-[#81D6FD] via-[#037580] to-[#037580]",
    },
  ];

  const recentActivities = [
    {
      title: "Daily Login Bonus",
      date: "10/04/2024",
      xp: "+10 XP",
      color: "#8F47C3",
      bgColor: "rgba(143, 71, 195, 0.10)",
    },
    {
      title: "Completed Quiz: Algebra Fundamentals",
      date: "10/04/2024",
      xp: "+85 XP",
      color: "#3656C3",
      bgColor: "rgba(54, 86, 195, 0.10)",
    },
    {
      title: "7-Day Streak Bonus",
      date: "10/04/2024",
      xp: "+50 XP",
      color: "#E74600",
      bgColor: "rgba(231, 70, 0, 0.10)",
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Dimmed background */}
      <button
        aria-label="Close popup"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      {/* Card container to match the provided image */}
      <div className="relative max-w-[600px] w-[92%] sm:w-[560px] rounded-[22px] bg-[#EDEDED] shadow-2xl">
        <div className="rounded-[18px] bg-white p-3 sm:p-5 border border-[#E2E2E2]">
          {/* XP Breakdown Section */}
          <div className="w-full p-3 flex flex-col items-start gap-2 rounded-[18px] border border-[#EEE] bg-white">
            <div className="flex w-full items-center justify-between">
              <h2 className="text-[#333] font-bold text-base leading-[160%]">XP Breakdown</h2>
              <button
                onClick={onClose}
                className="text-xs text-[#999] hover:text-[#666] transition-colors"
              >
                Close
              </button>
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              {xpBreakdown.map((item, index) => (
                <div
                  key={index}
                  className={`flex h-[120px] p-4 flex-col justify-between items-center rounded-2xl ${item.gradient}`}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="text-white font-bold text-sm leading-[140%]">{item.title}</div>
                    <div className="text-white font-normal text-xs leading-[150%]">{item.xp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent XP Activities Section */}
          <div className="w-full mt-4 p-3 flex flex-col items-start gap-2 rounded-[18px] border border-[#EEE] bg-white">
            <h2 className="text-[#333] font-bold text-base leading-[160%]">Recent XP Activities</h2>
            <div className="w-full flex flex-col gap-3">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex p-3 flex-col justify-center items-start gap-3 rounded-xl border border-[#EDEDED] bg-[#F6F6F6]"
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0)">
                          <path
                            d="M10.0006 18.5461C14.7207 18.5461 18.5471 14.7197 18.5471 9.99961C18.5471 5.27953 14.7207 1.45312 10.0006 1.45312C5.28051 1.45313 1.4541 5.27953 1.4541 9.99961C1.4541 14.7197 5.28051 18.5461 10.0006 18.5461Z"
                            fill={activity.color}
                            stroke={activity.color}
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.72656 10.4274L8.29055 12.9913L14.2731 7.00879"
                            stroke="#F6F6F6"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <div className="flex flex-col items-start">
                        <div className="text-[#666] font-bold text-sm leading-[140%]">{activity.title}</div>
                        <div className="text-[#999] font-normal text-xs leading-[150%]">{activity.date}</div>
                      </div>
                    </div>
                    <div
                      className="flex px-2 py-2 justify-center items-center gap-2.5 rounded-md"
                      style={{ backgroundColor: activity.bgColor }}
                    >
                      <div
                        className="font-bold text-[13px] leading-[100%]"
                        style={{ color: activity.color }}
                      >
                        {activity.xp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
