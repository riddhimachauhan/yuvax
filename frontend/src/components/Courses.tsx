"use client";

import React, { useEffect, useRef, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Category, clearError, CountryPrice, fetchCourses, fetchCoursesByCountry, Module } from "@/store/slices/coursesSlice";
import { Skeleton } from "./ui/skeleton";
import Container from "./common/Container";
import webIcon from "@/assets/websvg.svg";
import coading from "@/assets/codeIconsvg.svg";
import mobileIcon from "@/assets/mobilesvg.svg";
import { fetchCourseCategories } from "@/store/slices/courseCategoriesSlice";
import { useRouter } from "next/navigation";

interface CourseType {
  id: string;
  course_name: string;
  course_description: string;
  [key: string]:
    | string
    | number
    | null
    | Category
    | Module[]
    | CountryPrice[]
    | undefined;
}

interface CourseCardProps {
  course: CourseType;
  index: number;
  bgColor: string;
  iconSrc: string;
}

const CourseCard = React.memo<CourseCardProps>(({ course, index, bgColor, iconSrc }) => {
  const truncateSubtitle = (subtitle: string): string => {
    const words = subtitle.trim().split(/\s+/);
    return words.length > 4 ? words.slice(0, 4).join(" ") + "..." : subtitle;
  };

  return (
    <div className={`
      flex-shrink-0 w-56 md:w-64 h-40 md:h-56 rounded-3xl ${bgColor} 
      text-white  flex flex-col justify-between 
       duration-300
      ring-1 ring-white/20 overflow-hidden 
      px-3 sm:px-4 md:px-5 lg:px-3 xl:px-4 
      py-4 sm:py-5 md:py-6 lg:py-7 xl:py-6
    `}>
      <div>
        <p className="text-2xl font-bold drop-shadow-sm line-clamp-2">
          {course.course_name}
        </p>
        <p className="text-xs sm:text-sm md:text-sm font-base opacity-95 line-clamp-2">
          {truncateSubtitle(course.course_description)}
        </p>
      </div>
      <div className="flex justify-end items-end">
        <Image
          src={iconSrc}
          alt={course.course_name ?? `course-${index}`}
          width={70}
          height={70}
          className="w-16 h-16 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24"
          priority={index < 3}
        />
      </div>
    </div>
  );
});

CourseCard.displayName = 'CourseCard';

const CourseCardSkeleton = React.memo(() => (
  <div className="flex-shrink-0 w-56 md:w-64 h-40 md:h-56 rounded-3xl bg-gray-100 shadow-lg flex flex-col justify-between overflow-hidden px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-4 sm:py-5 md:py-6 lg:py-7 xl:py-8">
    <div className="space-y-3">
      <Skeleton className="h-5 w-3/4 bg-gray-200" />
      <Skeleton className="h-3 w-full bg-gray-200" />
      <Skeleton className="h-3 w-2/3 bg-gray-200" />
    </div>
    <div className="flex justify-end items-end">
      <Skeleton className="w-16 h-16 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full bg-gray-200" />
    </div>
  </div>
));

CourseCardSkeleton.displayName = 'CourseCardSkeleton';

const LoadingState = React.memo(() => (
  <Container>
    <section className="bg-gradient-to-b from-white to-slate-50 rounded-3xl p-6 sm:p-8 md:p-10 mx-auto my-6 sm:my-8 max-w-6xl shadow-lg ring-1 ring-gray-100 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
        <div className="mb-4 md:mb-0 flex-1">
          <Skeleton className="h-5 w-32 mb-3 bg-gray-200" />
          <Skeleton className="h-8 md:h-10 w-48 mb-3 bg-gray-200" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-xl bg-gray-200" />
            <Skeleton className="h-4 w-3/4 max-w-md bg-gray-200" />
          </div>
        </div>
        <div className="mt-3 md:mt-0">
          <Skeleton className="h-11 w-36 rounded-full bg-gray-200" />
        </div>
      </div>

      <div className="flex items-center w-full">
        <div className="hidden md:flex w-[15%] mt-auto space-x-2">
          <Skeleton className="w-12 h-12 rounded-full bg-gray-200" />
          <Skeleton className="w-12 h-12 rounded-full bg-gray-200" />
        </div>

        <div className="relative w-full md:w-[85%]">
          <div className="flex overflow-x-hidden gap-4 sm:gap-6 pb-2 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-6">
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#6637ED]" />
          <span className="text-sm">Loading courses...</span>
        </div>
      </div>
    </section>
  </Container>
));

LoadingState.displayName = 'LoadingState';

const ErrorState = React.memo<{ error: string; onRetry: () => void }>(({ error, onRetry }) => (
  <Container>
    <section className="bg-gradient-to-b from-white to-slate-50 rounded-3xl p-6 sm:p-8 md:p-10 mx-auto my-6 sm:my-8 max-w-6xl shadow-lg ring-1 ring-gray-100">
      <div className="flex flex-col justify-center items-center h-64">
        <div className="text-red-500 text-xl mb-2">⚠️</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Failed to load courses</h3>
        <p className="text-gray-600 text-center max-w-md mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[#6637ED] text-white rounded-lg hover:bg-[#5528d4] transition-colors"
        >
          Retry
        </button>
      </div>
    </section>
  </Container>
));

