// RecentTeacherNotes.tsx
import React from "react";

type Note = {
  id: string | number;
  message: string;
  date: string;
  variant?: "success" | "warning";
};

const notes: Note[] = [
  {
    id: 1,
    message: "Excellent participation in group problem-solving session. Helped explain concepts to classmates.",
    date: "Dec 15, 2024",
    variant: "success",
  },
  {
    id: 2,
    message: "Showed improved confidence when presenting solutions to the class.",
    date: "Dec 12, 2024",
    variant: "success",
  },
  {
    id: 3,
    message: "Needs to work on managing time during individual practice sessions.",
    date: "Dec 8, 2024",
    variant: "warning",
  },
];

const CheckCircle: React.FC<{ variant?: "success" | "warning" }> = ({ variant = "success" }) => {
  // colors chosen to match the Figma: emerald / orange with subtle pastel circle
  const bg = variant === "success" ? "bg-emerald-500" : "bg-orange-300";
  const ring = variant === "success" ? "ring-emerald-300/70" : "ring-orange-200/70";
  return (
    <div className={`w-5 h-5 flex items-center justify-center rounded-full ${bg} ${ring} ring-1`}>
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden>
        <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export default function RecentTeacherNotes() {
  return (
    <div className="self-stretch p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-6 shadow-sm">
      {/* Header */}
      <div className="inline-flex  gap-2.5 w-full">
        <h3 className="text-gray-800 font-semibold text-2xl mb-1">Recent Teacher Notes</h3>
      </div>

      {/* Notes list */}
      <div className="w-full flex flex-col gap-4">
        {notes.map((n) => {
          const isSuccess = n.variant === "success";
          // background & border to mimic bg-emerald-500/10 + outline-emerald-500/50 effect
          const cardBg = isSuccess ? "bg-[rgba(28,166,114,0.1)]" : "bg-[rgba(255,215,168,0.1)]";
          const border = isSuccess ? "border-[rgba(28,166,114,0.5)]" : "border-[rgba(255,215,168,0.5)]";
          const ringOutline = isSuccess ? "ring-[rgba(28,166,114,0.4)]" : "ring-[rgba(255,215,168,0.4)]";

          return (
            <div
              key={n.id}
              className={`self-stretch p-3 ${cardBg} rounded-xl border ${border} ${ringOutline} flex flex-col justify-center items-center`}
            >
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="w-5 h-5 relative flex-shrink-0">
                  <CheckCircle variant={n.variant} />
                </div>

                <div className="flex-1 inline-flex flex-col justify-start items-start min-w-0">
                  <div className="text-[16px] font-semibold leading-[160%] text-[#666] font-lato">
                    {n.message}
                  </div>
                  <div className="mt-2 text-[12px] font-normal leading-[150%] text-[#999] font-lato">
                    {n.date}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
