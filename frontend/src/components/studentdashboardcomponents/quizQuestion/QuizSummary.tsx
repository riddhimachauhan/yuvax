"use client"

import React from 'react';

interface QuizSummaryProps {
  currentCategory?: string;
  isCompleted?: boolean;
}

const QuizSummary: React.FC<QuizSummaryProps> = ({ 
  currentCategory = "Science",
  isCompleted = false 
}) => {
  const subjectName = "Science Quiz";
  const level = "Intermediate";
  const totalXP = isCompleted ? 500 : 250;
  const subjectEmoji = "🧮";
  const status = isCompleted ? 'completed' : 'in-progress';
  const statusMessage = isCompleted 
    ? "Excellent work! You've successfully completed this assignment."
    : "Keep going! You're making great progress.";

  const statusConfig = {
    completed: {
      container: 'bg-green-50 border-green-200',
      icon: 'bg-green-600 border-green-600 text-white',
      text: 'text-green-700',
      message: statusMessage
    },
    'in-progress': {
      container: 'bg-green-50 border-green-200',
      icon: 'bg-green-600 border-green-600 text-white',
      text: 'text-green-700',
      message: statusMessage
    }
  } as const;

  const currentStatus = statusConfig[status];

  return (
    <div className="w-full bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-gray-100">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        {/* Subject Title */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">{subjectEmoji}</span>
          <h1 className="text-2xl sm:text-3xl font-normal text-gray-900 ">
            {subjectName}
          </h1>
        </div>
        
        {/* Tags and XP */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Tags Container */}
          <div className="flex flex-wrap gap-2">
            {/* Category Tag */}
            <span className="px-2 py-1 bg-gray-100 rounded-lg text-sm font-semibold text-gray-800 ">
              {currentCategory}
            </span>
            
            {/* Level Tag */}
            <span className="px-2 py-1 bg-amber-100 rounded-lg text-sm font-semibold text-amber-800 ">
              {level}
            </span>
          </div>
          
          {/* XP Badge */}
          <div className="px-3 py-1.5 bg-yellow-400 rounded-lg flex items-center gap-1.5">
            <span className="text-xs font-medium text-gray-900 ">
              🏆 {totalXP} XP
            </span>
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div className={`w-full px-3 py-3 ${currentStatus.container} rounded-xl border flex items-center gap-3`}>
        {/* Status Icon */}
        <div className="flex-shrink-0">
          <div className={`w-5 h-5 rounded-full border-2 ${currentStatus.icon} flex items-center justify-center`}>
            {status === 'completed' && (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {status === 'in-progress' && (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
        </div>
        
        {/* Status Text */}
        <p className={`text-sm font-medium ${currentStatus.text} `}>
          {currentStatus.message}
        </p>
      </div>
    </div>
  );
};

export default QuizSummary;