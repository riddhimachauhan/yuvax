// CourseCard.tsx
import React from 'react';
import Image from 'next/image';
import { CircularProgress as CircularProgressComponent } from './CircularProgress';
import teacherIcon from '@/assets/teacher.svg';
import CardFeature3 from "@/assets/cardFeature3.svg"
import { Star } from 'lucide-react';

interface CourseCardProps {
  title?: string;
  rating?: number;
  ratingCount?: number;
  tags?: string[];
  teacher?: string;
  duration?: string;
  progress?: number;
  avatar?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title = 'Python Programming',
  rating = 4.2,
  ratingCount = 5,
  tags = ['Advance', 'Coding'],
  teacher = 'French Fries',
  duration = '6 months',
  progress = 70,
}) => {
  return (
    <div className="w-full h-full box-border overflow-hidden bg-white rounded-[21px]  p-6 flex items-center justify-between gap-6">
      {/* Left content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
          <span className="flex items-center gap-2">
            <span>Subject Rating:</span>
            <Star aria-hidden="true" className="h-4 w-4 text-yellow-400" fill="currentColor" />
            <strong className="ml-1 text-slate-800">{rating}/{ratingCount}</strong>
          </span>
        </div>

        <p className="text-[24px] font-bold text-[#333333] leading-tight mb-3">{title}</p>

        <div className="flex flex-wrap gap-3 mb-4">
          {tags.map((t) => (
            <span key={t} className="text-sm px-3 py-1.5 border border-teal-300 rounded-full text-teal-700 bg-white/60">{t}</span>
          ))}
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
          <Image
              src={teacherIcon}
              alt="Teacher"
              width={20}
              height={20}
              className="inline-block w-5 h-5"
            />
            <span><span className="text-[16px] font-semibold text-[#666666]">Teacher: </span> <strong className="ml-1 text-[16px] font-medium text-[#999999]">{teacher}</strong></span>
          </div>

          <div className="flex items-center gap-2">
          <Image
              src={CardFeature3}
              alt="time"
              width={20}
              height={20}
              className="inline-block w-5 h-5"
            />
            <span><span className="text-[16px] font-semibold text-[#666666]">Duration: </span> <strong className="ml-1 text-[16px] font-medium text-[#999999]">{duration}</strong></span>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="ml-6">
        <CircularProgressComponent progress={progress ?? 0} />
      </div>
    </div>
  );
};

export default CourseCard;
