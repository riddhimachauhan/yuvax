"use client"

import React, { useEffect, useRef, useState } from "react"
import Image, { StaticImageData } from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import toppicks1 from "@/assets/toppicks1.svg";
import toppicks2 from "@/assets/toppicks2.svg";
import toppicks3 from "@/assets/toppicks3.svg";
//import DoubleCheck from '@/assets/DoubleCheck.svg';
import CardFeature1 from "@/assets/Cardfeature1.svg";
import CardFeature2 from "@/assets/Cardfeature2.svg";
import CardFeature3 from "@/assets/cardFeature3.svg";
import CardFeature4 from "@/assets/CardFeature4.svg";
import Container from './common/Container';
import { openSignupModal } from "@/store/slices/modalSlice";
import { useAppDispatch } from "@/store/hooks";


type Course = {
  id: number
  title: string
  description: string
  originalPrice: string
  price: string
  sessions: string
  badge: string
  gradient: string
  illustration: React.ReactNode
}

type Feature = {
  icon: StaticImageData | string;
  text: string
}

const courses: Course[] = [
  {
    id: 1,
    title: "Game Development",
    description: "Advanced coding course for kids",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#159903] to-[#00E742]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks1} alt="Game Dev icon" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: 2,
    title: "Scratch Coding",
    description: "Advanced coding course for kids",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#FF7B46] to-[#E74900]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks2} alt="Scratch Coding icon" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: 3,
    title: "App Development",
    description: "Advanced App Development course",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#FF46F3] to-[#E79900]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks3} alt="App Development icon" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: 4,
    title: "Scratch Programming",
    description: "Advanced coding course for kids",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#09B21A] to-[#FFC700]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks1} alt="Scratch Programming icon" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: 5,
    title: "App Development",
    description: "Advanced App Development course",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#FF46F3] to-[#E79900]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks3} alt="App Development icon" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: 6,
    title: "Scratch Coding",
    description: "Advanced coding course for kids",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#FF7B46] to-[#E74900]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks1} alt="Scratch Coding icon" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: 7,
    title: "Game Development",
    description: "Advanced coding course for kids",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#159903] to-[#00E742]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks2} alt="Game Dev icon" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: 8,
    title: "Scratch Programming",
    description: "Advanced coding course for kids",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#09B21A] to-[#FFC700]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks1} alt="Scratch Programming icon" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: 9,
    title: "App Development",
    description: "Advanced App Development course",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#FF46F3] to-[#E79900]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks3} alt="App Development icon" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: 10,
    title: "Scratch Programming",
    description: "Advanced coding course for kids",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#09B21A] to-[#FFC700]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks1} alt="Scratch Programming icon" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: 11,
    title: "App Development",
    description: "Advanced App Development course",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#FF46F3] to-[#E79900]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks3} alt="App Development icon" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: 12,
    title: "Scratch Coding",
    description: "Advanced coding course for kids",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#FF7B46] to-[#E74900]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks2} alt="Scratch Coding icon" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: 13,
    title: "Game Development",
    description: "Advanced coding course for kids",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#159903] to-[#00E742]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks1} alt="Game Dev icon" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: 14,
    title: "Scratch Programming",
    description: "Advanced coding course for kids",
    originalPrice: "₹2345",
    price: "₹1234",
    sessions: "150 sessions (₹ 8.12 session)",
    badge: "Advanced",
    gradient: "bg-gradient-to-b from-[#09B21A] to-[#FFC700]",
    illustration: (
      <div className="relative w-28 h-28">
        <Image src={toppicks1} alt="Scratch Programming icon" fill className="object-contain" />
      </div>
    ),
  },
]

const features: Feature[] = [
  { icon: CardFeature1, text: "Grade 8-10" },
  { icon: CardFeature2, text: "Live 1:1 Sessions" },
  { icon: CardFeature3, text: "60 min" },
  { icon: CardFeature4, text: "Age 6-8" },
]

