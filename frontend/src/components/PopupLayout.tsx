"use client";
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Signin1 from "@/assets/signin1.svg";
import Background from "@/assets/background.webp";
import type { PopupConfig } from "./popupConfig";

interface PopupLayoutProps {
  config: PopupConfig;
  onClose?: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  children: React.ReactNode;
  isSecondStep?: boolean;
  isThirdStep?: boolean;
  onLoginClick?: () => void;
  onCreateAccountClick?: () => void;
  onForgotPasswordClick?: () => void;
  onBackToLoginClick?: () => void;
  isLoginMode?: boolean;
  isForgotPasswordMode?: boolean;
}

const PopupLayout: React.FC<PopupLayoutProps> = ({
  config,
  onClose,
  onBack,
  showBackButton = false,
  children,
  isSecondStep = false,
  isLoginMode = false,
  isForgotPasswordMode = false,
}) => {
  // Detect specific sign-in popups by their title content (normalize to letters only for robustness)
  const normalizedLetters = (config?.leftPanel?.title || "").replace(/[^A-Za-z]/g, "").toUpperCase();
  const isFirstSigninTitle = normalizedLetters.includes("UNLOCKYOURPOTENTIALWITHYUVAX");
  const isSecondSigninTitle = normalizedLetters.includes("WEREALMOSTREADYTOLAUNCHJUSTNEEDYOURDETAILS");
  const isThirdSigninTitle = normalizedLetters.includes("ONELASTSTEPTOCLAIMYOURSEATATYUVAX");
  const isFifthSigninTitle = normalizedLetters.includes("LOSTYOURKEYLETSMAKEANEWONE");

  

  return (
    <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
      {/* flex column on small, split on md */}
      <div className="relative flex flex-col md:flex-row h-full">
        {/* LEFT: hidden on small screens, visible md+ */}
        <div

          className="hidden md:flex md:w-1/2 lg:w-1/2 relative bg-gradient-to-br from-cyan-400 via-teal-400 to-green-400 flex-col justify-between overflow-hidden"
        >
          {/* background image replacing animated floating text */}
          <Image
            src={Background}
            alt="background"
            fill
            priority
            className="object-cover select-none pointer-events-none"
            aria-hidden
          />

          <style jsx>{`
            .bg-num {
              position: absolute;
              color: transparent;
              -webkit-text-stroke-width: 1.6px;
              -webkit-text-stroke-color: rgba(255,255,255,0.18);
              text-transform: uppercase;
              font-weight: 900;
              letter-spacing: 2px;
              line-height: 0.9;
              white-space: nowrap;
              user-select: none;
              pointer-events: none;
              transform: rotate(-14deg);
              animation-name: floatTilt;
              animation-timing-function: ease-in-out;
              animation-iteration-count: infinite;
              will-change: transform, opacity;
              opacity: 0.95;
              text-shadow: 0 1px 0 rgba(0,0,0,0.02);
            }

            @keyframes floatTilt {
              0% { transform: rotate(-14deg) translate3d(0, 0, 0); opacity: 0.92; }
              25% { transform: rotate(-14deg) translate3d(8px, -10px, 0); opacity: 1; }
              50% { transform: rotate(-14deg) translate3d(-6px, -6px, 0); opacity: 0.94; }
              75% { transform: rotate(-14deg) translate3d(6px, 8px, 0); opacity: 0.98; }
              100% { transform: rotate(-14deg) translate3d(0, 0, 0); opacity: 0.92; }
            }

            @media (max-width: 900px) {
              .bg-num { -webkit-text-stroke-width: 1.2px; opacity: 0.9; }
            }

            /* Outlined white text with transparent fill (for YOUR, WITH, and X) */
            .outline-text {
              color: transparent;
              -webkit-text-stroke-width: 1px;
              -webkit-text-stroke-color: #ffffff;
            }

            /* Device-specific fixes to ensure full visibility of the left panel image
               Only targets iPhone SE (375x667 @2x) and Samsung Galaxy S8+ (360x740 @4x) */
            @media only screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) {
              .left-panel { overflow: visible; }
              .design-image-wrap { max-width: 290px !important; margin-left: auto; margin-right: auto; }
              .design-image { max-height: 46vh !important; object-fit: contain; }
            }

            @media only screen and (device-width: 360px) and (device-height: 740px) and (-webkit-device-pixel-ratio: 4) {
              .left-panel { overflow: visible; }
              .design-image-wrap { max-width: 300px !important; margin-left: auto; margin-right: auto; }
              .design-image { max-height: 48vh !important; object-fit: contain; }
            }
          `}</style>

          {/* left title with responsive sizes */}
          <div className="relative z-10 p-2 sm:p-6 md:p-8 lg:p-12 pt-2 md:pt-10">
            <p className="font-extrabold text-white leading-tight text-2xl md:text-3xl lg:text-[40px]">
              {isFirstSigninTitle ? (
                <>
                  <span className="block">
                    UNLOCK <span className="outline-text">YOUR</span>
                  </span>
                  <span className="block">
                    POTENTIAL <span className="outline-text">WITH</span>
                  </span>
                  <span className="block">
                    YUVA<span className="outline-text">X</span> ⭐
                  </span>
                </>
              ) : isSecondSigninTitle ? (
                // Second popup: outline "ALMOST", "LAUNCH", "NEED", and "DETAILS"
                <>
                  <span className="block">WE&apos;RE <span className="outline-text">ALMOST</span></span>
                  <span className="block">READY TO <span className="outline-text">LAUNCH</span></span>
                  <span className="block">JUST <span className="outline-text">NEED</span></span>
                  <span className="block">YOUR <span className="outline-text">DETAILS</span> 🚀</span>
                </>
              ) : isThirdSigninTitle ? (
                // Third popup: outline "STEP", "TO", "SEAT" and the letter X in YUVAX
                <>
                  <span className="block">ONE LAST <span className="outline-text">STEP</span> <span className="outline-text">TO</span></span>
                  <span className="block">CLAIM YOUR <span className="outline-text">SEAT</span></span>
                  <span className="block">AT YUVA<span className="outline-text">X</span> 🤝</span>
                </>
              ) : isFifthSigninTitle ? (
                // Fifth popup (Forgot Password): outline "KEY", "?", "MAKE", "A", and "ONE"
                <>
                  <span className="block">LOST YOUR <span className="outline-text">KEY</span> <span className="outline-text">?</span></span>
                  <span className="block">LET&apos;S <span className="outline-text">MAKE</span> <span className="outline-text">A</span></span>
                  <span className="block">NEW <span className="outline-text">ONE</span> 🔑</span>
                </>
              ) : (
                /* Default rendering for all other popups */
                config.leftPanel.title.split("\n").map((line, idx) => (
                  <span key={idx} className="block">
                    {line.includes("YUVA") ? (
                      <>
                        {line.split("YUVA")[0]}
                        YUVA<span className="text-yellow-300">X</span>
                        {line.split("YUVAX")[1] || line.split("YUVA")[1]}
                      </>
                    ) : (
                      line
                    )}
                  </span>
                ))
              )}
            </p>
          </div>

          {/* image (constrained) */}
          <div className={`relative z-10 flex justify-center pb-2 md:pb-8 ${isSecondSigninTitle ? "-translate-y-3 md:-translate-y-4" : ""}`}>
            <div className="design-image-wrap relative w-full max-w-[320px] md:max-w-[380px] lg:max-w-[460px]">
              <Image
                src={config.leftPanel.image}
                alt={config.leftPanel.imageAlt}
                className="design-image w-full h-auto object-contain max-h-none md:max-h-[54vh] lg:max-h-[60vh]"
                priority
              />

              {/* DEFAULT (all popups except 2nd): icon anchored to image box */}
              {!isSecondStep && (
                <div className="hidden md:block absolute right-[-18px] bottom-[-16px] md:right-[4px] md:bottom-[10px] lg:right-[-16px] lg:bottom-[20px] pointer-events-none">
                  <Image src={Signin1} alt="signin-icon" className="w-14 h-14 lg:w-14 lg:h-14 object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: form panel (always visible) */}
        <div  className="w-full md:w-1/2 flex flex-col relative p-4 sm:p-6 md:p-15 lg:p-20  overflow-hidden bg-white">
          {/* Mobile small banner to keep brand feel (visible on small only) */}
          

          {/* Back button top-left for specific popups (2nd, 3rd, 5th) */}
          {(isSecondSigninTitle || isThirdSigninTitle || isFifthSigninTitle) && showBackButton && onBack && (
            <div className="hidden md:block absolute top-3 left-3 z-30">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" aria-label="Back">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          )}

          {/* Close (and fallback Back) top-right controls */}
          <div className="absolute top-[2%] right-[2%] flex items-center gap-2 z-30">
            {(isSecondSigninTitle || isThirdSigninTitle || isFifthSigninTitle) && showBackButton && onBack && (
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden cursor-pointer" aria-label="Back">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {onClose && (
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" aria-label="Close">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>

          <div className="max-w-md mx-auto w-full flex flex-col h-full">
            

            <p
              className="font-bold text-[#111111] text-[14px] sm:text-[22px] md:text-[24px] leading-snug md:leading-normal mb-1 md:mb-1 pl-2 sm:pl-3 md:pl-3 pr-3 sm:pr-3 md:pr-3"
              style={{ fontFamily: "Lato, sans-serif", fontWeight: 700 }}
            >
              {config.rightPanel.title}
            </p>
            <p className="text-[#666666] text-[10px] sm:text-sm md:text-sm mb-3 md:mb-7 pl-2 sm:pl-3 md:pl-3 pr-3 sm:pr-3 md:pr-3">{config.rightPanel.subtitle}</p>

            {/* scrollable form area */}
            <div className="flex-1 overflow-visible md:overflow-y-auto pb-2 md:pb-4">
              <div
                className={`pl-2 sm:pl-2 md:pl-3 pr-2 sm:pr-2 md:pr-3 ${
                  !isLoginMode && !isForgotPasswordMode ? "space-y-[14.31px]" : ""
                }`}
              >
                {children}
              </div>
            </div>

            
          </div>
        </div>
        {/* STEP-2 ONLY: icon anchored to the LEFT PANEL (parent is already relative) */}
          {isSecondStep && (
            <div className="hidden md:block absolute right-4 bottom-6 md:right-[51%] md:bottom-[13%] lg:right-[53%] lg:bottom-[13%] z-20 pointer-events-none">
              <Image src={Signin1} alt="signin-icon" className="w-14 h-14 lg:w-14 lg:h-14 object-contain" />
            </div>
          )}
      </div>
    </div>
  );
};

export default PopupLayout;
