import React from "react";
import Image from "next/image";
import AchievementGirl from "@/assets/AcheivementGirl.svg";
import AchievementCard1 from "@/assets/AchievementCard1.svg";
import AchievementCard2 from "@/assets/AchievementCard2.svg";
import AchievementCard3 from "@/assets/AchievementCard3.svg";
import AchievementsCard4 from "@/assets/AchievementCard4.svg";

type Badge = {
  id: string;
  title: string;
  subtitle: string;
  variant?: "outlined-sky" | "outlined-yellow" | "outlined-red" | "locked";
  image?: string;
  size?: "small" | "medium" | "large" | "flex";
};

const badges: Badge[] = [
  {
    id: "firstStep",
    title: "First Step",
    subtitle: "Complete your first lesson",
    variant: "outlined-sky",
    size: "small",
  },
  {
    id: "quizMaster",
    title: "Quiz Master",
    subtitle: "Score 100% on 3 quizzes",
    variant: "outlined-yellow",
    image: "https://placehold.co/137x137",
    size: "large",
  },
  {
    id: "speedLearner",
    title: "Speed Learner",
    subtitle: "Complete 5 lessons in one day",
    variant: "outlined-red",
    size: "medium",
  },
  {
    id: "dedication1",
    title: "Dedication",
    subtitle: "Study for 7 days straight",
    variant: "locked",
    size: "flex",
  },
  {
    id: "dedication2",
    title: "Dedication",
    subtitle: "Study for 7 days straight",
    variant: "locked",
    size: "flex",
  },
  {
    id: "dedication3",
    title: "Dedication",
    subtitle: "Study for 7 days straight",
    variant: "locked",
    size: "flex",
  },
];

const VariantClasses: Record<NonNullable<Badge["variant"]>, string> = {
  "outlined-sky": "outline outline-1 outline-offset-[-1px] outline-sky-600",
  "outlined-yellow": "outline outline-1 outline-offset-[-1px] outline-yellow-400",
  "outlined-red": "outline outline-1 outline-offset-[-1px] outline-red-300",
  locked: "bg-gradient-to-l from-stone-300 to-zinc-300",
};

const sizeClasses: Record<NonNullable<Badge["size"]>, string> = {
  small: "w-28 h-48 p-2.5 rounded-2xl",
  medium: "w-32 h-48 p-2.5 rounded-2xl",
  large: "w-64 h-48 relative rounded-2xl",
  flex: "flex-1 h-48 p-2.5 rounded-2xl",
};

function BadgeItem({ badge }: { badge: Badge }) {
  const variant = badge.variant ?? "locked";
  const size = badge.size ?? "flex";

  // Pixel size that maps to previous tailwind sizes (w-9/h-9 -> 36px, w-7/h-7 -> 28px)
  const pixelSize = size === "medium" ? 28 : 36;

  // Return the appropriate SVG for the first three badges (no circular gradient)
  const topSvgForFirstThree = () => {
    if (badge.id === "firstStep") {
      return (
        <Image
          src={AchievementCard1}
          alt="achievement-card-1"
          width={pixelSize}
          height={pixelSize}
          className="block"
        />
      );
    }
    if (badge.id === "quizMaster") {
      return (
        <Image
          src={AchievementCard2}
          alt="achievement-card-2"
          width={pixelSize}
          height={pixelSize}
          className="block"
        />
      );
    }
    if (badge.id === "speedLearner") {
      return (
        <Image
          src={AchievementCard3}
          alt="achievement-card-3"
          width={pixelSize}
          height={pixelSize}
          className="block"
        />
      );
    }
    return null;
  };

  return (
    <div
      className={`${sizeClasses[size]} ${
        variant === "locked" ? "inline-flex" : "inline-flex"
      } ${VariantClasses[variant]} overflow-hidden relative`}
    >
      {/* Top-left area: for first three cards render SVG icons (replaces the previous circular gradient),
          for other outlined badges keep original gradient circular look */}
      {variant !== "locked" ? (
        <div className="absolute left-4 top-4 flex flex-col justify-center items-start gap-2.5">
          {/* -- REPLACEMENT: insert SVG directly for first three badges -- */}
          <div
            className={`relative ${
              badge.size === "small"
                ? "w-9 h-9"
                : badge.size === "medium"
                ? "w-7 h-7"
                : "w-9 h-9"
            } inline-flex items-center justify-center`}
          >
            {["firstStep", "quizMaster", "speedLearner"].includes(badge.id) ? (
              topSvgForFirstThree()
            ) : (
              /* fallback: original gradient circular icon for other outlined badges */
              <div
                className={`p-1.5 rounded-[39.95px] inline-flex justify-center items-center gap-1.5 ${
                  variant === "outlined-sky"
                    ? "bg-gradient-to-b from-sky-600 to-teal-600"
                    : variant === "outlined-yellow"
                    ? "bg-gradient-to-b from-yellow-400 to-orange-400"
                    : "bg-gradient-to-br from-red-300 to-orange-700"
                }`}
              >
                <div className="absolute bg-white rounded-full left-2 top-2 w-4 h-4" />
              </div>
            )}
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-start items-start">
            <div className="text-stone-500 text-base font-semibold leading-snug">{badge.title}</div>
            <div className="w-20 text-neutral-400 text-xs font-normal leading-none">{badge.subtitle}</div>
          </div>
        </div>
      ) : (
        // Locked variant: replaced old circle + icon with AchievementsCard4.svg (keeps white text)
        <div className="absolute left-4 top-4 flex flex-col justify-center items-start gap-2.5">
          <div
            className={`relative ${
              badge.size === "small"
                ? "w-9 h-9"
                : badge.size === "medium"
                ? "w-7 h-7"
                : "w-9 h-9"
            } inline-flex items-center justify-center`}
          >
            <Image
              src={AchievementsCard4}
              alt="achievement-locked"
              width={pixelSize}
              height={pixelSize}
              className="block"
              priority={false}
            />
          </div>

          <div className="flex flex-col justify-start items-start">
            <div className="text-white text-base font-semibold leading-snug">{badge.title}</div>
            <div className="w-20 text-white text-xs font-normal leading-none">{badge.subtitle}</div>
          </div>
        </div>
      )}

      {/* Large badge: decorative image placed on the right (unchanged) */}
      {badge.image && (
        <Image
          src={AchievementGirl}
          alt={badge.title}
          className="absolute left-[114px] top-[52px] pointer-events-none"
          width={144}
          height={144}
          priority={false}
        />
      )}
    </div>
  );
}

export default function AchievementsBadges() {
  return (
    <div className="w-full p-6 bg-white rounded-3xl flex flex-col justify-start items-start gap-6">
      <div className="w-full flex gap-2.5">
        <p className="text-zinc-800 text-2xl font-semibold leading-loose">Achievements & Badges</p>
      </div>

      <div className="w-full h-full flex justify-start items-center gap-1 overflow-x-auto">
        {badges.map((b) => (
          <BadgeItem key={b.id} badge={b} />
        ))}
      </div>
    </div>
  );
}
