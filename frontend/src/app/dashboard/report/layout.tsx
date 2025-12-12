"use client";

import React from "react";
import Sidebar from "@/components/studentdashboardcomponents/sidebar/Sidebar";
import Header from "@/components/studentdashboardcomponents/header/HeaderBar";
import CourseCard from "@/components/studentdashboardcomponents/report/components/CourseCard";
import TabsMenu from "@/components/studentdashboardcomponents/report/components/TabsMenu";
import CourseProgressCard from "@/components/studentdashboardcomponents/report/components/CourseProgressCard";

interface ReportLayoutProps {
  children: React.ReactNode;
}

const ReportLayout: React.FC<ReportLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#F4FAFC]">
      {/* Left Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content Area */}
      <main className=" p-4 flex flex-col gap-6 flex-1 ml-[236px] min-h-screen  bg-[#F4FAFC]">
        {/* Header */}
        {/* <Header userName="Ishant" /> */}

        {/* Top Row: Left slightly wider than right */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Left component - slightly more width */}
          <div className="lg:w-[65%] min-h-0">
            {/* outer wrapper removed visual bg/border so CourseCard can fully fill */}
            <div className="h-full   flex min-h-0">
              <CourseCard />
            </div>
          </div>

          {/* Right component - remaining width */}
          <div className="lg:w-[35%] min-h-0">
            <div className="h-full   flex min-h-0">
              <CourseProgressCard />
            </div>
          </div>
        </div>

        {/* Tabs row */}
        <TabsMenu />

        {/* Dynamic area */}
        {children}
      </main>
    </div>
  );
};

export default ReportLayout;
