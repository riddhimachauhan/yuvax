"use client";
import React from "react";
import Image from "next/image";
import Container from "./common/Container";

import studentRobo from "../assets/studentrobo.svg";
import worldMap from "../assets/worldmap.svg"; // Globe background asset
import peopleStudy from "../assets/peoplestudy.svg";
import worldStudy from "../assets/worldstudy.svg";
import childstudy from "../assets/study1.svg";
import monitorstudy from "../assets/study2.svg";

// ✅ Mission & Vision Section
const MissionVisionSection = () => {
  return (
    <div className="bg-white p-8 sm:p-12 lg:p-16 rounded-2xl shadow-md">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          Our Mission & Vision
        </h2>

        <div className="space-y-8">
          {/* Vision Section */}
          <div className="flex flex-col md:flex-row items-center bg-green-50/60 rounded-2xl p-8 gap-8">
            {/* Image */}
            <div className="flex-shrink-0 flex justify-center md:justify-start">
              <div className="w-40 h-40 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src={worldStudy}
                  alt="Vision illustration"
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block bg-[#1CA672] text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                Our Vision
              </span>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the go-to platform where students not only study but
                also build skills, confidence, and a lifelong love for learning.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="flex flex-col md:flex-row items-center bg-green-50/60 rounded-2xl p-8 gap-8">
            {/* Text */}
            <div className="flex-1 text-center md:text-left order-2 md:order-1">
              <span className="inline-block bg-[#1CA672] text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                Our Mission
              </span>
              <p className="text-gray-600 text-lg leading-relaxed">
                To make quality education accessible and engaging for every
                learner, regardless of background.
              </p>
            </div>

            {/* Image */}
            <div className="flex-shrink-0 flex justify-center md:justify-end order-1 md:order-2">
              <div className="w-40 h-40 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src={peopleStudy}
                  alt="Mission illustration"
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ CTA Section (below Mission & Vision)
const CtaSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-[#1CA672] to-[#039e8f] rounded-2xl px-6 py-16 md:px-12 lg:px-20 text-center text-white shadow-md">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold leading-snug">
          Experience Learning the Smarter <br /> Way 🚀
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-gray-100 max-w-2xl mx-auto">
          See how YuvaX makes education engaging, affordable, and effective.
          Get a hands-on walkthrough of our platform, explore interactive
          features, and discover how we help students build skills and
          confidence.
        </p>

        {/* CTA Button */}
        <div>
          <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-900 transition">
            Request Demo Now
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ About Page Data
const aboutpageData = {
  sections: [
    {
      id: "what-yuvax",
      title: "What is YuvaX ?",
      description:
        "YuvaX is an AI-powered EdTech platform built to make learning simple, fun, and rewarding. We combine interactive tutorials, gamified courses, and flexible subscriptions to help students learn at their own pace without pressure.",
      features: [
        "Gamified Learning",
        "AI Study Buddy",
        "Affordable Plans",
        "Expert-Led Courses",
        "Community Learning",
      ],
      image: {
        src: childstudy,
        alt: "Student with laptop illustration",
        width: 320,
        height: 340,
      },
      imageOrder: 2,
    },
    {
      id: "our-story",
      title: "Our Story",
      description:
        "YuvaX started with a simple belief: education should not be a privilege. It should be a right. Our founders saw how traditional learning often leaves students behind. With technology, creativity, and empathy, we created YuvaX to bridge this gap. Today, we’re proud to empower thousands of learners to grow smarter, faster, and more confidently.",
      image: {
        src: monitorstudy,
        alt: "Teacher with books and computer illustration",
        width: 320,
        height: 340,
      },
      imageOrder: 1,
    },
    {
      id: "where-we-are",
      title: "Sailing across the South Asia & Australia",
      isBanner: true,
    },
    {
      id: "mission-vision",
      title: "Our Mission & Vision",
      isMissionVision: true, // ✅ custom flag
    },
  ],
};

// ✅ Main About Component
export default function AboutPage() {
  return (
    <Container>
      <main className="min-h-screen bg-white">
        <div className="w-full max-w-5xl mx-auto py-12 space-y-12">
          {aboutpageData.sections.map((section) =>
            section.isBanner ? (
              // ✅ Special Banner Section
              <section
                id={section.id}
                key={section.id}
                className="relative bg-gradient-to-b from-[#1CA672] to-[#045252] rounded-2xl overflow-hidden p-10 md:p-14 text-white"
              >
                <div className="relative z-10 flex flex-col items-start space-y-4">
                  {/* Robot */}
                  <Image
                    src={studentRobo}
                    alt="Robot with graduation cap"
                    width={90}
                    height={90}
                    className="mb-2"
                  />

                  {/* Badge */}
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    WHERE WE ARE
                  </span>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold leading-snug max-w-2xl">
                    {section.title}
                  </h2>
                </div>

                {/* ✅ Background Globe */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-60">
                  <Image
                    src={worldMap}
                    alt="World map background"
                    width={500}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </section>
            ) : section.isMissionVision ? (
              // ✅ Render Custom Mission & Vision + CTA
              <div key={section.id} className="space-y-12">
                <MissionVisionSection />
                <CtaSection />
              </div>
            ) : (
              // ✅ Default Card Section
              <section
                id={section.id}
                key={section.id}
                className="bg-gray-50 rounded-2xl shadow-md p-8 grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Image */}
                {section.image && (
                  <div
                    className={`${
                      section.imageOrder === 1 ? "md:order-1" : "md:order-2"
                    } flex justify-center items-center`}
                  >
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      width={section.image.width}
                      height={section.image.height}
                      className="w-[320px] h-auto object-contain rounded-lg"
                    />
                  </div>
                )}

                {/* Text */}
                <div
                  className={`${
                    section.imageOrder === 1 ? "md:order-2" : "md:order-1"
                  } flex flex-col justify-center`}
                >
                  <h2 className="text-3xl font-bold mb-6 text-[#1CA672]">
                    {section.title}
                  </h2>

                  {section.features ? (
                    <>
                      <p className="text-gray-700 leading-relaxed mb-4 text-md">
                        {section.description}
                      </p>
                      <ul className="flex flex-wrap gap-3 mt-4">
                        {section.features.map((f, i) => (
                          <li
                            key={i}
                            className="bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-gray-700 leading-relaxed text-md">
                      {section.description}
                    </p>
                  )}
                </div>
              </section>
            )
          )}
        </div>
      </main>
    </Container>
  );
}