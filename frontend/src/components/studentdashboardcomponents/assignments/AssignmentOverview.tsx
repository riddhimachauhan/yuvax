import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Icons - in a real app, you'd have different icons for each category
import brainIcon from "@/assets/Course.svg";
import mathIcon from "@/assets/Course.svg";
import bookIcon from "@/assets/Course.svg";
import scienceIcon from "@/assets/Course.svg";
import historyIcon from "@/assets/Course.svg";
import artIcon from "@/assets/Course.svg";

interface AssignmentCardProps {
    title: string;
    subtitle: string;
    completedStudents: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    difficultyLabel: string;
    xp: number;
    rating: number;
    icon: string;
    bgColor: string;
    images: {
        main: string;
        overlay1?: string;
        overlay2?: string;
        smallIcon?: string;
    };
}

// Enhanced difficulty configuration
const DIFFICULTY_CONFIG = {
    beginner: {
        style: 'bg-green-100 border border-green-200 text-green-800',
        icon: '🟢'
    },
    intermediate: {
        style: 'bg-amber-100 border border-amber-200 text-amber-800',
        icon: '🟡'
    },
    advanced: {
        style: 'bg-orange-100 border border-orange-200 text-orange-800',
        icon: '🟠'
    },
    expert: {
        style: 'bg-red-100 border border-red-200 text-red-800',
        icon: '🔴'
    }
};

