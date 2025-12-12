"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import CourseCard, { Course } from "./courseCard";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import tutorial from "../assets/tutorial.svg";
import group from "../assets/group.svg";
import onetone from "../assets/onetooneSession.svg";
import beginner from "../assets/Beginner.svg";
import intermediate from "../assets/Intermediate.svg";
import advance from "../assets/Advance.svg";
import expert from "../assets/Expert.svg";
import list from "../assets/list.svg";
import grid from "../assets/grid.svg";

// Redux imports
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCourseCategories } from "../store/slices/courseCategoriesSlice";
import {
  fetchCourses,
  fetchCoursesByCountry,
} from "../store/slices/coursesSlice";

/* ----------------------
   Types
   ---------------------- */
interface Filters {
  courseTypes: string[];
  categories: string[];
  level: string;
  age: string;
}

type LocalCourse = Course & {
  categoryId?: string;
  type?: string;
  course_id?: string;
  age?: string;
  level?: string;
  students?: string;
  duration?: string;
  image?: string;
};

const categoryEmojis: Record<string, string> = {};

/* ----------------------
   Constants
   ---------------------- */
const COURSE_TYPES = [
  { name: "1 on 1 Class", icon: "🎮", image: onetone },
  { name: "Group Class", icon: "💻", image: group },
  { name: "Tutorial", icon: "📚", image: tutorial },
] as const;

const AGE_OPTIONS = ["All", "4-6", "6-8", "8-10", "10-12", "12+"] as const;

const LEVELS = [
  { key: "Beginner", image: beginner },
  { key: "Intermediate", image: intermediate },
  { key: "Advanced", image: advance },
  { key: "Expert", image: expert },
] as const;

/* ----------------------
   Loading & Error Components
   ---------------------- */
const ErrorState = ({ 
  message, 
  onRetry 
}: { 
  message: string; 
  onRetry: () => void 
}) => (
  <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 mx-auto max-w-2xl">
    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg
        className="w-10 h-10 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      Unable to Load Courses
    </h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">
      {message}
    </p>
    <button
      onClick={onRetry}
      className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      Try Again
    </button>
  </div>
);

const EmptyState = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
    <div className="flex flex-col items-center gap-2">
      {icon}
      <div className="text-gray-600 text-base font-medium">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  </div>
);

/* ----------------------
   Component
   ---------------------- */
