"use client";

import React from "react";

export type StrengthItem = {
  id: string;
  label: string;
  text: string;
  color?: "green" | "red";
};

const strengths: StrengthItem[] = [
  { id: "01", label: "01", text: "Consistent homework submission", color: "green" },
  { id: "02", label: "02", text: "Excellent problem-solving abilities", color: "green" },
  { id: "03", label: "03", text: "Strong mathematical reasoning", color: "green" },
  { id: "04", label: "04", text: "Active class participation", color: "green" },
];

const focus: StrengthItem[] = [
  { id: "01", label: "01", text: "Time management during testsTime management during tests", color: "red" },
  { id: "02", label: "02", text: "Word problem interpretation", color: "red" },
  { id: "03", label: "03", text: "Complex fraction operations", color: "red" },
  { id: "04", label: "04", text: "Quadratic equation solving", color: "red" },
];

const ItemRow: React.FC<{ item: StrengthItem }> = ({ item }) => {
  const borderColor = item.color === "green" ? "border-green-500" : "border-red-400";
  return (
    <div className="inline-flex justify-start items-center gap-2.5 w-full">
      <div className="text-stone-500 text-base leading-normal font-medium">{item.label}</div>
      <div className={`px-5 border-l-4 ${borderColor} inline-flex flex-col justify-center items-start gap-0.5`}>
        <div className="text-zinc-800 text-sm font-medium leading-tight">{item.text}</div>
      </div>
    </div>
  );
};

const StrengthsAreas: React.FC = () => {
  return (
    // Keep the outer container exactly the same to preserve layout sizing/position
    <section className="bg-white rounded-2xl shadow-sm border border-white/60 p-6 h-full">
      <p className="text-2xl font-semibold text-slate-900 mb-4">
        Strengths & Areas for Improvement
      </p>

      {/* Inner content updated to match design while filling available space */}
      <div className="space-y-6">
        {/* Strengths */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-green-500 font-medium">Strengths</span>
            <span className="text-base">🚀</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-5">
              {strengths.slice(0, 2).map((s) => (
                <ItemRow key={s.id} item={s} />
              ))}
            </div>
            <div className="space-y-5">
              {strengths.slice(2).map((s) => (
                <ItemRow key={s.id} item={s} />
              ))}
            </div>
          </div>
        </div>

        {/* Focus Area */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-red-400 font-medium">Focus Area</span>
            <span className="text-base">🍒</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-5">
              <ItemRow item={focus[0]} />
              <ItemRow item={focus[1]} />
            </div>
            <div className="space-y-5">
              <ItemRow item={focus[2]} />
              <ItemRow item={focus[3]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrengthsAreas;
