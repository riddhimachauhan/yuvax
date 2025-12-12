"use client";

import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Tick from "@/assets/tick.svg";
import RedTick from "@/assets/red-tick.svg";

type Skill = {
  title: string;
  subtitle: string;
  tone: "green" | "red";
  rating: number; // out of 5
};

const skills: Skill[] = [
  {
    title: "Focus & Attention",
    subtitle: "Maintains good concentration during lessons",
    tone: "green",
    rating: 4,
  },
  {
    title: "Class Participation",
    subtitle: "Actively engages in discussions and activities",
    tone: "red",
    rating: 3,
  },
  {
    title: "Collaboration",
    subtitle: "Works well with peers in group activities",
    tone: "green",
    rating: 5,
  },
  {
    title: "Time Management",
    subtitle: "Sometimes struggles with task completion timing",
    tone: "red",
    rating: 3,
  },
];

const Pill: React.FC<{ skill: Skill }> = ({ skill }) => {
  // Use tick when rating > 3 else red-tick
  const isGood = skill.rating > 3;

  const toneClasses =
    skill.tone === "green"
      ? {
          title: "text-slate-800",
          subtitle: "text-slate-500",
        }
      : {
          title: "text-slate-800",
          subtitle: "text-slate-500",
        };

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Image
          src={isGood ? Tick : RedTick}
          alt={isGood ? "Good" : "Needs Improvement"}
          width={20}
          height={20}
          aria-hidden
          className="translate-y-[50%]"
        />
        <div>
          <div className={`text-md font-semibold ${toneClasses.title}`}>{skill.title}</div>
          <div className={`text-xs ${toneClasses.subtitle}`}>{skill.subtitle}</div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < skill.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}
          />
        ))}
      </div>
    </div>
  );
};

const BehaviorAssessment: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 w-full">
      <p className="text-gray-800 font-semibold text-2xl mb-5">Behavior & Soft Skills Assessment</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((s, idx) => (
          <Pill key={idx} skill={s} />
        ))}
      </div>
    </div>
  );
};

export default BehaviorAssessment;
