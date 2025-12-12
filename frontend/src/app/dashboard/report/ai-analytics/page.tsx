"use client";

import React from "react";
import MonthlySummaryReport from "@/components/studentdashboardcomponents/report/ai-analytics/components/MonthlySummaryReport";
import StrengthsAreas from "@/components/studentdashboardcomponents/report/ai-analytics/components/StrengthsAreas";
import AIPersonalizedRecommendations from "@/components/studentdashboardcomponents/report/ai-analytics/components/AIPersonalizedRecommendations";
import AchievementsBadges from "@/components/studentdashboardcomponents/report/ai-analytics/components/AchievementsBadges";

const AIAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top full-width card */}
      <MonthlySummaryReport />

      {/* Two-column layout below */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="min-h-0">
          <StrengthsAreas />
        </div>
        <div className="min-h-0">
          <AIPersonalizedRecommendations />
        </div>
      </div>

      {/* Bottom full-width achievements */}
      <AchievementsBadges />
    </div>
  );
};

export default AIAnalyticsPage;

