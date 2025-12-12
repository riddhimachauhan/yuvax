"use client";

import React from "react";
import ProfileHeaderCard from "@/components/studentdashboardcomponents/profile/ProfileHeaderCard";
import PerformanceSummary from "@/components/studentdashboardcomponents/profile/PerformanceSummary";
import RecentQuizResults from "@/components/studentdashboardcomponents/profile/RecentQuizResults";
import RecentAssignments from "@/components/studentdashboardcomponents/profile/RecentAssignments";

const ProfilePage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#F4FAFC]">
      {/* Sidebar would be here */}
      {/* <Sidebar /> */}

      <div className="flex-1 ml-[245px] min-h-screen flex flex-col bg-[#F4FAFC]">
        {/* Header would be here */}
        {/* <Header /> */}
        
        <div className="flex-1 overflow-y-auto">
          <div className="w-full px-2 py-4 space-y-5">
            {/* Original profile content */}
            <div className="flex flex-col gap-6">
              <ProfileHeaderCard />
              <PerformanceSummary />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentQuizResults />
                <RecentAssignments />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
