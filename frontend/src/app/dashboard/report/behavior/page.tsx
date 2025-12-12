"use client";

import React from "react";
import BehaviorAssessment from "@/components/studentdashboardcomponents/report/behavior/components/BehaviorAssessment";
import ConfidenceCommunication from "@/components/studentdashboardcomponents/report/behavior/components/ConfidenceCommunication";
import RecentTeacherNotes from "@/components/studentdashboardcomponents/report/behavior/components/RecentTeacherNotes";

const BehaviorPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top full-width card */}
      <BehaviorAssessment />

      {/* Two-column layout below */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="min-h-0">
          <ConfidenceCommunication />
        </div>
        <div className="min-h-0">
          <RecentTeacherNotes />
        </div>
      </div>
    </div>
  );
};

export default BehaviorPage;