ErrorState.displayName = 'ErrorState';

const EmptyState = React.memo(() => (
  <Container>
    <section className="bg-gradient-to-b from-white to-slate-50 rounded-3xl p-6 sm:p-8 md:p-10 mx-auto my-6 sm:my-8 max-w-6xl shadow-lg ring-1 ring-gray-100">
      <div className="flex flex-col justify-center items-center h-64 relative">
        {/* Animated floating books */}
        <div className="relative mb-8">
          <div className="text-6xl animate-bounce" style={{ animationDelay: '0s' }}>📚</div>
          <div className="absolute -top-2 -right-4 text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>📖</div>
          <div className="absolute -bottom-2 -left-4 text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>📝</div>
        </div>

        {/* Floating sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-1/4 text-yellow-400 text-xl animate-ping" style={{ animationDelay: '0.5s' }}>✨</div>
          <div className="absolute top-16 right-1/3 text-blue-400 text-lg animate-ping" style={{ animationDelay: '1s' }}>⭐</div>
          <div className="absolute bottom-16 left-1/3 text-purple-400 text-sm animate-ping" style={{ animationDelay: '1.5s' }}>💫</div>
          <div className="absolute bottom-8 right-1/4 text-pink-400 text-xl animate-ping" style={{ animationDelay: '2s' }}>🌟</div>
        </div>

        <div className="text-center z-10 relative">
          <h3 className="text-2xl font-bold text-gray-800 mb-3 animate-pulse">
            Oops! It&apos;s a hidden course! 🙈          </h3>
          <p className="text-gray-600 text-lg mb-4 animate-fade-in">
            Don&apos;t worry, they&apos;ll be back soon with lots of fun learning adventures!
          </p>

          <div className="flex justify-center items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <span className="text-sm ml-3 animate-pulse">Coming back soon!</span>
          </div>
        </div>

        {/* Cute animated robot */}
        <div className="absolute bottom-4 right-8 text-4xl animate-bounce" style={{ animationDelay: '0.8s' }}>
          🤖
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        
        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  </Container>
));

EmptyState.displayName = 'EmptyState';

const COLORS = [
  "bg-gradient-to-br from-blue-400 to-blue-600",
  "bg-gradient-to-br from-violet-400 to-violet-600",
  "bg-gradient-to-br from-yellow-400 to-yellow-600",
  "bg-gradient-to-br from-pink-300 to-pink-500",
  "bg-gradient-to-br from-orange-800 to-orange-950",
  "bg-gradient-to-br from-green-400 to-green-600",
] as const;

const ICON_MAP = {
  web: webIcon,
  mobile: mobileIcon,
  coding: coading,
} as const;

const getIconForCourse = (title: string, index: number): string => {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("web") || lowerTitle.includes("frontend") || lowerTitle.includes("backend")) {
    return ICON_MAP.web;
  }
  if (lowerTitle.includes("mobile") || lowerTitle.includes("app") || lowerTitle.includes("android") || lowerTitle.includes("ios")) {
    return ICON_MAP.mobile;
  }
  if (lowerTitle.includes("programming") || lowerTitle.includes("coding") || lowerTitle.includes("development")) {
    return ICON_MAP.coding;
  }

  const iconKeys = Object.keys(ICON_MAP) as (keyof typeof ICON_MAP)[];
  return ICON_MAP[iconKeys[index % iconKeys.length]];
};

