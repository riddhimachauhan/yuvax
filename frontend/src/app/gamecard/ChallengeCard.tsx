"use client";

import React from "react";
import { Gamepad } from "lucide-react";

interface ChallengeCardProps {
  title: string;
  focus: string;
  category: string;
  difficulty: string;
  difficultyColor: string;
  difficultyBg: string;
  emoji: string;
  xp: number;
  rating: number;
  studentsCompleted: number;
  heroBg: string;
  heroIcon?: React.ReactNode;
}

export function ChallengeCard({
  title,
  focus,
  category,
  difficulty,
  difficultyColor,
  difficultyBg,
  emoji,
  xp,
  rating,
  studentsCompleted,
  heroBg,
  heroIcon,
}: ChallengeCardProps) {
  return (
    <div className="flex flex-col gap-[15px] p-[17px_15px] bg-white rounded-[26px] shadow-[0_0_1.783px_0_rgba(0,0,0,0.25)]">
      <div
        className="relative w-full h-[186px] rounded-[18px] overflow-hidden p-3 flex justify-between items-start"
        style={{ background: heroBg }}
      >
        <div className="flex flex-col justify-between h-full z-10">
          <div className="flex px-[6px] py-[1px] justify-center items-center gap-[6px] rounded-[21px] bg-white/38">
            <span className="text-[#333] font-lato text-[13px] font-normal leading-[150%]">
              Daily Challenge
            </span>
          </div>
        </div>

        <div className="flex px-2 py-[3px] justify-center items-center gap-[9px] rounded-lg bg-[#FFF3C0] z-10">
          <span className="text-[#333] font-lato text-[14px] font-semibold leading-[140%]">
            ⭐ {rating.toFixed(1)}
          </span>
        </div>

        {/* Icon replacement for hero image */}
        <div className="absolute right-3 bottom-3 w-[172px] h-[172px] flex items-end justify-end z-0 pointer-events-none">
          <div className="w-[120px] h-[120px] rounded-[12px] flex items-center justify-center bg-white/10 backdrop-blur-sm">
            {heroIcon ?? <Gamepad className="w-[56px] h-[56px]" />}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex h-6 justify-center items-center gap-[15px]">
          <span className="text-xl leading-none">{emoji}</span>
          <div className="flex px-2 py-[3px] justify-center items-center gap-[9px] rounded-lg bg-[rgba(210,210,210,0.40)]">
            <span className="text-[#333] font-lato text-[13px] font-semibold leading-[150%]">
              {category}
            </span>
          </div>
          <div
            className="flex px-2 py-[3px] justify-center items-center gap-[9px] rounded-lg"
            style={{ background: difficultyBg }}
          >
            <span
              className="font-lato text-[13px] font-semibold leading-[150%]"
              style={{ color: difficultyColor }}
            >
              {difficulty}
            </span>
          </div>
        </div>
        <div className="flex px-2 py-1 justify-center items-center gap-[10px] rounded-[10px] bg-[#F0B100]">
          <span className="text-[#333] font-lato text-xs font-normal leading-[150%]">
            🏆 {xp} XP
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[5px]">
        <h3 className="text-[#333] font-lato text-xl font-semibold leading-[150%]">
          {title}
        </h3>
        <p className="text-[#666] font-lato text-base font-normal leading-[140%]">{focus}</p>
      </div>

      <p className="text-[#666] font-lato text-[13px] font-normal leading-[150%]">
        {studentsCompleted.toLocaleString()} students completed
      </p>

      <button className="flex w-full h-10 px-[14px] py-[7px] justify-center items-center gap-[7px] rounded-2xl bg-black hover:bg-black/90 transition-colors">
        <span className="text-white font-lato text-sm font-bold leading-[140%]">Play Now</span>
      </button>
    </div>
  );
}
