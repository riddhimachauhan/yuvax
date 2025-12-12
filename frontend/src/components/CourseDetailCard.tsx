"use client";

import Image from "next/image";
import robot from "../assets/roboimage1.svg";

type Chapter = { index: number; title: string; description: string };
type Course = {
  title: string;
  tags: string[];
  chapters: Chapter[];
  price: { currency: "INR"; perClass: number; monthly: number; classesPerMonth: number };
};

export default function CourseDetailCard({
  course,
  onEnroll,
}: {
  course: Course;
  onEnroll: () => void;
}) {
  const { price } = course;

  const classesLabel = `${price.classesPerMonth} live 1:1 Classes`;

  return (
    <div className="max-w-[95%] p-6 bg-white rounded-3xl shadow-lg flex flex-col lg:flex-row gap-8 mx-auto">
      {/* Left Content */}
      <div className="flex-1 flex flex-col gap-8">
        {/* What will you learn section */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            What will you learn
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {course.tags.map((tag, index) => (
              <div key={index} className="p-4 rounded-xl border border-gray-200 text-center hover:shadow-md transition-shadow flex items-center justify-center gap-3">
                <div className="text-gray-900 text-sm font-medium">
                  {tag}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chapters section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-black">
            Chapters
          </h3>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {course.chapters.slice(0, 5).map((chapter) => (
              <div
                key={chapter.index}
                className="p-4 border-b border-gray-200 flex items-start gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">
                    {chapter.index}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-800 font-bold text-lg mb-1">
                    {chapter.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {chapter.description}
                  </p>
                </div>
              </div>
            ))}
            {course.chapters.length > 5 && (
              <div className="p-4 text-center">
                <button className="text-black font-medium hover:text-emerald-600 transition-colors inline-flex items-center gap-1">
                  Load More
                  <svg className="w-4 h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trial callout */}
        <div className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <div className="text-gray-700 font-semibold text-lg">
              Wondering if the course is right for you?
            </div>
            <div className="text-gray-800 text-xl font-bold">
              We offer a trial lesson for free
            </div>
          </div>
          <button className="px-6 py-2 rounded-lg border-2 border-emerald-500 text-emerald-500 font-bold hover:bg-emerald-500 hover:text-white transition-colors whitespace-nowrap">
            Book Demo Now!
          </button>
        </div>

        {/* Certificate section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-black text-black">
            Certificate
          </h3>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-32 h-40 mx-auto sm:mx-0">
              <Image
                src={robot}
                alt="Certificate illustration"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-gray-800 text-xl font-black mb-2">
                Coding Foundation
              </h4>
              <p className="text-gray-600 text-sm mb-4 leading-snug">
                This Certificate of Achievement will be awarded on completion of Coding Fundamentals Module with high scores. All participants will be eligible for a Certificate of Participation.
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {["Logic Building", "Intermediate Loops", "Conditional Logic"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-emerald-500/20 text-emerald-500 text-xs font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related topics */}
        {/* <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-bold text-gray-800 text-center">
            Explore Related Topics
          </h3> */}
          {/* <div className="flex flex-wrap gap-3 justify-center">
            {["Robotics", "Electronics", "Coding", "UI/UX"].map((topic, index) => (
              <button
                key={topic}
                className={`px-5 py-2 rounded-full border border-gray-300 text-lg font-medium transition-colors ${index === 0
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "text-gray-800 hover:bg-gray-100"
                  }`}
              >
                {topic}
              </button>
            ))}
          </div> */}
        {/* </div> */}
      </div>

      {/* Right sidebar - Pricing card */}
      <div className="w-full lg:w-80 flex-shrink-0 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm self-start">
        <div className="w-full h-40 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
          <Image
            src={robot}
            alt="Course illustration"
            className="w-28 h-32 object-contain"
          />
        </div>

        <div className="p-3 rounded-lg border border-gray-800 text-center mb-4">
          <div className="text-gray-900 font-semibold text-sm">
            {classesLabel}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-end gap-2">
            <div className="text-green-600 text-2xl font-extrabold">
              ₹ {price.monthly.toLocaleString()}
            </div>
            <div className="text-gray-500 text-sm font-medium">
              per month
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-end gap-2">
              <div className="text-gray-800 text-base font-bold">
                {price.classesPerMonth} Classes
              </div>
              <div className="text-gray-500 text-sm font-medium">
                per month
              </div>
            </div>
            <div className="text-gray-500 text-xs">
              ( x INR {price.perClass} per class)
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-gray-800 font-semibold text-base">
              60 min
            </div>

            <div className="border-t border-gray-300 my-1" />

            <div className="text-gray-800 font-semibold text-base">
              Live video meetings
            </div>

            <div className="text-gray-800 font-semibold text-base">
              ages 8-12
            </div>
          </div>

          <button
            onClick={onEnroll}
            className="w-full py-3 bg-black rounded-full text-white text-base font-bold hover:bg-gray-800 transition-colors mt-2"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}