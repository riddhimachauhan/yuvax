"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import type { SchedulerProps } from "@/lib/types/studentdashboard/types";
import Timeline from "./Timeline";

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Schedule({ className = "" }: SchedulerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthName = useMemo(
    () => currentDate.toLocaleString("default", { month: "long" }),
    [currentDate]
  );
  const year = currentDate.getFullYear();
  const currentDayIndex = useMemo(() => {
    // getDay: 0=Sun,1=Mon,... -> map Mon=0..Sun=6
    const raw = currentDate.getDay();
    return raw === 0 ? 6 : raw - 1;
  }, [currentDate]);

  const prevMonth = useCallback(() => {
    setCurrentDate((d) => {
      const prev = new Date(d);
      prev.setMonth(prev.getMonth() - 1);
      return prev;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentDate((d) => {
      const next = new Date(d);
      next.setMonth(next.getMonth() + 1);
      return next;
    });
  }, []);

  return (
    <Card
      className={`rounded-3xl bg-gradient-to-b from-[#1CA672] to-[#0A9C9D] p-3 shadow-2xl border-none w-full ${className}`}
    >
      <div className="flex gap-3 ">
        {DAYS_OF_WEEK.map((day, idx) => {
          const isToday = idx === currentDayIndex;
          return (
            <div
              key={day}
              className={`flex flex-col items-center gap-2 flex-1 py-3 px-1 ${
                isToday ? "bg-white rounded-2xl" : ""
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  isToday ? "text-black" : "text-white"
                }`}
              >
                {day}
              </span>
              <span
                className={`text-xs ${isToday ? "text-black" : "text-white"}`}
              >
                {idx + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Schedule Items */}
      <Timeline />
    </Card>
  );
}
