import React from 'react';
import mathsSub from "@/assets/mathsSubject.svg";
import star from "@/assets/star.svg";
import teacher from "@/assets/teacher.svg";
import time from "@/assets/time.svg";
import Image from "next/image";

const SubjectCard = () => {
    return (
        <div className="font-sans w-full p-4 rounded-xl shadow-md border border-gray-200/60 bg-white transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Image Section */}
                <div className="flex-shrink-0 flex justify-center lg:justify-start">
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24">
                        <Image
                            src={mathsSub}
                            alt="Mathematics Subject"
                            fill
                            className="object-contain rounded-lg"
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col lg:flex-row gap-4">
                    {/* Main Content */}
                    <div className="flex-1 space-y-3">
                        {/* Subject Title */}
                        <h2 className="font-bold text-gray-900 text-lg lg:text-xl leading-tight">
                            Mathematics - Advanced - Grade 10
                        </h2>

                        {/* Level and Grade badges */}
                        <div className="flex flex-wrap gap-2">
                            <span className="relative bg-gradient-to-br from-[#1CA672] to-[#0A9C9D] rounded-full p-px">
                                <span className="block bg-white text-gray-700 font-semibold px-3 py-1.5 text-xs rounded-full transition-colors duration-200 hover:bg-gray-50 cursor-pointer">
                                    Advanced
                                </span>
                            </span>
                            <span className="relative bg-gradient-to-br from-[#1CA672] to-[#0A9C9D] rounded-full p-px">
                                <span className="block bg-white text-gray-700 font-semibold px-3 py-1.5 text-xs rounded-full transition-colors duration-200 hover:bg-gray-50 cursor-pointer">
                                    Grade 10
                                </span>
                            </span>
                        </div>

                        {/* Teacher and Duration */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs lg:text-sm">
                            <div className="flex items-center gap-1.5">
                                <div className="relative w-4 h-4">
                                    <Image
                                        src={teacher}
                                        alt="Teacher icon"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-gray-800 font-medium">Teacher:</span>
                                <span className="text-gray-500 font-semibold">French Fries</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="relative w-4 h-4">
                                    <Image
                                        src={time}
                                        alt="Duration icon"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-gray-800 font-medium">Duration:</span>
                                <span className="text-gray-500 font-semibold">6 months</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="flex flex-col sm:flex-row lg:flex-col justify-between lg:justify-start gap-4 lg:gap-3 lg:text-right lg:items-end">
                        {/* Rating */}
                        <div className="flex items-center gap-1.5 lg:justify-end">
                            <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                                Subject Rating:
                            </span>
                            <div className="flex items-center gap-1">
                                <Image
                                    src={star}
                                    alt="Star rating"
                                    width={16}
                                    height={16}
                                    className="object-contain"
                                />
                                <span className="text-sm font-semibold text-gray-900">4.2/5</span>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="text-center lg:text-right">
                            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-0.5">70%</div>
                            <div className="text-gray-600 text-xs font-medium">Completed</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar with Tailwind Gradient */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div 
                    className="h-2 rounded-full bg-gradient-to-r from-[#FFB300] to-[#FFE600] w-[70%]"
                ></div>
            </div>
            
            {/* Lessons Completed Text */}
            <div className="mt-2 text-xs text-gray-600 text-center lg:text-right">
                18 of 24 lessons completed
            </div>
        </div>
    );
};

export default SubjectCard;