"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

import defaultHeroImage from "../assets/herogirlsvg.svg";
import defaultRocket from "../assets/rocketblast.png";
import defaultMathImage from "../assets/mathsvg.svg";
import defaultAIBot from "../assets/aibotsvg.svg";
import defaultPlanet from "../assets/planetsvg.svg";
import defaultText from "../assets/textsvg.svg";
import defaultImg1 from "../assets/Testimonial1.svg";
import defaultImg2 from "../assets/img2.png";
import defaultImg3 from "../assets/img3.png";
import defaultArrowIcon from "../assets/arrow-icon.svg";
import { useAppDispatch } from "@/store/hooks";
import { openSignupModal } from "@/store/slices/modalSlice";

type ImageLike = string | StaticImageData | undefined;

export interface NavLink {
  label: string;
  href?: string;
}

export interface DemoItem {
  label: string;
  href?: string;
}

export interface Student {
  src: ImageLike;
  alt?: string;
}

export interface HeroWithNavbarProps {
  logo?: ImageLike;
  navLinks?: NavLink[];
  showDemoBadge?: boolean;
  students?: Student[];
  rating?: string | number;
  trustedText?: string;
  title?: React.ReactNode;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  searchPlaceholder?: string;
  snow?: ImageLike;
  heroImage?: ImageLike;
  rocket?: ImageLike;
  mathImage?: ImageLike;
  aibot?: ImageLike;
  planet?: ImageLike;
  text?: ImageLike;
  arrowIcon?: ImageLike;
  className?: string;
}

