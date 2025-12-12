"use client";

import React from "react";
import Image from "next/image";
import type { PredictionItem } from "@/lib/types/studentdashboard/types";

import tickIcon from "@/assets/tick.svg";
import pendingIcon from "@/assets/pending.svg";

const predictions: PredictionItem[] = [
  {
    type: "success",
    title: "95% chance of passing Math exam",
    subtitle: "Based on Current progress",
  },
  {
    type: "warning",
    title: "Need 2 more hours of Physics Study",
    subtitle: "To reach target grade",
  },
];

const AIPredictions: React.FC = () => (
  <section className="w-full mx-auto bg-white rounded-3xl p-5 lg:p-6 scroll-smooth">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Predictions</h2>

    <div className="space-y-4">
      {predictions.map((prediction, i) => (
        <div
          key={i}
          className={`p-2 rounded-lg ${
            prediction.type === "success" ? "bg-green-50" : "bg-yellow-50"
          }`}
        >
          {/* Icon + Title in one line */}
          <div className="flex items-center gap-2">
            <Image
              src={prediction.type === "success" ? tickIcon : pendingIcon}
              alt={prediction.type === "success" ? "Success" : "Pending"}
              width={20}
              height={20}
              className="object-conver"
            />
            <h3 className="font-semibold text-gray-900 xl:text-[13px] lg:text-[12px] text-[10px] w-full">
              {prediction.title}
            </h3>
          </div>

          {/* Subtitle below */}
          <p className="text-xs text-gray-600 mt-1 text-center">{prediction.subtitle}</p>
        </div>
      ))}
    </div>
  </section>
);

export default AIPredictions;
