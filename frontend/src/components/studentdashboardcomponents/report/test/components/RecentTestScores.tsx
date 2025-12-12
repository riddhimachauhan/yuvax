"use client";

import React from "react";

type Item = {
  title: string;
  subtitle: string;
  score: string;
  color: string; // left dot color
};

const items: Item[] = [
  {
    title: "Quadratic Equations Quiz",
    subtitle: "2 days ago",
    score: "92%",
    color: "#10B981", // emerald
  },
  {
    title: "Linear Functions Test",
    subtitle: "1 week ago",
    score: "88%",
    color: "#3B82F6", // blue
  },
  {
    title: "Polynomials Assessment",
    subtitle: "2 weeks ago",
    score: "80%",
    color: "#8B5CF6", // violet
  },
];

const RecentTestScores: React.FC = () => {
  return (
    <section className="w-full bg-white rounded-[21px]   p-6 md:p-8">
      <p className="text-2xl font-semibold text-slate-800">Recent Test Scores</p>

      <div className="mt-4 space-y-3">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-xl bg-white border border-slate-100 px-5 py-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: `${it.color}1a`, color: it.color }}
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </span>
              <div className="min-w-0">
                <div className="text-slate-800 font-medium truncate">{it.title}</div>
                <div className="text-slate-500 text-sm">{it.subtitle}</div>
              </div>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
                style={{ backgroundColor: "#F0FDF4", color: "#16A34A" }}
              >
                {it.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentTestScores;
