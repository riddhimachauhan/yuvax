import tiltTime from "@/assets/tiltTime.svg";
import attemptReload from "@/assets/attempt_load.svg";
import target from "@/assets/targetSuccess.svg";
import Image from 'next/image';
import { CircleCheck } from "lucide-react";

function ReportCardOverview() {
    const reportData = {
        score: 85,
        totalMarks: 100,
        percentage: "85%",
        grade: "B+",
        rating: "Excellent",
        timeTaken: "45min",
        attemptsUsed: "1 of 2",
        successRate: "87%",
        message: "Excellent work! You've successfully completed this assignment.",
        statistics: [
            {
                id: 1,
                label: "Time Taken:",
                value: "45min",
                image: tiltTime
            },
            {
                id: 2,
                label: "Attempts Used:",
                value: "1 of 2",
                image: attemptReload
            },
            {
                id: 3,
                label: "Success Rate:",
                value: "87%",
                image: target
            }
        ]
    };

  

    interface StatItemProps {
        label: string;
        value: string;
        image: string;
    }

    // Compact StatItem with different images
    const StatItem = ({ label, value, image }: StatItemProps) => {
        return (
            <div className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6">
                        <Image
                            src={image}
                            alt={label}
                            className="w-5 h-5"
                            width={20}
                            height={20}
                        />
                    </div>
                    <span className="text-base font-medium text-gray-600">
                        {label}
                    </span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                    {value}
                </span>
            </div>
        );
    };

    return (
        <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1 space-y-4">
                    <div className="text-center space-y-3">
                        <div className="flex flex-col items-center space-y-2">

                            <div className="space-y-1">
                                <div className="text-3xl font-bold text-emerald-600">
                                    {reportData.percentage}
                                </div>
                                <div className="text-lg font-medium text-gray-600">
                                    {reportData.score} out of {reportData.totalMarks} marks
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-2">
                            <div className="flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-300 rounded-2xl">

                                <span className="text-xs font-medium text-gray-900">
                                    Grade {reportData.grade}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-500 rounded-2xl">

                                <span className="text-xs font-medium text-emerald-600">
                                    {reportData.rating}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start gap-2">
                           <CircleCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />                           
                           <p className="text-xs font-medium text-emerald-600 leading-relaxed">
                                {reportData.message}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 max-w-sm space-y-3">
                    {reportData.statistics.map((stat) => (
                        <StatItem
                            key={stat.id}
                            label={stat.label}
                            value={stat.value}
                            image={stat.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReportCardOverview;