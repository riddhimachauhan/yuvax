"use client";

import React from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import type { QuizCard, GameComponentProps } from "@/lib/types/studentdashboard/types";

import gameImage1 from "@/assets/gameimage1.svg";
import gameImage2 from "@/assets/gameimage2.svg";
import gameImage3 from "@/assets/gameimage3.svg";


const quizCards: QuizCard[] = [
  {
    id: 1,
    title: "Weekly Science Quiz ",
    questions: 15,
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    image: gameImage1,
  },
  {
    id: 2,
    title: "Weekly Coding Quiz ",
    questions: 15,
    bgColor: "bg-gradient-to-br from-gray-600 to-gray-700",
    image: gameImage2,
  },
  {
    id: 3,
    title: "Weekly Math Quiz",
    questions: 15,
    bgColor: "bg-gradient-to-br from-blue-400 to-blue-500",
    image: gameImage3,
  },
];

const GameComponent: React.FC<GameComponentProps> = ({
  className = "",
  cards = quizCards,
  title = "Game",
}) => {
  return (
    <Card className={`rounded-3xl bg-white p-5 shadow-2xl gap-4 border-none ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🎮</span>
        <h2 className="text-lg font-bold text-[#111]">{title}</h2>
      </div>

      {/* Cards Carousel */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-full bg-[#F5F5F7] h-8 w-8" aria-label="Previous">
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex-1 grid grid-cols-3 gap-3">
          {cards.map((card) => (
            <div key={card.id} className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm" aria-label={`${card.title} card`}>
              <div className={`absolute inset-0 ${card.bgColor}`} />

              <div className="relative z-20 h-full p-1.5 flex flex-col justify-between text-white">
                {/* Image */}
                <div className="flex justify-center h-full">
                  <div className="w-[70%] h-full rounded-lg flex items-center justify-center">
                    <Image
                      src={card.image as StaticImageData}
                      alt={card.title}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-2 text-left">
                  <div className="flex items-start justify-between p-1">
                    <div>
                      <div className="font-bold text-sm text-white">{card.title}</div>
                      <div className="text-[10px] text-white">{card.questions} questions</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-1 w-full rounded-full bg-white text-[#333] text-[14px] cursor-pointer font-semibold py-2 shadow-sm hover:brightness-95 transition-all flex items-center justify-center gap-1"
                    onClick={() => card.onPlay?.(card.id)}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Play</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="ghost" size="icon" className="rounded-full bg-[#F5F5F7] h-8 w-8" aria-label="Next">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default GameComponent;
