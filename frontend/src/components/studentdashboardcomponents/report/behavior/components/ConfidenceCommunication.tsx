"use client";

import React, { useState } from "react";
import {ProgressBarWithStar} from "../../components/CourseProgressCard";

const ConfidenceCommunication: React.FC = () => {
  const [confidencePct, setConfidencePct] = useState<number>(85);
  const [communicationPct, setCommunicationPct] = useState<number>(92);

  return (
    <div className="bg-white shadow-md rounded-xl p-5 w-full h-full">
      <p className="text-gray-800 font-semibold text-2xl mb-5">Confidence & Communication</p>

      {/* Confidence in Class */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            </span>
            <span className="text-gray-700 text-sm font-medium">Confidence in Class</span>
          </div>
          <span className="text-emerald-600 text-sm font-medium">High</span>
        </div>
        <ProgressBarWithStar percent={confidencePct} onChange={setConfidencePct} />
        <div className="flex justify-start mt-1 text-xs text-gray-500">{confidencePct}%</div>
      </div>

      {/* Communication Skills */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            </span>
            <span className="text-gray-700 text-sm font-medium">Communication Skills</span>
          </div>
          <span className="text-gray-700 text-sm font-medium">{communicationPct}%</span>
        </div>
        <ProgressBarWithStar percent={communicationPct} onChange={setCommunicationPct} />
      </div>

      {/* Strength note */}
      <div className="bg-emerald-50 rounded-lg p-3 text-emerald-700 text-sm font-medium">
        Communication Strength — Excellent at asking clarifying questions and expressing thoughts clearly
      </div>
    </div>
  );
};

export default ConfidenceCommunication;
