import React from 'react';
import Image from 'next/image';
import calendar from "@/assets/calendar.svg";

interface HomeworkSummaryProps {
  className?: string;
  title?: string;
  subtitle?: string;
  counts?: {
    pending: number;
    inProgress: number;
    completed: number;
    overdue: number;
  };
}

interface StatusCard {
  count: number;
  label: string;
  color: string;
  icon?: string;
}

const AssignmentHomeworkSummary: React.FC<HomeworkSummaryProps> = ({ 
  className = '',
  title = "Homework",
  subtitle = "Track your progress and complete your coursework",
  counts = {
    pending: 3,
    inProgress: 2,
    completed: 2,
    overdue: 1
  }
}) => {
  const { pending, inProgress, completed, overdue } = counts;

  const statusCards: StatusCard[] = [
    { 
      count: pending, 
      label: 'Pending', 
      color: 'text-yellow-600' 
    },
    { 
      count: inProgress, 
      label: 'In Progress', 
      color: 'text-blue-600' 
    },
    { 
      count: completed, 
      label: 'Completed', 
      color: 'text-green-600' 
    },
    { 
      count: overdue, 
      label: 'Overdue', 
      color: 'text-red-500' 
    },
  ];

  return (
    <div className={`self-stretch p-4 bg-white rounded-[20px] flex flex-col justify-start items-start gap-6 ${className}`}>
      {/* Header Section */}
      <div className="self-stretch flex flex-col justify-start items-start gap-1">
        <h3 className="text-zinc-800 text-xl font-bold  leading-loose">
          {title}
        </h3>
        {subtitle && (
          <p className="text-stone-500 text-base font-medium  leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Status Cards Grid */}
      <div className="self-stretch grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statusCards.map((card) => (
          <div 
            key={card.label}
            className="p-4 bg-white rounded-2xl border border-neutral-200 flex justify-between items-center hover:shadow-sm transition-shadow duration-200"
          >
            {/* Text Content */}
            <div className="flex flex-col justify-start items-start">
              <span className={`${card.color} text-2xl font-bold leading-10`}>
                {card.count}
              </span>
              <span className="text-stone-500 text-sm font-medium leading-tight">
                {card.label}
              </span>
            </div>
            
            {/* Icon */}
            <div className="flex-shrink-0 ml-3">
              <Image 
                className="w-12 h-12 md:w-14 md:h-14"
                src={calendar}
                width={56}
                height={56}
                alt={`${card.label} assignments`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentHomeworkSummary;