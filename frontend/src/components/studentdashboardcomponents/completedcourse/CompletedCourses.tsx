"use client";

import React from "react";
import Image from "next/image";
import type { Course } from "@/lib/types/studentdashboard/types";
import completedStamp from "@/assets/completedcourseimage.svg";

const courses: Course[] = [
  {
    id: 1,
    title: "Robotics Starter 1",
    level: "Level-1",
    bgColor: "bg-orange-500",
    borderColor: "border-orange-500",
    completionBadge: "bg-orange-100 text-orange-600",
  },
  {
    id: 2,
    title: "Spoken English",
    level: "Advance",
    bgColor: "bg-teal-600",
    borderColor: "border-teal-600",
    completionBadge: "bg-teal-100 text-teal-700",
  },
  {
    id: 3,
    title: "Spoken English",
    level: "Advance",
    bgColor: "bg-yellow-500",
    borderColor: "border-yellow-500",
    completionBadge: "bg-yellow-100 text-yellow-600",
  },
];

const CompletedCoursesComponent: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          Completed Courses
          <span className="ml-2 text-yellow-500">🏆</span>
        </h2>
      </div>

      {/* Course Cards */}
      <div className="flex gap-4 mb-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`relative flex-1 ${course.bgColor} rounded-3xl p-4 text-white border ${course.borderColor} overflow-hidden h-[12rem]`}
          >
            {/* Course Content */}
            <div className="h-full flex flex-col justify-between bg-white text-gray-700 rounded-2xl p-4 z-10 relative">
              <div>
                <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
                <p className="text-xs opacity-90">{course.level}</p>
              </div>

              <div className="mb-2">
                <div className="w-full h-1 bg-[rgb(238,135,87)] mt-16 rounded-full"></div>
              </div>

              {/* XP Badge */}
              <div className="flex justify-end items-center gap-2 text-xs opacity-90">
                <span className="bg-white/20 px-2 py-1 rounded-md">
                  2000 XP
                </span>
              </div>
            </div>

            {/* Completed Stamp */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 pointer-events-none z-10">
              <Image
                src={completedStamp}
                alt="Completed"
                width={140}
                height={60}
                priority
                className="block"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
          <p className="text-green-700 text-sm">
            <span className="font-medium">Congratulations!</span> You’ve
            finished <strong>3 courses</strong> 😊
          </p>
          <button className="text-gray-600 hover:text-gray-800 flex items-center text-sm cursor-pointer">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletedCoursesComponent;
