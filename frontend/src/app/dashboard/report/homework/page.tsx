"use client";

import React from "react";
import HomeworkMetricCard, { type HomeworkMetricProps } from "@/components/studentdashboardcomponents/report/homework/components/HomeworkMetricCard";
import SubmissionTrends from "@/components/studentdashboardcomponents/report/homework/components/SubmissionTrends";
import RecentAssignments from "@/components/studentdashboardcomponents/report/homework/components/RecentAssignments";
import { TrendingUp, Clock, Flame } from "lucide-react";

/**
 * Using the new data shape you provided:
 * icon: Component, label, value, progress (number|null), subtitle, color
 */
const stats: HomeworkMetricProps[] = [
  {
    icon: TrendingUp,
    label: "Submission Rate",
    value: "94%",
    progress: 94,
    color: "bg-blue-500",
  },
  {
    icon: Clock,
    label: "On-Time Rate",
    value: "80%",
    progress: 80,
    color: "bg-sky-500",
  },
  {
    icon: Clock,
    label: "Study Hours",
    value: "24h",
    subtitle: "This month",
    progress: null,
    color: "bg-indigo-500",
  },
  {
    icon: Flame,
    label: "Current Streak",
    value: "12",
    subtitle: "Best: 18 days",
    progress: null,
    color: "bg-cyan-500",
  },
];

const HomeworkPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Top metrics: 4 equal cards rendered via map (layout preserved) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          // keep your fixed card height wrapper so nothing else in the app changes
          <div key={idx} className="h-[148px]">
            <HomeworkMetricCard {...s} />
          </div>
        ))}
      </div>

      {/* Bottom section (layout preserved): left graph, right recent assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full min-h-0 lg:h-[385px]">
          <div className="h-full w-full min-h-0 flex">
            <SubmissionTrends />
          </div>
        </div>

        <div className="w-full min-h-0 lg:h-[470px]">
          <div className="h-full w-full min-h-0 flex">
            <RecentAssignments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkPage;
