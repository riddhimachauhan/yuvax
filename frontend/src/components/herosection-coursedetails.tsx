"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

import robo1 from "../assets/roboimage2.svg";
import robo2 from "../assets/roboimage1.svg";

type ImageLike = string | StaticImageData | undefined;

export interface NavLink {
  label: string;
  href?: string;
}

export interface CourseInfo {
  ageGroup: string;
  courseType: string;
  classDuration: string;
  courseDuration: string;
  courseLevel: string;
}

export interface HeroSectionCourseDetailsProps {
  logo?: ImageLike;
  navLinks?: NavLink[];
  showDemoBadge?: boolean;
  courseTitle?: string;
  courseSubtitle?: string;
  createdBy?: string;
  lastUpdated?: string;
  language?: string;
  isBestseller?: boolean;
  courseInfo?: CourseInfo;
  snow?: ImageLike;
  roboImage1?: ImageLike;
  roboImage2?: ImageLike;
  className?: string;
}

const HeroSectionCourseDetails: React.FC<HeroSectionCourseDetailsProps> = ({
  courseTitle = "Robotics Starter I",
  courseInfo = {
    ageGroup: "4-6",
    courseType: "1 on 1",
    classDuration: "60 mins",
    courseDuration: "20 Classes",
    courseLevel: "Intermediate",
  },
  roboImage1 = robo1,
  roboImage2 = robo2,
  className = "",
}) => {
  const resolve = (img?: ImageLike) => img ?? undefined;

  return (
    <div className={`relative min-h-[720px] rounded-b-3xl overflow-visible ${className}`}>
      {/* Gradient hero */}
      <div className="relative h-[34rem] md:h-[36rem] bg-gradient-to-r from-[#1CA672] via-[#0FCEC9] to-[#0A9C9D] flex flex-col items-center justify-center px-4 md:px-6 rounded-b-[28px] overflow-hidden">
        
        {/* Enhanced background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/10 to-transparent"></div>
        
        {/* Content */}
        <div className="relative z-20 w-full max-w-6xl mx-auto text-center">
          <h1 className="text-[34px] sm:text-[40px] md:text-[52px] font-extrabold text-white leading-[1.1] mb-4 drop-shadow-lg">
            {courseTitle}
          </h1>
        </div>

        {/* Enhanced Robots with better positioning */}
        <div className="absolute left-4 md:left-12 bottom-[-8px] md:bottom-[-18px] z-10 transition-transform duration-300 hover:scale-105">
          <Image
            src={resolve(roboImage1)!}
            alt="Robot 1"
            width={280}
            height={380}
            style={{ width: 280, height: 380, objectFit: "contain" }}
            priority
            className="drop-shadow-2xl"
          />
        </div>
        <div className="absolute right-4 md:right-12 bottom-4 md:bottom-8 z-10 transition-transform duration-300 hover:scale-105">
          <Image
            src={resolve(roboImage2)!}
            alt="Robot 2"
            width={240}
            height={300}
            style={{ width: 240, height: 300, objectFit: "contain" }}
            priority
            className="drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Enhanced info strip */}
      <div className="relative -mt-8 z-30 px-4 md:px-6">
        <div className="bg-white rounded-2xl shadow-2xl mx-auto max-w-6xl border border-gray-100/80 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-gray-100 text-center py-6 md:py-8">
            <InfoItem label="Age Group" value={courseInfo.ageGroup} />
            <InfoItem label="Course Type" value={courseInfo.courseType} />
            <InfoItem label="Class Duration" value={courseInfo.classDuration} />
            <InfoItem label="Course Duration" value={courseInfo.courseDuration} />
            <InfoItem label="Course Level" value={courseInfo.courseLevel} last />
          </div>
        </div>
      </div>
    </div>
  );
};

function InfoItem({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex flex-col py-3 ${last ? "border-r-0" : ""} group hover:bg-gray-50/80 transition-colors duration-200 rounded-lg mx-1`}>
      <span className="text-gray-600 text-xs md:text-sm mb-1 md:mb-2 font-medium tracking-wide">{label}</span>
      <span className="text-gray-900 text-xl md:text-2xl font-bold">
        {value}
      </span>
    </div>
  );
}

export default HeroSectionCourseDetails;