const Category: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    courseTypes: [],
    categories: [],
    level: "",
    age: "All",
  });
  const [ageDropdownOpen, setAgeDropdownOpen] = useState(false);
  const [levelIndex, setLevelIndex] = useState<number | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);
  const [sortOrder, setSortOrder] = useState<"price_asc" | "price_desc">(
    "price_asc"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Redux state
  const dispatch = useAppDispatch();
  const {
    categories: categorieslist,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useAppSelector((state) => state.courseCategories);

  const {
    courses: reduxCourses,
    loading: coursesLoading,
    error: coursesError,
  } = useAppSelector((state) => state.courses);

  const [country, setCountry] = useState<string>("India");

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
  }, [dispatch]);

  useEffect(() => {
    if (!country) return;
    dispatch(fetchCoursesByCountry(country));
  }, [dispatch, country]);

  // Transform Redux courses to LocalCourse format
  const courses: LocalCourse[] = useMemo(() => {
    if (!reduxCourses || !Array.isArray(reduxCourses)) return [];

    return reduxCourses.map((c) => {
      const countryPrice = Array.isArray(c.countryPrices)
        ? c.countryPrices[0]
        : undefined;
      const priceObj = countryPrice?.price;
      const price = priceObj
        ? priceObj.base ?? priceObj.discounted ?? priceObj.real ?? 0
        : 0;

      const minAge = c.min_age ?? "";
      const maxAge = c.max_age ?? "";
      const ageLabel =
        minAge || maxAge
          ? `Age ${minAge}${minAge && maxAge ? "-" + maxAge : ""}`
          : "All";
      const level = c.difficulty?.trim() || "Beginner";

      const categoryName = c.category?.category_name ?? "Uncategorized";
      const imgRaw = c.course_image;
      const image =
        imgRaw && imgRaw.trim().toLowerCase() !== "null"
          ? imgRaw
          : categoryEmojis[categoryName] || "/api/placeholder/300/200";

      return {
        course_id: String(c.course_id || ""),
        title: c.course_name ?? c.course_name ?? "Untitled Course",
        description: c.course_description ?? c.course_content ?? "",
        price: Number(price),
        rating: Number(c.rating ?? 4.8),
        students: c.teacher_id ? "Live 1:1 Sessions" : "Self-paced",
        duration:
          c.course_duration ??
          (Array.isArray(c.modules) ? `${c.modules.length} modules` : "N/A"),
        age: ageLabel,
        level: level.charAt(0).toUpperCase() + level.slice(1),
        category: categoryName,
        categoryId: c.category?.category_id
          ? String(c.category.category_id)
          : c.category_id
            ? String(c.category_id)
            : undefined,
        type: c.type ?? "Tutorial/Training",
        image,
      } as LocalCourse;
    });
  }, [reduxCourses]);

  const handleCourseTypeChange = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      courseTypes: prev.courseTypes.includes(type)
        ? prev.courseTypes.filter((t) => t !== type)
        : [...prev.courseTypes, type],
    }));
  };

  const handleCategoryChange = (categoryId: string) => {
    setFilters((prev) => {
      if (prev.categories.includes(categoryId)) {
        return { ...prev, categories: [] };
      }
      return { ...prev, categories: [categoryId] };
    });
  };

  const handleAgeChange = (age: string) => {
    setFilters((prev) => ({ ...prev, age }));
    setAgeDropdownOpen(false);
  };

  const clearFilters = () => {
    setFilters({ courseTypes: [], categories: [], level: "", age: "All" });
    setMobileFiltersOpen(false);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "price_asc" ? "price_desc" : "price_asc"));
  };

  const filteredCourses = useMemo(() => {
    const filtered = courses.filter((course) => {
      if (
        filters.courseTypes.length > 0 &&
        !filters.courseTypes.includes(course.type ?? "")
      ) {
        return false;
      }

      if (filters.categories.length > 0) {
        const cid = course.categoryId ?? "";
        if (!cid) return false;
        if (!filters.categories.includes(cid)) return false;
      }
      if (filters.level && course.level !== filters.level) return false;
      if (filters.age && filters.age !== "All") {
        if (!String(course.age ?? "").includes(filters.age)) return false;
      }
      return true;
    });

    const sorted = [...filtered].sort((a, b) =>
      sortOrder === "price_asc" ? a.price - b.price : b.price - a.price
    );
    return sorted;
  }, [courses, filters, sortOrder]);

  const sortLabel =
    sortOrder === "price_asc" ? "Price: low to high" : "Price: high to low";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileFiltersOpen) setMobileFiltersOpen(false);
    };
    document.addEventListener("keydown", onKey);
    if (mobileFiltersOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [mobileFiltersOpen]);

  /* ----------------------
     Sub-Components
     ---------------------- */
  const FilterPanel: React.FC<{ compact?: boolean }> = ({ compact }) => (
    <div className={`bg-white rounded-xl shadow-sm ${compact ? "p-4" : "p-6"}`}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm -mx-4 -mt-4 px-4 pt-4 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-100 text-sm font-medium"
            >
              Clear All
            </button>
            {compact && (
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 text-sm font-medium"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Course Type */}
      <div className="py-4 ">
        <h3 className="font-semibold text-gray-900 mb-4 text-base">Course Type</h3>
        <div className="grid grid-cols-3 gap-3">
          {COURSE_TYPES.map((type) => (
            <button
              key={type.name}
              onClick={() => handleCourseTypeChange(type.name)}
              className={`p-3 rounded-xl border-2 text-center transition-all duration-200 group cursor-pointer ${filters.courseTypes.includes(type.name)
                  ? "border-blue-500 bg-blue-50 shadow-sm scale-105"
                  : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                }`}
            >
              <div className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center transition-colors ${filters.courseTypes.includes(type.name)
                  ? "bg-blue-100"
                  : "bg-gray-100 group-hover:bg-blue-50"
                }`}>
                <Image
                  src={type.image}
                  alt={type.name}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div className={`text-xs font-medium px-1 text-center leading-tight break-words ${filters.courseTypes.includes(type.name)
                  ? "text-blue-700"
                  : "text-gray-700 group-hover:text-gray-900"
                }`}>
                {type.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Age */}
      <div className="py-4 ">
        <h3 className="font-semibold text-gray-900 mb-3 text-base">Age</h3>
        <div className="relative">
          <button
            onClick={() => setAgeDropdownOpen(!ageDropdownOpen)}
            className={`w-full px-4 py-3 bg-white border rounded-lg flex items-center justify-between transition-all duration-200 group cursor-pointer ${ageDropdownOpen
                ? "border-blue-500 shadow-sm ring-1 ring-blue-500/20"
                : "border-gray-300 hover:border-gray-400 hover:shadow-sm"
              }`}
          >
            <span className={`text-sm font-medium ${filters.age ? "text-gray-900" : "text-gray-500"
              }`}>
              {filters.age || "Select age"}
            </span>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform duration-200 ${ageDropdownOpen
                  ? "rotate-180 text-blue-600"
                  : "text-gray-400 group-hover:text-gray-600"
                }`}
            />
          </button>

          {ageDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
              {AGE_OPTIONS.map((age, index) => (
                <button
                  key={age}
                  onClick={() => handleAgeChange(age)}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors duration-150 hover:bg-gray-50/80 ${filters.age === age
                      ? "bg-blue-50 text-blue-700 font-medium border-l-2 border-l-blue-500"
                      : "text-gray-700"
                    } ${index === 0 ? "rounded-t-lg" : ""} ${index === AGE_OPTIONS.length - 1 ? "rounded-b-lg" : ""
                    }`}
                >
                  {age}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Course Level */}
      <div className="py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base text-gray-900 font-semibold">Course Level</h3>
        </div>

        <div className="flex items-center justify-between px-1 mb-4">
          {LEVELS.map((item, i) => {
            const active = levelIndex === i;
            return (
              <button
                key={item.key}
                onClick={() => {
                  if (levelIndex === i) {
                    setLevelIndex(null);
                    setFilters((prev) => ({ ...prev, level: "" }));
                  } else {
                    setLevelIndex(i);
                    setFilters((prev) => ({ ...prev, level: item.key }));
                  }
                }}
                className="flex flex-col items-center gap-3 px-2 py-2 bg-transparent border-0 transition-all duration-200 group cursor-pointer"
                aria-pressed={active}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${active
                      ? "bg-emerald-100 ring-3 ring-emerald-200 shadow-sm scale-110"
                      : "bg-gray-50 group-hover:bg-gray-100 group-hover:scale-105"
                    }`}
                >
                  <Image
                    src={item.image}
                    alt={item.key}
                    width={item.key === "Expert" ? 28 : 24}
                    height={item.key === "Expert" ? 28 : 24}
                    className="transition-transform duration-200"
                  />
                </div>
                <div
                  className={`text-xs font-medium transition-colors duration-200 ${active ? "text-emerald-700" : "text-gray-600 group-hover:text-gray-900"
                    }`}
                >
                  {item.key}
                </div>
              </button>
            );
          })}
        </div>

        <div className="relative px-2">
          <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 transition-all duration-300 ease-out"
              style={{
                width: levelIndex === null ? "0%" : `${(levelIndex / 3) * 100}%`,
              }}
            />
          </div>

          <div
            className="absolute -top-2.5 transition-all duration-300 ease-out"
            style={{
              left: levelIndex === null ? "0%" : `${(levelIndex / 3) * 97}%`,
              transform: "translateX(-50%)",
            }}
            aria-hidden
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${levelIndex === null ? 'bg-gray-300' : 'bg-white'
              } shadow-lg border border-gray-200/80 transition-transform duration-300 ${levelIndex !== null ? 'scale-110' : ''
              }`}>
              {levelIndex !== null && (
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={3}
            step={1}
            value={levelIndex === null ? 0 : levelIndex}
            onChange={(e) => {
              const idx = Number(e.target.value);
              setLevelIndex(idx);
              setFilters((prev) => ({
                ...prev,
                level: LEVELS[idx].key,
              }));
            }}
            aria-label="Course level"
            className="absolute inset-0 w-full h-8 appearance-none bg-transparent cursor-pointer opacity-0"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="py-6">
        <h3 className="text-gray-900 mb-4 text-base font-semibold">Course Categories</h3>

        <div className="flex flex-col space-y-3">
          {categoriesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3 bg-gray-50 animate-pulse rounded-lg"
                >
                  <div className="w-5 h-5 bg-gray-200 rounded flex-shrink-0" />
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : categoriesError ? (
            <ErrorState
              message="Unable to load categories"
              onRetry={() => dispatch(fetchCourseCategories())}
            />
          ) : categorieslist.length === 0 ? (
            <EmptyState
              icon={
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="No categories found"
              description="Check back later for new categories"
            />
          ) : (
            [...categorieslist]
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((cat) => {
                const checked = filters.categories.includes(cat.title);
                const image = cat.icon || "📦";

                return (
                  <label
                    key={cat.title}
                    className={`flex items-center gap-4 p-0 transition-all duration-200 cursor-pointer group  ${checked
                        ? "bg-blue-50 border-blue-200 shadow-sm"
                        : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                      }`}
                  >
                    <div className={`relative flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 ${checked
                        ? "bg-blue-600 border-blue-600"
                        : "bg-white border-gray-300 group-hover:border-gray-400"
                      }`}>
                      {checked && (
                        <svg
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${checked
                          ? "bg-blue-100"
                          : "bg-gray-100 group-hover:bg-gray-200"
                        }`}>
                        <Image
                          src={image}
                          alt={cat.title}
                          width={25}
                          height={25}
                          className="object-contain flex-shrink-0"
                        />
                      </div>
                      <span className={`text-sm font-medium truncate ${checked ? "text-blue-900" : "text-gray-700"
                        }`}>
                        {cat.title}
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCategoryChange(cat.title)}
                      className="absolute opacity-0 w-0 h-0"
                    />
                  </label>
                );
              })
          )}
        </div>
      </div>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="w-full max-w-[400px] mx-auto flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse"
            >
              {/* Card Body Skeleton */}
              <div className="flex-1 flex flex-col p-3 sm:p-4">
                {/* Header Skeleton */}
                <div className="h-36 sm:h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 relative">
                  {/* Level Badge Skeleton */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-16 h-6 bg-gray-300 rounded-full"></div>

                  {/* Price Section Skeleton */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                    <div className="w-12 h-3 bg-gray-300 rounded mb-1"></div>
                    <div className="w-16 h-5 bg-gray-300 rounded"></div>
                  </div>

                  {/* Image Skeleton */}
                  <div className="absolute right-3 sm:right-4 bottom-3 sm:bottom-4 w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-lg sm:rounded-xl"></div>
                </div>

                {/* Title and Description Skeleton */}
                <div className="flex-1 mt-3 sm:mt-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>

                {/* Buttons Skeleton */}
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 w-full">
                  <div className="w-full sm:flex-1 h-8 bg-gray-200 rounded-lg"></div>
                  <div className="w-full sm:flex-1 h-8 bg-gray-200 rounded-lg"></div>
                </div>
              </div>

              {/* Footer Skeleton */}
              <div className="px-2 py-1 sm:px-2">
                <div className="bg-gray-100 rounded-xl p-1 sm:p-4 border-t border-gray-200 w-full">
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((icon) => (
                      <div
                        key={icon}
                        className="flex items-center gap-1"
                      >
                        <div className="w-4 h-4 bg-gray-300 rounded"></div>
                        <div className="h-3 bg-gray-300 rounded w-16"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View Skeletons
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6 flex flex-col lg:flex-row gap-5 sm:gap-6 animate-pulse"
            >
              {/* Image Column Skeleton */}
              <div className="w-full lg:w-48 h-60 flex-shrink-0 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                <div className="absolute top-3 left-3 w-16 h-6 bg-gray-300 rounded-full"></div>
                <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
              </div>

              {/* Content Column Skeleton */}
              <div className="flex-1 min-w-0 flex flex-col space-y-4">
                {/* Title and Description */}
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>

                {/* Features List Skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                    </div>
                  ))}
                </div>

                {/* Price and Buttons Skeleton */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-8 bg-gray-200 rounded"></div>
                    <div className="w-16 h-6 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="w-full sm:w-24 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="w-full sm:w-28 h-10 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4FAFC] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div className="flex items-center gap-3 mb-4 lg:mb-0">
           
            <h1 className="text-2xl font-bold text-gray-900">
              Trending Courses
            </h1>
          </div>

          <div className="flex items-center gap-4">
             <button
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg text-black bg-white shadow-sm border border-gray-200"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="font-medium text-base">Filters</span>
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${mobileFiltersOpen ? "rotate-180" : ""
                  }`}
              />
            </button>
            <button
              onClick={toggleSortOrder}
              className="flex items-center space-x-2 text-base text-gray-600 hover:text-gray-800 focus:outline-none px-3 py-2 bg-white rounded-lg border border-gray-200"
            >
              <span>{sortLabel}</span>
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${sortOrder === "price_asc" ? "rotate-0" : "rotate-180"
                  }`}
              />
            </button>

            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className={`flex items-center justify-center p-2 rounded-md transition text-black ${viewMode === "grid" ? "bg-white" : "bg-white"
                } hover:bg-gray-100 border border-gray-200`}
              aria-label="Toggle view"
            >
              {viewMode === "grid" ? (
                <Image
                  src={list}
                  alt="grid icon"
                  width={16}
                  height={16}
                  className="rounded"
                />
              ) : (
                <Image
                  src={grid}
                  alt="grid icon"
                  width={16}
                  height={16}
                  className="rounded"
                />
              )}
            </button>
          </div>
        </div>

        {/* Main Content - Side by Side Columns */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Hidden on mobile, shown on desktop */}
          <aside className="hidden lg:block w-full lg:w-80 xl:w-96 sticky top-6 self-start h-[calc(100vh-48px)] overflow-auto 
                          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <FilterPanel />
          </aside>

          {/* Courses Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence>
              {mobileFiltersOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="fixed inset-0 z-40 lg:hidden"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <div className="absolute inset-0 bg-black/40" />
                  <motion.div
                    ref={mobilePanelRef}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute inset-y-0 left-0 w-80 max-w-full bg-white overflow-y-auto
                                [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    initial={{ x: -320 }}
                    animate={{ x: 0 }}
                    exit={{ x: -320 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <FilterPanel compact />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Courses Grid/List */}
            <div className="bg-[#F4FAFC] rounded-lg max-w-7xl mx-auto">
              {coursesLoading ? (
                <LoadingSkeleton />
              ) : coursesError ? (
                <ErrorState 
                  message={coursesError} 
                  onRetry={() => dispatch(fetchCourses())} 
                />
              ) : filteredCourses.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 mx-auto max-w-2xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    No Courses Found
                  </h3>
                  <p className="text-gray-600 mb-2 text-base">
                    We couldn&apos;t find any courses matching your criteria.
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2 text-base"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Clear All Filters
                  </button>
                </div>
              ) : viewMode === "grid" ? (
                // Grid View - Courses
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence initial={false}>
                    {filteredCourses.map((course) => (
                      <motion.div
                        key={course.course_id}
                        layout
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{
                          duration: 0.28,
                          ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className="w-full flex justify-center"
                      >
                        <CourseCard course={course} variant="grid" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                // List View - Courses
                <div className="space-y-6">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.course_id}
                      course={course}
                      variant="list"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;