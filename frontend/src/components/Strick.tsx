"use client";

import React, { useState, useEffect, useRef } from "react";
import type { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Firee from "@/assets/firee.svg";
import Notebook from "@/assets/notebook.svg";
import Award from "@/assets/award.svg";
import Current from "@/assets/current.svg";
import Crown from "@/assets/crown.svg";
import StarHalf from "@/assets/Star Half Empty.svg";
import Fire from "@/assets/light.svg";
import Leaderboardd from "@/assets/Leaderboard.svg";
import Prize from "@/assets/Prize.svg";
import IconCard2 from "@/assets/iconcard2.svg";
import IconCard3 from "@/assets/iconcard3.svg";
import IconCard4 from "@/assets/iconcard4.svg";
import IconCard5 from "@/assets/iconcard5.svg";
import IconCard6 from "@/assets/iconcard6.svg";
import Container from "./common/Container";
import Lottie from "lottie-react";
import Game from "@/assets/Game.json";
import { Caveat } from "next/font/google";
const caveat = Caveat({ subsets: ["latin"], weight: "700" });
import { useAppDispatch } from "@/store/hooks";
import { openSignupModal } from "@/store/slices/modalSlice";

// ------------------
// Types
// ------------------
interface Achievement {
  id: number;
  name: string;
  icon: StaticImageData;
  color: string;
  bgColor: string;
  title: string;
  description: string;
  stats: {
    days: number;
    label: string;
    progress: number;
    milestone: number;
  };
}

interface CardData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: StaticImageData;
  bgColor: string;
  textColor: string;
  progressColor: string;
  buttonColor: string;
  buttonText: string;
  progressLabel: string;
  progressValue: number;
  maxValue: number;
  badgeText?: string;
  badgeIcon?: string;
}

// ------------------
// Data (unchanged semantics)
// ------------------
const cardData: CardData[] = [
  {
    id: 0,
    title: "Complete 2 Classes",
    subtitle: "Daily Task",
    description: "Task Left",
    icon: IconCard5,
    bgColor: "bg-gradient-to-br from-red-50 to-orange-50",
    textColor: "text-red-600",
    progressColor: "from-red-400 to-red-600",
    buttonColor: "bg-red-100 text-red-600 border-red-200",
    buttonText: "📝 Get Reward",
    progressLabel: "Progress",
    progressValue: 75,
    maxValue: 100,
    badgeText: "View All",
    badgeIcon: "👀",
  },
  {
    id: 1,
    title: "Top Performer",
    subtitle: "Keep Shining, You're a Star!",
    description: "Task Left",
    icon: IconCard3,
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    textColor: "text-blue-600",
    progressColor: "from-blue-400 to-blue-600",
    buttonColor: "bg-blue-100 text-blue-600 border-blue-200",
    buttonText: "🏅 View All Achievements",
    progressLabel: "Next Milestone",
    progressValue: 80,
    maxValue: 100,
  },
  {
    id: 2,
    title: "10 Days",
    subtitle: "Current Streak",
    description: "20 Days",
    icon: IconCard6,
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    textColor: "text-orange-600",
    progressColor: "from-orange-400 to-red-500",
    buttonColor: "bg-orange-100 text-orange-600 border-orange-200",
    buttonText: "🔥 On Fire!",
    progressLabel: "Next Milestone",
    progressValue: 50,
    maxValue: 100,
  },
  {
    id: 3,
    title: "4",
    subtitle: "Current Score | 500 XP",
    description: "Catch up to xyz(1000)",
    icon: IconCard4,
    bgColor: "bg-gradient-to-br from-purple-100 to-pink-50",
    textColor: "text-purple-600",
    progressColor: "from-purple-400 to-purple-600",
    buttonColor: "bg-purple-100 text-purple-600 border-purple-200",
    buttonText: "🏆 View Leaderboard",
    progressLabel: "Next Goal",
    progressValue: 50,
    maxValue: 100,
  },
  {
    id: 4,
    title: "Level 8",
    subtitle: "150 XP",
    description: "150 XP Left",
    icon: IconCard2,
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    textColor: "text-green-600",
    progressColor: "from-green-400 to-green-600",
    buttonColor: "bg-green-100 text-green-600 border-green-200",
    buttonText: "⚡ Power User",
    progressLabel: "Progress to Next Level",
    progressValue: 60,
    maxValue: 100,
  },
];

