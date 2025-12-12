"use client";

import React from "react";

const items = [
  { label: "Quizzes Attempted", value: "5" },
  { label: "Assignments Completed", value: "3" },
  { label: "Average Quiz Score", value: "82%" },
  { label: "Best Subject", value: "Mathematics" },
];

const PerformanceSummary: React.FC = () => {
  return (
    <section className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <p className="text-[20px] font-semibold text-[#333333] ">Performance Summary</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <div
            key={it.label}
            className="bg-[#F8FBFF] rounded-xl p-4 flex flex-col items-center justify-center"
          >
            <div className="text-2xl">📅</div>
            <div className="mt-2 text-xl font-semibold text-gray-900">{it.value}</div>
            <div className="text-xs text-gray-500">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PerformanceSummary;
