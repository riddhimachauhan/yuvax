"use client";

import React, { JSX } from "react";
import Image, { StaticImageData } from "next/image";
import Container from "./common/Container";

/* Image assets — update these import paths if your filenames differ */
import SupportImg from "@/assets/supports.webp";
import TeachersImg from "@/assets/expertteacher.webp";
import DoubtImg from "@/assets/instantdoubtlearning.webp";
import LearningImg from "@/assets/personizedlearning.webp";
import GlobalImg from "@/assets/globalstandard.webp";

type Feature = {
  id: string;
  title: string;
  imgSrc: StaticImageData | string;
  badge?: string;
  bgGradient: string;
  mobileOnly?: boolean;
};

const FEATURES: Feature[] = [
  {
    id: "support",
    title: "24X7 Support",
    imgSrc: SupportImg,
    badge: "24",
    bgGradient: "bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600"
  },
  {
    id: "teachers",
    title: "Expert Teachers",
    imgSrc: TeachersImg,
    bgGradient: "bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500"
  },
  {
    id: "doubt",
    title: "Instant Doubt Solving",
    imgSrc: DoubtImg,
    bgGradient: "bg-gradient-to-br from-orange-400 via-orange-500 to-red-500"
  },
  {
    id: "learning",
    title: "Personalized Learning",
    imgSrc: LearningImg,
    bgGradient: "bg-gradient-to-br from-green-400 via-green-500 to-green-600"
  },
  {
    id: "global",
    title: "Global Standards",
    imgSrc: GlobalImg,
    bgGradient: "bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600"
  },
  {
    id: "courses",
    title: "Interactive Courses",
    imgSrc: TeachersImg, // fallback for mobile-only one
    bgGradient: "bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600",
    mobileOnly: true
  },
];

export default function Support(): JSX.Element {
  return (
    <Container>
      <main className="w-full py-22 bg-gray-50">
        <div className="container">
          {/* Mobile Layout */}
          <div className="grid grid-cols-2 gap-3 sm:hidden w-full mx-auto px-2">
            {FEATURES.map((f) => {
              return (
                <div
                  key={f.id}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-2 relative">
                    <div
                      className="flex items-center justify-center w-16 h-16 relative"
                    >
                      <div className={`animated-icon anim-${f.id} relative z-10`}>
                        <Image
                          src={f.imgSrc}
                          alt={f.title}
                          width={48}
                          height={48}
                          priority={false}
                          unoptimized={false}
                          draggable={false}
                        />
                      </div>

                      {f.badge && (
                        <span className="
                          absolute -top-1 -right-1 
                          bg-gradient-to-br from-pink-400 to-pink-600 
                          text-white text-xs font-bold 
                          px-1 py-0.5 rounded-full 
                          shadow-md 
                          border border-white
                          z-20
                        ">
                          {f.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-gray-600 font-medium text-xs leading-tight">
                    {f.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full mx-auto">
            {FEATURES.filter(f => !f.mobileOnly).map((f) => {
              return (
                <div
                  key={f.id}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4 relative">
                    <div
                      className="flex items-center justify-center w-16 h-16 relative"
                    >
                      <div className={`animated-icon anim-${f.id} relative z-10`}>
                        <Image
                          src={f.imgSrc}
                          alt={f.title}
                          width={64}
                          height={64}
                          priority={false}
                          unoptimized={false}
                          draggable={false}
                        />
                      </div>

                      
                    </div>
                  </div>
                  <h3 className="text-gray-600 font-medium text-sm">
                    {f.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </Container>
  );
}
