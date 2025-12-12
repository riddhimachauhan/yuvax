import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Clock } from "lucide-react";


import tutorialIcon from "@/assets/activecoursebook.svg";
import starIcon from "@/assets/activecoursebook.svg";


type TutorialCardProps = {
  title: string;
  duration: string;
  completed: string;
  progressPercent: number;
  buttonLabel: "Continue" | "Play";
};

const TutorialCard: React.FC<TutorialCardProps> = ({
  title,
  duration,
  completed,
  progressPercent,
  buttonLabel,
}) => {
  return (
    <div className="rounded-2xl p-3 flex flex-col w-[18rem] gap-3 border-[11px] border-[#2E97AA] shadow-lg bg-white">
      <div className="flex items-center justify-between">
        <div className="bg-[#E8F4FF] p-2 rounded-lg">
          <Image
            src={tutorialIcon}
            alt="Tutorial icon"
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
        <button
          className={`text-sm font-semibold rounded-md px-4 py-1.5 transition ${
            buttonLabel === "Continue"
              ? "bg-black text-white"
              : "bg-black text-white"
          }`}
        >
          {buttonLabel}
        </button>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-[#333] line-clamp-1">{title}</h3>
        <div className="flex items-center gap-1 text-xs text-[#6B6B6B] mt-1">
          <Clock size={12} className="text-[#2E97AA]" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-[#6B6B6B]">{completed} Completed</span>
          <span className="text-xs font-medium text-[#2E97AA]">{progressPercent}%</span>
        </div>
        <div className="relative h-2 w-full bg-[#E8F4FF] rounded-full mt-2">
          <div
            className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-[#2E97AA] to-[#2EB4FF]"
            style={{ width: `${progressPercent}%` }}
          />
          <div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-[#F8AD2D] flex items-center justify-center"
          >
            <Image src={starIcon} alt="Progress" width={8} height={8} className="w-2 h-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Tutorials: React.FC = () => {
  return (
    <div className="p-6 shadow-2xl rounded-3xl w-full bg-white">
      <h2 className="font-semibold text-lg mb-4">Tutorials</h2>
      <div className="relative">
        <div className="flex items-center justify-center">
          <button className="absolute left-0 z-10 p-1 -ml-4 text-gray-600 bg-[#F5F5F7] rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex overflow-x-auto gap-4 px-4 py-2 scrollbar-hide">
            <TutorialCard
              title="Spoken English"
              duration="21:24"
              completed="5/12"
              progressPercent={42}
              buttonLabel="Continue"
            />
            <TutorialCard
              title="Grammar Basics"
              duration="15:30"
              completed="3/8"
              progressPercent={38}
              buttonLabel="Play"
            />
          </div>
          
          <button className="absolute right-0 z-10 p-1 -mr-4 text-gray-600 bg-[#F5F5F7] rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;





