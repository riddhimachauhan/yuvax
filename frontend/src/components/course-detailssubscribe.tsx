"use client";
import React from "react";
import Image from "next/image";

import cd1 from "../assets/cd1.svg";
import cd2 from "../assets/cd2.svg";
import cd3 from "../assets/cd3.svg";
import rocket from "../assets/rocket.svg";

const CourseDetailsSubscribe: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-4 sm:py-6 lg:py-8 bg-transparent">
      <div className="relative w-[95vw] max-w-[1350px] rounded-2xl md:rounded-3xl lg:rounded-[44px] flex flex-col lg:flex-row items-center min-h-[180px] sm:min-h-[200px] lg:min-h-[220px] bg-gradient-to-r from-teal-500 to-lime-400 shadow-lg md:shadow-xl overflow-visible px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 lg:py-0">
        
        {/* Images Container */}
        <div className="flex items-end justify-center gap-3 sm:gap-6 md:gap-8 mb-6 sm:mb-8 lg:mb-0 lg:w-2/5">
          {/* Left Image */}
          <div className="flex flex-col items-center transform hover:scale-105 transition-all duration-300 ease-out">
            <Image 
              src={cd1} 
              alt="Spoken English" 
              width={144}
              height={92}
              className="drop-shadow-2xl w-20 xs:w-24 sm:w-28 md:w-32 lg:w-36"
              priority
            />
          </div>
          
          {/* Middle Image */}
          <div className="flex flex-col items-center -mt-12 xs:-mt-16 sm:-mt-20 md:-mt-24 transform hover:scale-105 transition-all duration-300 ease-out">
            <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <Image 
                src={cd2} 
                alt="Web Development" 
                width={128}
                height={92}
                className="drop-shadow-2xl w-16 xs:w-20 sm:w-24 md:w-28 lg:w-32"
                priority
              />
            </div>
            {/* Sign In Button */}
            <button className="bg-white rounded-full shadow-lg border-2 border-white/20 font-semibold text-gray-900 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm flex items-center gap-1 sm:gap-2 w-28 sm:w-32 md:w-36 h-8 sm:h-10 md:h-12 justify-center hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-gray-50">
              Sign In
            </button>
          </div>
          
          {/* Right Image */}
          <div className="flex flex-col items-center -mt-8 xs:-mt-10 sm:-mt-12 md:-mt-16 transform hover:scale-105 transition-all duration-300 ease-out">
            <Image 
              src={cd3} 
              alt="Python Programming" 
              width={128}
              height={92}
              className="drop-shadow-2xl w-16 xs:w-20 sm:w-24 md:w-28 lg:w-32"
              priority
            />
          </div>
        </div>
        
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left lg:pl-8 xl:pl-16 2xl:pl-20 lg:pr-4 lg:w-3/5">
          <h2 className="text-white font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[32px] xl:text-4xl leading-tight mb-2 sm:mb-3 md:mb-4 tracking-tight">
            Subscribe to get products<br/>faster and premium.
          </h2>
          <p className="text-white/90 text-sm sm:text-base md:text-lg font-medium max-w-xs sm:max-w-sm md:max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Enjoy priority service and exclusive premium products.
          </p>
        </div>
        
        {/* Rocket */}
        <div className="absolute right-2 xs:right-4 sm:right-6 md:right-6 lg:right-8 xl:right-10 -top-12 xs:-top-14 sm:-top-16 md:-top-20 lg:-top-24 xl:-top-28 z-30 opacity-95 hover:opacity-100 transition-all duration-500 hover:-translate-y-2">
          <Image 
            src={rocket} 
            alt="Rocket" 
            width={256}
            height={256}
            className="drop-shadow-2xl w-20 xs:w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 2xl:w-64"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsSubscribe;