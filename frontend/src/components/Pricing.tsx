"use client";

import React from "react";
import Image from "next/image";
import cardImg2 from "../assets/kid.svg";
import target from "../assets/target.svg";
import Lottie from "lottie-react";
import robotAnim from "../assets/robotmanager.json";
import Container from "./common/Container";
import BuddyBot from "../assets/BuddyBot.webp";
import Arifical from "../assets/Arificial.webp";
import CustomizableCurriculum from "../assets/Customizable Curriculum.webp";
import LiveLearning from "../assets/Live Learning Options.svg";
import Trophy from "../assets/Gamified Learning.webp";
import AllInOne from "../assets/AllInOne.png";
import student from "../assets/Certification.webp";

const Pricing = () => {
  return (
    <Container>
      <div className="w-full py-8 lg:py-20 px-4 sm:px-6 lg:px-0">
       <div className="w-full text-center mb-6 lg:mb-8 relative">
  {/* Decorative target (absolute positioned) - still only on lg+ */}
  <div
    className="pointer-events-none hidden lg:block absolute anim-drift"
    style={{ left: "-88px", top: "-100px", width: 160, height: 180 }}
    aria-hidden
  >
    <Image
      src={target}
      alt="decorative target"
      width={160}
      height={180}
      className="object-contain"
    />
  </div>

  {/* Row containing Features + small-screen Lottie (inline on xs only) */}
  <div className="flex items-center justify-center gap-3">
    <button className="bg-green-100 font-bold text-[#1CA672] px-4 py-1 rounded-full text-sm sm:text-base ml-12">
      Features
    </button>

    {/* Inline Lottie: visible ONLY on extra-small screens */}
    <div className="sm:hidden w-12 h-10 md:w-10 md:h-10 flex items-center">
      <Lottie animationData={robotAnim} loop={true} />
    </div>
  </div>

  <p className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3">
    What Makes YuvaX Better
  </p>
  <p className="mt-2 text-base sm:text-lg md:text-xl text-gray-500 px-4 sm:px-0">
    Get access to online events, local meet-ups, a vibrant community
    chat, premium design
  </p>

  {/* Absolute Lottie for sm+ (hidden on xs so it doesn't duplicate) */}
  <div
    className="hidden sm:block absolute -translate-y-1/2 pointer-events-none w-[75px] h-[75px] lg:w-[110px] lg:h-[110px] right-[-11%] top-[93%] md:left-[92%] lg:right-[20%] lg:top-[50%]"
    aria-hidden="true"
  >
    <Lottie animationData={robotAnim} loop={true} />
  </div>
</div>


        <div className="flex flex-col lg:flex-row gap-4 w-full h-full">
          {/* Left Column */}
          <div className="w-full lg:w-[39%] flex flex-col gap-4">
            {/* Live Learning Card */}
            <div className="w-full min-h-[20rem] sm:min-h-[22rem] md:min-h-[24rem] lg:min-h-[26rem] rounded-[1.5rem] bg-gradient-to-br from-[#29BFC0] to-[#87F6CC] p-6 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl relative overflow-hidden">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white lg:ml-2">
                Live Learning Options
              </h1>
              <p className="text-md sm:text-xl md:text-2xl text-white mt-2 sm:ml-4 lg:ml-2">
                1:1 classes & group sessions.
              </p>

              {/* Illustration container uses relative parent + Image fill — floating up/down */}
              <div className="absolute top-[110px] sm:top-[90px] md:top-[100px] lg:top-[130px] left-1/2 -translate-x-1/2 w-[260px] h-[260px] sm:w-[200px] sm:h-[250px] lg:w-[350px] lg:h-[350px] pointer-events-none">
                <Image
                  src={LiveLearning}
                  alt="Live learning illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* AI Personalized Learning Card */}
            <div className="w-full min-h-[16rem] sm:min-h-[18rem] md:min-h-[20rem] lg:h-72 bg-gradient-to-r from-[#FF8C33] to-[#FFE17A] rounded-[1.5rem] p-4 sm:p-6 lg:p-8 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-[70%] sm:max-w-[60%]">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  AI personalized learning
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white mt-2 sm:mt-3">
                  Instant help & progress tracking
                </p>
              </div>

              {/* strong bounce for the robot illustration */}
              <div className="absolute -bottom-2 sm:-bottom-5 -right-2 sm:-right-5 w-[150px] h-[150px] sm:w-52 sm:h-52 md:w-64 md:h-64 pointer-events-none anim-bounce-large">
                <Image
                  src={Arifical}
                  alt="AI assistant illustration"
                  width={317}
                  height={317}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[60%] flex flex-col gap-4">
            {/* Gamified Learning Card */}
            <div className="w-full min-h-[12rem] sm:min-h-[14rem] md:min-h-[15rem] lg:min-h-[268px] bg-gradient-to-tr from-[#86D2B6] to-[#DCFED5] rounded-[1.5rem] p-4 sm:p-6 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl relative overflow-hidden">
              <h1 className="text-xl text-[#333333] sm:text-2xl md:text-3xl font-medium">
                Gamified Learning
              </h1>
              <p className="text-[#666666] text-[18px] sm:text-[20px] md:text-[24px] mt-2 font-normal">
                Streaks, XP, and medals
                <br />
                to stay motivated.
              </p>

              {/* trophy rotates and sways */}
              <div className="absolute right-2 sm:right-4 md:right-8 lg:left-[370px] top-20 sm:top-0 md:top-[-17.74px] opacity-100 overflow-hidden pointer-events-none anim-rotate-sway lg:top-4">
                <Image
                  src={Trophy}
                  alt="Trophy illustration"
                  className="object-cover w-[120px] h-[130px] sm:w-[120px] sm:h-[120px] md:w-auto md:h-auto"
                />
              </div>
            </div>

            {/* Three Cards Row */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-4">
              {/* All-in-One Platform Card */}
              <div className="w-full min-h-[12rem] sm:min-h-[14rem] md:min-h-[15rem] bg-gradient-to-br from-[#129B0E] to-[#0BD984] rounded-[1.5rem] p-4 sm:p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl relative overflow-hidden">
                <h1 className="font-lato font-bold text-[20px] sm:text-[22px] md:text-[24px] leading-[140%] text-white whitespace-pre-line">
                  All-in-One{"\n"}Platform
                </h1>

                <p className="font-lato font-normal text-[16px] sm:text-[17px] md:text-[18px] leading-[140%] text-white mt-2 whitespace-pre-line">
                  Academics & Skills
                  <br />
                  under one roof
                </p>

                {/* tilt/tilt-sway */}
                <div className="absolute bottom-2 right-2 sm:top-[130.43px] sm:left-[63%] w-[120px] h-[120px] sm:w-[110px] sm:h-[110px] lg:w-[70px] lg:h-[90px] md:w-[170px] md:h-[170px] pointer-events-none anim-tilt">
                  <Image
                    src={AllInOne}
                    alt="All-in-one illustration"
                    width={90}
                    height={90}
                    className="object-contain lg:w-[110px] lg:h-[110px]"
                  />
                </div>
              </div>

              {/* Recognized Certifications Card */}
              <div className="w-full min-h-[12rem] sm:min-h-[14rem] md:min-h-[15rem] bg-gradient-to-br from-[#2F3359] to-[#705AAA] rounded-[1.5rem] p-4 sm:p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl relative overflow-hidden">
                <h1 className="text-base sm:text-lg md:text-xl font-bold text-white">
                  Recognized Certifications
                </h1>
                <div className="font-lato font-normal text-[16px] sm:text-[17px] md:text-[18px] leading-[140%] text-white opacity-100 mt-2">
                  Flexible with
                  <br />
                  no hidden
                  <br />
                  fees.
                </div>

                {/* small wiggle rotation */}
                <div className="absolute -bottom-6 right-2 sm:top-[105px] sm:left-[80px] w-[150px] h-[160px] sm:w-[120px] sm:h-[120px] md:w-[178px] md:h-[178px] pointer-events-none ">
                  <Image
                    src={student}
                    alt="Certification illustration"
                    className="object-cover"
                    width={150}
                    height={150}
                  />
                </div>
              </div>

              {/* Customizable Curriculum Card */}
              <div className="w-full min-h-[12rem] sm:min-h-[14rem] md:min-h-[15rem] bg-gradient-to-br from-[#CF4A4A] to-[#FF6200] rounded-[1.5rem] p-4 sm:p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl relative overflow-hidden">
                <h1 className="text-base sm:text-lg md:text-xl font-bold text-white">
                  Customizable Curriculum
                </h1>
                <p className="font-lato font-normal text-[16px] sm:text-[17px] md:text-[18px] leading-[140%] text-white opacity-100 mt-2">
                  Flexible plans with
                  <br />
                  no hidden fees.
                </p>

                {/* subtle horizontal slide */}
                <div className="absolute bottom-2 right-2 sm:top-[115.43px] sm:left-[30px] w-[130px] h-[130px] sm:w-[120px] sm:h-[120px] md:w-[170px] md:h-[170px] pointer-events-none anim-slide">
                  <Image
                    src={CustomizableCurriculum}
                    alt="Customizable curriculum illustration"
                    className="object-contain"
                    width={160}
                    height={160}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Two Cards Row */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              {/* 100+ Courses Card */}
              <div className="w-full min-h-[10rem] sm:min-h-[11rem] md:min-h-[11.5rem] bg-gradient-to-br from-[#5C6B73] to-[#9DB4C0] rounded-[1.5rem] p-4 sm:p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl relative overflow-hidden lg:h-[13rem] lg:p-6">
                <h1 className="font-lato font-bold text-[20px] sm:text-[22px] md:text-[24px] leading-[160%] text-white">
                  100+ Courses
                </h1>

                <p className="font-lato font-normal text-[16px] sm:text-[17px] md:text-[18px] leading-[140%] text-white mt-2 whitespace-pre-line">
                  From K-12 subjects to skill{"\n"}certifications.
                </p>

                {/* subtle zoom/pulse */}
                <div className="absolute bottom-2 right-2 lg:top-[60] sm:left-[200px] sm:top-[25.43px] w-[120px] h-[120px] sm:w-[120px] sm:h-[120px] md:w-[184px] md:h-[184px] opacity-100 transform pointer-events-none ">
                  <Image
                    src={cardImg2}
                    alt="Courses illustration"
                    className="object-cover"
                    width={120}
                    height={160}
                  />
                </div>
              </div>

              {/* Buddy Bot AI Card */}
              <div className="w-full min-h-[10rem] sm:min-h-[11rem] md:min-h-[11.5rem] bg-gradient-to-br from-[#EBD2A9] to-[#FFFFFF] rounded-[1.5rem] p-4 sm:p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl relative overflow-hidden">
                <h1 className="font-lato font-bold text-[20px] sm:text-[22px] md:text-[24px] leading-[160%] text-[#333333]">
                  Buddy bot AI
                </h1>

                <p className="font-lato font-normal text-[16px] sm:text-[17px] md:text-[18px] leading-[140%] text-[#666666] mt-2 whitespace-pre-line">
                  Stay motivated,
                  <br />
                  and make{"\n"}
                  learning fun{"\n"}
                  with Buddy.
                </p>

                {/* bobbing motion for Buddy */}
                <div className="absolute bottom-2 right-2 sm:left-[180px] sm:top-[42.43px] w-[120px] h-[120px] sm:w-[120px] sm:h-[120px] md:w-[170px] md:h-[170px] opacity-100 transform pointer-events-none">
                  <Image
                    src={BuddyBot}
                    alt="Buddy bot illustration"
                    className="object-cover"
                    width={135}
                    height={170}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multiple unique animations scoped to this component */}
        <style jsx>{`
          /* Performance tip: animate transform/opacity only */
          .anim-float {
            animation: floatY 4.6s ease-in-out 0s infinite;
            will-change: transform;
          }

          .anim-bounce-large {
            animation: bounceLarge 2.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s
              infinite;
            will-change: transform;
          }

          .anim-rotate-sway {
            animation: rotateSway 3.2s ease-in-out 0.12s infinite;
            will-change: transform;
          }

          .anim-tilt {
            animation: tilt 3.6s cubic-bezier(0.22, 1, 0.36, 1) 0.08s infinite;
            will-change: transform;
          }

          .anim-wiggle {
            animation: wiggle 2.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0.16s
              infinite;
            will-change: transform;
          }

          .anim-slide {
            animation: slideX 5s ease-in-out 0.2s infinite;
            will-change: transform;
          }

          .anim-zoom {
            animation: zoomPulse 3.8s ease-in-out 0s infinite;
            will-change: transform;
          }

          .anim-bob {
            animation: bob 2.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.06s
              infinite;
            will-change: transform;
          }

          .anim-pop {
            animation: pop 2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.04s infinite;
            will-change: transform;
          }

          .anim-drift {
            animation: drift 8s linear 0s infinite;
            will-change: transform;
          }

          /* keyframes */
          @keyframes floatY {
            0% {
              transform: translateY(0) translateZ(0);
            }
            35% {
              transform: translateY(-10px) translateZ(0);
            }
            60% {
              transform: translateY(-4px) translateZ(0);
            }
            100% {
              transform: translateY(0) translateZ(0);
            }
          }

          @keyframes bounceLarge {
            0% {
              transform: translateY(0);
            }
            20% {
              transform: translateY(-18px);
            }
            40% {
              transform: translateY(0);
            }
            60% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }

          @keyframes rotateSway {
            0% {
              transform: translateY(0) rotate(0deg);
            }
            20% {
              transform: translateY(-6px) rotate(-6deg);
            }
            50% {
              transform: translateY(0) rotate(6deg);
            }
            80% {
              transform: translateY(-4px) rotate(-3deg);
            }
            100% {
              transform: translateY(0) rotate(0deg);
            }
          }

          @keyframes tilt {
            0% {
              transform: translateY(0) rotate(0deg);
            }
            25% {
              transform: translateY(-6px) rotate(-4deg);
            }
            50% {
              transform: translateY(0) rotate(4deg);
            }
            75% {
              transform: translateY(-3px) rotate(-2deg);
            }
            100% {
              transform: translateY(0) rotate(0deg);
            }
          }

          @keyframes wiggle {
            0% {
              transform: rotate(0deg);
            }
            15% {
              transform: rotate(-8deg);
            }
            30% {
              transform: rotate(6deg);
            }
            50% {
              transform: rotate(-4deg);
            }
            70% {
              transform: rotate(3deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

          @keyframes slideX {
            0% {
              transform: translateX(0);
            }
            30% {
              transform: translateX(-8px);
            }
            60% {
              transform: translateX(6px);
            }
            100% {
              transform: translateX(0);
            }
          }

          @keyframes zoomPulse {
            0% {
              transform: scale(1);
            }
            40% {
              transform: scale(1.06);
            }
            70% {
              transform: scale(0.99);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes bob {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
            100% {
              transform: translateY(0);
            }
          }

          @keyframes pop {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            30% {
              transform: scale(1.08);
              opacity: 0.98;
            }
            60% {
              transform: scale(0.98);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes drift {
            0% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(-6px, -4px);
            }
            50% {
              transform: translate(4px, -10px);
            }
            75% {
              transform: translate(8px, -4px);
            }
            100% {
              transform: translate(0, 0);
            }
          }

          /* keep animations buttery smooth on modern browsers */
          @media (prefers-reduced-motion: reduce) {
            .anim-float,
            .anim-bounce-large,
            .anim-rotate-sway,
            .anim-tilt,
            .anim-wiggle,
            .anim-slide,
            .anim-zoom,
            .anim-bob,
            .anim-pop,
            .anim-drift {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </Container>
  );
};

export default Pricing;
