// EngagementCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import tickIcon from "@/assets/tick.svg";
import { ProgressBarWithStar } from "../../components/CourseProgressCard";
import ClockStreamLineFeather from "@/assets/ClockStreamlineFeather.svg";

const EngagementCard: React.FC = () => {
  // Local state to display dynamic percentage for Participation Level only
  const [participationPct, setParticipationPct] = useState<number>(50);
  // Local state for Interaction Score percentage (top-right of its row)
  const [interactionPct, setInteractionPct] = useState<number>(60);
  return (
    <div className="bg-white rounded-[21px] p-5 w-full">
      {/* Title */}
      <p className="text-gray-800 font-semibold text-2xl mb-5">
        Engagement & Participation
      </p>

      {/* Participation Level */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
          <Image
              src={ClockStreamLineFeather}
              alt="Participation Icon"
              width={18}
              height={18}
              className="object-contain"
            />
            <span className="text-gray-700 text-sm font-medium">
              Participation Level
            </span>
          </div>
          <div
            className="text-sm font-medium px-3 py-1 rounded-md"
            style={{ backgroundColor: "#F0FDF2", color: "#666666" }}
          >
            Medium
          </div>
        </div>
        {/* Progress bar */}
        <ProgressBarWithStar percent={participationPct} onChange={setParticipationPct} />
        <div className="flex justify-start mt-1 text-xs text-gray-500">{participationPct}%</div>
      </div>

      {/* Interaction Score */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
          <Image
              src={ClockStreamLineFeather}
              alt="Interaction Icon"
              width={18}
              height={18}
              className="object-contain"
            />
            <span className="text-gray-700 text-sm font-medium">
              Interaction Score
            </span>
          </div>
          <span className="text-gray-700 text-sm font-medium">{interactionPct}%</span>
        </div>

        {/* Progress bar */}
        <ProgressBarWithStar percent={interactionPct} onChange={setInteractionPct} />
      </div>

      {/* Footer section */}
      <div className="bg-green-50 rounded-lg p-3 flex items-center space-x-2">
      <Image
          src={tickIcon}
          alt="Tick"
          width={20}
          height={20}
          className="object-contain"
        />
        <span className="text-green-700 text-sm font-medium">
          24% Questions asked this month
        </span>
      </div>
    </div>
  );
};

export default EngagementCard;