// Memoized card component with enhanced visuals and interactions
const AssignmentCard: React.FC<AssignmentCardProps> = React.memo(({
    title,
    subtitle,
    completedStudents,
    category,
    difficulty,
    difficultyLabel,
    xp,
    rating,
    bgColor,
    images
}) => {
    const difficultyConfig = DIFFICULTY_CONFIG[difficulty];

    // Format large numbers with commas
    const formatNumber = (num: string) => {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="group relative w-full max-w-xs bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            {/* Enhanced gradient background with animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Header with reduced height */}
            <div className={`relative h-32 ${bgColor} overflow-hidden`}>
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

                {/* Floating main icon with smaller size */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-lg border border-white/30 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
                        <Image
                            src={images.main}
                            alt={title}
                            width={24}
                            height={24}
                            className="relative z-10 drop-shadow-lg filter brightness-110"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Enhanced rating badge - smaller */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-lg inline-flex items-center gap-1 shadow-lg border border-white/20">
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-xs">⭐</span>
                        <span className="text-zinc-800 text-xs font-bold ">
                            {rating}
                        </span>
                    </div>
                </div>

                {/* Category badge in top-left - smaller */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/20 backdrop-blur-sm rounded-md border border-white/20">
                    <div className="text-white text-xs font-semibold ">
                        {category}
                    </div>
                </div>
            </div>

            {/* Enhanced content section with reduced padding */}
            <div className="relative p-4 space-y-3">
                {/* Tags row with improved spacing */}
                <div className="flex items-center gap-2 flex-wrap">
                    {/* Difficulty badge with icon - smaller */}
                    <div className={`px-2 py-1 rounded-md flex items-center gap-1 ${difficultyConfig.style}`}>
                        <span className="text-xs">{difficultyConfig.icon}</span>
                        <span className="text-xs font-bold ">
                            {difficultyLabel}
                        </span>
                    </div>

                    {/* XP badge with enhanced gradient - smaller */}
                    <div className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-md flex items-center shadow-sm">
                        <div className="text-zinc-900 text-xs font-bold  flex items-center gap-1">
                            <span className="text-xs">🏆</span>
                            {xp} XP
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="relative group/title">
                        <h3
                            className="text-zinc-900 text-base font-bold  leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 truncate"
                        >
                            {title}
                        </h3>
                    </div>
                    <div className="">
                        <p
                            className="text-stone-600 text-xs font-normal  leading-relaxed line-clamp-2 truncate"
                            title={subtitle}
                        >
                            {subtitle}
                        </p>
                    </div>
                </div>
                {/* Students completed with enhanced styling */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-stone-500 text-xs">
                        <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            {formatNumber(completedStudents)} students completed
                        </span>
                    </div>
                </div>

                {/* Enhanced CTA Button - smaller */}
                <Link
                    href={`/dashboard/assignments-details`}
                    className="block w-full"
                    prefetch={false}
                >
                    <div className="relative w-full h-10 px-4 bg-gradient-to-r from-gray-900 to-black rounded-xl inline-flex justify-between items-center overflow-hidden cursor-pointer group/btn hover:from-gray-800 hover:to-gray-900 transition-all duration-300 active:scale-[0.98] shadow-md">
                        {/* Background shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>

                        <div className="text-white text-xs font-bold  leading-snug relative z-10">
                            View details
                        </div>

                    </div>
                </Link>
            </div>
        </div>
    );
});

AssignmentCard.displayName = 'AssignmentCard';

// Enhanced gradient colors with better visual appeal
const GRADIENT_COLORS = [
    "bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500",
    "bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500",
    "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500",
    "bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-500",
    "bg-gradient-to-br from-rose-500 via-pink-600 to-red-500",
    "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500",
];

// Category icons mapping
const CATEGORY_ICONS = {
    brain: brainIcon,
    math: mathIcon,
    book: bookIcon,
    science: scienceIcon,
    history: historyIcon,
    art: artIcon,
    general: brainIcon
};

// Enhanced data with more variety
const ASSIGNMENTS_DATA = [
    {
        title: "Game Development Fundamentals",
        subtitle: "Master game mechanics, level design, and interactive storytelling",
        completedStudents: "12543",
        category: "Programming",
        difficulty: "advanced" as const,
        difficultyLabel: "Advanced",
        xp: 350,
        rating: 4.8,
        icon: CATEGORY_ICONS.brain,
        images: { main: brainIcon }
    },
    {
        title: "Mathematical Problem Solving",
        subtitle: "Advanced algebra, calculus, and logical reasoning challenges",
        completedStudents: "8921",
        category: "Mathematics",
        difficulty: "intermediate" as const,
        difficultyLabel: "Intermediate",
        xp: 280,
        rating: 4.6,
        icon: CATEGORY_ICONS.math,
        images: { main: mathIcon }
    },
    {
        title: "Creative Writing Workshop",
        subtitle: "Develop storytelling skills and narrative techniques",
        completedStudents: "7432",
        category: "Language Arts",
        difficulty: "beginner" as const,
        difficultyLabel: "Beginner",
        xp: 180,
        rating: 4.7,
        icon: CATEGORY_ICONS.book,
        images: { main: bookIcon }
    },
    {
        title: "Scientific Discovery Lab",
        subtitle: "Hands-on experiments and scientific methodology",
        completedStudents: "15234",
        category: "Science",
        difficulty: "intermediate" as const,
        difficultyLabel: "Intermediate",
        xp: 320,
        rating: 4.9,
        icon: CATEGORY_ICONS.science,
        images: { main: scienceIcon }
    },
    {
        title: "Historical Analysis",
        subtitle: "Critical examination of historical events and contexts",
        completedStudents: "5678",
        category: "History",
        difficulty: "advanced" as const,
        difficultyLabel: "Advanced",
        xp: 290,
        rating: 4.5,
        icon: CATEGORY_ICONS.history,
        images: { main: historyIcon }
    },
    {
        title: "Digital Art & Design",
        subtitle: "Creative expression through digital mediums and tools",
        completedStudents: "9456",
        category: "Arts",
        difficulty: "expert" as const,
        difficultyLabel: "Expert",
        xp: 400,
        rating: 4.8,
        icon: CATEGORY_ICONS.art,
        images: { main: artIcon }
    }
];

const AssignmentOverview: React.FC = () => {
    const assignmentsWithGradients = useMemo(() =>
        ASSIGNMENTS_DATA.map((assignment, index) => ({
            ...assignment,
            bgColor: GRADIENT_COLORS[index % GRADIENT_COLORS.length]
        }))
        , []);

    return (
        <div className="min-h-screen py-6">
            <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-2">

                {/* Enhanced grid with better responsiveness - now 3 columns on xl screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 gap-4 justify-items-center">
                    {assignmentsWithGradients.map((assignment, index) => (
                        <div
                            key={`${assignment.title}-${index}`}
                            className="w-full transform transition-all duration-300 hover:scale-[1.02]"
                        >
                            <AssignmentCard {...assignment} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default React.memo(AssignmentOverview);