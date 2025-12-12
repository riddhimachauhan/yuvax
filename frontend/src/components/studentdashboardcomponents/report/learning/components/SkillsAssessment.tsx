"use client";

import React from "react";
import Image from "next/image";
import ClockStreamLineFeathrer from "@/assets/ClockStreamlineFeather.svg";

type SkillItem = {
  label: string;
  score: number;   // how many filled dots
  outOf?: number;  // total dots (default 5)
};

type SkillsAssessmentProps = {
  title?: string;
  data?: SkillItem[];
  className?: string;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const DotsRow: React.FC<{ label: string; score: number; outOf: number }> = ({ label, score, outOf }) => {
  const total = Math.max(1, outOf);
  const filled = clamp(score, 0, total);

  return (
    <div className="flex items-center justify-between py-2" role="listitem" aria-label={`${label}: ${filled}/${total}`}>
      <div className="flex items-center gap-2 text-slate-700">
        {/* Replaced circular element with the ClockStreamLineFeathrer.svg icon */}
        <Image
          src={ClockStreamLineFeathrer}
          alt=""
          width={20}
          height={20}
          className="h-5 w-5"
          priority
        />
        <span className="truncate">{label}</span>
      </div>

      <div className="flex items-center gap-2" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full ${i < filled ? "bg-emerald-500" : "bg-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
};

const SkillsAssessment: React.FC<SkillsAssessmentProps> = ({
  title = "Skills Assessment",
  data = [
    { label: "Problem-solving", score: 4, outOf: 5 },
    { label: "Speed",            score: 3, outOf: 5 },
    { label: "Accuracy",         score: 4, outOf: 5 },
  ],
  className = "",
}) => {
  return (
    <div className={`h-full w-full bg-white rounded-[21px]   p-6 flex flex-col ${className}`}>
      <h3 className="text-slate-800 text-2xl font-semibold mb-4">{title}</h3>

      {/* list fills remaining area so the card fully covers its layout */}
      <div className="divide-y divide-slate-100 flex-1 min-h-0" role="list">
        {data.map((item, idx) => (
          <DotsRow
            key={idx}
            label={item.label}
            score={item.score}
            outOf={item.outOf ?? 5}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsAssessment;
