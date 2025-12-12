"use client";

import { useEffect, useRef } from 'react';

function PerformanceComparison() {
  const bar1Ref = useRef<HTMLDivElement>(null);
  const bar2Ref = useRef<HTMLDivElement>(null);
  const value1Ref = useRef<HTMLDivElement>(null);
  const value2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bars = [bar1Ref.current, bar2Ref.current].filter(Boolean) as HTMLDivElement[];
    const values = [value1Ref.current, value2Ref.current].filter(Boolean) as HTMLDivElement[];
    
    // Animate bars on mount
    bars.forEach((bar, index) => {
      if (bar) {
        // Reset to initial state
        bar.style.transform = 'scaleY(0)';
        bar.style.opacity = '0';
        
        // Animate in with stagger
        setTimeout(() => {
          bar.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
          bar.style.transform = 'scaleY(1)';
          bar.style.opacity = '1';
        }, index * 200);
      }
    });

    // Animate value indicators
    values.forEach((value, index) => {
      if (value) {
        setTimeout(() => {
          value.style.opacity = '1';
          value.style.transform = 'translate(-50%, 0)';
        }, 800 + (index * 400));
      }
    });

    // Cleanup function to reset animations
    return () => {
      bars.forEach(bar => {
        if (bar) {
          bar.style.transition = '';
          bar.style.transform = '';
          bar.style.opacity = '';
        }
      });
      values.forEach(value => {
        if (value) {
          value.style.transition = '';
          value.style.opacity = '';
          value.style.transform = '';
        }
      });
    };
  }, []);

  // Function to handle hover animations
  const handleBarHover = (bar: HTMLDivElement | null) => {
    if (bar) {
      bar.style.transform = 'scaleY(1.05) translateY(-4px)';
      bar.style.transition = 'all 0.3s ease-out';
    }
  };

  const handleBarLeave = (bar: HTMLDivElement | null) => {
    if (bar) {
      bar.style.transform = 'scaleY(1) translateY(0)';
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-3xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-xl font-bold text-gray-900 ">
          Performance Comparison
        </h2>
      </div>

      {/* Chart Container */}
      <div className="relative">
        {/* Y-axis Labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4 z-10">
          {[100, 75, 50, 25, 0].map((value) => (
            <span
              key={value}
              className="text-xs text-gray-600  min-h-[1px]"
            >
              {value}
            </span>
          ))}
        </div>

        {/* Chart Area */}
        <div className="ml-8 relative h-64">
          {/* Grid Background */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-full h-px bg-gray-200/50"
              />
            ))}
          </div>

          {/* Horizontal Grid Lines */}
          <div className="absolute inset-0 flex justify-between">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-px h-full bg-gray-200/50"
              />
            ))}
          </div>

          {/* Bars Container */}
          <div className="relative h-full flex items-end justify-center gap-16 px-8">
            {/* Your Score Bar */}
            <div className="flex flex-col items-center w-20">
              <div className="relative w-16">
                {/* Bar with gradient and animation */}
                <div
                  ref={bar1Ref}
                  onMouseEnter={() => handleBarHover(bar1Ref.current)}
                  onMouseLeave={() => handleBarLeave(bar1Ref.current)}
                  className="w-16 h-40 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg shadow-sm relative overflow-hidden cursor-pointer transform origin-bottom"
                  style={{
                    transform: 'scaleY(0)',
                    opacity: 0,
                  }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-y-0 left-0 w-8 bg-white/20 shine-animation" />
                  
                  {/* Top cap */}
                  <div className="absolute top-0 left-0 w-16 h-1 bg-green-600" />
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-1 h-1 bg-white/30 rounded-full float-animation" style={{ top: '20%', left: '30%' }} />
                    <div className="absolute w-1 h-1 bg-white/30 rounded-full float-animation-delayed" style={{ top: '60%', left: '70%' }} />
                  </div>
                </div>
                
                {/* Value indicator with animation */}
                <div 
                  ref={value1Ref}
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-md shadow-sm value-indicator"
                  style={{
                    opacity: 0,
                    transform: 'translate(-50%, 10px)',
                  }}
                >
                  72
                </div>
              </div>
            </div>

            {/* Average Score Bar */}
            <div className="flex flex-col items-center w-20">
              <div className="relative w-16">
                {/* Bar with gradient and animation */}
                <div
                  ref={bar2Ref}
                  onMouseEnter={() => handleBarHover(bar2Ref.current)}
                  onMouseLeave={() => handleBarLeave(bar2Ref.current)}
                  className="w-16 h-28 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-lg shadow-sm relative overflow-hidden cursor-pointer transform origin-bottom"
                  style={{
                    transform: 'scaleY(0)',
                    opacity: 0,
                  }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-y-0 left-0 w-8 bg-white/20 shine-animation-delayed" />
                  
                  {/* Top cap */}
                  <div className="absolute top-0 left-0 w-16 h-1 bg-yellow-600" />
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-1 h-1 bg-white/30 rounded-full float-animation" style={{ top: '30%', left: '40%' }} />
                    <div className="absolute w-1 h-1 bg-white/30 rounded-full float-animation-delayed" style={{ top: '70%', left: '60%' }} />
                  </div>
                </div>
                
                {/* Value indicator with animation */}
                <div 
                  ref={value2Ref}
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md shadow-sm value-indicator-delayed"
                  style={{
                    opacity: 0,
                    transform: 'translate(-50%, 10px)',
                  }}
                >
                  46
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="mt-4 flex justify-center gap-20 px-30">
        <div className="w-full text-center">
          <span className="text-base font-bold text-gray-700 ">
            Your Score
          </span>
        </div>
        <div className="w-full text-center">
          <span className="text-base font-bold text-gray-700">
            Average Score
          </span>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .shine-animation {
          animation: shine 2s ease-in-out infinite;
        }
        
        .shine-animation-delayed {
          animation: shine 2s ease-in-out infinite 0.5s;
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        .float-animation-delayed {
          animation: float 3s ease-in-out infinite 1s;
        }
        
        .value-indicator {
          transition: all 0.5s ease-out 0.8s;
        }
        
        .value-indicator-delayed {
          transition: all 0.5s ease-out 1.2s;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-8px) scale(1.2); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

export default PerformanceComparison;