const achievements: Achievement[] = [
  {
    id: 0,
    name: "Task",
    icon: Notebook,
    color: "text-white",
    bgColor: "bg-gradient-to-b from-[#71FEFF] to-[#0A9C9D]",
    title: "5 Days",
    description: "Reading Streak",
    stats: { days: 5, label: "Current Streak", progress: 25, milestone: 10 },
  },
  {
    id: 1,
    name: "Reward",
    icon: Award,
    color: "text-white",
    bgColor: "bg-gradient-to-b from-[#287CFF] to-[#004BE9]",
    title: "15 Days",
    description: "Achievement Unlocked",
    stats: { days: 15, label: "Current Streak", progress: 75, milestone: 20 },
  },
  {
    id: 2,
    name: "Streak",
    icon: Firee,
    color: "text-white",
    bgColor: "bg-gradient-to-b from-[#FF8F47] to-[#E75028]",
    title: "10 Days",
    description: "Current Streak",
    stats: { days: 10, label: "Current Streak", progress: 50, milestone: 20 },
  },
  {
    id: 3,
    name: "Leaderboard",
    icon: Current,
    color: "text-white",
    bgColor: "bg-gradient-to-b from-[#00C254] to-[#009E64]",
    title: "7 Days",
    description: "Crown Achievement",
    stats: { days: 7, label: "Current Streak", progress: 35, milestone: 14 },
  },
  {
    id: 4,
    name: "XP",
    icon: Crown,
    color: "text-white",
    bgColor: "bg-gradient-to-b from-[#FF8F46] to-[#CA0303]",
    title: "12 Days",
    description: "Lightning Fast",
    stats: { days: 12, label: "Current Streak", progress: 60, milestone: 15 },
  },
];

