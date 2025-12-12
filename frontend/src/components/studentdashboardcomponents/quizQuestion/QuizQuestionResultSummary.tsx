import React from 'react';
import calendar from "@/assets/calendar.svg";
import Image from 'next/image';

interface QuizResultItem {
    title: string;
    value: string;
    subtitle: string;
    color?: string;
    icon?: string;
}

interface QuizResultSummaryProps {
    results?: QuizResultItem[];
    className?: string;
}

const QuizResultSummary: React.FC<QuizResultSummaryProps> = ({
    results,
    className = ""
}) => {
    const defaultResults: QuizResultItem[] = [
        {
            title: "Total Score",
            value: "82%",
            subtitle: "42/50 points",
            color: "text-blue-600",
            icon: calendar
        },
        {
            title: "Grade",
            value: "B+",
            subtitle: "Good only",
            color: "text-green-600",
            icon: calendar
        },
        {
            title: "Time Taken",
            value: "38 min",
            subtitle: "out of 60 min",
            color: "text-purple-600",
            icon: calendar
        }
    ];

    const displayResults = results || defaultResults;

    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
            {displayResults.map((result, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl border border-neutral-200 p-6 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                    <div className="flex flex-col gap-2">
                        <h3 className="text-zinc-800 text-base font-bold leading-relaxed">
                            {result.title}
                        </h3>
                        <div className="flex flex-col gap-1">
                            <span className={`${result.color || 'text-gray-800'} text-2xl font-bold leading-10`}>
                                {result.value}
                            </span>
                            <p className="text-stone-500 text-sm font-medium leading-none">
                                {result.subtitle}
                            </p>
                        </div>
                    </div>
                    {result.icon && (
                        <Image
                            src={calendar}
                            alt={calendar}
                            width={80}
                            height={80}
                                loading="lazy"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default QuizResultSummary;