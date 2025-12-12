import React from 'react';
import playIcon from "@/assets/playIcon.svg";
import lockIcon from "@/assets/lock.svg";
import Image from 'next/image';

// Define types for our data
interface Topic {
    name: string;
    duration: string;
    isCompleted: boolean;
}

interface Module {
    title: string;
    duration: string;
    topics: Topic[];
    completedLessons?: number;
    totalLessons?: number;
    isCompleted?: boolean;
}

const CourseModule = () => {
    const modules: Module[] = [
        {
            title: "Quadratic Equations",
            duration: "2 weeks",
            topics: [
                { name: "Introduction to Quadratic Equations", duration: "25 min", isCompleted: true },
                { name: "Factoring Quadratics", duration: "30 min", isCompleted: true },
                { name: "Quadratic Formula", duration: "35 min", isCompleted: true },
                { name: "Completing the Square", duration: "28 min", isCompleted: false },
                { name: "Graphing Parabolas", duration: "40 min", isCompleted: false },
                { name: "Applications & Word Problems", duration: "45 min", isCompleted: false } // Last topic not completed
            ]
        },
        {
            title: "Trigonometry Basics",
            duration: "9 weeks",
            topics: [
                { name: "Understanding Angles", duration: "48 min", isCompleted: false },
                { name: "Sine, Cosine, and Tangent", duration: "48 min", isCompleted: false },
                { name: "Unit Circle Introduction", duration: "48 min", isCompleted: false },
                { name: "Trigonometric Identities", duration: "48 min", isCompleted: false },
                { name: "Solving Trigonometric Equations", duration: "48 min", isCompleted: false },
                { name: "Law of Sines and Cosines", duration: "48 min", isCompleted: false },
                { name: "Trigonometry Applications", duration: "48 min", isCompleted: false }
            ]
        }
    ];

    // Calculate completed lessons for each module and determine if module is completed
    const modulesWithLessons = modules.map((module, index) => {
        const completedLessons = module.topics.filter(topic => topic.isCompleted).length;
        const totalLessons = module.topics.length;
        const isModuleCompleted = completedLessons === totalLessons;
        
        // Check if previous module exists and is completed
        const previousModule = index > 0 ? modules[index - 1] : null;
        const isPreviousModuleCompleted = previousModule ? 
            previousModule.topics.filter(topic => topic.isCompleted).length === previousModule.topics.length : 
            true; // First module is always accessible

        return {
            ...module,
            completedLessons,
            totalLessons,
            lessons: `${completedLessons}/${totalLessons}`,
            isCompleted: isModuleCompleted,
            isPreviousModuleCompleted
        };
    });

    // Function to check if topic is accessible based on previous topic and previous module
    const isTopicAccessible = (currentModule: Module, currentModuleIndex: number, topics: Topic[], currentIndex: number): boolean => {
        // First topic of first module is always accessible
        if (currentModuleIndex === 0 && currentIndex === 0) return true;

        // For first topic of subsequent modules, check if previous module is completed
        if (currentIndex === 0) {
            const previousModule = modulesWithLessons[currentModuleIndex - 1];
            return previousModule.isCompleted || false;
        }

        // For other topics, check if previous topic in the same module is completed
        return topics[currentIndex - 1].isCompleted;
    };

    return (
        <div className="font-sans w-full space-y-4 sm:space-y-6 lg:space-y-8 py-4 sm:py-6 lg:py-8 px-2 sm:px-0">
            {modulesWithLessons.map((module, moduleIndex) => (
                <div 
                    key={moduleIndex} 
                    className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg sm:shadow-xl border border-gray-200/60 relative transition-all duration-300"
                >
                    {/* Module Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start lg:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4 relative z-10">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 lg:gap-4 flex-wrap">
                            <h3 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight">
                                {module.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200 whitespace-nowrap">
                                    {module.lessons} lessons
                                </span>
                                {moduleIndex > 0 && !module.isPreviousModuleCompleted && (
                                    <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-1 rounded-full border border-red-200 whitespace-nowrap">
                                        Complete previous module
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {/* Module duration at the end */}
                        <div className="flex items-center gap-1 sm:gap-2 bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200 mt-2 sm:mt-0 self-start sm:self-auto">
                            <span className="text-xs font-medium whitespace-nowrap">{module.duration}</span>
                        </div>
                    </div>

                    {/* Topics List - Compact Layout */}
                    <div className="relative z-10">
                        <div className="grid gap-2 sm:gap-3">
                            {module.topics.map((topic, topicIndex) => {
                                const isAccessible = isTopicAccessible(module, moduleIndex, module.topics, topicIndex);
                                const isLocked = !topic.isCompleted && !isAccessible;

                                return (
                                    <div 
                                        key={topicIndex} 
                                        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 cursor-pointer group border ${
                                            topic.isCompleted 
                                                ? 'bg-green-50 border-green-300 shadow-sm' 
                                                : isLocked
                                                    ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
                                                    : 'bg-purple-50 border-gray-200 hover:bg-purple-50 hover:border-purple-300 hover:shadow-md'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-inner ${
                                                topic.isCompleted 
                                                    ? 'bg-[#0A9C9D] shadow-green-200' 
                                                    : isLocked
                                                        ? 'bg-gray-400 shadow-gray-300 cursor-not-allowed'
                                                        : 'bg-purple-200 group-hover:bg-purple-500 group-hover:shadow-lg'
                                            }`}>
                                                {topic.isCompleted ? (
                                                    <div className="flex-shrink-0 w-3 h-3 rounded-full flex items-center justify-center">
                                                        <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                ) : isLocked ? (
                                                    <Image
                                                        src={lockIcon}
                                                        alt="Locked"
                                                        width={10}
                                                        height={10}
                                                        className="object-contain filter brightness-0 invert opacity-80"
                                                    />
                                                ) : (
                                                    <Image
                                                        src={playIcon}
                                                        alt="Play"
                                                        width={10}
                                                        height={10}
                                                        className="object-contain ml-0.5 transition-transform duration-300 group-hover:scale-110 filter brightness-0 invert"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col">
                                                    <span className={`font-medium transition-colors duration-200 truncate text-sm ${
                                                        topic.isCompleted 
                                                            ? 'text-green-800 line-through' 
                                                            : isLocked
                                                                ? 'text-gray-500'
                                                                : 'text-gray-800 group-hover:text-purple-800'
                                                    }`}>
                                                        {topic.name}
                                                        {isLocked && topicIndex === 0 && moduleIndex > 0 && (
                                                            <span className="text-xs text-gray-400 ml-1 hidden xs:inline">
                                                                (Complete previous module)
                                                            </span>
                                                        )}
                                                        {isLocked && topicIndex > 0 && (
                                                            <span className="text-xs text-gray-400 ml-1 hidden xs:inline">
                                                                (Complete previous topic)
                                                            </span>
                                                        )}
                                                    </span>
                                                    {/* Time below topic name */}
                                                    <div className="flex items-center gap-1 mt-0.5">
                                                        <span className={`text-xs font-medium ${
                                                            topic.isCompleted 
                                                                ? 'text-green-700' 
                                                                : isLocked
                                                                    ? 'text-gray-400'
                                                                    : 'text-gray-600 group-hover:text-purple-700'
                                                        }`}>
                                                            {topic.duration}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseModule;