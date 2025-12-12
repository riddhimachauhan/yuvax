"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";

// Redux imports
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCourseCategories, setCurrentCategoryIndex, nextCategory, prevCategory } from "../store/slices/courseCategoriesSlice";

// Assets
import leftArrow from "../assets/LeftArrow.svg";
import rightArrow from "../assets/RightArrow.svg";

type ImageLike = string | StaticImageData | undefined;

type Course = {
    title: string;
    subtitle: string;
    bgColor: string;
    icon: string;
};

export interface NavLink { label: string; href?: string; }

interface CourseDescriptionProps {
    className?: string; 
    variant?: "full" | "minimal";
    title?: React.ReactNode;
    subtitle?: string;
    navLinks?: NavLink[];
    snow?: ImageLike;
    showDemoBadge: boolean;
}

const CourseDescription: React.FC<CourseDescriptionProps> = ({
    variant = "full",
    title = <>Learn. Play. Achieve. </>,
    subtitle = "AI-driven lessons and streak tracking make learning through 120+ courses fun and engaging.",
}) => {
    const dispatch = useAppDispatch();
    const { categories, isLoading, error, currentCategoryIndex } = useAppSelector(
        (state) => state.courseCategories
    );

    const [visibleCards, setVisibleCards] = useState(5);
    const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

    // Detect screen size and set number of visible cards
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 426) {
                setVisibleCards(1);
                setScreenSize('mobile');
            } else if (window.innerWidth < 768) {
                setVisibleCards(1);
                setScreenSize('mobile');
            } else if (window.innerWidth < 1024) {
                setVisibleCards(3);
                setScreenSize('tablet');
            } else {
                setVisibleCards(5);
                setScreenSize('desktop');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchCourseCategories());
    }, [dispatch]);

    const handleNext = () => {
        dispatch(nextCategory());
    };

    const handlePrev = () => {
        dispatch(prevCategory());
    };

    const handleCardClick = (clickedIndex: number) => {
        dispatch(setCurrentCategoryIndex(clickedIndex));
    };

    const getVisibleCourses = () => {
        if (categories.length === 0) return [];

        const result: Course[] = [];
        const halfVisible = Math.floor(visibleCards / 2);

        for (let i = -halfVisible; i <= halfVisible; i++) {
            if (visibleCards % 2 === 0 && i === halfVisible) break;

            const index = (currentCategoryIndex + i + categories.length) % categories.length;
            result.push(categories[index]);
        }

        return result;
    };

    // Get card styles based on position and screen size
    const getCardStyles = (positionFromCenter: number) => {
        if (screenSize === 'mobile') {
            return {
                card: "w-full max-w-[280px] h-[330px] p-3 gap-3 rounded-3xl border border-gray-300 shadow-xl ",
                bg: "w-full h-[200px] rounded-[18px] p-3",
                image: "w-[150px] h-[200px] rotate-0 mx-auto",
                title: "w-full h-[28px] text-xl font-bold opacity-100 text-center",
                desc: "w-full h-[20px] text-xs text-gray-500 opacity-100 text-center"
            };
        }

        if (screenSize === 'tablet') {
            if (positionFromCenter === 0) {
                return {
                    card: "w-[280px] h-[340px] p-3 gap-3 rounded-3xl border border-gray-300 z-10 shadow-xl -translate-y-4",
                    bg: "w-[250px] h-[200px] rounded-[18px] p-3",
                    image: "w-[150px] h-[200px] rotate-0",
                    title: "w-full h-[28px] text-xl font-bold opacity-100",
                    desc: "w-full h-[20px] text-xs text-gray-500 opacity-100"
                };
            } else {
                return {
                    card: "w-[200px] h-[240px] p-2 gap-2 rounded-3xl border border-gray-300 z-0 shadow-md opacity-70",
                    bg: "w-[180px] h-[140px] rounded-[12px] p-2",
                    image: "w-[140px] h-[120px] rotate-0 translate-y-[25px] translate-x-[15px]",
                    title: "w-full h-[26px] text-lg font-bold opacity-80",
                    desc: "w-full h-[24px] text-xs text-gray-500 opacity-80"
                };
            }
        }

        if (positionFromCenter === 0) {
            return {
                card: "w-[280px] h-[340px] p-3 rounded-3xl z-10 shadow-xl",
                bg: "w-[250px] h-[200px] rounded-[18px] p-3",
                image: "w-[150px] h-[200px] rotate-0",
                title: "w-full h-[28px] text-xl font-bold opacity-100",
                desc: "w-full h-[20px] text-xs text-gray-500 opacity-100"
            };
        } else if (Math.abs(positionFromCenter) === 1) {
            return {
                card: "w-[220px] h-[260px] p-2 gap-2 rounded-3xl border border-gray-300 z-5 shadow-md opacity-90",
                bg: "w-[200px] h-[160px] rounded-[14px] p-2",
                image: "w-[140px] h-[180px] rotate-[9.98deg]",
                title: "w-full h-[26px] text-lg font-bold opacity-90",
                desc: "w-full h-[18px] text-xs text-gray-500 opacity-90"
            };
        } else {
            return {
                card: "w-[200px] h-[240px] p-2 gap-2 rounded-3xl border border-gray-300 z-0 shadow-md opacity-70",
                bg: "w-[180px] h-[140px] rounded-[12px] p-2",
                image: "w-[140px] h-[120px] rotate-0 translate-y-[25px] translate-x-[15px]",
                title: "w-full h-[26px] text-lg font-bold opacity-80",
                desc: "w-full h-[24px] text-xs text-gray-500 opacity-80"
            };
        }
    };

    // Calculate container width based on visible cards
    const getContainerWidth = () => {
        if (screenSize === 'mobile') return "w-full max-w-[300px]";
        if (screenSize === 'tablet') return "w-full max-w-[700px] px-4";
        return "w-full max-w-[1100px] px-4";
    };

    const shouldShowNavigation = categories.length > visibleCards;

    // Render carousel content based on loading/error state
    const renderCarouselContent = () => {
        if (isLoading) {
            return (
                <div className={`${getContainerWidth()} flex justify-center items-center py-16`}>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="flex space-x-2">
                            <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                            <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.5s]"></div>
                        </div>
                        <div className="text-white text-lg font-medium">Loading Categories...</div>
                    </div>
                </div>
            );
        }

        if(error) {
            return (
                <div className={`${getContainerWidth()} flex justify-center items-center`}>
                    <div className="text-white text-center py-8">
                        <div className="text-lg">Error loading Categories</div>
                        <div className="text-sm mt-2">{error}</div>
                        <button
                            onClick={() => dispatch(fetchCourseCategories())}
                            className="mt-4 px-4 py-2 bg-white text-green-600 rounded hover:bg-gray-100"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className={`${getContainerWidth()} flex justify-center items-center transition-all duration-500 ease-in-out`}>
                <div className={`flex gap-3 sm:gap-4 md:gap-6 transition-all duration-500 ease-in-out cursor-pointer justify-center items-center w-full ${screenSize === 'mobile' ? "flex-col" : "flex-row"
                    }`}>
                    {categories.length > 0 && getVisibleCourses().map((course, i) => {
                        const positionFromCenter = screenSize === 'mobile' ? 0 : (screenSize === 'tablet' ? i - 1 : i - 2);
                        const realIndex = (currentCategoryIndex + positionFromCenter + categories.length) % categories.length;

                        const styles = getCardStyles(positionFromCenter);

                        return (
                            <div
                                key={`${course.title}-${i}`}
                                onClick={() => handleCardClick(realIndex)}
                                className={`transition-all duration-500 flex flex-col items-center bg-white cursor-pointer overflow-hidden ${styles.card} flex-shrink-0 ${screenSize === 'mobile' ? 'mb-4 last:mb-0' : ''
                                    }`}
                            >
                                <div className={`relative flex items-center justify-center overflow-hidden ${course.bgColor} ${styles.bg}`}>
                                    <Image
                                        src={course.icon}
                                        alt={course.title}
                                        width={100}
                                        height={100}
                                        className={`object-contain ${styles.image}`}
                                    />
                                </div>
                                <div className="w-full flex flex-col justify-center mt-0 gap-1 group relative px-2 text-black">
                                    <h3 className={`${styles.title} truncate`} title={course.title}>
                                        {course.title}
                                    </h3>
                                    <p className={`${styles.desc} truncate`} title={course.subtitle}>
                                        {course.subtitle}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className={`relative ${variant === "minimal" ? "h-[28rem] sm:h-[34rem] md:h-[45rem]" : "h-[40rem] md:h-[45rem]"} bg-gradient-to-r from-[#1CA672] via-[#0FCEC9] to-[#0A9C9D] flex flex-col items-center justify-start pt-20 px-4 overflow-hidden`}>
                {/* Title and Subtitle - Always visible */}
                <div className="relative z-20 flex flex-col items-center w-full px-2">
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-center leading-8 sm:leading-[3rem] md:leading-[4.5rem] max-w-[95%] sm:max-w-5xl bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90.52deg, #FFFFFF 4.83%, #D1FFCB 24.68%, #FFFFFF 65.57%, #C6FFBE 98.02%)" }}>
                        {title} <span className="text-yellow-400">🏆</span>
                    </h1>
                    {subtitle && <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-center text-white/90 max-w-[95%] sm:max-w-3xl px-2">{subtitle}</p>}
                </div>

                {/* Carousel Section - Shows loading/error states only here */}
                <div className="relative w-full flex justify-center items-center mt-8 sm:mt-12">
                    {renderCarouselContent()}
                </div>

                {/* Navigation buttons - Only show when not loading and there are enough categories */}
                {!isLoading && !error && shouldShowNavigation && (
                    <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 sm:gap-4 md:gap-6 z-30 ${screenSize === 'mobile' ? 'flex-row justify-center w-full max-w-[200px]' : ''
                        }`}>
                        <button
                            onClick={handlePrev}
                            className="bg-white hover:bg-gray-100 rounded-full p-2 sm:p-3 shadow-md flex items-center justify-center transition-colors min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]"
                        >
                            <Image
                                src={leftArrow}
                                alt="Previous"
                                width={screenSize === 'mobile' ? 16 : 20}
                                height={screenSize === 'mobile' ? 16 : 20}
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-white hover:bg-gray-100 rounded-full p-2 sm:p-3 shadow-md flex items-center justify-center transition-colors min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]"
                        >
                            <Image
                                src={rightArrow}
                                alt="Next"
                                width={screenSize === 'mobile' ? 16 : 20}
                                height={screenSize === 'mobile' ? 16 : 20}
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseDescription;