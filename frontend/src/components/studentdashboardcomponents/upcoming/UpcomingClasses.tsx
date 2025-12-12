import React from 'react';

interface ClassItem {
  id: number;
  timeInfo: string;
  title: string;
  type: string;
  buttonType: 'join' | 'reschedule';
}

const classes: ClassItem[] = [
  {
    id: 1,
    timeInfo: 'Starting in 15 min',
    title: 'UI/UX Design Class',
    type: '1 on 1 Class',
    buttonType: 'join'
  },
  {
    id: 2,
    timeInfo: '2hr remaining',
    title: 'UI/UX Design Class',
    type: '1 on 1 Class',
    buttonType: 'reschedule'
  },
  {
    id: 3,
    timeInfo: '2hr remaining',
    title: 'UI/UX Design Class',
    type: '1 on 1 Class',
    buttonType: 'reschedule'
  }
];

export default function UpcomingClasses() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 p-5 rounded-3xl bg-white w-full max-w-2xl mx-auto shadow-sm">
      {/* Header */}
      <div className="flex flex-col justify-center items-start gap-1 w-full">
        <div className="flex h-8 justify-between items-center w-full">
          <h2 className="text-[#111111] font-lato text-xl font-bold leading-[150%]">
            Upcoming Classes
          </h2>
          <div className="flex w-7 h-7 px-1 py-1 justify-center items-center rounded-[23px] bg-[#FF0000]">
            <span className="text-white font-lato text-sm font-normal leading-[140%]">
              2
            </span>
          </div>
        </div>
      </div>

      {/* Class Cards */}
      <div className="flex flex-col gap-3 w-full">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 p-3 rounded-xl border border-[#E5E5E5] w-full"
          >
            {/* Class Info */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-1">
                <span className="text-[#666666] font-lato text-[10px] font-normal leading-[150%]">
                  {classItem.timeInfo}
                </span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <h3 className="text-[#333333] font-lato text-[11.5px] font-bold leading-[140%]">
                  {classItem.title}
                </h3>
                <div className="flex items-center gap-1">
                  <span className="text-[#666666] font-lato text-[10px] font-normal leading-[150%]">
                    {classItem.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-col justify-center items-start w-full sm:w-auto">
              {classItem.buttonType === 'join' ? (
                <button className="flex px-1 py-1 justify-center items-center  rounded-lg bg-black w-full sm:w-[100px] hover:bg-gray-800 transition-colors">
                  <span className="text-white font-lato text-xs font-bold leading-[150%]">
                    Join Class
                  </span>
                </button>
              ) : (
                <button className="flex  px-1 py-1 justify-center items-center rounded-lg border border-[#1CA672] w-full sm:w-[100px] hover:bg-[#1CA672]/10 transition-colors">
                  <span className="text-[#1CA672] font-lato text-xs font-bold leading-[150%]">
                    Reschedule
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
