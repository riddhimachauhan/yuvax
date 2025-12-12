"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import AI from "@/assets/AI.svg";
import AppDevelopment from "@/assets/AppDevelopment.svg";
import Course from "@/assets/Course.svg";
import GameDevelopment from "@/assets/GameDevelopment.svg";
import Public from "@/assets/public.svg";
import Python from "@/assets/python.svg";
import Script from "@/assets/script.svg";
import Spoken from "@/assets/Spoken.svg";
import Web from "@/assets/WebDevelopment.svg";
import CourseDetails1 from "@/assets/coursedetails1.svg";
import CourseDetails2 from "@/assets/coursedetails2.svg";
import CourseDetails3 from "@/assets/coursedetails33.svg";
import AIcon from "@/assets/a.svg";
import BIcon from "@/assets/b.svg";
import CIcon from "@/assets/c.svg";
type Course = {
  id: string;
  name: string;
  icon: StaticImageData;
};
type ExpandedSections = {
  courses: boolean;
  details: boolean;
  duration: boolean;
};
const courses: Course[] = [
  { id: "python", name: "Python Programming", icon: Python },
  { id: "app", name: "App Development", icon: AppDevelopment },
  { id: "game", name: "Game Development", icon: GameDevelopment },
  { id: "scratch", name: "Scratch Coding", icon: Script },
  { id: "web", name: "Web Development", icon: Web },
  { id: "ai", name: "AI for Kids", icon: AI },
  { id: "english", name: "Spoken English", icon: Spoken },
  { id: "speaking", name: "Public Speaking", icon: Public },
];

const courseTypesOptions = [
  {
    id: "oneonone",
    title: "1 on 1 Classes",
    icon: CourseDetails1,
  },
  {
    id: "group",
    title: "Group Class",
    icon: CourseDetails2,
  },
  {
    id: "recorded",
    title: "Recorded Tutorial",
    icon: CourseDetails3,
  },
];

