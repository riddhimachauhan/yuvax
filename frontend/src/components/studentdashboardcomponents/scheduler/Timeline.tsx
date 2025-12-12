"use client";

import React from "react";
import { Code, FileText, Zap } from "lucide-react";

type Event = {
  time: string;
  title: string;
  subtitle: string;
  color: string;
  gradientClass?: string; // optional Tailwind gradient classes (e.g. "bg-gradient-to-r from-pink-400 to-pink-200")
  icon: React.ReactNode;
};

const events: Event[] = [
  {
    time: "10 am",
    title: "Python Programming",
    subtitle: "Group Class",
    color: "#f472b6", // pink-400
    gradientClass: "bg-gradient-to-l from-pink-500 to-pink-400",
    icon: <Code size={18} />,
  },
  {
    time: "12 pm",
    title: "Assignment pending",
    subtitle: "12:00 - 01:00",
    color: "#60a5fa",
    gradientClass: "bg-gradient-to-l from-blue-500 to-blue-400",
    icon: <FileText size={18} />,
  },
  {
    time: "1 pm",
    title: "Quiz task to do",
    subtitle: "Duration: 15 min",
    color: "#fb923c",
    gradientClass: "bg-gradient-to-l from-orange-500 to-orange-400",
    icon: <Zap size={18} />,
  },
  {
    time: "4 pm",
    title: "Quiz task to do",
    subtitle: "Duration: 15 min",
    color: "#fb923c",
    gradientClass: "bg-gradient-to-l from-orange-500 to-orange-400",
    icon: <Zap size={18} />,
  },
];

function hexToRgba(hex: string, alpha = 1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ScheduleTimeline: React.FC = () => (
  <div className="bg-white rounded-xl w-full p-3">
    <div
      className="relative flex flex-col gap-4 max-h-[240px] overflow-y-scroll"
      style={{
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* IE and Edge */,
        WebkitOverflowScrolling: "touch" /* Smooth scrolling on iOS */,
      }}
    >
      <style>{`
        .bg-white > div::-webkit-scrollbar {
          display: none; 
        }
      `}</style>
      {events.map((event, idx) => (
        <div key={idx} className="flex items-center">
          {/* Time label with horizontal connecting line */}
          <div className="relative w-[95px]">
            <div className="text-gray-500 font-medium text-[12px] text-center mb-4">
              {event.time}
            </div>
            <div className="absolute start-0 left-0 right-0 -bottom-2 h-px bg-gray-300"></div>
          </div>

          {/* Event Card - prefer Tailwind gradient class, fallback to inline gradient */}
          <div
            className={`flex items-center px-2 py-3 mt-2 rounded-xl text-white w-full  ${
              event.gradientClass || ""
            }`}
            style={{
              ...(event.gradientClass
                ? {}
                : {
                    background: `linear-gradient(90deg, ${
                      event.color
                    }, ${hexToRgba(event.color, 0.85)})`,
                  }),
            }}
          >
            {/* Icon wrapper */}
            <div className="w-6 h-6 mr-3 flex items-center justify-center  rounded-md">
              {event.icon}
            </div>

            <div>
              <div className="font-normal text-[12px]">{event.title}</div>
              <div className="text-xs opacity-80">{event.subtitle}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ScheduleTimeline;
