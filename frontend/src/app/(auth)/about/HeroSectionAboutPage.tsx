"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Silk from "../../../components/reactbits/Silk";
import Button from "../../../components/common/Button";
import robo from "../../../assets/roboaboutpage.svg";
type ImageLike = string | StaticImageData | undefined;

export interface NavLink {
  label: string;
  href?: string;
}

export interface HeroWithNavbarProps {
  logo?: ImageLike;
  navLinks?: NavLink[];
  showDemoBadge?: boolean;
  rating?: string | number;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  snow?: ImageLike;
  className?: string;
}

const HeroWithNavbar: React.FC<HeroWithNavbarProps> = ({

  primaryButtonText = "Join Our Cult",
  secondaryButtonText = "Demo Class",
  className = "",
}) => {
  // pass the snow prop down — Navbar will render the top snow strip


  return (
    <div
      className={`relative min-h-screen px-0 rounded-b-3xl overflow-hidden ${className}`}
    >
      {/* Background silk effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Silk
          speed={3}
          scale={1}
          color="#22B6A7"
          noiseIntensity={0}
          rotation={1}
        />
      </div>



      {/* Hero Section */}
      <section
        className="relative z-10 overflow-hidden pt-10 pb-20 flex items-center px-4"
        style={{ minHeight: 402 }}
      >
        <div className="relative z-20 mx-auto text-center w-full max-w-[1040px] px-4 sm:mt-[7rem]">
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight">
            Learning Made Smarter, Easier & Accessible
            <br />
            for Every Student{" "}
            <span role="img" aria-label="rocket">
              🚀
            </span>
          </h1>

          <p className="text-white/80 text-lg mt-6 md:mt-8 max-w-3xl mx-auto">
            At Yuvax, we’re redefining education with the power of
            technology—making learning more engaging, affordable, and effective
            for today’s students. From interactive tools to personalized
            pathways, we ensure that every learner, no matter their background,
            has access to smarter ways of achieving success.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 md:mt-8">
            <Button variant="solid" size="lg">
              {primaryButtonText}
            </Button>

            <Button variant="outline" size="lg">
              {secondaryButtonText}
            </Button>
          </div>
        </div>

        {/* Mascot/Robot */}
        <div className="pointer-events-none">
          <Image
            src={robo}
            alt="Mascot"
            className="absolute bottom-1 right-4 w-18 sm:w-32 md:w-40 z-30"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroWithNavbar;
