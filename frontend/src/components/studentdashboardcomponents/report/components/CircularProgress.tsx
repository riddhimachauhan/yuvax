// CircularProgress.tsx
import React from 'react';
import Image from 'next/image';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PythonProgramming from '@/assets/PythonProgramming.svg';

interface CircularProgressProps {
  progress: number;
  size?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ progress, size = 120 }) => {
  const data = [
    { name: 'completed', value: progress },
    { name: 'remaining', value: Math.max(0, 100 - progress) }
  ];

  const COLORS: Record<string, string> = {
    completed: 'hsl(188 100% 42%)', // Exact teal from design
    remaining: 'hsl(188 100% 85%)'  // Light teal background
  };

  const innerRadius = size * 0.3;
  const outerRadius = size * 0.45;

  return (
    // Parent div with two stacked children (chart above, label below)
    <div className="flex flex-col items-center">
      {/* Upper div: circular bar with image inside center (image slightly lower) */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={90}
              endAngle={450}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Image placed in the center but nudged slightly downward */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="transform translate-y-2">
            <Image
              src={PythonProgramming}
              alt="Python Programming"
              width={Math.round(size * 0.4)}
              height={Math.round(size * 0.4)}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Lower div: label below the circular bar */}
      <div className="mt-2 text-sm font-semibold text-foreground">
        {progress}% Completed
      </div>
    </div>
  );
};

export default CircularProgress;
