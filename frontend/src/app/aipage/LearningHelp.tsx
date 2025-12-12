"use client";
import React, { useState, useRef } from "react";
import { Camera, Send } from "lucide-react";

export type ProgressData = {
  done: number;
  total: number;
  message?: string;
};

export type LearningHelpProps = {
  title?: string;
  homeworkProgress?: ProgressData;
  homeworkProgressAlt?: ProgressData;
  questionsPercent?: number;
  onSend?: (text: string, file?: File | null) => void;
};

export default function LearningHelp({
  title = "Learning Help",
  homeworkProgress = {
    done: 8,
    total: 10,
    message: "You have 2 math questions pending from homework.",
  },
  homeworkProgressAlt = {
    done: 8,
    total: 10,
    message: "You have 2 math questions pending from homework.",
  },
  questionsPercent = 24,
  onSend,
}: LearningHelpProps) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const progressValue = (p: ProgressData) => {
    if (!p || p.total <= 0) return 0;
    return Math.max(0, Math.min(100, (p.done / p.total) * 100));
  };

  const handleSend = () => {
    if (!text.trim() && !file) return;
    if (onSend) onSend(text.trim(), file);
    setText("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 flex flex-col gap-4 mx-auto shadow-sm h-full">
      {/* Title */}
      <h1 className="text-text-1 font-bold text-xl leading-[150%] font-sans">{title}</h1>

      {/* Homework Progress Section 1 - Gradient Progress Bar */}
      <div className="flex flex-col gap-3 pb-3">
        <div className="flex justify-between items-center">
          <h2 className="text-text-2 font-bold text-base leading-[160%] font-sans  ">
            Homework Progress
          </h2>
          <span className="text-status-success font-bold text-lg leading-[150%] font-sans">
            {homeworkProgress.done}/{homeworkProgress.total}
          </span>
        </div>

        <div className="relative h-[7px] w-full rounded-[8.448px] bg-gradient-to-r from-[rgba(5,206,201,0.30)] to-[rgba(184,222,61,0.30)]">
          <div
            className="absolute left-0 top-0 h-[7px] rounded-[8.448px] bg-gradient-to-r from-[#05CEC9] to-[#B8DE3D]"
            style={{ width: `${progressValue(homeworkProgress)}%` }}
          />
        </div>

        <div className="flex justify-end">
          <p className="text-status-error text-base font-normal leading-[160%]">
            {homeworkProgress.message}
          </p>
        </div>
      </div>

      {/* Homework Progress Section 2 - Blue Progress Bar */}
      <div className="flex flex-col gap-3 pb-3">
        <div className="flex justify-between items-center">
          <h2 className="text-text-2 font-bold text-lg leading-[150%] font-sans">
            Homework Progress
          </h2>
          <span className="text-text-2 font-bold text-lg leading-[150%] font-sans">
            {homeworkProgressAlt.done}/{homeworkProgressAlt.total}
          </span>
        </div>

        <div className="relative h-3 w-full rounded-xl bg-[rgba(0,131,202,0.10)]">
          <div
            className="absolute left-0 top-0 h-3 rounded-xl bg-[#0083CA]"
            style={{ width: `${progressValue(homeworkProgressAlt)}%` }}
          />
        </div>

        <div className="flex justify-end">
          <p className="text-status-error text-base font-normal leading-[160%]">
            {homeworkProgressAlt.message}
          </p>
        </div>
      </div>

      {/* Success Stats Section */}
      <div className="flex items-center gap-3 self-stretch rounded-2xl bg-[#F0FDF2] p-3">
        <div className="flex flex-col">
          <span className="text-text-1 font-bold text-lg leading-[150%] font-sans">
            {questionsPercent}%
          </span>
          <span className="text-text-2 font-bold text-sm leading-[160%] font-sans">
            Questions asked this month
          </span>
        </div>
      </div>

      {/* Input Section */}
      <div className="flex justify-between items-center gap-7 self-stretch rounded-2xl bg-bg-light-gray p-3">
        {/* Editable text area (keeps placeholder behavior) */}
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your question or upload a photo..."
            className="w-full resize-none bg-transparent outline-none text-text-2 text-base leading-[160%] min-h-[48px] font-sans"
            rows={2}
            aria-label="Type your question"
          />
          {file && (
            <div className="mt-2 text-sm text-text-2 flex items-center gap-2 font-sans">
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-xs text-status-error underline ml-2"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Hidden native file input for camera / upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* Camera Icon Button (click opens file picker) */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center rounded-lg p-2 bg-white shadow-sm hover:shadow-md transition-colors"
            aria-label="Upload photo"
            title="Upload photo"
          >
            <Camera className="w-6 h-6 text-gray-600" />
          </button>

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            className="flex items-center justify-center w-[120px] h-[50px] rounded-xl bg-[#E81E25] cursor-pointer hover:bg-[#c91a20] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send question"
            disabled={!text.trim() && !file}
          >
            <Send className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-semibold">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