const HeroWithNavbar: React.FC<HeroWithNavbarProps> = ({
  students = [
    { src: defaultImg1, alt: "Student 1" },
    { src: defaultImg2, alt: "Student 2" },
    { src: defaultImg3, alt: "Student 3" },
  ],
  rating = "5.0",
  trustedText = "Trusted by 247 Students",
  title = (
    <>
      <span className="">
        Learn Smarter, Grow <br />
        Faster with YuvaX
      </span>
    </>
  ),
  subtitle = "AI-powered classes, streak-based learning & 120+ certified courses from K–12 to skill mastery.",
  primaryButtonText = "Join Our Cult",
  secondaryButtonText = "Demo Class",
  searchPlaceholder = "Find Courses by your Age",
  heroImage = defaultHeroImage,
  rocket = defaultRocket,
  mathImage = defaultMathImage,
  aibot = defaultAIBot,
  planet = defaultPlanet,
  text = defaultText,
  arrowIcon = defaultArrowIcon,
  className = "",
}) => {
  const dispatch = useAppDispatch();
  const handleSignupClick = () => {
    dispatch(openSignupModal());
  };
  const resolve = (img?: ImageLike) => img ?? undefined;

  return (
    <div
      className={`relative min-h-screen px-0 rounded-b-3xl  overflow-hidden ${className}`}
    >
      {/* Hero Section */}
      <div
        className={`relative h-[40rem] md:h-[45rem]  bg-gradient-to-r from-[#1CA672] via-[#0FCEC9] to-[#0A9C9D] flex flex-col items-center justify-center px-13 overflow-visible rounded-b-lg md:rounded-b-3xl`}
      >
        {/* Decorative atom icon */}
        <div
          className="block md:block absolute left-2 top-8 md:left-12 md:top-32 scale-75 sm:scale-90 md:scale-100 pointer-events-none z-10"
          aria-hidden
        >
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/60 rounded-full relative">
              <div className="absolute w-2 h-2 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Content wrapper to keep text above and centered */}
        <div className="absolute md:relative top-[6%] sm:top-12 left-1/2 -translate-x-1/2 md:translate-x-0 md:top-auto md:left-auto z-20 w-full flex flex-col items-center pointer-events-auto">
          <div className="flex items-center rounded-full px-2 py-1 sm:px-4 sm:py-2 shadow-4xl mb-4 sm:mb-6 opacity-95 border border-white bg-white/20 transition-colors max-w-[85%] sm:max-w-none mx-auto">
            {/* Profile images */}
            <div className="flex -space-x-1 mr-1 sm:mr-2">
              {students.slice(0, 6).map((s, i) => (
                <Image
                  key={i}
                  src={resolve(s.src)!}
                  alt={s.alt ?? `Student ${i + 1}`}
                  width={24}
                  height={24}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>

            {/* Stars + text stacked */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <div
                  className="flex text-yellow-500 text-[10px] sm:text-xs"
                  aria-hidden
                >
                  ★★★★★
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-white">
                  {rating}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs  text-white">
                {trustedText}
              </span>
            </div>
          </div>

          {/* Heading */}
          <p className="text-3xl sm:text-5xl md:text-6xl font-bold  text-center leading-10 sm:leading-[3.5rem] md:leading-16 max-w-[90%] sm:max-w-5xl bg-gradient-to-t from-[#CBFFF7] to-[#FFFFFF] bg-clip-text text-transparent">
            {title}
          </p>

          <p
            className={`text-white/90 text-sm px-2 sm:text-base md:text-lg text-center max-w-lg mt-3 sm:mt-4 mb-6 sm:mb-8`}
          >
            {subtitle}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button
              type="button"
              className="bg-black text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold transition-colors shadow-2xl cursor-pointer text-sm sm:text-base"
              onClick={handleSignupClick}
            >
              {primaryButtonText}
            </button>

            <button
              type="button"
              className="border-2 border-white text-white shadow-2xl px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold hover:bg-white/10 transition-colors cursor-pointer text-sm sm:text-base"
              onClick={handleSignupClick}
            >
              {secondaryButtonText}
            </button>
          </div>

          {/* Search bar */}
          <div className="flex w-full max-w-[16rem] sm:max-w-md rounded-full overflow-hidden shadow-lg bg-white lg:mt-2 mt-6">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="flex-1 px-2 sm:px-4 py-1.5 sm:py-2.5 outline-none text-gray-700 text-xs sm:text-base"
              aria-label="Find courses by age"
            />
            <button
              type="button"
              className="bg-black rounded-l-full text-white px-5 sm:px-12 py-1.5 sm:py-2.5 font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base"
            >
              View
            </button>
          </div>
        </div>

        {/* AI Bot (static - framer-motion removed) */}
        <div
          className="block md:block absolute left-[-5%] top-[52%] -translate-y-1/2 sm:left-8 sm:top-60 md:left-24 md:top-64 scale-80 sm:scale-90 md:scale-100 pointer-events-none z-10 animate-bounce animate-ease-in-out scroll-smooth "
          aria-hidden
        >
          <Image
            src={resolve(aibot)!}
            alt="AI Bot illustration"
            width={120}
            height={120}
            style={{ width: "140px", height: "140px", objectFit: "contain" }}
            priority
          />
        </div>

        <div
          className="block md:block absolute left-[-8%] top-[14%] sm:left-10 sm:top-16 md:left-34 md:top-20 scale-50 sm:scale-75 md:scale-100 pointer-events-none z-10"
          aria-hidden
        >
          <Image
            src={resolve(planet)!}
            alt="Planet decoration"
            width={120}
            height={120}
            style={{ width: "120px", height: "120px", objectFit: "contain" }}
            priority
          />
        </div>

        <div
          className="block md:block absolute right-[-4%] top-[5%] sm:right-10 sm:top-16 md:right-102 md:top-20 scale-50 sm:scale-75 md:scale-100 pointer-events-none z-10 animate-pulse"
          aria-hidden
        >
          <Image
            src={resolve(text)!}
            alt="Text decoration"
            width={120}
            height={120}
            style={{ width: "110px", height: "110px", objectFit: "contain" }}
            priority
          />
        </div>

        {/* Character (left) */}
        <div
          className="flex md:flex absolute right-[63%] md:-left-6 top-[87%] lg:top-[46%] md:-bottom-18 -translate-y-1/2 md:translate-y-0 justify-start items-center md:items-end scale-150 sm:scale-60 md:scale-100 pointer-events-none z-10"
          aria-hidden
        >
          {/* Blurred Background */}
          <div className="hidden md:flex absolute inset-0 justify-center items-center">
            <Image
              src="../assets/blur.png"
              alt="Blur background"
              width={500}
              height={500}
              className="w-[500px] h-[500px] object-contain blur-3xl opacity-70"
              aria-hidden
            />
          </div>

          {/* Main Hero Image */}
          <Image
            src={resolve(heroImage)!}
            alt="Student illustration"
            width={400}
            height={400}
            className="w-[395px] h-[490px] object-contain"
            priority
          />
        </div>

        <div
          className="flex md:flex absolute left-[64%] md:right-0 top-[87%] lg:top-[46%] md:-bottom-22 -translate-y-1/2 md:translate-y-0 justify-end items-center md:items-end scale-150 sm:scale-60 md:scale-100 lg:scale-140 pointer-events-none z-10"
          aria-hidden
        >
          <Image
            src={resolve(rocket)!}
            alt="Rocket illustration"
            width={400}
            height={400}
            className="w-[395px] h-[490px] object-contain"
            priority
          />
        </div>

        {/* Math Image (static - framer-motion removed) */}
        <div
          className="block md:block absolute right-2 top-[50%] -translate-y-1/2 sm:right-10 sm:top-48 md:right-40 md:top-50 scale-80 sm:scale-75 md:scale-100 pointer-events-none z-10 animate-bounce"
          aria-hidden
        >
          <Image
            src={resolve(mathImage)!}
            alt="Math icons"
            width={120}
            height={120}
            style={{ width: "80px", height: "80px", objectFit: "contain" }}
            priority
          />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-2 animate-bounce" aria-hidden>
          <Image
            src={resolve(arrowIcon)!}
            alt="Scroll down"
            width={24}
            height={24}
            className="w-10 h-10 object-contain opacity-95"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HeroWithNavbar;



