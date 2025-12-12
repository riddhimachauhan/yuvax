import type React from "react";
import { useEffect, useState } from "react";
import { Star, Clock } from "lucide-react";

type Props = {
  title?: string;
  progress?: number; // 0-100
};

// Reusable blue progress bar with star marker for shared use across report widgets
// Now interactive with an invisible range input overlay. Exposes onChange for parent display.
export const ProgressBarWithStar: React.FC<{
  percent?: number; // initial or controlled percent
  onChange?: (value: number) => void;
  // styling and behavior controls (optional)
  primaryColor?: string; // filled portion color for active state
  primaryFadedColor?: string; // track color for remaining portion
  completeColor?: string; // color when 100%
  showStar?: boolean; // whether to show the star indicator
}> = ({
  percent = 0,
  onChange,
  primaryColor = "#2563EB", // Tailwind blue-600 default
  primaryFadedColor = "#DBEAFE", // Tailwind blue-100 default
  completeColor = "#16A34A", // Tailwind emerald-500 default
  showStar = true,
}) => {
  const [currentPct, setCurrentPct] = useState<number>(Math.max(0, Math.min(100, percent)));

  // sync with incoming prop when it changes
  useEffect(() => {
    setCurrentPct(Math.max(0, Math.min(100, percent)));
  }, [percent]);

  const handleChange = (val: number) => {
    const clamped = Math.max(0, Math.min(100, val));
    setCurrentPct(clamped);
    onChange?.(clamped);
  };

  const isComplete = currentPct >= 100;

  return (
    <div className="relative mt-2">
      {/* track */}
      <div
        className="h-2 w-full rounded-full"
        style={{ backgroundColor: isComplete ? completeColor : primaryFadedColor }}
        aria-hidden="true"
      />
      {/* fill */}
      <div
        className="absolute left-0 top-0 h-2 rounded-full"
        style={{ width: `${currentPct}%`, backgroundColor: isComplete ? completeColor : primaryColor }}
        aria-hidden="true"
      />
      {/* star */}
      {showStar && currentPct > 0 && !isComplete && (
        <div className="absolute -top-1.5" style={{ left: `calc(${currentPct}% - 10px)` }} aria-hidden="true">
          <Star className="h-5 w-5 drop-shadow-sm text-yellow-400" fill="currentColor" />
        </div>
      )}

      {/* Invisible range input overlay to adjust progress */}
      <input
        type="range"
        min={0}
        max={100}
        value={currentPct}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-6 appearance-none bg-transparent pointer-events-auto"
        aria-label="Adjust progress"
        style={{ opacity: 0 }}
      />

      {/* a11y */}
      <div
        role="progressbar"
        aria-valuenow={currentPct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress"
        className="sr-only"
      />
    </div>
  );
};

export function CourseProgressCard({
  title = "Mathematics",
  progress = 78,
}: Props) {
  // display-only percentage, updated by child slider
  const [displayPct, setDisplayPct] = useState<number>(Math.max(0, Math.min(100, progress)));

  return (
    <section
      aria-label="Course progress card"
      className="w-full h-full rounded-[21px]  bg-white text-card-foreground"
    >
      <div className="p-5">
        {/* Top texts per design */}
        <h3 className="text-[22px] font-semibold leading-tight text-[#666666]">Next in line</h3>

        <p className="mt-1 text-base font-normal text-[#999999]">{title}</p>

        {/* Progress header row */}
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50"
            >
              {/* use a clear blue color class for the clock icon */}
              <Clock className="h-3.5 w-3.5 text-blue-600" />
            </span>
            <span>Course Progress</span>
          </div>
          <span className="font-medium text-foreground">{displayPct}%</span>
        </div>

        {/* Progress bar with star marker (reusable, interactive) */}
        <ProgressBarWithStar percent={progress} onChange={setDisplayPct} />

        {/* CTA */}
        <button
          type="button"
          className="mt-5 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-base font-medium bg-green-500 text-white"
        >
          View Report
        </button>
      </div>
    </section>
  );
}

export default CourseProgressCard;
