"use client";

import React from "react";
import Image from "next/image";
// Attempt a static import from the assets folder (works if your build is configured to allow it).
// If your SVG is in the public folder, the fallback string src inside the component will still work.
import ClockIconPath from "@/assets/ClockStreamlineFeather.svg";
import { ProgressBarWithStar } from "../../components/CourseProgressCard";

export type HomeworkMetricProps = {
  id?: string;
  /**
   * Icon prop kept for compatibility but will be ignored in favor of the single clock SVG.
   * The card will always render ClockStreamLineFeather.svg from the assets folder.
   */
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  subtitle?: string;
  /**
   * Tailwind-like bg color class for the progress fill (e.g. "bg-blue-500").
   * If omitted, defaults to "bg-blue-500".
   */
  color?: string;
  /**
   * progress 0-100 or null to hide the slider; if omitted, auto-derive from value when it ends with '%'
   */
  progress?: number | null;
};

/** helper: from "bg-blue-500" -> "blue" */
const extractColorName = (bgClass?: string) => {
  if (!bgClass) return "blue";
  const m = bgClass.match(/^bg-([a-z0-9]+)-\d{2,3}$/);
  if (m?.[1]) return m[1];
  const m2 = bgClass.match(/^bg-([a-z0-9]+)/);
  if (m2?.[1]) return m2[1];
  return "blue";
};

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

const HomeworkMetricCard: React.FC<HomeworkMetricProps> = ({
  id,
  /* icon prop intentionally ignored to force using the single SVG across all cards */
  label,
  value,
  subtitle,
  color = "bg-blue-500",
  progress = undefined, // undefined => auto-derive, null => hide
}) => {
  // derive progress if not explicitly provided
  let derivedProgress: number | null = null;

  if (typeof progress === "number") {
    derivedProgress = clamp(progress);
  } else if (progress === null) {
    derivedProgress = null;
  } else {
    // try to infer from value like "94%"
    const trimmed = String(value).trim();
    if (trimmed.endsWith("%")) {
      const num = Number(trimmed.replace("%", ""));
      if (!Number.isNaN(num)) derivedProgress = clamp(num);
    } else {
      derivedProgress = null;
    }
  }

  const baseColor = extractColorName(color); // e.g., "blue"
  const iconTextClass = `text-${baseColor}-500`;
 
  // Provide a fallback src in case static import doesn't work in your setup.
  // If your SVG lives under the `public` folder at `/public/assets/ClockStreamLineFeather.svg`,
  // the fallback path '/assets/ClockStreamLineFeather.svg' will work.
  
  return (
    <div
      className="bg-white rounded-[21px]   p-5 h-full"
      id={id}
    >
      <div className="flex items-start gap-3 mb-4">
        {/* Icon: outer rounded rectangle wrapper removed so only the icon is rendered */}
        <Image
          src={ClockIconPath}
          alt=""
          width={20}
          height={20}
          className={`w-5 h-5 ${iconTextClass}`}
          aria-hidden
        />

        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">{label}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-3xl font-bold text-gray-900" aria-live="polite">
          {value}
        </p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        {derivedProgress !== null && (
          <div className="mt-2" aria-label={`${label} progress`}>
            <ProgressBarWithStar percent={derivedProgress ?? 0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeworkMetricCard;
