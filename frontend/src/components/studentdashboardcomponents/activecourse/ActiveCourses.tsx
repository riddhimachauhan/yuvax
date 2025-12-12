"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { ActiveCoursesProps, CourseData } from "@/lib/types/studentdashboard/types";
import activeCourseBook from "@/assets/activecoursebook.svg";
import addCoursesImage from "@/assets/addcoursesimage.svg";

const defaultCourses: CourseData[] = [
  {
    id: "english",
    title: "English",
    type: "course",
    badge: "Recorder Tutorial",
    subtitle: "Spoken English",
    lessons: "9/20 lessons",
    progress: 33,
    progressLabel: "60% course remaining",
    bgColor: "#3BA0B7",
    icon: activeCourseBook,
  },
  {
    id: "add-course",
    title: "Add Courses",
    type: "add",
    subtitle: "Add to Learning Quest 📚",
    lessons: "One click closer to new skills",
    bgColor: "#B4B4B4",
    icon: addCoursesImage,
  },
];

export default function ActiveCourses({
  courses = defaultCourses,
  title = "Active Courses 🎯",
}: ActiveCoursesProps) {
  const router = useRouter();

  const handleCourseClick = (course: CourseData) => {
    if (course.type === "add") {
      router.push("/categories"); // 👈 navigate to categories page
    }
  };

  return (
    <Card className="{ bg-white p-5 shadow-2xl scroll-smooth ${className}} rounded-3xl">
      <h2 className="text-lg font-semibold text-[#111] ">{title}</h2>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-[#F5F5F7] h-8 w-8"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex-1 grid grid-cols-2 gap-3">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course)} // 👈 clickable
              className="rounded-2xl p-3 text-white relative overflow-hidden cursor-pointer hover:opacity-90 transition"
              style={{ backgroundColor: course.bgColor }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-[20px] text-md">{course.title}</span>
                <ChevronRight className="w-4 h-4" />
              </div>

              <div className="bg-white rounded-xl p-3">
                {course.type === "course" ? (
                  <>
                    <div className="mb-2">
                      {course.badge && (
                        <Badge
                          className="text-[#fff] text-xs mb-1"
                          style={{ backgroundColor: course.bgColor }}
                        >
                          {course.badge}
                        </Badge>
                      )}
                      <div className="font-semibold text-[#333] text-sm">
                        {course.subtitle}
                      </div>
                      <div className="text-xs text-[#666]">
                        {course.lessons}
                      </div>
                    </div>
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-[80%] h-[60px] bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image
                          src={course.icon}
                          alt={course.title}
                          className="w-16 h-16"
                          priority
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="w-full h-1 bg-[#FBDBCD] rounded-full mb-1">
                        <div
                          className="h-1 bg-[#E94D05] rounded-full"
                          style={{ width: `${course.progress}%` }} />
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: course.bgColor }}
                      >
                        {course.progressLabel}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-3 h-full">
                    <div className="text-[#333] font-semibold text-md">
                      {course.subtitle}
                    </div>
                    <div className="text-sm text-[#666]">
                      {course.lessons}
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="w-[100%] h-full bg-white rounded-lg flex items-center justify-center ">
                        <Image
                          src={course.icon}
                          alt={course.title}
                          className="w-28 h-28 bg-transparent"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-[#F5F5F7] h-8 w-8"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </Card >
  );
}