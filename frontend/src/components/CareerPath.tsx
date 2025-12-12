"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Container from "./common/Container";
import CareerPathCurve from "@/assets/careerpathcurve.svg";
import Link from "next/link";
import { openSignupModal} from '@/store/slices/modalSlice'
import { useAppDispatch } from '@/store/hooks';
import Lottie from "lottie-react";
import CalenderAnimation from "@/assets/CalendarAnimation.json"
import Search from "@/assets/Searching.json"
import StudentWithLaptop from "@/assets/student_with_laptop.json"

const CareerPath: React.FC = () => {
  const dispatch = useAppDispatch()
  
  const handleSignupClick = () => {
    dispatch(openSignupModal())
  }

  return (
    <><Container>
        <section className="w-full relative bg-[#FFFFFF] rounded-3xl shadow-lg lg:p-16 md:p-12 p-8 mt-10 overflow-hidden">
      {/* Background Numbers (desktop/tablet only) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-16 md:top-[20%] left-[25%] md:left-[20%] md:text-[140px] lg:text-[180px] font-bold bg-gradient-to-b from-[#44444430] to-[#FFFFFF10] bg-clip-text text-transparent select-none">1</div>
        <div className="absolute md:top-[36%] lg:top-53 left-[59%] md:left-[54%] md:text-[150px] lg:text-[200px] font-bold bg-gradient-to-b from-[#44444430] to-[#FFFFFF10] bg-clip-text text-transparent select-none">2</div>
        <div className="absolute top-8 md:top-64 lg:top-63 right-[12%] md:right-[6%] md:text-[150px] lg:text-[200px] font-bold bg-gradient-to-b from-[#44444430] to-[#FFFFFF10] bg-clip-text text-transparent select-none">3</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-balance">
            Your Learning Journey Begins Here
          </p>
          <p className="text-md sm:text-lg md:text-xl text-gray-600">Start your demo class in 3 simple steps</p>
        </div>

        {/* Journey Steps - Mobile layout (icons left, text center, number right) */}
        <div className="md:hidden">
          {/* Step 1 */}
          <div className="relative flex items-center py-6">
            {/* Background number */}
            <div className="absolute right-[3%] bottom-[38%] text-[90px] leading-none font-extrabold bg-gradient-to-b from-[#44444430] to-[#FFFFFF10] bg-clip-text text-transparent select-none">1</div>
            {/* Icon area: parent is relative and overflow-visible so icon can grow in-place */}
            <div className="shrink-0 mr-4 ml-1 relative w-16 h-16 overflow-visible">
              {/* NOTE: hexagon element removed. Rectangle now carries the hexagon color (#E1FFFD). */}

              {/* RECTANGLE (now has hexagon color) - centered, clips Lottie */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] lg:w-[62%] lg:h-[62%] bg-[#E1FFFD] rounded-md overflow-hidden flex items-center justify-center border border-gray-100 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]">
                  <Lottie
                    animationData={Search}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="z-10 text-left">
              <h3 className="text-base font-bold text-gray-900 text-left">Explore Courses</h3>
              <p className="text-gray-600 text-sm max-w-[240px] text-left">Find what fits your goals and learning style.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex items-center py-8">
            {/* Background number */}
            <div className="absolute right-[3%] bottom-[38%] text-[90px] leading-none font-extrabold bg-gradient-to-b from-[#44444430] to-[#FFFFFF10] bg-clip-text text-transparent select-none">2</div>

            {/* Icon area — match Step 1 & 3 sizing, keep bg and icon independent */}
            <div className="shrink-0 mr-4 ml-1 relative w-16 h-16 overflow-visible">
              {/* Background rectangle: fixed size so it stays equal to the others */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] lg:w-[62%] lg:h-[62%] bg-[#E1FFFD] rounded-md overflow-hidden flex items-center justify-center border border-gray-100 relative">
                {/* Icon container: can scale freely but remains clipped by bg due to overflow-hidden */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] h-[220%]">
                  <Lottie
                    animationData={CalenderAnimation}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="z-10 text-left">
              <h3 className="text-base  font-bold text-gray-900 text-left">Pick Your Slot</h3>
              <p className="text-gray-600 text-sm max-w-[220px] text-left">Schedule at your convenience with flexible timing.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex items-center py-8">
            {/* Background number */}
            <div className="absolute right-[3%] bottom-[38%] text-[90px] leading-none font-extrabold bg-gradient-to-b from-[#44444430] to-[#FFFFFF10] bg-clip-text text-transparent select-none">3</div>

            <div className="shrink-0 mr-4 ml-1 relative w-16 h-16 overflow-visible">
              {/* RECTANGLE (now has hexagon color) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] lg:w-[62%] lg:h-[62%] bg-[#E1FFFD] rounded-md overflow-hidden flex items-center justify-center border border-gray-100 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <Lottie
                    animationData={StudentWithLaptop}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="z-10 text-left">
              <h3 className="text-base font-bold text-gray-900 text-left">Begin Your Journey</h3>
              <p className="text-gray-600 text-sm max-w-[220px] text-left">Start learning instantly with expert guidance.</p>
            </div>
          </div>
        </div>

        {/* Journey Steps - Desktop/Tablet layout */}
        <div className="relative hidden md:block">
          {/* Curved Path Image (replaces inline SVG) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
            <Image
              src={CareerPathCurve}
              alt="curve"
              width={1075}
              height={243}
              className="w-full h-auto max-w-7xl"
            />
          </div>

          {/* Steps Container - Positioned relative to curve */}
          <div className="relative z-10 h-64 md:h-80">
            {/* Step 1: Explore Courses */}
            {/* Text content for Step 1 */}
            <div className="absolute left-4 sm:left-6 md:left-[-4%] lg:left-[2%] top-16 sm:top-18 md:top-26 text-center md:text-left z-20">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3">Explore Courses</h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed max-w-[120px] sm:max-w-[140px] md:max-w-xs">
                Find what fits your goals and learning style.
              </p>
            </div>
            {/* Image for Step 1 */}
            <div className="absolute left-8 sm:left-10 md:left-18 lg:left-20 top-32 sm:top-36 md:top-47 lg:top-52 z-20">
              {/* parent with overflow-visible so icon scaling doesn't push layout */}
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[7.5rem] lg:h-[7.5rem] ">
                {/* HEXAGON removed. Rectangle now carries the color. */}

                {/* RECTANGLE (now has hexagon color) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#E1FFFD] rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100 relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%]">
                    <Lottie
                      animationData={Search}
                      loop
                      autoplay
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Pick Your Slot */}
            {/* Image for Step 2 (outer background larger, inner icon same-size center) */}
            <div className="absolute left-[62%] md:left-[48%] lg:left-[48%] transform -translate-x-1/2 top-0 sm:top-1 md:top-[16%] lg:top-[-6%] text-left z-20">
              {/* parent (bigger outer container for the larger area) with overflow-visible */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-20 md:h-20 lg:w-[7.5rem] lg:h-[7.5rem] overflow-visible">
                {/* HEXAGON removed. Rectangle now carries the color. */}

                {/* RECTANGLE (now has hexagon color) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#E1FFFD] rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100 relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[140%] md:h-[140%] lg:w-[200%] lg:h-[200%]">
                    <Lottie
                      animationData={CalenderAnimation}
                      loop
                      autoplay
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Text content for Step 2 */}
            <div className="absolute left:[50%] left-[50%] transform -translate-x-1/2 top-16 sm:top-20 md:top-[61%] lg:top-52  md:left-[55%] lg:left[48%] text-left z-20">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3">Pick Your Slot</h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed max-w-[120px] sm:max-w-[140px] md:max-w-xs">
                Schedule at your convenience with flexible timing
              </p>
            </div>

            {/* Step 3: Begin Your Journey */}
            {/* Image for Step 3 */}
            <div className="absolute right-4 sm:right-6 md:right-10 lg:right-23 top-6 sm:top-8 md:top-14 lg:top-14 z-20">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 overflow-visible">
                {/* HEXAGON removed. Rectangle now carries the color. */}

                {/* RECTANGLE (now has hexagon color) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#E1FFFD] rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100 relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%]">
                    <Lottie
                      animationData={StudentWithLaptop}
                      loop
                      autoplay
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Text content for Step 3 */}
            <div className="absolute right-4 sm:right-6 md:right-[-5%] lg:right-1 top-22 sm:top-26 md:top-[83%] lg:top-[78%] text-left z-20">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3">Begin Your Journey</h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed max-w-[120px] sm:max-w-[140px] md:max-w-xs">
                Start learning instantly with expert guidance
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link href="/categories">
            <Button
              size="lg"
              className=" bg-[#1CA672] hover:bg-teal-600 text-white rounded-3xl sm:-mt-4 text-xl font-medium transition-colors duration-200 cursor-pointer"
            >
              Book Demo
            </Button>
          </Link>
          {/* Supporting texts under the CTA - added as per design */}
          <div className="mt-3">
            <p className="text-base md:text-lg font-semibold text-gray-900">
              <span className="relative inline-block align-middle leading-none">
                
                <span aria-hidden className="absolute left-[58%]  bottom-[4px] h-0.5 w-6 md:w-6 bg-gray-900 rounded"></span>
              </span><span className="font-extrabold text-2xl">₹0</span>  For First Class <span className="text-green-600 font-extrabold">100% Off</span>
            </p>
            <p className="text-sm text-gray-500 mt-1" onClick={handleSignupClick}>
              Booked A demo Already? <span className="text-amber-500 font-semibold underline underline-offset-2 cursor-pointer">JOIN NOW</span>
            </p>
          </div>
        </div>
      </div>
    </section></Container>
    </>
    
  )
}
export default CareerPath;