const Courses: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { courses, loading, error } = useAppSelector((state) => state.courses);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [country, setCountry] = useState<string>("");
  const scrollPositionRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    // Fetch categories and courses using Redux
    const fetchCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setCountry(data.country_name || "India");
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    fetchCountry();
    dispatch(fetchCourseCategories());
    // dispatch(fetchCourses())
  }, [dispatch]);

  useEffect(() => {
    if (!country) return;
    // console.log("country fetch is :", country);

      dispatch(fetchCoursesByCountry(country));
    }, [dispatch, country]);

    console.log("courses data is :", courses,country);

  // Memoized course data processing
  const processedCourses = useMemo(() => {
    if (!courses.length) return [];

    return courses.map((course, index) => ({
      ...course,
      id: course.course_id ?? String(index), // Ensure id is always a string
      bgColor: COLORS[index % COLORS.length],
      iconSrc: getIconForCourse(course.course_name ?? "", index),
    }));
  }, [courses]);

  // Duplicate courses for seamless infinite scroll
  const duplicatedCourses = useMemo(() => {
    if (!processedCourses.length) return [];
    return [...processedCourses, ...processedCourses, ...processedCourses]; // Triple for smoother infinite
  }, [processedCourses]);

  // Smooth auto-scroll using requestAnimationFrame
  const startAnimation = useCallback(() => {
    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      if (!isPaused && carouselRef.current) {
        const scrollSpeed = 50; // Increased speed for smoother perception
        const pixelsToMove = (scrollSpeed * deltaTime) / 1000;

        scrollPositionRef.current += pixelsToMove;

        // Apply transform with smooth sub-pixel precision
        carouselRef.current.style.transform = `translateX(-${scrollPositionRef.current}px)`;

        // Reset position for infinite loop
        const singleSetWidth = carouselRef.current.scrollWidth / 3;
        if (scrollPositionRef.current >= singleSetWidth) {
          scrollPositionRef.current = 0;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      lastTimeRef.current = 0;
    }
  }, []);

  const handleManualScroll = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;

    const cardWidth = 280; // Approximate card width including gap

    // Update scroll position based on direction
    if (direction === 'next') {
      scrollPositionRef.current += cardWidth; // Move right (forward)
    } else {
      scrollPositionRef.current -= cardWidth; // Move left (backward)
    }

    // Handle wrapping for infinite scroll
    const singleSetWidth = carouselRef.current.scrollWidth / 3;
    if (scrollPositionRef.current >= singleSetWidth) {
      scrollPositionRef.current = 0;
    } else if (scrollPositionRef.current < 0) {
      scrollPositionRef.current = singleSetWidth - cardWidth;
    }

    // Apply smooth transition
    carouselRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    carouselRef.current.style.transform = `translateX(-${scrollPositionRef.current}px)`;

    // Remove transition after animation completes and resume auto-scroll
    setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.style.transition = '';
      }
    }, 500);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleRetry = () => {
    dispatch(fetchCourses());
  };

  // Start animation when courses are loaded
  useEffect(() => {
    if (duplicatedCourses.length > 0) {
      startAnimation();
    }
    return () => stopAnimation();
  }, [duplicatedCourses.length, startAnimation, stopAnimation]);

  // Fetch courses on mount
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Cleanup error on unmount
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [dispatch, error]);

  // Render states
  if (loading && courses.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />;
  }

  if (courses.length === 0) {
    return <EmptyState />;
  }

  return (
    <Container>
      <section className="bg-gradient-to-b from-white to-slate-50 rounded-3xl p-6 sm:p-8 md:p-10 mx-auto my-6 sm:my-8 max-w-6xl shadow-lg ring-1 ring-gray-100 relative overflow-hidden">

        {/* Loading overlay for refresh */}
        {loading && courses.length > 0 && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6637ED]" />
          </div>
        )}

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <div className="mb-4 md:mb-0">
            <span className="text-base sm:text-lg text-[#6637ED] font-semibold">
              Uplevel your skills
            </span>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-3xl md:text-4xl mt-2 mb-2">
              Our Courses
            </h1>
            <p className="text-gray-500 max-w-xl text-sm sm:text-base">
              From K–12 fundamentals to advanced skill programs, explore
              <span className="font-semibold  font-sans text-black">
                {courses.length}+ courses
              </span>{" "}
              designed to make learning smarter, engaging, and future-ready.
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <button
              onClick={() => router.push("/categories")}
              className="inline-block bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-sm font-semibold shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1CA672]"
            >
              View all Courses
            </button>
          </div>
        </header>

        {/* Carousel */}
        <div className="flex items-center w-full">
          {/* Desktop controls */}
          <div className="hidden md:flex w-[15%] mt-auto space-x-8">
            <button
              onClick={() => handleManualScroll('next')}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl shadow-sm hover:shadow-md transition-shadow"
              aria-label="Previous courses"
            >
              &lt;
            </button>
            <button
              onClick={() => handleManualScroll('prev')}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl shadow-sm hover:shadow-md transition-shadow"
              aria-label="Next courses"
            >
              &gt;
            </button>
          </div>

          {/* Carousel container */}
          <div className="relative w-full md:w-[85%]">
            {/* Blur edges */}
            {/* <div className="pointer-events-none absolute -left-3 top-0 bottom-0 w-14 md:w-20 z-20 flex items-center">
              <div className="w-full h-full relative">
                <Image
                  src={blur}
                  alt=""
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover" }}
                  className="opacity-95"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute -right-6 top-0 bottom-0 w-14 md:w-20 z-20 flex items-center">
              <div className="w-full h-full relative -scale-x-100">
                <Image
                  src={blur}
                  alt=""
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover" }}
                  className="opacity-95"
                />
              </div>
            </div> */}

            {/* Smooth scrolling carousel with JavaScript controls */}
            <div className="relative overflow-hidden rounded-xl">
              <div
                ref={carouselRef}
                className="flex gap-4 sm:gap-6"
                style={{
                  width: 'fit-content',
                  transition: 'transform 0.3s ease-out',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {duplicatedCourses.map((course, index) => (
                  <CourseCard
                    key={`${course.id || index}-${index}`}
                    course={course}
                    index={index}
                    bgColor={course.bgColor}
                    iconSrc={course.iconSrc}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          /* No CSS animations needed - using JavaScript control */
        `}</style>
      </section>
    </Container>
  );
};

export default Courses;