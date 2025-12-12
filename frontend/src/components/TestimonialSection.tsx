"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Lottie from "lottie-react";
import graduationHat from "../assets/GraduationHat.json";

import pic1 from "../assets/Testimonial1.svg";
import pic2 from "../assets/herogirlsvg.svg";
import pic3 from "../assets/study1.svg";
import Container from "./common/Container";

const testimonials = [
  {
    id: 1,
    name: "Riya Kapoor",
    text: "I love how flexible the classes are. I can pick my own time and never feel rushed.",
    avatar: pic1,
  },
  {
    id: 2,
    name: "Nikita Sharma",
    text: "YuvaX made learning fun again—the streaks and rewards kept me motivated every day.",
    avatar: pic2,
  },
  {
    id: 3,
    name: "Aarav Sharma",
    text: "Daily tasks keep me accountable, and I love celebrating small wins that add up.",
    avatar: pic3,
  },
];

const duplicatedTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

export default function TestimonialsSection() {
  return (
    <>
    <Container>
    <section className="relative rounded-3xl shadow-lg  w-full bg-[#FFFFFF] grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start lg:items-center mx-auto p-8 sm:p-12 lg:p-16 px-4 sm:px-8
           lg:px-12 py-6 sm:py-8  mt-10 max-[360px]:p-4 ring-1 ring-gray-100 overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[59%] top-[1%] sm:left-[20%] sm:top-6 lg:left-8 lg:top-8 w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28"
              style={{
                transform: "rotate(-15deg) translateX(-8%)",
                transformOrigin: "center center",
                backfaceVisibility: "hidden",
              }}
            >
              <Lottie
                animationData={graduationHat}
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            {/* Left Content Section */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-1">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-[#6637ED] font-medium text-base sm:text-lg italic">
                  Achievement Stories
                </h3>
                <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#111111] leading-tight">
                  Real voices. Real wins. <br className="hidden sm:block" />
                  <span className="block sm:inline">Real growth.</span>
                </p>
                <p className="text-[#666666] text-base sm:text-lg leading-relaxed">
                  Here`s what our learners have to say about their journey with
                  us.
                </p>
              </div>
              <Button className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full cursor-pointer text-sm sm:text-base font-medium w-full sm:w-auto">
                View More
              </Button>
            </div>

            {/* Right Testimonials Section */}
            <div className="relative h-[400px] sm:h-[450px] lg:h-[490px] overflow-hidden order-2 lg:order-2 cursor-pointer">
              <div className="animate-scroll-up space-y-4 sm:space-y-6">
                {duplicatedTestimonials.map((testimonial, index) => (
                  <Card
                    key={`${testimonial.id}-${index}`}
                    className={`group relative p-3 sm:p-4 lg:p-2 pr-8 sm:pr-10 bg-white hover:shadow-4xl border-l-8 sm:border-l-10 lg:border-l-12 border-gray-300 rounded-xl sm:rounded-2xl hover:border hover:border-green-500 hover:border-l-8 sm:hover:border-l-10 lg:hover:border-l-12 transition ease-in ${index % 2 === 1
                      ? "mr-2 sm:mr-4 lg:mr-8"
                      : "ml-2 sm:ml-4 lg:ml-8"
                      }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-8 sm:w-14 lg:w-15 h-8 sm:h-14 lg:h-15 mt-1 sm:mt-2 lg:mt-3 flex-shrink-0 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={58}
                          height={58}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-black text-sm sm:text-base mb-1 sm:mb-2">
                          {testimonial.name}
                        </h4>
                        {/* Line Clamp added for mobile screens only */}
                        <p className="text-gray-900 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {testimonial.text}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
      </section>
    </Container>
      
    </>
    
  );
}