const Payment: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    courses: true,
    details: false,
    duration: false,
  });

  const [selectedCourseType, setSelectedCourseType] = useState<string | null>("oneonone");
  const [courseLevel, setCourseLevel] = useState<number>(45);
  const [totalClasses, setTotalClasses] = useState<number>(8);
  const [completedSections, setCompletedSections] = useState({
    courses: false,
    details: false,
    duration: false,
  });

  const maxClasses = 20;

  // Reusable Next button utilities so style changes apply everywhere consistently
  const getNextButtonClass = (disabled: boolean) =>
    `px-10 ${
      disabled
        ? "bg-[#FFFFFF10] text-black border rounded-xl  border-black cursor-not-allowed"
        : "bg-[#000000] border border-0 rounded-xl text-white hover:bg-gray-800"
    }`;

  type NextButtonProps = {
    onClick: () => void;
    disabled?: boolean;
  };

  const NextButton: React.FC<NextButtonProps> = ({ onClick, disabled = false }) => (
    <Button className={getNextButtonClass(Boolean(disabled))} onClick={onClick} disabled={disabled}>
      Next
    </Button>
  );

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleNextStep = (section: "courses" | "details" | "duration") => {
    if (section === "courses") {
      // Check if a course is selected before proceeding
      if (!selectedCourse) {
        return; // Don't proceed if no course is selected
      }
      setCompletedSections((p) => ({ ...p, courses: true }));
      setExpandedSections({ courses: false, details: true, duration: false });
    } else if (section === "details") {
      setCompletedSections((p) => ({ ...p, details: true }));
      setExpandedSections({ courses: false, details: false, duration: true });
    } else if (section === "duration") {
      setCompletedSections((p) => ({ ...p, duration: true }));
      setExpandedSections({ courses: false, details: false, duration: false });
    }
  };

  type SectionKey = keyof ExpandedSections;
  const accordionList: { id: SectionKey; title: string; icon: StaticImageData | string }[] = [
    { id: "courses", title: "What Courses We Offer", icon: "📚" },
    { id: "details", title: "Course Details", icon: Course },
    { id: "duration", title: "Course Duration", icon: Course },
  ];

  const renderSectionContent = (id: SectionKey) => {
    if (id === "courses") {
      return (
        <>
          <div className="px-4">
            <div
              className="overflow-y-auto py-6 pr-2"
              style={{
                maxHeight: "270px", 
              }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className={`pt-8 pb-4 px-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md flex flex-col items-center ${
                      selectedCourse === course.id ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-white hover:border-emerald-300"
                    }`}
                    onClick={() => setSelectedCourse((prev) => (prev === course.id ? "" : course.id))}
                  >
                    <div className="relative -mt-14 mb-2 w-14 h-14 rounded-xl flex items-center justify-center">
                      <Image src={course.icon} alt={course.name} width={80} height={80} style={{ objectFit: "contain" }} />
                    </div>

                    <div className="text-sm font-medium  text-gray-700 text-center leading-tight">{course.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <NextButton  onClick={() => handleNextStep("courses")} disabled={!selectedCourse} />
            </div>
          </div>
        </>
      );
    }

    if (id === "details") {
      return (
        <>
          <div className="mt-6 space-y-6">
            <h4 className="text-md text-gray-700 mb-3 font-medium">Course Type</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courseTypesOptions.map((opt) => {
                const isActive = selectedCourseType === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedCourseType(opt.id)}
                    className={`flex items-center gap-6 p-4 rounded-2xl bg-white shadow-sm transition-all text-left w-full hover:shadow-lg focus:outline-none ${
                      isActive ? "ring-2 ring-offset-2 ring-emerald-300 border-2 border-transparent" : "border border-transparent"
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-white shadow-inner">
                      <Image src={opt.icon} alt={opt.title} width={68} height={68} style={{ objectFit: "contain" }} />
                    </div>

                    <div className="flex-1">
                      <div className="text-1xl font-semibold text-gray-800">{opt.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4">
              <h4 className="text-md text-gray-700 mb-3 font-medium">Course Level</h4>

              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex flex-col items-center">
                  <Image src={AIcon} alt="Beginner" width={40} height={40} style={{ objectFit: "contain" }} />
                  <div className="mt-2 text-sm text-gray-600">Beginner</div>
                </div>

                <div className="flex flex-col items-center">
                  <Image src={BIcon} alt="Intermediate" width={40} height={40} style={{ objectFit: "contain" }} />
                  <div className="mt-2 text-sm text-gray-600">Intermediate</div>
                </div>

                <div className="flex flex-col items-center">
                  <Image src={CIcon} alt="Advance" width={40} height={40} style={{ objectFit: "contain" }} />
                  <div className="mt-2 text-sm text-gray-600">Advance</div>
                </div>
              </div>

              <div className="relative h-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${courseLevel}%`,
                        background: "linear-gradient(to right, #06b6d4, #8be33a)",
                        transition: "width 160ms ease",
                      }}
                    />
                  </div>
                </div>

                <div className="absolute top-[-4px] transform -translate-x-1/2" style={{ left: `${courseLevel}%` }} aria-hidden>
                  <div className="w-6 h-6 rounded-full bg-white shadow-md border border-gray-200" />
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={courseLevel}
                  onChange={(e) => setCourseLevel(Number(e.target.value))}
                  className="absolute inset-0 w-full h-6 appearance-none bg-transparent pointer-events-auto"
                  aria-label="Course level"
                  style={{ opacity: 0 }}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <NextButton onClick={() => handleNextStep("details")} disabled={false} />
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="mt-6">
          <h4 className="text-md text-gray-700 mb-4 font-medium">Total Classes</h4>

          <div className="relative">
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(totalClasses / maxClasses) * 100}%`,
                  background: "linear-gradient(to right, #06b6d4, #8be33a)",
                  transition: "width 140ms ease",
                }}
              />
            </div>

            <div
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${(totalClasses / maxClasses) * 100}%` }}
              aria-hidden
            >
              <div className="w-6 h-6 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center" />
            </div>

            <div className="absolute right-0 top-0 transform translate-y-[-14px] translate-x-0" style={{ pointerEvents: "none" }}>
              <div className="min-w-[44px] px-3 py-2 rounded-xl bg-white shadow-md border border-gray-100 text-center font-semibold text-gray-800">{totalClasses}</div>
            </div>

            <input
              type="range"
              min={1}
              max={maxClasses}
              value={totalClasses}
              onChange={(e) => setTotalClasses(Number(e.target.value))}
              className="absolute inset-0 w-full h-6 appearance-none bg-transparent pointer-events-auto"
              aria-label="Total classes"
              style={{ opacity: 0 }}
            />
          </div>

          <div className="flex items-center justify-between mt-4 px-1 text-gray-600">
            <div className="text-lg">20 Classes</div>
            <div className="text-lg">20 Classes</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1CA672] to-[#0A9C9D] p-4 md:p-8 relative overflow-hidden">
      {/* Floating numbers background layer (kept non-interactive and scoped) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        <span className="bg-num" style={{ left: "6%", top: "10%", fontSize: "50px", animationDuration: "6s" }}>8</span>
        <span className="bg-num" style={{ left: "2%", top: "38%", fontSize: "55px", animationDuration: "9s" }}>5</span>
        <span className="bg-num" style={{ left: "18%", top: "16%", fontSize: "55px", animationDuration: "7s" }}>7</span>
        <span className="bg-num" style={{ left: "28%", top: "28%", fontSize: "55px", animationDuration: "5.5s" }}>1</span>
        <span className="bg-num" style={{ left: "44%", top: "12%", fontSize: "55px", animationDuration: "6.8s" }}>9</span>
        <span className="bg-num" style={{ left: "58%", top: "20%", fontSize: "55px", animationDuration: "6.2s" }}>3</span>
        <span className="bg-num" style={{ left: "74%", top: "14%", fontSize: "55px", animationDuration: "5.8s" }}>2</span>
        <span className="bg-num" style={{ left: "90%", top: "42%", fontSize: "55px", animationDuration: "8s" }}>6</span>
        <span className="bg-num" style={{ left: "66%", top: "46%", fontSize: "55px", animationDuration: "7.6s" }}>0</span>
        <span className="bg-num" style={{ left: "36%", top: "54%", fontSize: "55px", animationDuration: "6.4s" }}>4</span>
        <span className="bg-num" style={{ left: "14%", top: "62%", fontSize: "55px", animationDuration: "5.9s" }}>8</span>
        <span className="bg-num" style={{ left: "52%", top: "70%", fontSize: "55px", animationDuration: "7.2s" }}>7</span>
        <span className="bg-num" style={{ left: "78%", top: "50%", fontSize: "55px", animationDuration: "8.6s" }}>9</span>
        <span className="bg-num" style={{ left: "8%", top: "82%", fontSize: "55px", animationDuration: "5.4s" }}>1</span>
      </div>
      <style jsx>{`
        .bg-num {
          position: absolute;
          color: rgba(255, 255, 255, 0.35);
          font-weight: 700;
          animation-name: float;
          animation-duration: 7s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          text-shadow: 0 1px 2px rgba(0,0,0,0.08);
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0.9; }
          50% { transform: translateY(-14px) translateX(2px); opacity: 1; }
          100% { transform: translateY(0) translateX(0); opacity: 0.9; }
        }
      `}</style>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">What Makes YuvaX Better</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <ul className="space-y-4">
              {accordionList.map((accordion) => {
                const isExpanded = expandedSections[accordion.id];
                const isCompleted = completedSections[accordion.id];
                return (
                  <li key={accordion.id}>
                    <Card className="bg-white/60 backdrop-blur-[50.7px] rounded-3xl border-0">
                      <CardContent className={isExpanded ? "px-6" : "px-6"}>
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection(accordion.id)}>
                          <div className="flex items-center gap-2">
                            {typeof accordion.icon === "string" ? (
                              <span className="text-orange-500">{accordion.icon}</span>
                            ) : (
                              <Image src={accordion.icon as StaticImageData} alt={`${accordion.title} Icon`} width={24} height={24} className="object-contain" />
                            )}
                            <h3 className="text-lg font-semibold text-gray-800">{accordion.title}</h3>
                          </div>

                          <div className="flex items-center gap-3">
                            {isCompleted && !isExpanded && (
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-semibold">✓</span>
                            )}
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
                          </div>
                        </div>
                        {isExpanded && <div className={accordion.id === "courses" ? "mt-6" : ""}>{renderSectionContent(accordion.id)}</div>}
                      </CardContent>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="lg:col-span-1">
            <Card className="bg-white/60 backdrop-blur-sm sticky top-4  rounded-3xl border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <p className="text-2xl font-bold text-[#111111] text-center">Your Custom Plan</p>
                </div>

                <div className="bg-[#FFFFFF] rounded-2xl p-4 lg:py-2 mb-4 space-y-4">
                  <div className="flex justify-between items-center py-2 mb-2 border-b-[1.32px] [border-image:linear-gradient(to_right,#E2E2E2,#E2E2E2_0%)_1]">
                    <span className="text-[#999999] font-medium">Course</span>
                    <span className="text-[#666666] font-bold">Coding</span>
                  </div>

                  <div className="flex justify-between items-center py-2 mb-2 border-b-[1.32px] [border-image:linear-gradient(to_right,#E2E2E2,#E2E2E2_0%)_1]">
                    <span className="text-[#999999] font-medium">Course Type</span>
                    <span className="text-[#666666] font-bold">-</span>
                  </div>

                  <div className="flex justify-between items-center py-2 mb-2 border-b-[1.32px] [border-image:linear-gradient(to_right,#E2E2E2,#E2E2E2_0%)_1]">
                    <span className="text-[#999999] font-medium">Course Duration</span>
                    <span className="text-[#666666] font-bold">-</span>
                  </div>

                  <div className="flex justify-between items-center py-2 mb-2 border-b-[1.32px] [border-image:linear-gradient(to_right,#E2E2E2,#E2E2E2_0%)_1]">
                    <span className="text-[#00C239] font-medium">You Save</span>
                    <span className="text-[#00C239] font-bold">₹2,000</span>
                  </div>

                  <div className="flex justify-between items-center py-2 mb-3">
                    <span className="text-[#999999]">Total Amount</span>
                    <span className="text-[#666666] font-semibold">₹3,090</span>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] rounded-2xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#666666]">Monthly Price</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#333333]">1,030</div>
                      <div className="text-sm text-[#666666]">/month</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#666666]">Total:</span>
                    <span className="text-[#00C239] font-semibold">3,090 (Save ₹2,000)</span>
                  </div>
                </div>

                <Button className="w-full bg-[#999999] rounded-xl hover:bg-gray-500 text-white">Know more about the plan</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
