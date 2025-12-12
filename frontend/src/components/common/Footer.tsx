"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Footerr from "@/assets/footer1.png";
import Footer1 from "@/assets/footer3.svg";
import Footer2 from "@/assets/footer4.svg";
import Footer3 from "@/assets/footer5.svg";
import Footer4 from "@/assets/footer6.svg";
import Footer5 from "@/assets/footer7.svg";
import Footer6 from "@/assets/footer9.svg";
import Footer7 from "@/assets/footer10.svg";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { openSignupModal } from "@/store/slices/modalSlice";

function Footer() {
  const dispatch = useAppDispatch();
    const handleSignupClick = () => {
      dispatch(openSignupModal());
    };
  
  return (
    <div className="relative overflow-hidden">
      {/* Top section with illustration and call-to-action */}
      <div className="relative bg-[#F4FAFC] pb-0">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-600 mb-8">
            Start your learning <br /> with YuvaX
          </h2>

          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold mb-4"
          onClick={handleSignupClick}
          >
            GET STARTED
          </Button>
        </div>

        <div className="relative w-full h-20 mb-0">
          {/* Decorative icons positioned above the footer image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-6xl h-full">
              {/* Graduation badge - top left */}
              <div className="absolute top-35 left-[26%] md:top-14 md:left-[35%] w-50 h-50 md:w-80 md:h-80">
                <Image
                  src={Footer1}
                  alt="Graduation badge"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Fire icon - top center left */}
              <div className="absolute top-[-85%] left-[68%] md:top-[-85%] md:left-[67%] w-25 h-25 md:w-60 md:h-60">
                <Image
                  src={Footer2}
                  alt="Fire icon"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Stars - top center */}
              <div className="absolute top-21 left-[70%] md:top-21 md:left-[60%] w-20 h-20 md:w-13 md:h-13">
                <Image
                  src={Footer3}
                  alt="Stars"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Heart - top right */}
              <div className="absolute top-37 right-[18%] md:top-37 md:right-[28%] w-15 h-15 md:w-26 md:h-26">
                <Image
                  src={Footer4}
                  alt="Heart"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Robot - top far right */}
              <div className="absolute top-[-50%] right-[75%] w-22 h-22 md:w-38 md:h-38">
                <Image
                  src={Footer5}
                  alt="Robot"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Learning blocks - center right */}
              <div className="absolute top-18 right-[60%] md:right-[65%] w-22 h-22 md:w-18 md:h-18">
                <Image
                  src={Footer6}
                  alt="Learning blocks"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Books stack - bottom center (positioned over the character) */}
              <div className="absolute top-44 left-[32%] transform -translate-x-1/2 w-16 h-16 md:w-12 md:h-12 z-10">
                <Image
                  src={Footer7}
                  alt="Books stack"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Books stack - bottom center (positioned over the character) */}
              <div className="absolute top-38 left-[28%] transform -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 z-10">
                <Image
                  src={Footer7}
                  alt="Books stack"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH Illustration (full-bleed) */}
        {/* This wrapper uses w-screen + transform to span the entire viewport width even inside container */}
        <div className="relative w-screen z-0 left-1/2 -translate-x-1/2 h-64 md:h-80 overflow-hidden ">
          <Image
            src={Footerr}
            alt="YuvaX Learning Illustration"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
        </div>
      </div>

      {/* Green footer section with curved top */}
      {/* Reduced top padding so the footer sits flush with the image above */}
      <div className="relative z-10 bg-[#1CA672] text-white -mt-4 ">
        {/* Footer content */}
        <div className="relative pt-8 pb-8">
          <div className="container mx-auto px-4">
            {/* Mobile layout: two rows with two columns (left/right) using flex and justify-around */}
            <div className="md:hidden flex flex-col gap-8 mb-12">
              <div className="flex flex-row justify-around gap-6">
                {/* Features Column 1 */}
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg mb-4">Features</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Recorded Tutorial</li>
                    <li>1 on 1 Classes</li>
                    <li>Group Class</li>
                    <li>Class Demo</li>
                    <li>Games</li>
                    <li>leaderboard</li>
                  </ul>
                </div>

                {/* Features Column 2 */}
                <div className="flex flex-col">
                <h3 className="font-semibold text-lg mb-4">Courses</h3>
                <ul className="space-y-2 text-sm">
                  <li>Coding</li>
                  <li>Math</li>
                  <li>English</li>
                  <li>Business<br></br> Communication</li>
                  <li>Gen AI</li>
                  <li>UI/UX Design</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-row justify-around gap-6 pl-[16px] pr-[42px]">
                {/* Privacy and Terms */}
                <div className="flex flex-col ">
                  <h3 className="font-semibold text-lg mb-4">
                    Privacy and <br/>terms
                  </h3>
                  <ul className="space-y-2 text-sm">
                   <Link href="/privacy-policy"> <li>Community<br/> guidelines</li> </Link>
                   <Link href="/privacy-policy"> <li>Terms & conditions</li> </Link>
                  </ul>
                 <Link href="/privacy-policy"> <h4 className="font-semibold mt-6 mb-2">Privacy</h4></Link>
                  <ul className="space-y-2 text-sm">
                    <li>Do Not Sell or Share My Personal Information</li>
                  </ul>
                </div>

                {/* Contact */}
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg mb-4">Contact</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Address</li>
                    <li>Number</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Desktop/tablet layout (unchanged): four columns in a single row */}
            {/* Updated this wrapper to use justify-evenly so the space on the left of the first column
            and right of the last column matches the spacing between internal columns */}
            <div className="hidden md:flex md:flex-row justify-evenly gap-8 mb-12">
              {/* Features Column 1 */}
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg mb-4">Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>Recorded Tutorial</li>
                  <li>1 on 1 Classes</li>
                  <li>Group Class</li>
                  <li>Class Demo</li>
                  <li>Games</li>
                  <li>leaderboard</li>
                </ul>
              </div>

              {/* Features Column 2 */}
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg mb-4">Courses</h3>
                <ul className="space-y-2 text-sm">
                  <li>Coding</li>
                  <li>Math</li>
                  <li>English</li>
                  <li>Business Communication</li>
                  <li>Gen AI</li>
                  <li>UI/UX Design</li>
                </ul>
              </div>

              {/* Privacy and Terms */}
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg mb-4">
                  Privacy and terms
                </h3>
                <ul className="space-y-2 text-sm">
                 <Link href="/privacy-policy"> <li>Community guidelines</li> </Link>
                 <Link href="/privacy-policy"> <li>Terms & conditions</li> </Link>
                </ul>
               <Link href="/privacy-policy"> <h4 className="font-semibold mt-6 mb-2">Privacy</h4></Link>
                <ul className="space-y-2 text-sm">
                  <li>Do Not Sell or Share My Personal Information</li>
                </ul>
              </div>

              {/* Contact */}
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg mb-4">Contact</h3>
                <ul className="space-y-2 text-sm">
                  <Link href="/about">
                  <li className="text-md" >
                    About Us
                  </li></Link>
                  <li>Number</li>
                </ul>
              </div>
            </div>

            {/* Bottom section */}
            <div className="flex flex-col md:flex-row justify-evenly items-center pt-8 border-t border-emerald-500">
              <div className="flex flex-wrap gap-2 text-xs mb-4 md:mb-0">
                <Link href="/privacy-policy">
                  <span>Privacy Policy</span>
                </Link>
                <span>•</span>
                <span>Delivery Terms of Service</span>
                <span>•</span>
                <span>Rider Terms of Service</span>
                <span>•</span>
                <span>Copyright © 2024 YuvaX</span>
              </div>
              <div className="flex items-center gap-4">
                <select className="bg-transparent border border-emerald-400 rounded px-3 py-1 text-sm">
                  <option value="en">English (UK)</option>
                </select>
                {/* Social media icons */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center">
                   <Link href="https://www.instagram.com/yuvax_edtech/"> <span className="text-white text-sm">📷</span></Link>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                   <Link href="https://www.linkedin.com/company/yuvax/"> <span className="text-white text-sm">in</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;