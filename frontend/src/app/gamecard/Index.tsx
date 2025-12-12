"use client";

import React from "react";
import { ChallengeCard } from "./ChallengeCard";
import { Calculator, Beaker, Brain, Gamepad } from "lucide-react";

const challenges = [
  {
    id: 1,
    title: "Math Puzzle Quest",
    focus: "Focus: Algebra & Problem Solving",
    category: "Math",
    difficulty: "Intermediate",
    difficultyColor: "#B16800",
    difficultyBg: "rgba(254, 153, 9, 0.24)",
    emoji: "🧮",
    xp: 250,
    rating: 4.8,
    studentsCompleted: 12543,
    heroBg: "#278ADE",
    heroIcon: <Calculator className="w-12 h-12" />,
  },
  {
    id: 2,
    title: "Science Lab Simulator",
    focus: "Focus: Chemistry Basics",
    category: "Science",
    difficulty: "Beginner",
    difficultyColor: "#007ED4",
    difficultyBg: "rgba(0, 126, 212, 0.17)",
    emoji: "🔬",
    xp: 250,
    rating: 4.8,
    studentsCompleted: 12543,
    heroBg: "#EF7356",
    heroIcon: <Beaker className="w-12 h-12" />,
  },
  {
    id: 3,
    title: "Brain Training Central",
    focus: "Focus: Critical Thinking",
    category: "General",
    difficulty: "Advanced",
    difficultyColor: "#C40007",
    difficultyBg: "rgba(232, 30, 37, 0.13)",
    emoji: "🧠",
    xp: 250,
    rating: 4.8,
    studentsCompleted: 12543,
    heroBg: "#FDD31B",
    heroIcon: <Brain className="w-12 h-12" />,
  },
  {
    id: 4,
    title: "Math Puzzle Quest",
    focus: "Focus: Algebra & Problem Solving",
    category: "Math",
    difficulty: "Intermediate",
    difficultyColor: "#B16800",
    difficultyBg: "rgba(254, 153, 9, 0.24)",
    emoji: "🧮",
    xp: 250,
    rating: 4.8,
    studentsCompleted: 12543,
    heroBg: "#BA80FB",
    heroIcon: <Gamepad className="w-12 h-12" />,
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
        </div>
      </div>
    </div>
  );
}
