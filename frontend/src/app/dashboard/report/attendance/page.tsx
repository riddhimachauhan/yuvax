"use client";

import React from "react";
import AttendanceOverview from "@/components/studentdashboardcomponents/report/attendance/components/AttendanceOverview";
import EngagementCard from "@/components/studentdashboardcomponents/report/attendance/components/EngagementCard";

const AttendancePage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="min-h-0">
        <AttendanceOverview />
      </div>
      <div className="min-h-0">
        <EngagementCard />
      </div>
    </div>
  );
};

export default AttendancePage;
