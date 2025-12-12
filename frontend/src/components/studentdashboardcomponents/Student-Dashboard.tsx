"use client";

import React, { useEffect, useState } from "react";
import CompletedCourses from "./completedcourse/CompletedCourses";
import QuizCard from "./gamecard/QuizCard";

import Sidebar from "./sidebar/Sidebar";
// import Header from "./header/HeaderBar";
import RightSidebar from "./RightSidebar";
// import PerformanceOverview from "./perfromanceoverview/PerformanceOverview";
import ActiveCourses from "./activecourse/ActiveCourses";
import QuickQuizzes from "./quickquiz/QuickQuizzes";
import Header from "./header/HeaderBar";
import TutorialCard from "./tutorial/Tutorial";
import CourseCard, { Course } from "@/components/courseCard";
import axios from "axios";
import { api } from "@/lib/apiClient";
import PerformanceOverview from "./perfromanceoverview/PerformanceOverview";
// import { useAppSelector } from "@/store/hooks";

export default function StudentDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    interface RawCourse {
      course_id: string | number;
      course_name?: string;
      course_description?: string;
      course_content?: string;
      course_duration?: string;
      course_image?: string | null;
      min_age?: number;
      max_age?: number;
      minAge?: number;
      maxAge?: number;
      difficulty?: string;
      rating?: number;
      teacher_id?: string;
      modules?: unknown[];
      category?: { category_id?: string | number; category_name?: string };
      category_id?: string | number;
      type?: string;
      countryPrices?: Array<{
        price?: { base?: number; real?: number; discounted?: number };
      }>;
    }
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/api/courses");
        console.log("data is :", data);

        const rawCourses = Array.isArray(data?.data) ? data.data.flat() : [];
        console.log("Flattened rawCourses:", rawCourses);

        const mapped: Course[] = rawCourses.map((c: RawCourse) => {
          const countryPrice = Array.isArray(c.countryPrices)
            ? c.countryPrices[0]
            : undefined;
          const priceObj = countryPrice?.price;
          const price = priceObj
            ? priceObj.base ?? priceObj.discounted ?? priceObj.real ?? 0
            : 0;

          const minAge = c.min_age ?? c.minAge ?? "";
          const maxAge = c.max_age ?? c.maxAge ?? "";
          const ageLabel =
            minAge || maxAge
              ? `Age ${minAge}${minAge && maxAge ? "-" + maxAge : ""}`
              : "All";
          const level = c.difficulty?.trim() || "Beginner";
          const categoryName = c.category?.category_name ?? "Uncategorized";
          const imgRaw = c.course_image as string | undefined;
          const image =
            imgRaw && imgRaw.trim().toLowerCase() !== "null"
              ? imgRaw
              : undefined;

          return {
            course_id: String(c.course_id),
            title: c.course_name ?? "Untitled Course",
            description: c.course_description ?? c.course_content ?? "",
            price: Number(price),
            rating: Number(c.rating ?? 4.8),
            students: c.teacher_id ? "Live 1:1 Sessions" : "Self-paced",
            duration:
              c.course_duration ??
              (Array.isArray(c?.modules)
                ? `${c?.modules?.length} modules`
                : "N/A"),
            age: ageLabel,
            level: level.charAt(0).toUpperCase() + level.slice(1),
            category: categoryName,
            image,
          } as Course;
        });
        console.log("Mapped courses:", mapped);
        setCourses(mapped);
      } catch (err) {
        console.error("Failed to fetch courses", err);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="ml-[224px] p-4 flex flex-col gap-6">
      <div className="flex gap-6 mt-4">
        {/* Left Content (Main columns) */}
        <div className="flex-[2] flex flex-col gap-6">
          {/* PerformanceOverview will fetch its own data */}
          <PerformanceOverview />
          <ActiveCourses />
          <TutorialCard />
          <QuickQuizzes />
          <div>
            <QuizCard />
          </div>
          <div>
            <CompletedCourses />
          </div>
          <div className="w-full shadow-2xl rounded-3xl bg-white p-6">
            <h1 className="text-xl font-bold mb-4">Recommended Courses</h1>
            {courses?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses && courses?.slice(0, 3)?.map((course) => (
                  <CourseCard
                    key={course.course_id}
                    course={course}
                    variant="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No courses found.</div>
            )}
          </div>
        </div>
        <RightSidebar />
      </div>
    </main>
  );
}
