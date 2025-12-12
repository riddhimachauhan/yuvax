"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import streakpopup1 from "@/assets/strickpopup1.svg";
import streakpopup2 from "@/assets/strickpopup2.svg";
import streakpopup3 from "@/assets/strickpopup3.svg";
import completedIcon from "@/assets/completed.svg";
import notCompletedIcon from "@/assets/notcompletedtick.svg";

interface ActivityBadge {
  label: string;
  value: string;
  gradient: string;
}

interface MilestoneItem {
  days: string;
  reward: string;
  completed: boolean;
}

type Props = {
  open: boolean;
  onClose: () => void;
};

const activityBadges: ActivityBadge[] = [
  {
    label: "Best",
    value: "12 days",
    gradient: "linear-gradient(143deg, #81D6FD 6.67%, #037580 86.36%)"
  },
  {
    label: "Next Goal",
    value: "14 days",
    gradient: "linear-gradient(180deg, #6798FF 0%, #A655FF 100%)",
  },
  {
    label: "Progress",
    value: "58%",
    gradient: "linear-gradient(180deg, #66A8FE 0%, #187DFF 100%)",
  },
];

const milestones: MilestoneItem[] = [
  { days: "3 Days", reward: "10 XP Bonus", completed: true },
  { days: "7 Days", reward: "50 XP Bonus", completed: true },
  { days: "14 Days", reward: "100 XP Bonus", completed: false },
  { days: "30 Days", reward: "Special Badge", completed: false },
];

const CheckIcon = ({ completed }: { completed: boolean }) => (
  <Image
    src={completed ? completedIcon : notCompletedIcon}
    alt={completed ? "Completed" : "Not completed"}
    width={20}
    height={20}
    className="w-[20px] h-[20px]"
  />
);

