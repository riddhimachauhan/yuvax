"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import type { RootState } from "@/store/store";
import { fetchCourseById } from "@/store/slices/coursesSlice";

import HeroWithNavbar from "@/components/herosection-coursedetails";
import CourseDetailCard from "@/components/CourseDetailCard";
import CourseDetailsSubscribe from "@/components/course-detailssubscribe";
import Faq from "@/components/Faq";
import Footer from "@/components/common/Footer";
import type { AppDispatch } from "@/store/store";

import { useMeQuery } from "@/store/api/authApi";
import { openLoginModal } from "@/store/slices/modalSlice";
import BuyCourseModal from "@/components/BuyCourseModal";

export default function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const courseId = id;
  const dispatch = useDispatch<AppDispatch>();

  // Auth state
   const { data: me } = useMeQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const isLoggedIn = !!me;
  // console.log("is logged in : ", isLoggedIn)

  // Course state
  const { selectedCourse, loading,error  } = useSelector((s: RootState) => s.courses);

  console.log("selected course :", selectedCourse)

  // Buy modal
  const [buyOpen, setBuyOpen] = useState(false);

  useEffect(() => {
    // console.log("course id : ", courseId)
    if (courseId) dispatch(fetchCourseById(courseId));  
  }, [dispatch, courseId]);

  useEffect(() => {
    console.log("[CourseDetailsPage] loading:", loading, "error:", error);
    console.log("[CourseDetailsPage] selectedCourse:", selectedCourse);
  }, [loading,error,selectedCourse]);

  // Map your backend payload -> UI components
  const ui = useMemo(() => {
    if (!selectedCourse) return null;

    // difficulty -> readable label
    const levelMap: Record<string, string> = {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advance: "Advanced",
      expert: "Expert",
    };
    const level = levelMap[selectedCourse.difficulty] || "Intermediate";

    // Age group
    const ageGroup = `${selectedCourse.min_age ?? "4"}-${selectedCourse.max_age ?? "12"}`;

    // Compute class duration from modules (min-max)
    const durations = (selectedCourse.modules || [])
      .map((m) => m.duration)
      .filter((n): n is number => typeof n === "number");
    const minDur = durations.length ? Math.min(...durations) : null;
    const maxDur = durations.length ? Math.max(...durations) : null;
    const classDuration =
      minDur && maxDur
        ? minDur === maxDur
          ? `${minDur} min`
          : `${minDur}-${maxDur} min`
        : "60 mins";

    // Price: prefer INR with price, else any with price
    const priceObj =
      selectedCourse.countryPrices?.find(
        (c) => (c.currency || "").toUpperCase() === "INR" && c.price
      )?.price ||
      selectedCourse.countryPrices?.find((c) => !!c.price)?.price ||
      null;

    const monthly = Math.round(
      (priceObj?.real ?? priceObj?.discounted ?? priceObj?.base) as number
    );
    const classesPerMonth = 4;
    const perClass = Math.max(1, Math.round(monthly / classesPerMonth));

    // Chapters from modules
    const chapters =
      selectedCourse.modules?.map((m, i) => ({
        index: i + 1,
        title: m.module_title,
        description:
          m.module_description ||
          "Interactive and practical approach to core concepts.",
      })) || [];

    return {
      hero: {
        title: selectedCourse.course_name,
        subtitle: selectedCourse.course_description,
        createdBy: selectedCourse.category?.category_name || "YuvaX",
        lastUpdated: new Date(selectedCourse.updated_at || Date.now()).toLocaleDateString("en-US", {
          month: "numeric",
          year: "numeric",
        }), // e.g. 10/2025
        language: selectedCourse.language || "English",
        isBestseller: Number(selectedCourse.rating ?? 0) >= 4.5,
        info: {
          ageGroup,
          courseType: selectedCourse.type || "1 on 1",
          classDuration,
          courseDuration: selectedCourse.course_duration || `${chapters.length} Classes`,
          courseLevel: level,
        },
      },
      card: {
        title: selectedCourse.course_name,
        tags: [
          selectedCourse.category?.category_name,
          selectedCourse.language,
          level,
        ].filter(Boolean) as string[],
        chapters,
        price: {
          currency: "INR" as const,
          monthly,
          perClass,
          classesPerMonth,
        },
      },
      buy: {
        id: selectedCourse.course_id,
        title: selectedCourse.course_name,
        highlights: [
          "Strong Learning Foundation",
          "Flexible Learning Options",
          "Gamified Learning",
          "Personal AI Tutor",
          "Recognition Certificate",
        ],
        price: { monthly, currency: "INR" as const },
      },
    };
  }, [selectedCourse]);

  const handleEnroll = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    setBuyOpen(true);
  };

  return (
    <div className="bg-[#F4FAFC] ml-[249px] mt-4">
      <HeroWithNavbar
        courseTitle={ui?.hero.title || "Loading..."}
        courseSubtitle={ui?.hero.subtitle || ""}
        createdBy={ui?.hero.createdBy || ""}
        lastUpdated={ui?.hero.lastUpdated || ""}
        language={ui?.hero.language || "English"}
        isBestseller={ui?.hero.isBestseller || false}
        courseInfo={ui?.hero.info}
      />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {loading || !ui ? (
            <div className="animate-pulse h-64 bg-white rounded-2xl border" />
          ) : (
            <CourseDetailCard course={ui.card} onEnroll={handleEnroll} />
          )}
        </div>
      </main>

      <div className="py-8">
        <CourseDetailsSubscribe />
      </div>

      <main className="py-8">
        <div className="container mx-auto px-4">
          <Faq />
        </div>
      </main>

      <Footer />

      {ui && (
        <BuyCourseModal
          open={buyOpen}
          onClose={() => setBuyOpen(false)}
          course={ui.buy}
        />
      )}
    </div>
  );
}