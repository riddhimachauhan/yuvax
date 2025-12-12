"use client";

import React from "react";
import PerformanceTrend from "@/components/studentdashboardcomponents/report/test/components/PerformanceTrend";
import RecentTestScores from "@/components/studentdashboardcomponents/report/test/components/RecentTestScores";

const TestPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Top: Performance Trend card */}
      <PerformanceTrend />
      {/* Bottom: Recent Test Scores card */}
      <RecentTestScores />
    </div>
  );
};

export default TestPage;
