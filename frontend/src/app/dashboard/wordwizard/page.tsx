"use client";
import React, { useMemo, useState } from "react";
import StartPopup from "@/components/studentdashboardcomponents/WordWizard/StartPopup";
import GamePopup from "@/components/studentdashboardcomponents/WordWizard/GamePopup";
import WinPopup from "@/components/studentdashboardcomponents/WordWizard/WinPopup";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Question = {
  word: string;
  difficulty: Difficulty;
};

const QUESTIONS: Question[] = [
  // 10 rounds total; GamePopup auto-generates a random word per difficulty each round
  { word: "cat", difficulty: "beginner" },
  { word: "sun", difficulty: "beginner" },
  { word: "map", difficulty: "beginner" },
  { word: "magic", difficulty: "intermediate" },
  { word: "river", difficulty: "intermediate" },
  { word: "stone", difficulty: "intermediate" },
  { word: "wizard", difficulty: "advanced" },
  { word: "mystery", difficulty: "advanced" },
  { word: "galaxy", difficulty: "advanced" },
  { word: "dragon", difficulty: "advanced" },
];

export default function WordWizardPage() {
  const total = QUESTIONS.length;
  const [step, setStep] = useState<"start" | "play" | "win">("start");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const current = useMemo(() => QUESTIONS[index], [index]);

  const handleStart = () => {
    setStep("play");
  };

  const handleCorrect = (points: number) => {
    const next = index + 1;
    setScore((s) => s + points);
    if (next >= total) {
      setStep("win");
    } else {
      setIndex(next);
    }
  };

  const handleRetry = () => {
    // simply re-render GamePopup by toggling key
    setIndex((i) => i);
  };

  const resetGame = () => {
    setIndex(0);
    setScore(0);
    setStep("start");
  };

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-64px)]">
      {step === "start" && (
        <StartPopup onStart={handleStart} />
      )}

      {step === "play" && (
        <GamePopup
          key={index}
          index={index}
          total={total}
          question={current}
          score={score}
          onCorrect={handleCorrect}
          onRetry={handleRetry}
        />
      )}

      {step === "win" && (
        <WinPopup score={score} onRestart={resetGame} />
      )}
    </div>
  );
}
