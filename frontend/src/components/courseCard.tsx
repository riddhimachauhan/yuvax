// components/CourseCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";  // NEW
import Age from "../assets/age.svg";
import time from "../assets/time.svg";

export interface Course {
  course_id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  sessions?: string | null;
  rating?: number | null;
  duration?: string | null;
  age?: string | null;
  level?: string | null;
  image?: string | null;
  students?: string | null;
  category?: string | null;
}

const formatINR = (n: number) => `₹${new Intl.NumberFormat("en-IN").format(n)}`;

const Tooltip: React.FC<{
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom";
}> = ({ content, children, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={`
            absolute z-50 px-2 py-1 w-full bg-gray-800 text-white text-xs rounded-md shadow-lg 
            ${position === "top" ? "bottom-full mb-1" : "top-full mt-1"}
            left-1/2 transform -translate-x-1/2
          `}
        >
          {content}
          <div
            className={`
              absolute left-1/2 transform -translate-x-1/2 border-4 border-transparent
              ${position === "top" ? "top-full border-t-gray-800" : "bottom-full border-b-gray-800"}
            `}
          />
        </div>
      )}
    </div>
  );
};

const CourseCard: React.FC<{ course: Course; variant?: "grid" | "list" }> = ({
  course,
  variant = "grid",
}) => {
  const router = useRouter(); // NEW
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);

  const handleBuy = () => {
    router.push(`/course-details/${course.course_id}`)
  }

  const getLevelColor = () => {
    switch (course.level) {
      case "Beginner":
        return "from-blue-400 to-blue-600";
      case "Intermediate":
        return "from-yellow-400 to-yellow-600";
      case "Advanced":
      case "Advance":
        return "from-red-400 to-red-600";
      default:
        return "from-green-400 to-emerald-500";
    }
  };


  /* ---------------- GRID LAYOUT ---------------- */
  if (variant === "grid") {
    return (
      <article className="relative overflow-hidden bg-[#E0F4E3] shadow-lg hover:shadow-2xl transition-all duration-300 p-0 border border-transparent  rounded-[24px] w-full max-w-2xl">
        <div className="p-4 space-y-3 bg-[#FFFFFF] hover:rounded-[24px] rounded-[24px] overflow-hidden">
          <div className={`bg-gradient-to-br ${getLevelColor()} p-4 text-white relative h-28 overflow-hidden rounded-[16px]`}>
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-medium shadow-lg ">
                {course.level}
              </span>
            </div>

            <div className="absolute left-3 bottom-3 text-left z-10">
              {course.oldPrice && (
                <div className="text-xs line-through opacity-75">{formatINR(course.oldPrice)}</div>
              )}
              <div className="text-xl font-bold">{formatINR(course.price)}</div>
              <div className="text-xs opacity-90 text-pretty mt-0.5">{course.sessions || "150 sessions"}</div>
            </div>

            <div className="absolute bottom-2 right-2 transform group-hover:scale-110 transition-transform duration-300">
              {course.image && typeof course.image === "string" && !course.image.startsWith("http") ? (
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                  {course.image}
                </div>
              ) : course.image ? (
                <Image
                  src={course.image}
                  alt={course.title}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover w-16 h-16"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                  }}
                />
              ) : (
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center text-2xl">🎓</div>
              )}
              <div className="hidden w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center text-2xl">🎓</div>
            </div>
          </div>

          <div className="bg-white space-y-1">
            <Tooltip content={course.title}>
              <h3 className="text-base font-bold text-gray-900 leading-tight line-clamp-1">
                {course.title}
              </h3>
            </Tooltip>
            <Tooltip content={course.description}>
              <p className="text-gray-600 text-xs line-clamp-1">{course.description}</p>
            </Tooltip>
          </div>

          <div className="bg-white">
            <div className="flex gap-2 mb-0">
              <button
                onClick={handleBuy} // NEW
                className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-1.5 text-xs rounded-2xl transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                Buy Course
              </button>
              <button
                onClick={() => setIsBookDemoOpen(true)}
                className="flex-1 border border-cyan-500 text-cyan-600 hover:bg-cyan-50 hover:border-cyan-600 bg-transparent font-semibold py-1.5 text-xs rounded-2xl transition-all duration-200 cursor-pointer"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>

        <div className="pb-4 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-gray-600 group/feature">
              <span className="text-sm flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200">
                <Image src={Age} alt="Age Icon" width={16} height={16} className="object-contain" />
              </span>
              <span className="text-xs font-base">{course.age}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 group/feature">
              <span className="text-sm flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200">🎥</span>
              <span className="text-xs font-base">{course.students}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 group/feature ">
              <span className="text-sm flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200">
                <Image src={time} alt="Time Icon" width={16} height={16} className="object-contain" />
              </span>
              <span className="text-xs font-base">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 group/feature">
              <span className="text-sm flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200">👥</span>
              <span className="text-xs font-base">{course.category}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  /* ---------------- LIST LAYOUT ---------------- */
  return (
    <article className="relative overflow-hidden bg-[#E0F4E3] shadow-lg hover:shadow-2xl transition-all duration-300 p-0 border border-transparent group hover:scale-[1.02] rounded-[30px] w-full">
      <div className="p-3 space-y-2 bg-[#FFFFFF] hover:rounded-[20px] rounded-[20px] overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className={`relative w-full lg:w-32 h-36 flex-shrink-0 rounded-[20px] bg-gradient-to-br ${getLevelColor()} flex items-center justify-center p-3 overflow-hidden`}>
            {course.level && (
              <div className="absolute top-2 left-2 z-10">
                <span className="bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded-full text-[10px] font-medium shadow-lg text-white">
                  {course.level}
                </span>
              </div>
            )}
            <div className="text-2xl sm:text-3xl font-bold text-white z-10">
              {course.image && typeof course.image === "string" && !course.image.startsWith("http") ? (
                course.image
              ) : course.image ? (
                <Image
                  src={course.image}
                  alt={course.title}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover w-16 h-16 sm:w-20 sm:h-20"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                  }}
                />
              ) : (
                course.title
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()
              )}
            </div>
            <div className="hidden text-2xl sm:text-3xl font-bold text-white">
              {course.title
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()}
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            <div className="mb-2 bg-white">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 line-clamp-1" title={course.title}>
                {course.title}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2" title={course.description}>
                {course.description}
              </p>
            </div>

            <div className="mb-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5 text-gray-600 group/feature">
                  <span className="text-xs flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200">
                    <Image src={Age} alt="Age Icon" width={14} height={14} className="object-contain" />
                  </span>
                  <span className="text-[11px] font-base">{course.age}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600 group/feature">
                  <span className="text-xs flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200">🎥</span>
                  <span className="text-[11px] font-base">{course.students}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600 group/feature">
                  <span className="text-xs flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200">
                    <Image src={time} alt="Time Icon" width={14} height={14} className="object-contain" />
                  </span>
                  <span className="text-[11px] font-base">{course.duration}</span>
                </div>
                {course.category && (
                  <div className="flex items-center gap-1.5 text-gray-600 group/feature">
                    <span className="text-xs flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200">👥</span>
                    <span className="text-[11px] font-base">{course.category}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-auto">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold text-green-600">{formatINR(course.price)}</span>
                {course.oldPrice && <span className="text-sm text-gray-500 line-through">{formatINR(course.oldPrice)}</span>}
              </div>

              <div className="flex flex-col sm:flex-row gap-1.5 w-full sm:w-auto pr-2">
                <button
                  onClick={handleBuy} // NEW
                  className="flex-1 sm:flex-none bg-black hover:bg-gray-800 text-white font-semibold py-1 px-3 text-[11px] rounded-xl transition-all duration-200 hover:shadow-lg cursor-pointer"
                >
                  Buy Course
                </button>
                <button
                  onClick={() => setIsBookDemoOpen(true)}
                  className="flex-1 sm:flex-none border border-cyan-500 text-cyan-600 hover:bg-cyan-50 hover:border-cyan-600 bg-transparent font-semibold py-1 px-3 text-[11px] rounded-xl transition-all duration-200 cursor-pointer"
                >
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;