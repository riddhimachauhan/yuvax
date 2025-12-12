"use client";

import React from "react";
import Image from "next/image";
import redTick from "@/assets/red-tick.svg";
import yellowTick from "@/assets/yellow_tick.svg";

type Recommendation = {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  icon:  string;
  buttonBackgroundColor: string;
  borderColor: string;
  // Preserve per-card layout classes so visual spacing/layout stays exactly the same
  containerClass: string;
  leftWrapperClass?: string;
  leftTextWrapperClass?: string;
  buttonClass: string;
};

const recommendations: Recommendation[] = [
  {
    id: "rec-1",
    title: "Practice Word Problems",
    subtitle: "Spend 15 minutes daily on word problem practice",
    buttonText: "Start Practice",
    icon: redTick,
    buttonBackgroundColor: "#FB2C36",
    borderColor: "#FB2C36",
    // same classes as original card 1 (without the static Tailwind color class; color will be applied via style)
    containerClass:
      "w-full p-3 bg-white rounded-xl outline-1 outline-offset-[-1px] inline-flex justify-between items-center",
    leftWrapperClass: "w-72 flex justify-start items-center gap-3",
    leftTextWrapperClass: "flex-1 inline-flex flex-col justify-center items-start space-y-1",
    buttonClass:
      "pl-7 pr-5 py-2 rounded-lg inline-flex flex-col justify-center items-end"
  },
  {
    id: "rec-2",
    title: "Time Management Skills",
    subtitle: "Use practice timers during problem-solving sessions",
    buttonText: "Practice Timing",
    icon: yellowTick,
    buttonBackgroundColor: "#FFA030",
    borderColor: "#FFA030",
    // same classes as original card 2
    containerClass:
      "w-full p-3 bg-white rounded-xl outline-1 outline-offset-[-1px] inline-flex justify-between items-center",
    leftWrapperClass: "w-72 flex justify-start items-center gap-3",
    leftTextWrapperClass: "flex-1 inline-flex flex-col justify-center items-start space-y-1",
    buttonClass:
      "pl-5 pr-4 py-2 rounded-[5px] inline-flex flex-col justify-center items-end"
  },
  {
    id: "rec-3",
    title: "Fraction Review",
    subtitle: "Review fraction fundamentals and practice operations",
    buttonText: "Review Fractions",
    icon: yellowTick,
    buttonBackgroundColor: "#FFA030",
    borderColor: "#FFA030",
    // same classes as original card 3
    containerClass:
      "w-full p-3 bg-white rounded-xl outline-1 outline-offset-[-1px] inline-flex justify-center items-center gap-3",
    leftWrapperClass: "flex-1 flex justify-center items-center gap-3",
    leftTextWrapperClass: "flex-1 inline-flex flex-col justify-start items-start space-y-1",
    buttonClass:
      "px-4 py-2 rounded-[5px] inline-flex flex-col justify-center items-end"
  }
];

interface RecommendationCardProps {
  item: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ item }) => {
  return (
    <div
      className={item.containerClass}
      // Keep the same outline size/offset as before but apply dynamic color through inline style
      style={{
        outlineStyle: "solid",
        outlineWidth: "1px",
        outlineColor: item.borderColor,
        outlineOffset: "-1px"
      }}
    >
      {/* Left side (icon + texts). We preserve the same inner wrapper classnames so spacing is identical */}
      <div className={item.leftWrapperClass}>
        <div className="w-5 h-5 relative flex-shrink-0">
          {/* Imported SVG icon shown using next/image as requested.
              We keep the exact absolute offsets used before so the visual stays identical. */}
          <Image
            src={item.icon}
            alt={`${item.title} icon`}
            width={16}
            height={16}
            className="left-[1.45px] top-[1.45px] absolute"
          />
        </div>

        <div className={item.leftTextWrapperClass}>
          <div className="text-stone-500 text-base font-semibold leading-relaxed">{item.title}</div>
          <div className="self-stretch text-neutral-400 text-xs leading-none">{item.subtitle}</div>
        </div>
      </div>

      {/* Right side button - keep all original classes; apply color dynamically via inline style */}
      <button
        className={item.buttonClass}
        style={{ backgroundColor: item.buttonBackgroundColor }}
      >
        <span className="text-white text-xs font-semibold leading-none">{item.buttonText}</span>
      </button>
    </div>
  );
};

const AIPersonalizedRecommendations: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-white/60 p-6 h-full w-full">
      <div className="flex flex-col gap-6 h-full w-full">
        <div className="inline-flex items-center gap-2.5">
          <p className="text-slate-900 text-2xl font-semibold leading-loose">AI Personalized Recommendations</p>
        </div>

        {/* Render cards dynamically from the top-level data array */}
        {recommendations.map((item) => (
          <RecommendationCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default AIPersonalizedRecommendations;
