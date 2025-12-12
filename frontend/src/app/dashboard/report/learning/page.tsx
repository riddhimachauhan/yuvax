"use client";

import React from "react";
import TopicsCard from "@/components/studentdashboardcomponents/report/learning/components/TopicsCard";
import ConceptMastery from "@/components/studentdashboardcomponents/report/learning/components/ConceptMastery";
import SkillsAssessment from "@/components/studentdashboardcomponents/report/learning/components/SkillsAssessment";

const LearningPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left column: TopicsCard must fill entire left cell */}
      <div className="w-full min-h-0 lg:h-[560px]">
        <div className="h-full w-full min-h-0 flex">
          <TopicsCard />
        </div>
      </div>

      {/* Right column: stacked */}
      <div className="w-full min-h-0 flex flex-col gap-6">
        {/* Top-right: ConceptMastery - slightly taller than before */}
        <div className="w-full min-h-0 lg:h-[380px]">
          <div className="h-full w-full min-h-0 flex">
            <ConceptMastery />
          </div>
        </div>

        {/* Bottom-right: SkillsAssessment - keep previous height roughly the same (~218px) */}
        <div className="w-full min-h-0 lg:h-[218px]">
          <div className="h-full w-full min-h-0 flex">
            <SkillsAssessment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;

