"use client";

import React from "react";
import { Star, FileText, Zap } from "lucide-react";
import Image from "next/image";
// import type { Achievement } from "../../../lib/types/studentdashboard/types";
import quizMasterImage from "@/assets/AI.svg";
import { Achievement } from "@/lib/types/studentdashboard/types";

const achievements: Achievement[] = [
  {
    id: "first-step",
    title: "First Step",
    description: "Complete your first lesson",
    icon: <Star className="w-6 h-6" />,
    bgGradient: "bg-gradient-to-r from-cyan-500 to-blue-600",
  },
  {
    id: "quiz-master",
    title: "Quiz Master",
    description: "Score 100% on 3 quizzes",
    icon: <FileText className="w-6 h-6" />,
    bgGradient: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    imageUrl: quizMasterImage,
  },
  {
    id: "speed-learner",
    title: "Speed Learner",
    description: "Complete 5 lessons in one day",
    icon: <Zap className="w-6 h-6" />,
    bgGradient: "bg-gradient-to-r from-red-300 to-red-500",
  },
];

const Achievements: React.FC = () => (
  <section className="w-full mx-auto bg-white rounded-3xl  overflow-hidden">
    <div className="px-6 py-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        Achievements <span>🏆</span>
      </h2>
    </div>

    <div className="space-y-1 px-4 pb-4">
      {achievements.map(({ id, title, description, icon, bgGradient, imageUrl }) => (
        <div
          key={id}
          className={`relative flex items-center gap-2 py-6 px-4 rounded-lg text-white ${bgGradient}`}
        >
          <div className="flex-shrink-0">{icon}</div>
          <div className="flex-1">
            <h3 className="text-[14px] font-semibold">{title}</h3>
            <p className="text-[11px] opacity-90">{description}</p>
          </div>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              className="w-14 h-24 object-cover"
              priority
            />
          )}
        </div>
      ))}

      <button
        type="button"
        className="flex items-center justify-center w-full py-3 mt-2 text-gray-500 bg-gray-200 rounded-lg rounded-b-none hover:bg-gray-300 cursor-pointer"
      >
        <span className="text-3xl">+</span>
      </button>
    </div>
  </section>
);

export default Achievements;
