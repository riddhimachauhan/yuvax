"use client";

import React from "react";

// import defaultLogo from "../assets/logo.svg";
import defaultSnow from "../assets/snowimage.png";

const FeaturesSection: React.FC = () => {
  // Resolve snow image URL like in HeroSection
  const snowUrl =
    typeof defaultSnow === "string"
      ? (defaultSnow as string)
      : ((defaultSnow as unknown as { src?: string })?.src ?? "");
  
  // Feature points for privacy policy page (unique titles and descriptions)
  const features = [
    {
      number: "1",
      title: "AI-Powered Learning Platform",
      description:
        "Yuvax provides an AI-driven education platform designed for students aged 8 to 21. Our courses adapt to the learner’s pace, ensuring personalized and effective learning experiences.",
    },
    {
      number: "2",
      title: "Secure Course Purchases",
      description:
        "All transactions made on Yuvax are encrypted and verified. Parents and students can confidently purchase courses knowing their payment and personal details are fully protected.",
    },
    {
      number: "3",
      title: "Global Expansion Strategy",
      description:
        "Yuvax is launching in three phases: starting with students in Europe, followed by learners in the UAE, and finally expanding to the United States. Each stage is tailored to local learning needs.",
    },
    {
      number: "4",
      title: "Interactive Coding Games",
      description:
        "Learning is made fun through coding-based games where students can practice problem-solving and build real-world projects while competing with peers in a playful environment.",
    },
    {
      number: "5",
      title: "AI-Driven Feedback & Quizzes",
      description:
        "Our AI quiz system gives instant feedback to learners, helping them understand their strengths and weaknesses. Students can track their progress and improve with every session.",
    },
    {
      number: "6",
      title: "Wide Course Range",
      description:
        "From web development and artificial intelligence to general academic subjects, Yuvax offers a diverse set of courses designed to empower young learners with modern skills.",
    },
    {
      number: "7",
      title: "Child Safety & Privacy",
      description:
        "We prioritize child safety. All student data is kept confidential, and our platform follows strict global privacy standards to create a safe online learning environment.",
    },
    {
      number: "8",
      title: "User-Friendly Experience",
      description:
        "The Yuvax platform is designed for kids and teenagers with simple navigation, engaging design, and accessibility features so every learner can study with ease.",
    },
  ];
  return (
    <main className="flex flex-col items-center">
      {/* Header Section (matches HeroSection style with Navbar + snow) */}
      <section className="relative w-full text-white px-0 text-center overflow-hidden rounded-b-lg md:rounded-b-3xl">
        {/* Snow drip effect at top */}
        <div
          className="absolute top-17 w-full h-30 bg-cover bg-center z-30"
          style={{ backgroundImage: `url(${snowUrl})`, backgroundRepeat: "repeat-x" }}
          aria-hidden
        />

        {/* Navbar */}
        {/* <Navbar logo={defaultLogo} /> */}

        {/* Header content with gradient like hero */}
        <div className="relative bg-gradient-to-r from-[#1CA672] via-[#0FCEC9] to-[#0A9C9D] flex flex-col items-center justify-center px-6 py-16 md:py-20 rounded-b-lg md:rounded-b-3xl">
          <h1 className="text-4xl font-bold mb-4">Privacy & Policy</h1>
          <p className="max-w-3xl mx-auto text-lg">
            E-commerce has transformed the way people buy and sell products, and
            IBO is at the forefront of this change. Whether you are looking for a
            trusted platform to sell pre-owned items or searching for the best
            deals through live bidding, IBO offers a seamless experience. As
            India’s leading buy and sell online website, we connect you with
            authorized dealers to ensure a safe, profitable, and hassle-free
            transaction.
          </p>
        </div>
      </section>

      {/* Why Choose YuvaX Section */}
      <section className="w-full max-w-4xl py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Why Choose YuvaX?</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">
              1. Secure and Transparent Buying & Selling
            </h3>
            <p className="text-gray-700">
              IBO ensures that every transaction is safe, verified, and
              transparent. Whether you’re selling your old gadgets, furniture,
              or electronics, you can connect with trusted buyers and dealers
              with confidence.
            </p>
          </div>

          {/* Feature points mapped from JSON */}
          {features.map((item) => (
            <div key={item.number}>
              <h3 className="font-semibold text-lg">
                {item.number}. {item.title}
              </h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FeaturesSection;