export default function StreakPopup({ open, onClose }: Props) {
  const calendarDays = useMemo(
    () =>
      [
        { day: 1, highlighted: true },
        { day: 2, highlighted: false },
        { day: 3, highlighted: false },
        { day: 4, highlighted: false },
        { day: 5, highlighted: true },
        { day: 6, highlighted: false },
        { day: 7, highlighted: false },
        { day: 8, highlighted: false },
        { day: 9, highlighted: true },
        { day: 10, highlighted: false },
        { day: 11, highlighted: false },
        { day: 12, highlighted: false },
        { day: 13, highlighted: false },
        { day: 14, highlighted: false },
        { day: 15, highlighted: true, hasFlame: true },
        { day: 16, highlighted: true, hasFlame: true },
        { day: 17, highlighted: true, hasFlame: true },
        { day: 18, highlighted: true, hasFlame: true },
        { day: 19, highlighted: true, hasFlame: true },
        { day: 20, highlighted: true, hasFlame: true },
        { day: 21, highlighted: true, hasFlame: true },
        { day: 22, highlighted: true, hasFlame: true },
        { day: 23, highlighted: false },
        { day: 24, highlighted: false },
        { day: 25, highlighted: false },
        { day: 26, highlighted: true },
        { day: 27, highlighted: false },
        { day: 28, highlighted: false },
        { day: 29, highlighted: false },
        { day: 30, highlighted: false },
        { day: 31, highlighted: false },
      ] as Array<{ day: number; highlighted: boolean; hasFlame?: boolean }> ,
    []
  );

  // Month navigation state: reset to current month whenever popup opens
  const [viewDate, setViewDate] = useState<Date>(new Date());

  useEffect(() => {
    if (open) {
      setViewDate(new Date());
    }
  }, [open]);

  // Compute first-day offset (Monday-first) and number of days in month
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth(); // 0-11
  const firstOfMonth = new Date(year, month, 1);
  const offset = (firstOfMonth.getDay() + 6) % 7; // convert Sun(0)..Sat(6) to Mon-first 0..6
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Only show as many calendarDays as exist in the current month so UI stays identical
  const displayedDays = useMemo(
    () => calendarDays.filter((d) => d.day <= daysInMonth),
    [calendarDays, daysInMonth]
  );

  // Header label like "JAN 2022"
  const MONTHS = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const headerLabel = `${MONTHS[month]} ${year}`;

  const goPrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const goNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  // Early return must come after all hooks
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <button aria-label="Close popup" onClick={onClose} className="absolute inset-0 bg-black/50" />

      {/* Card container matching the provided image */}
      <div className="relative max-w-[600px] w-[92%] sm:w-[560px] rounded-[22px] bg-[#EDEDED]  shadow-2xl">
        <div className="rounded-[18px] bg-white p-3 sm:p-5 border border-[#E2E2E2]">
          {/* Recent Activity Card */}
          <div className="bg-white rounded-[18px] border border-[#EEE] p-3">
            <div className="flex items-center justify-between px-3 pt-3">
              <h2 className="text-[#333] font-lato text-base font-bold leading-[160%]">Recent Acitvity</h2>
              <button onClick={onClose} className="text-xs text-[#999] hover:text-[#666] transition-colors">Close</button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 p-3">
              {/* Activity Badges */}
              <div className="relative w-full sm:w-[162px] h-[252px] flex-shrink-0">
                {/* Best Badge */}
                <div
                  className="absolute left-0 top-[7px] w-[93px] h-[93px] rounded-full flex flex-col items-center justify-center gap-[3px]"
                  style={{ background: activityBadges[0].gradient }}
                >
                  <div className="absolute top-[15px] w-[30px] h-[27px] flex items-center justify-center text-lg">
                    <Image src={streakpopup1} alt="Best" width={30} height={27} className="w-[30px] h-[27px]" />
                  </div>
                  <div className="text-white font-lato text-xs font-normal leading-[100%] mt-[27px]">
                    {activityBadges[0].label}
                  </div>
                  <div className="text-white font-lato text-sm font-bold leading-[100%]">
                    {activityBadges[0].value}
                  </div>
                </div>

                {/* Next Goal Badge */}
                <div
                  className="absolute left-[81px] top-[71px] w-[93px] h-[93px] rounded-full flex flex-col items-center justify-center gap-[3px]"
                  style={{ background: activityBadges[1].gradient }}
                >
                  <div className="absolute top-[14px] w-[27px] h-[26px] flex items-center justify-center text-lg">
                    <Image src={streakpopup2} alt="Next Goal" width={27} height={26} className="w-[27px] h-[26px]" />
                  </div>
                  <div className="text-white font-lato text-xs font-normal leading-[100%] mt-[27px]">
                    {activityBadges[1].label}
                  </div>
                  <div className="text-white font-lato text-sm font-bold leading-[100%]">
                    {activityBadges[1].value}
                  </div>
                </div>

                {/* Progress Badge */}
                <div
                  className="absolute left-[3px] top-[150px] w-[93px] h-[93px] rounded-full flex flex-col items-center justify-center gap-[3px]"
                  style={{ background: activityBadges[2].gradient }}
                >
                  <div className="absolute top-[17px] w-[34px] h-[27px] flex items-center justify-center text-lg">
                    <Image src={streakpopup3} alt="Progress" width={34} height={27} className="w-[34px] h-[27px]" />
                  </div>
                  <div className="text-white font-lato text-xs font-normal leading-[100%] mt-[27px]">
                    {activityBadges[2].label}
                  </div>
                  <div className="text-white font-lato text-sm font-bold leading-[100%]">
                    {activityBadges[2].value}
                  </div>
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 w-full sm:flex-1 shadow-sm">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors" onClick={goPrevMonth}>
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="text-sm font-bold text-[#333] font-lato">{headerLabel}</h3>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors" onClick={goNextMonth}>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Calendar Days Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                    <div key={day} className="text-center text-[10px] font-semibold text-gray-700 font-lato">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for offset */}
                  {Array.from({ length: offset }).map((_, idx) => (
                    <div key={`offset-${idx}`}></div>
                  ))}

                  {displayedDays.map((dayObj) => (
                    <div
                      key={dayObj.day}
                      className={`
                        aspect-square flex items-center justify-center text-xs font-medium rounded-full
                        ${dayObj.highlighted ? "bg-[#FFC700] text-gray-800" : "bg-gray-100 text-gray-400"}
                        ${dayObj.hasFlame ? "relative" : ""}
                      `}
                    >
                      {dayObj.hasFlame && (
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px]">🔥</span>
                      )}
                      {dayObj.day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Streak Milestones Card */}
          <div className="bg-white rounded-[18px] border border-[#EEE] p-3 mt-4">
            <h2 className="text-[#333] font-lato text-base font-bold leading-[160%] px-3 pt-3 mb-2">Streak Milestones</h2>

            <div className="flex flex-col gap-3 p-3">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center justify-between p-3 rounded-xl border
                    ${milestone.completed ? "bg-[rgba(28,166,114,0.10)] border-[#EAEAEA]" : "bg-[#FAFAFA] border-[#EAEAEA]"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <CheckIcon completed={milestone.completed} />
                    <span className={`font-lato text-sm font-bold leading-[140%] ${milestone.completed ? "text-[#666]" : "text-[#999]"}`}>
                      {milestone.days}
                    </span>
                  </div>
                  <span className={`font-lato text-[13px] leading-[100%] ${milestone.completed ? "text-[#1CA672] font-bold" : "text-[#999] font-normal"}`}>
                    {milestone.reward}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
