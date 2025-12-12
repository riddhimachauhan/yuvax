"use client";

import React from "react";
import {
  Gamepad,
  Zap,
  Award,
  Clock,
  Trophy,
  User,
  Star,
  Medal,
  Activity,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-[557px] flex flex-col gap-8">
            <div className="relative h-[194px] rounded-[25px] bg-blue-400 flex items-center justify-center overflow-hidden">
              <div className="flex flex-col items-center justify-center">
                <Gamepad className="w-[80px] h-[80px] text-white" />
                <div className="mt-2 text-white font-bold">Math Quest</div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[22px] font-bold text-text-1 leading-tight">
                About This Game
              </h2>
              <p className="text-[15px] text-text-2 leading-[1.5]">
                Embark on an exciting mathematical adventure where you solve
                complex puzzles to progress through mystical lands. Each level
                challenges your algebra skills with real-world problem
                scenarios.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                <div className="flex flex-col items-center justify-center gap-1.5 bg-gray-200 rounded-[16px] p-3 min-h-[72px]">
                  <Zap className="w-6 h-6" />
                  <div className="text-[19px] font-bold text-text-1">
                    🔥 Focus
                  </div>
                  <div className="text-[12px] text-text-2">
                    Algebra & Problem Solving
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-1.5 bg-gray-200 rounded-[16px] p-3 min-h-[72px]">
                  <Award className="w-6 h-6" />
                  <div className="text-[19px] font-bold text-text-1">
                    🎮 Reward
                  </div>
                  <div className="text-[12px] text-text-2">250 XP</div>
                </div>
                <div className="flex flex-col items-center justify-center gap-1.5 bg-gray-200 rounded-[16px] p-3 min-h-[72px]">
                  <Clock className="w-6 h-6" />
                  <div className="text-[19px] font-bold text-text-1">
                    🎖️ Duration
                  </div>
                  <div className="text-[12px] text-text-2">10-15 min</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[22px] font-bold text-text-1 leading-tight">
                How to Play
              </h2>
              <p className="text-[15px] text-text-2 leading-[1.5]">
                Use mathematical operations and logical thinking to solve each
                puzzle. Drag numbers and operators to create valid equations.
                Complete all levels to unlock the treasure!
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[22px] font-bold text-text-1 leading-tight">
                Available Achievements
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="flex flex-col items-start p-3 pb-2.5 rounded-[9px] border border-game-pink bg-white min-h-[126px]">
                  <div className="w-7 h-7 rounded-full bg-game-pink flex items-center justify-center mb-2.5">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-[15px] font-bold text-text-2">
                      Quick Learner
                    </div>
                    <div className="text-[11px] text-text-3 leading-[1.5]">
                      Complete in under 5 minutes 💯
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start p-3 pb-2.5 rounded-[9px] bg-gradient-to-b from-[#DCDCDC] to-[#C3C3C3] min-h-[126px]">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-2.5">
                    <Star className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-[15px] font-bold text-white">
                      Perfect Score
                    </div>
                    <div className="text-[11px] text-white leading-[1.5]">
                      Get 100% accuracy 🔥
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start p-3 pb-2.5 rounded-[9px] bg-gradient-to-b from-[#DCDCDC] to-[#C3C3C3] min-h-[126px]">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-2.5">
                    <Medal className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-[15px] font-bold text-white">
                      Streak Master
                    </div>
                    <div className="text-[11px] text-white leading-[1.5]">
                      Play 7 days in a row 🎓
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start p-3 pb-2.5 rounded-[9px] bg-gradient-to-b from-[#DCDCDC] to-[#C3C3C3] min-h-[126px]">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-2.5">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-[15px] font-bold text-white">
                      Subject Expert
                    </div>
                    <div className="text-[11px] text-white leading-[1.5]">
                      Master all topics in this subject
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[508px] flex flex-col gap-5 p-3 pb-6 rounded-[15px] border-t-[5.5px] border-cyan-200 bg-gray-100">
            <div className="flex flex-col gap-3 p-6 rounded-[11px] border border-gray-400 bg-white">
              <h3 className="text-[19px] font-bold">Game Stats</h3>
              <div className="flex flex-wrap justify-between gap-8">
                <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
                  <div className="text-[19px] font-bold text-text-1">
                    ⭐ 4.8/5
                  </div>
                  <div className="text-[13px] text-text-2">Rating</div>
                </div>
                <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
                  <div className="text-[19px] font-bold text-text-1">👥 45</div>
                  <div className="text-[13px] text-text-2">Completed</div>
                </div>
                <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
                  <div className="text-[19px] font-bold text-text-1">🎖️ 18</div>
                  <div className="text-[13px] text-text-2">Your Best</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-6 rounded-[11px] border border-gray-200 bg-white">
              <div className="flex flex-col gap-1">
                <h3 className="text-[19px] font-bold text-text-heading">
                  Leaderboard
                </h3>
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-[19px] h-[19px]" />
                  <span className="text-[13px] text-text-2">2/5 completed</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  {
                    rank: 1,
                    name: "Super Mario",
                    xp: 200,
                    icon: <Gamepad className="w-[45px] h-[37px]" />,
                  },
                  {
                    rank: 2,
                    name: "Pac Man",
                    xp: 150,
                    icon: <Star className="w-[37px] h-[37px] rounded-full" />,
                  },
                  {
                    rank: 3,
                    name: "Pokemon",
                    xp: 100,
                    icon: <Zap className="w-[37px] h-[37px]" />,
                  },
                  {
                    rank: 4,
                    name: "Pokemon",
                    xp: 90,
                    icon: <Award className="w-[21px] h-[24px]" />,
                  },
                  {
                    rank: 5,
                    name: "You",
                    xp: 70,
                    icon: <User className="w-[21px] h-[24px]" />,
                  },
                ].map((p) => (
                  <div
                    key={p.rank}
                    className={`flex items-center gap-2 p-2 rounded-[11px] border ${
                      p.rank === 5
                        ? "border-red-200 bg-red-50"
                        : "border-game-gray-border bg-white"
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-text-3 flex items-center justify-center flex-shrink-0">
                      <span className="text-[13px] font-bold text-white">
                        {p.rank}
                      </span>
                    </div>
                    <div className="w-[45px] h-[37px] flex items-center justify-center">
                      {p.icon}
                    </div>
                    <span className="text-[13px] font-bold text-text-1 flex-1">
                      {p.name}
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="text-[13px] font-bold text-text-1">
                        {p.xp}
                      </span>
                      <span className="text-[11px] text-text-2">XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full h-[45px] rounded-[15px] bg-black text-white font-bold text-[14px] hover:bg-gray-800 transition-colors">
              START GAME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
