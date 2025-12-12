"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Info, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressBarWithStar } from "../../components/CourseProgressCard";

type DoneItem = { label: string; percent: number; state: "done" };
type ActiveItem = { label: string; percent: number; state: "active"; starAt: number };
type TodoItem = { label: string; percent: 0; state: "todo" };

export type TopicItem = DoneItem | ActiveItem | TodoItem;

export type TopicsCardProps = {
  className?: string;
  items?: TopicItem[]; // optional data prop to later wire JSON
};

const sampleItems: TopicItem[] = [
  { label: "Python Programming", percent: 100, state: "done" },
  { label: "Robotics", percent: 100, state: "done" },
  { label: "Robotics", percent: 100, state: "active", starAt: 20 },
  { label: "STEM", percent: 0, state: "todo" },
  { label: "STEM", percent: 0, state: "todo" },
  { label: "STEM", percent: 0, state: "todo" },
  { label: "STEM", percent: 0, state: "todo" },
];

const clamp01 = (n: number) => Math.max(0, Math.min(100, n));

export function TopicsCard({ className = "", items = sampleItems }: TopicsCardProps) {
  // Row item with its own state to keep each progress bar independent and two-way interactive
  const TopicRow: React.FC<{ item: TopicItem; isLast: boolean; rowKey: string }> = ({ item, isLast, rowKey }) => {
    const initial = item.state === "todo" ? 0 : clamp01(item.percent);
    const [currentPct, setCurrentPct] = useState<number>(initial);

    // Keep in sync if incoming data changes externally
    useEffect(() => {
      const next = item.state === "todo" ? 0 : clamp01(item.percent);
      setCurrentPct(next);
    }, [item]);

    // Dynamic icon by current percentage
    const renderIcon = () => {
      if (currentPct >= 100) return <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />;
      if (currentPct <= 0) return <Circle className="h-4 w-4 text-slate-300" aria-hidden="true" />;
      return <Info className="h-4 w-4 text-blue-500" aria-hidden="true" />;
    };

    return (
      <li
        key={rowKey}
        className={cn(
          "pb-3",
          !isLast && "border-b border-slate-100",
          isLast && "pb-0"
        )}
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {renderIcon()}
            <span className="text-sm font-medium text-slate-800">{item.label}</span>
          </div>

          <span className="text-md font-medium text-slate-700" aria-label={`Progress ${currentPct}%`}>
            {currentPct}%
          </span>
        </div>

        {/* Always use the shared interactive progress bar with star */}
        <ProgressBarWithStar
          percent={currentPct}
          onChange={setCurrentPct}
          // keep 0% rows visually gray like the previous static bar
          primaryFadedColor={currentPct === 0 ? "#E5E7EB" : undefined}
        />
      </li>
    );
  };

  return (
    <section
      className={cn(
        "h-full w-full rounded-[21px] bg-white p-5   flex flex-col",
        className
      )}
      aria-labelledby="topics-title"
    >
      <p id="topics-title" className="mb-4 text-2xl font-semibold text-slate-800">
        Topics & Chapters
      </p>

      {/* Scrollable list area that fills remaining height */}
      <ul className="space-y-4 flex-1 min-h-0 overflow-auto pr-1">
        {items.map((item, idx) => (
          <TopicRow key={`${item.label}-${idx}`} item={item} isLast={idx === items.length - 1} rowKey={`${item.label}-${idx}`} />
        ))}
      </ul>
    </section>
  );
}

export default TopicsCard;