const MAX_DESC_LEN = 21
const truncateDesc = (text: string): string =>
  text.length > MAX_DESC_LEN ? `${text.slice(0, MAX_DESC_LEN)}…` : text

interface Props {
  /** ms to move one card automatically; larger = slower */
  autoSpeedMs?: number
  /** ms for manual clicks/dot transitions */
  manualTransitionMs?: number
}

const Toppicks: React.FC<Props> = ({ autoSpeedMs = 6500, manualTransitionMs = 600 }) => {
  const originalCount = courses.length
  const [visibleCards, setVisibleCards] = useState<number>(3)
  // ref to the viewport that shows cards; used to compute how many cards can fit without stretching
  const viewportRef = useRef<HTMLDivElement | null>(null)
  // fixed card width and gap size in pixels (to avoid stretch)
  const [cardPx, setCardPx] = useState<number>(320)
  const [gapPx, setGapPx] = useState<number>(24)

  // new state: true only when viewport width is exactly 1024px
  const [isExact1024, setIsExact1024] = useState<boolean>(false)

  // offset stored in fractional items (0 .. originalCount)
  const [offsetItems, setOffsetItems] = useState<number>(0)
  const [isManualTransition, setIsManualTransition] = useState<boolean>(false)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const pauseTimeoutRef = useRef<number | null>(null)

  const dispatch = useAppDispatch();

  const handleSignupClick = () => {
    dispatch(openSignupModal());
  };

  useEffect(() => {
    const computeVisibleFromViewport = () => {
      if (typeof window === "undefined") return
      const vw = viewportRef.current?.clientWidth ?? 0
      let base = 320
      let gap = 24 // lg: gap-6 = 24px
      if (window.innerWidth < 640) {
        base = 240
        gap = 12 // gap-3 = 12px
      } else if (window.innerWidth <= 1024) {
        base = 280
        gap = 16 // sm: gap-4 = 16px
      }

      if (vw > 0) {
        // Fit rule considering gaps: N*base + (N-1)*gap <= vw
        const count = Math.max(1, Math.floor((vw + gap) / (base + gap)))
        setVisibleCards(count)
        setCardPx(base)
        setGapPx(gap)
      } else {
        // fallback to previous logic when ref isn't ready yet
        if (window.innerWidth < 640) setVisibleCards(1)
        else if (window.innerWidth <= 1024) setVisibleCards(2)
        else setVisibleCards(3)
        setCardPx(base)
        setGapPx(gap)
      }

      // set isExact1024 if width equals exactly 1024px
      setIsExact1024(Math.round(window.innerWidth) === 1024)
    }

    computeVisibleFromViewport()
    window.addEventListener("resize", computeVisibleFromViewport)
    return () => window.removeEventListener("resize", computeVisibleFromViewport)
  }, [])

  // translate in pixels: how many items offset times (card width + gap)
  const translatePx = offsetItems * (cardPx + gapPx)
  const speedItemsPerSec = 1000 / autoSpeedMs // items per second

  // how long to pause when an item lands centered (ms)


  const motionSlowFactor = 0.8

  const movementSpeedBoost = 1.4

  // clear any pending pause timeout on unmount or when paused state changes
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
        pauseTimeoutRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (isHovered || isManualTransition) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      lastTimeRef.current = null
      return
    }

    const step = (time: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time
      const dtSec = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      setOffsetItems((prev) => {
        const baseFloor = Math.floor(prev)
        const frac = prev - baseFloor // [0,1)
        const proximity = 1 - frac
        const adaptiveFactor = motionSlowFactor + (1 - motionSlowFactor) * Math.pow(Math.max(0, proximity), 2.0)

        const effectiveSpeedItemsPerSec = speedItemsPerSec * adaptiveFactor * movementSpeedBoost

        let next = prev + effectiveSpeedItemsPerSec * dtSec
        if (next >= originalCount) next = next - originalCount
        const prevFloor = Math.floor(prev)
        const nextFloor = Math.floor(next + 1e-9)
        if (prevFloor !== nextFloor) {
          const aligned = nextFloor % originalCount
          return aligned
        }

        return next
      })

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastTimeRef.current = null
    }
  }, [isHovered, isManualTransition, speedItemsPerSec, originalCount])

  // manual move: moves forward by `count` items but with a smooth CSS transition
  const manualMoveBy = (count: number) => {
    setIsManualTransition(true)
    setOffsetItems((prev) => {
      let next = prev + count
      // normalize within [0, originalCount) so negative moves wrap correctly
      next = ((next % originalCount) + originalCount) % originalCount
      return next
    })

    setTimeout(() => setIsManualTransition(false), manualTransitionMs + 50)
  }

  const nextSlide = () => manualMoveBy(-1)
  const prevSlide = () => manualMoveBy(1) // keep forward motion to avoid blank gaps

  // pages / dots
  const pageSize = visibleCards
  const numPages = Math.ceil(originalCount / visibleCards)
  // const _goToPage = (pageIndex: number) => {
  //   setIsManualTransition(true)
  //   const target = (pageIndex * pageSize) % originalCount
  //   setOffsetItems(target)
  //   setTimeout(() => setIsManualTransition(false), manualTransitionMs + 50)
  // }


  const activePage = Math.floor(offsetItems / pageSize) % numPages

  // On small screens (visibleCards === 1), render only up to 5 dots to avoid overflow.
  const isSmallScreen = visibleCards === 1
  const maxMobileDots = 5
  const totalDots = numPages
  // const _displayedDotIndices: number[] = Array.from({ length: totalDots }, (_, i) => i)
  if (isSmallScreen && totalDots > maxMobileDots) {
    const halfWindow = Math.floor(maxMobileDots / 2)
    let start = activePage - halfWindow
    if (start < 0) start = 0
    if (start > totalDots - maxMobileDots) start = totalDots - maxMobileDots
    // displayedDotIndices = Array.from({ length: maxMobileDots }, (_, i) => start + i)
  }

  // track translates in pixels; width can be auto (content size)

  return (
    <>
      <Container>
        <div className="relative rounded-3xl shadow-lg  w-full bg-[#FFFFFF] mx-auto p-8 sm:p-12 lg:p-16 mt-10 max-[360px]:p-4 ring-1 ring-gray-100 overflow-hidden">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 text-balance">Top Picks</p>
            <p className="text-gray-600 text-base text-md sm:text-lg md:text-xl text-pretty">Student-approved and trusted by parents top rated courses </p>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >

            <div ref={viewportRef} className="overflow-hidden -mx-8 sm:-mx-12 lg:-mx-16 py-4 sm:py-6 lg:py-8 max-[360px]:-mx-4 max-[360px]:py-3">

              <div
                className="flex gap-3 sm:gap-4 lg:gap-6 max-[360px]:gap-2"
                style={{
                  transform: `translateX(-${translatePx}px)`,
                  width: 'max-content',
                  transition: isManualTransition
                    ? `transform ${manualTransitionMs}ms cubic-bezier(.2,.8,.2,1)`
                    : 'transform 0.5s cubic-bezier(.25,.46,.45,.94)', // smoother auto-scroll

                }}
              >


                {[...courses, ...courses].map((course, idx) => (
                  <div
                    key={`${course.id}-${idx}`}
                    className="flex-shrink-0 p-2"
                    style={{ width: `${cardPx}px` }}
                  >
                    <Card
                      className="relative overflow-hidden bg-[#E0F4E3] shadow-lg hover:shadow-2xl transition-all duration-300 p-0
             border border-transparent group hover:scale-[1.02] 
            hover:border-[2px] hover:border-transparent hover:border-[#05CEC9]
             rounded-[40px] sm:rounded-[40px] md:rounded-[40px] hover:rounded-[40px]"
                    >
                      <div className="p-4 space-y-3 bg-[#FFFFFF] hover:rounded-[30px] rounded-[30px] sm:rounded-[30px] md:rounded-[30px] overflow-hidden max-[360px]:p-2 max-[360px]:space-y-2">
                        {/* Gradient section with badge, price, and illustration */}
                        <div
                          className={`bg-gradient-to-br ${course.gradient} p-3 sm:p-4  text-white relative h-32 sm:h-36 lg:h-40 overflow-hidden rounded-[30px] sm:rounded-[30px] md:rounded-[30px] hover:rounded-[30px] max-[360px]:p-2 max-[360px]:h-28`}
                        >

                          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 max-[360px]:top-1 max-[360px]:left-1">
                            <span className="bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-medium shadow-lg max-[360px]:text-[10px] max-[360px]:px-1.5 max-[360px]:py-0.5">
                              {course.badge}
                            </span>
                          </div>

                          <div className="absolute left-2 sm:left-3 bottom-2 sm:bottom-3 text-left z-10 max-[360px]:left-1 max-[360px]:bottom-1">
                            <div className="text-xs line-through opacity-75 max-[360px]:text-[10px]">{course.originalPrice}</div>
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold max-[360px]:text-base">{course.price}</div>
                            <div className="text-xs opacity-90 text-pretty mt-0.5 max-[360px]:text-[10px]">{course.sessions}</div>
                          </div>

                          {/* illustration: only nudge right when exact 1024px to avoid clipping */}
                          <div
                            className="absolute bottom-5 sm:bottom-3 right-0 sm:right-5 lg:right-6 transform group-hover:scale-110 transition-transform duration-300 max-[360px]:bottom-1 max-[360px]:right-1 max-[360px]:scale-[0.75]"
                            style={isExact1024 ? { right: 18 } : undefined}
                          >
                            {course.illustration}
                          </div>
                        </div>

                        {/* Title and description in white section - inside first div */}
                        <div className="bg-white">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 text-balance leading-tight max-[360px]:text-sm">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 mb-0 text-xs sm:text-sm text-pretty max-[360px]:text-[11px]"><span title={course.description}>{truncateDesc(course.description)}</span></p>
                        </div>

                        {/* Buttons section - moved inside first div */}
                        <div className="bg-white ">
                          <div className="flex flex-col sm:flex-row gap-3 mb-0 max-[360px]:gap-2">
                            <Button className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-1.5 sm:py-2 text-xs sm:text-sm rounded-3xl md:rounded-3xl lg:rounded-3xl transition-all duration-200 hover:shadow-lg max-[360px]:py-1 max-[360px]:text-[11px] cursor-pointer" onClick={handleSignupClick}>
                              Buy Course
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 hover:border-cyan-600 bg-transparent font-semibold py-1.5 sm:py-2 text-xs sm:text-sm rounded-3xl md:rounded-3xl lg:rounded-3xl transition-all duration-200 max-[360px]:py-1 max-[360px]:text-[11px] cursor-pointer"
                              onClick={handleSignupClick}
                            >
                              Book a Demo
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Features section - unified 2x2 grid on all breakpoints */}
                      <div className="pb-6 p-4 max-[360px]:pb-4 max-[360px]:p-2">
                        <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-3">
                          {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-600 group/feature">
                              <span className="text-sm flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200 max-[360px]:scale-90">
                                <Image src={feature.icon} alt="feature" width={16} height={16} />
                              </span>
                              <span className="text-xs font-medium max-[360px]:text-[10px]">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8 bg-gray-50 rounded-full px-4 py-3 mx-auto w-fit max-[360px]:px-3 max-[360px]:py-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="w-8 h-8 rounded-full hover:bg-gray-200 transition-colors duration-200 max-[360px]:w-7 max-[360px]:h-7"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="w-8 h-8 rounded-full hover:bg-gray-200 transition-colors duration-200 max-[360px]:w-7 max-[360px]:h-7"
              >
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </>
  )
}

export default Toppicks;
