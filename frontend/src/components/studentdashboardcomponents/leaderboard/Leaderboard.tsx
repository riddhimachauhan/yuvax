"use client";

import React from "react";
import type { LeaderboardProps, Entry } from "@/lib/types/studentdashboard/types";

const entries: Entry[] = [
  { id: 1, name: "Super Mario", xp: 200, medal: "gold" },
  { id: 2, name: "Pac Man", xp: 150, medal: "silver" },
  { id: 3, name: "Pokemon", xp: 100, medal: "bronze" },
];

const medalColor = {
  gold: "text-yellow-400",
  silver: "text-gray-400",
  bronze: "text-orange-500",
} as const;

const medalEmoji = {
  gold: "🏆",
  silver: "🥈",
  bronze: "🥉",
} as const;

export default function Leaderboard({ className = "" }: LeaderboardProps) {
  return (
    <div className={`w-full bg-white rounded-3xl shadow p-4 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Leaderboard</h2>
          <p className="text-sm text-gray-500">2/5 completed</p>
        </div>
        <span className="text-xs bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
          12
        </span>
      </div>

      {/* Entries */}
      <ul className="space-y-2">
        {entries.map((e) => (
          <li
            key={e.id}
            className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-2"
          >
            <div className="flex items-center space-x-2">
              <span className={`text-xl ${medalColor[e.medal]}`}>
                {medalEmoji[e.medal]}
              </span>
              <span className="text-gray-700 font-medium">{e.name}</span>
            </div>
            <span className="text-gray-500">{e.xp} XP</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