// ------------------
// Component
// ------------------
const Strick: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(2); // default center
  const autoplayIntervalMs = 3000;
  const autoplayRef = useRef<number | null>(null);
  const [isMobileS, setIsMobileS] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") {
        setIsMobileS(window.innerWidth <= 360);
        setIsMobile(window.innerWidth < 768);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // autoplay helpers
  const clearAutoplay = () => {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const startAutoplay = () => {
    clearAutoplay();
    autoplayRef.current = window.setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % achievements.length);
    }, autoplayIntervalMs) as unknown as number;
  };

  useEffect(() => {
    startAutoplay();
    return () => clearAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // pause on hover for better UX
  const handleMouseEnter = () => clearAutoplay();
  const handleMouseLeave = () => startAutoplay();

  const handleCircleClick = (index: number) => {
    setSelectedIndex(index);
    startAutoplay();
  };

  // Calculate style for circles (no overlap improvements here)
  const getCircleStyle = (index: number): React.CSSProperties => {
    const N = achievements.length;
    let diff = (index - selectedIndex + N) % N;
    if (diff > Math.floor(N / 2)) diff -= N;
    const absDiff = Math.abs(diff);
    const spacingX = isMobileS ? 68 : isMobile ? 83 : 115;
    const baseTranslateY = isMobileS ? 2 : 4;
    const scaleStep = 0.12;
    const selectedScale = isMobileS ? 1.05 : isMobile ? 1.15 : 1.32;

    const baseStyle: React.CSSProperties = {
      position: "absolute",
      left: "50%",
      top: "50%",
      transformStyle: "preserve-3d",
      transition:
        "transform 450ms cubic-bezier(0.22,1,0.36,1), opacity 350ms ease",
      willChange: "transform, opacity",
    };

    if (diff === 0) {
      return {
        ...baseStyle,
        transform: `translateX(calc(-50% + ${0}px)) translateY(${
          isMobileS ? -36 : -50
        }px) scale(${selectedScale})`,
        opacity: 1,
        zIndex: 30,
        boxShadow: "0 24px 48px rgba(0,0,0,0.32), 0 6px 0 -2px #FFD700",
        pointerEvents: "auto",
      };
    }

    const offsetX = diff * spacingX;
    const translateY = (isMobileS ? -36 : -50) + absDiff * baseTranslateY;
    const scale = Math.max(0.72, 1 - absDiff * scaleStep);
    const opacity = Math.max(0.45, 1 - absDiff * 0.22);

    return {
      ...baseStyle,
      transform: `translateX(calc(-50% + ${offsetX}px)) translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex: 20 - absDiff,
      boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
      pointerEvents: "auto",
    };
  };

  // Reverted: Card layout uses original full width/height card CSS to match your request.
  const getCardStyle = (index: number): React.CSSProperties => {
    const N = achievements.length;
    let diff = (index - selectedIndex + N) % N;
    if (diff > Math.floor(N / 2)) diff -= N;
    const absDiff = Math.abs(diff);

    const spacingX = isMobile ? 25 : 28;
    const baseTranslateY = 6;
    const scaleStep = isMobile ? 0.06 : 0.08;
    const rotationStep = isMobile ? 6 : 10;
    const maxVisible = Math.floor(N / 2);

    if (absDiff > maxVisible) {
      return {
        transform: `translateX(${diff * spacingX}px) translateY(${
          (absDiff + 6) * baseTranslateY
        }px) scale(0.8) rotateY(${diff * rotationStep}deg)`,
        opacity: 0,
        zIndex: 1,
        pointerEvents: "none",
        transition:
          "transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease",
      };
    }

    const translateX = diff * spacingX;
    const translateY = absDiff * baseTranslateY;
    const scale = Math.max(0.76, 1 - absDiff * scaleStep);
    const rotateY = diff * -rotationStep;
    const opacity = diff === 0 ? 1 : Math.max(0.5, 1 - absDiff * 0.15);
    const zIndex = 50 - absDiff;
    const boxShadow =
      diff === 0
        ? "0 30px 60px rgba(0,0,0,0.25)"
        : "0 8px 20px rgba(0,0,0,0.12)";

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      boxShadow,
      transition:
        "transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease",
      transformStyle: "preserve-3d",
      willChange: "transform, opacity",
      pointerEvents: diff === 0 ? "auto" : "none",
    };
  };

  const handleSignupClick = () => dispatch(openSignupModal());

  return (
    <>
      <Container>
        <div
          className={`w-full bg-[#FFFFFF] flex flex-col xl:flex-row gap-8 xl:gap-20 items-center rounded-3xl shadow-lg max-w-6xl mx-auto ${
            isMobileS ? "p-6" : "p-8"
          } lg:p-16 lg:py-19 ring-1 ring-gray-100 overflow-hidden`}
        >
          {/* Left column */}
          <div className="w-full xl:flex-1 space-y-8 order-last xl:order-first">
            <div
              className="relative flex justify-center items-center py-14"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-full h-0" style={{ paddingTop: 0 }}>
                {/* circles container */}
                <div className="relative h-24">
                  {achievements.map((achievement, index) => {
                    const style = getCircleStyle(index);
                    return (
                      <button
                        key={achievement.id}
                        onClick={() => handleCircleClick(index)}
                        aria-label={`${achievement.name} achievement`}
                        className={`absolute -translate-y-1/2 ${
                          isMobileS ? "w-16 h-16" : "w-20 h-20"
                        } sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center transition-all duration-700 ease-out cursor-pointer hover:scale-110 ${
                          achievement.bgColor
                        }`}
                        style={style}
                      >
                        <Image
                          src={achievement.icon}
                          width={isMobileS ? 20 : 24}
                          height={isMobileS ? 20 : 24}
                          className="sm:w-7 sm:h-7"
                          alt={`${achievement.name} Icon`}
                        />
                        <div
                          className={`text-white ${
                            achievement.name === "Leaderboard"
                              ? "text-[9px]"
                              : "text-xs"
                          } font-semibold mt-1 text-center px-1 leading-tight`}
                        >
                          {achievement.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Cards stack */}
            <div
              className={`relative ${
                isMobileS ? "h-64" : "h-72"
              } sm:h-80 w-full overflow-visible`}
              style={{ perspective: 1200 }}
            >
              {cardData.map((card, index) => {
                const cardStyle = getCardStyle(index);

                return (
                  <Card
                    key={card.id}
                    className={`absolute w-full h-full ${
                      isMobileS ? "p-3" : "p-4"
                    } sm:p-6 transition-all duration-700 ease-out border border-gray-200 rounded-3xl shadow-lg ${
                      card.bgColor
                    } mt-2 lg:mt-4`}
                    style={{ ...cardStyle }}
                  >
                    <div className="flex flex-col items-center text-center space-y-4 h-full">
                      <div
                        className={`${
                          isMobileS ? "w-10 h-10" : "w-12 h-12"
                        } sm:w-16 sm:h-16 flex items-center justify-center`}
                      >
                        <Image
                          src={card.icon}
                          width={isMobileS ? 32 : 40}
                          height={isMobileS ? 32 : 40}
                          className="sm:w-12 sm:h-12"
                          alt={`${card.title} Icon`}
                        />
                      </div>

                      <div className="flex-1">
                        <h3
                          className={`${
                            isMobileS ? "text-xl" : "text-2xl"
                          } sm:text-3xl font-bold mb-2 ${card.textColor}`}
                        >
                          {card.title}
                        </h3>
                        <p
                          className={`${
                            isMobileS ? "text-sm" : ""
                          } font-medium mb-1 ${card.textColor}`}
                        >
                          {card.subtitle}
                        </p>
                      </div>

                      <div className="w-full space-y-3">
                        <div
                          className={`${
                            isMobileS ? "text-xs" : "text-sm"
                          } flex justify-between`}
                        >
                          <span className={`font-medium ${card.textColor}`}>
                            {card.progressLabel}
                          </span>
                          <span className={`${card.textColor}`}>
                            {card.description}
                          </span>
                        </div>
                        <div
                          className={`w-full bg-gray-200 rounded-full ${
                            isMobileS ? "h-2" : "h-3"
                          } relative`}
                        >
                          <div
                            className={`bg-gradient-to-r ${
                              card.progressColor
                            } rounded-full ${
                              isMobileS ? "h-2" : "h-3"
                            } transition-all duration-1000 ease-out relative`}
                            style={{ width: `${card.progressValue}%` }}
                          >
                            <div className="absolute right-0 top-1 transform translate-x-1/2 -translate-y-1/2">
                              <Image
                                src={card.icon}
                                alt="Progress Icon"
                                width={isMobileS ? 18 : 24}
                                height={isMobileS ? 18 : 24}
                                className="drop-shadow-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center  space-x-2">
                        <button
                          className={`rounded-full ${
                            isMobileS
                              ? "px-3 py-1.5 text-xs"
                              : "px-4 py-2 text-sm"
                          } font-semibold border transition-all duration-300 hover:scale-105 ${
                            card.buttonColor
                          }`}
                        >
                          {card.buttonText}
                        </button>
                        {card.badgeText && (
                          <button
                            className={`rounded-full ${
                              isMobileS
                                ? "px-2.5 py-1.5 text-xs"
                                : "px-3 py-2 text-sm"
                            } font-semibold border transition-all duration-300 hover:scale-105 ${
                              card.buttonColor
                            }`}
                          >
                            {card.badgeIcon} {card.badgeText}
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="w-full xl:flex-1 space-y-8 order-first xl:order-last text-center xl:text-left">
            <div className="space-y-3">
              <div className="flex items-center justify-start sm:justify-center xl:justify-start gap-4">
                {/* Lottie first on XS, placed after text on SM+ */}
                <div className="order-first sm:order-last w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center mt-10">
                  <Lottie
                    animationData={Game}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>

                <span className={`${caveat.className} text-[28px] leading-[40.8px] tracking-[-0.85px] font-bold text-[#1CA672] mt-12`}>
                  Learn Like a Game
                </span>
              </div>

              <p className="text-3xl font-bold text-gray-900 text-start lg:text-4xl">
                Learn. Play. Win.
              </p>
              <p className="text-sm md:text-start text-gray-500 leading-relaxed">
                Complete tasks, unlock achievements, and keep your streak alive
                while learning smarter.
              </p>
            </div>

            <div
              className={`${
                isMobileS ? "space-y-3 text-left" : "space-y-4"
              } justify-start`}
            >
              {[
                { icon: StarHalf, text: "Earn XPs" },
                { icon: Fire, text: "Build Streaks" },
                { icon: Leaderboardd, text: "Compete with Top Learners" },
                { icon: Prize, text: "Unlock Rewards as you progress" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start space-x-3 w-full"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Image
                      src={feature.icon}
                      width={20}
                      height={20}
                      alt={`${feature.text} Icon`}
                    />
                  </div>
                  <span className="text-gray-700 text-md font-medium text-left">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white cursor-pointer px-9 py-6 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={handleSignupClick}
            >
              Sign up to attend
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Strick;
