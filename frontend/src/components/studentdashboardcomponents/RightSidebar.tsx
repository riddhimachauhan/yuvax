"use client";

import React from "react";
import AIPredictions from "./aiprediction/AiPrediction";
import Achievements from "./achievement/Achievement";
import Leaderboard from "./leaderboard/Leaderboard";
import Scheduler from "./scheduler/Scheduler";
import DailyTasks from "./dailytask/DailyTasks";
// import {CalendarHeader} from "./scheduler/calendarHeader";
// import { DaySchedule } from "./scheduler/dayschedule";
import UpcomingClasses from "./upcoming/UpcomingClasses";

interface RightSidebarProps {
  className?: string;
}

export default function RightSidebar({ className = "" }: RightSidebarProps) {
  return (
    <div className={`w-[308px] flex flex-col gap-6 ${className}`}>
      <Scheduler />
      <DailyTasks />
      <UpcomingClasses />
      <AIPredictions />
      <Achievements />
      <Leaderboard />
    </div>
  );
}
