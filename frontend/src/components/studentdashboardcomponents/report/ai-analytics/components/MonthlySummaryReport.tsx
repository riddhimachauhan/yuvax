"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { HelpCircle, ArrowUp, ArrowDown } from "lucide-react";
import attendanceIcon from "@/assets/attendance.svg";
import studyHoursIcon from "@/assets/studyhours.svg";
import quizIcon from "@/assets/quizz.svg";
import overallIcon from "@/assets/overall.svg";

type TrendDirection = "up" | "down";

type SummaryItem = {
  title: string;
  value: string;
  trend: TrendDirection;
  trendValue: string; // e.g., "14%" or "20 mins"
  trendLabel: string; // e.g., "Since Last Week"
  icon: StaticImageData;
};

const items: SummaryItem[] = [
  {
    title: "Attendance",
    value: "80%",
    trend: "down",
    trendValue: "14%",
    trendLabel: "Since Last month",
    icon: attendanceIcon,
  },
  {
    title: "Study Hours",
    value: "6 Hr",
    trend: "up",
    trendValue: "20 mins",
    trendLabel: "Since Last Week",
    icon: studyHoursIcon,
  },
  {
    title: "Quizzes Score",
    value: "58%",
    trend: "up",
    trendValue: "2",
    trendLabel: "Since Last Week",
    icon: quizIcon,
  },
  {
    title: "Overall Score",
    value: "34%",
    trend: "down",
    trendValue: "24%",
    trendLabel: "Since Last Week",
    icon: overallIcon,
  },
];

const MonthlySummaryReport: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-white/60 p-6">
      <p className="text-2xl font-semibold text-slate-900 mb-5">
        Monthly Summary Report
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl px-3 py-4 flex items-center justify-between min-w-0 border border-slate-200/60"
          >
            {/* Left: title + value + trend (flex-col) */}
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              {/* Title + Help icon */}
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-[#666666]">{item.title}</span>
                <HelpCircle className="w-3 h-3 text-[#999999]" />
              </div>
              {/* Value */}
              <div className="text-xl font-bold text-[#333]">{item.value}</div>
              {/* Trend row */}
              <div className="flex items-center gap-1 flex-wrap">
                {item.trend === "up" ? (
                  <ArrowUp className="w-3 h-3 text-[#00C239] flex-shrink-0" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-[#DC3545] flex-shrink-0" />
                )}
                <span
                  className={`text-xs font-bold ${
                    item.trend === "up" ? "text-[#00C239]" : "text-[#DC3545]"
                  }`}
                >
                  {item.trendValue}
                </span>
                <span className="text-xs text-[#999] whitespace-nowrap">{item.trendLabel}</span>
              </div>
            </div>

            {/* Right: centered icon */}
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <Image src={item.icon} alt={item.title} className="w-10 h-10" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MonthlySummaryReport;

