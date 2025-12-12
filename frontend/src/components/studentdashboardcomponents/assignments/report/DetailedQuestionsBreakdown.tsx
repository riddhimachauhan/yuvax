import React from 'react';
import rightIcon from "@/assets/RightArrow.svg";
import Image from 'next/image';

interface QuestionRow {
    id: number;
    question: string;
    yourAnswer: string;
    correctAnswer: string;
    marks: string;
    status: 'Correct' | 'Incorrect' | 'Skipped';
}

interface DetailedQuestionBreakdownProps {
    questions?: QuestionRow[];
    className?: string;
}

const DetailedQuestionBreakdown: React.FC<DetailedQuestionBreakdownProps> = ({
    questions = [
        {
            id: 1,
            question: "Find the derivative of f(x)= 3x + 2x = 5",
            yourAnswer: "8",
            correctAnswer: "8",
            marks: "5/5",
            status: "Correct"
        },
        {
            id: 2,
            question: "Find the derivative of f(x)= 3x + 2x = 5",
            yourAnswer: "not answered",
            correctAnswer: "8",
            marks: "0/5",
            status: "Skipped"
        },
        {
            id: 3,
            question: "Find the derivative of f(x)= 3x + 2x = 5",
            yourAnswer: "2",
            correctAnswer: "8",
            marks: "0/5",
            status: "Incorrect"
        }
    ],
    className = '',
}) => {
    const getStatusConfig = (status: string) => {
        const config = {
            Correct: {
                bg: 'bg-emerald-50',
                text: 'text-emerald-700',
                border: 'border-emerald-200'
            },
            Incorrect: {
                bg: 'bg-red-50',
                text: 'text-red-700',
                border: 'border-red-200'
            },
            Skipped: {
                bg: 'bg-amber-50',
                text: 'text-amber-700',
                border: 'border-amber-200'
            }
        };

        return config[status as keyof typeof config] || {
            bg: 'bg-gray-100',
            text: 'text-gray-600',
            border: 'border-gray-200'
        };
    };

    return (
        <div className={className}>
            <div className="w-full max-w-full p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        Detailed Question Breakdown
                    </h2>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 group self-start sm:self-auto">
                        View All
                        <Image
                            src={rightIcon}
                            alt='icon'
                            className="w-5 h-5"
                            width={20}
                            height={20}
                        />
                    </button>
                    
                </div>

                {/* Table Container */}
                <div className="overflow-hidden rounded-lg border border-gray-200">
                    <div className="overflow-x-auto">
                        {/* Table - Responsive width */}
                        <div className="w-full min-w-0">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-2 sm:gap-4 bg-gray-50 px-3 sm:px-6 py-3 border-b border-gray-200 min-w-[800px]">
                                <div className="col-span-2 sm:col-span-1 text-xs sm:text-sm font-semibold text-gray-900  tracking-wide">
                                    S.No
                                </div>
                                <div className="col-span-10 sm:col-span-4 text-xs sm:text-sm font-semibold text-gray-900  tracking-wide">
                                    Questions
                                </div>
                                <div className="col-span-6 sm:col-span-2 text-xs sm:text-sm font-semibold text-gray-900  tracking-wide">
                                    Your Answer
                                </div>
                                <div className="col-span-6 sm:col-span-2 text-xs sm:text-sm font-semibold text-gray-900  tracking-wide">
                                    Correct Answer
                                </div>
                                <div className="col-span-4 sm:col-span-1 text-xs sm:text-sm font-semibold text-gray-900  tracking-wide">
                                    Marks
                                </div>
                                <div className="col-span-8 sm:col-span-2 text-xs sm:text-sm font-semibold text-gray-900  tracking-wide">
                                    Status
                                </div>
                            </div>

                            {/* Table Body */}
                            <div className="min-w-[800px]">
                                {questions.map((question) => {
                                    const statusConfig = getStatusConfig(question.status);

                                    return (
                                        <div
                                            key={question.id}
                                            className="grid grid-cols-12 gap-2 sm:gap-4 px-3 sm:px-6 py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            {/* S.NO */}
                                            <div className="col-span-2 sm:col-span-1 flex items-center text-sm font-medium text-gray-600">
                                                #{question.id}
                                            </div>

                                            {/* Question */}
                                            <div className="col-span-10 sm:col-span-4 flex items-center">
                                                <p className="text-sm text-gray-900 line-clamp-2 leading-relaxed break-words">
                                                    {question.question}
                                                </p>
                                            </div>

                                            {/* Your Answer */}
                                            <div className="col-span-6 sm:col-span-2 flex items-center">
                                                <span className="text-sm text-gray-700 font-medium break-words max-w-full">
                                                    {question.yourAnswer}
                                                </span>
                                            </div>

                                            {/* Correct Answer */}
                                            <div className="col-span-6 sm:col-span-2 flex items-center">
                                                <span className="text-sm text-gray-700 font-medium break-words max-w-full">
                                                    {question.correctAnswer}
                                                </span>
                                            </div>

                                            {/* Marks */}
                                            <div className="col-span-4 sm:col-span-1 flex items-center">
                                                <span className="text-sm font-semibold text-emerald-600 whitespace-nowrap">
                                                    {question.marks}
                                                </span>
                                            </div>

                                            {/* Status */}
                                            <div className="col-span-8 sm:col-span-2 flex items-center">
                                                <span
                                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} whitespace-nowrap`}
                                                >
                                                    {question.status}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedQuestionBreakdown;