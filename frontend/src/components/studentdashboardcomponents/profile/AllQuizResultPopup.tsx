"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import QuestionsDetailPopup from "./QuestionsDetailPopup";

interface QuizResult {
  id: number;
  quizName: string;
  subject: string;
  date: string;
  marks: number;
  totalMarks: number;
  time: string;
  result: string;
  status: "Passed" | "Failed";
}

const quizResults: QuizResult[] = [
  {
    id: 1,
    quizName: "Algebra Fundamentals",
    subject: "Mathematics",
    date: "10/10/2024",
    marks: 85,
    totalMarks: 100,
    time: "25 min",
    result: "17/20",
    status: "Passed",
  },
  {
    id: 2,
    quizName: "Algebra Fundamentals",
    subject: "Mathematics",
    date: "10/10/2024",
    marks: 85,
    totalMarks: 100,
    time: "25 min",
    result: "17/20",
    status: "Passed",
  },
  {
    id: 3,
    quizName: "Chemical Reactions",
    subject: "Chemistry",
    date: "10/10/2024",
    marks: 85,
    totalMarks: 100,
    time: "25 min",
    result: "25 min",
    status: "Failed",
  },
  {
    id: 4,
    quizName: "Algebra Fundamentals",
    subject: "Mathematics",
    date: "10/10/2024",
    marks: 85,
    totalMarks: 100,
    time: "25 min",
    result: "17/20",
    status: "Passed",
  },
  {
    id: 5,
    quizName: "Algebra Fundamentals",
    subject: "Mathematics",
    date: "10/10/2024",
    marks: 85,
    totalMarks: 100,
    time: "25 min",
    result: "17/20",
    status: "Passed",
  },
  {
    id: 6,
    quizName: "Algebra Fundamentals",
    subject: "Mathematics",
    date: "10/10/2024",
    marks: 85,
    totalMarks: 100,
    time: "25 min",
    result: "17/20",
    status: "Passed",
  },
  {
    id: 7,
    quizName: "Algebra Fundamentals",
    subject: "Mathematics",
    date: "10/10/2024",
    marks: 85,
    totalMarks: 100,
    time: "25 min",
    result: "17/20",
    status: "Passed",
  },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AllQuizResultPopup({ open, onClose }: Props) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop closes popup */}
      <button aria-label="Close popup" onClick={onClose} className="absolute inset-0 bg-black/50" />

      {/* Modal Card - matches the provided image styling */}
      <div id="all-quiz-results" className="relative w-[95%] max-w-5xl rounded-[21px] bg-[#EDEDED] p-3 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="rounded-[18px] bg-white p-4 sm:p-5 lg:p-6 border border-[#E2E2E2]">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl sm:text-2xl font-bold text-[#333] font-lato">All Quiz Results</p>
            <button
              aria-label="Close"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6 text-[#333C41]" strokeWidth={1.5} />
            </button>
          </div>

          {/* Table */}
          <div className="flex flex-col gap-4">
            {/* Headers (desktop) */}
            <div className="hidden lg:grid lg:grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.2fr_1.2fr_1.2fr] gap-4 px-6 sm:px-10 py-4 border-b border-[#DADADA] bg-white">
              <div className="text-zinc-800 font-poppins text-base font-medium">Quiz Name</div>
              <div className="text-zinc-800 font-poppins text-base font-medium">Subject</div>
              <div className="text-zinc-800 font-poppins text-base font-medium">Date</div>
              <div className="text-zinc-800 font-poppins text-base font-medium">Marks</div>
              <div className="text-zinc-800 font-poppins text-base font-medium">Time</div>
              <div className="text-zinc-800 font-poppins text-base font-medium">Result</div>
              <div className="text-zinc-800 font-poppins text-base font-normal">Status</div>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-3  h-full ">
              {quizResults.map((quiz) => (
                <div
                  key={quiz.id}
                  className={`rounded-lg transition-all ${
                    quiz.status === "Passed" ? "bg-[rgba(239,255,249,0.48)]" : "bg-[rgba(255,245,245,0.56)]"
                  }`}
                  style={{ boxShadow: "0 0 6.1px 0 rgba(0, 0, 0, 0.09)" }}
                >
                  <Link
                    href="#questions-detail"
                    onClick={(e) => {
                      e.preventDefault();
                      setDetailsOpen(true);
                    }}
                    className="grid grid-cols-1 lg:grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.2fr_1.2fr_1.2fr] gap-2 lg:gap-4 px-4 sm:px-10 py-5 lg:py-6 "
                  >
                    {/* Quiz Name */}
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Quiz Name</span>
                      <span className="text-sm text-[#333] font-lato">{quiz.quizName}</span>
                    </div>
                    {/* Subject */}
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Subject</span>
                      <span className="text-sm text-[#333] font-lato">{quiz.subject}</span>
                    </div>
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Date</span>
                      <span className="text-sm text-[#333] font-lato">{quiz.date}</span>
                    </div>

                    {/* Marks */}
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Marks</span>
                      <div className="flex items-end gap-1">
                        <span className="text-base text-[#666] font-lato font-bold">{quiz.marks}%</span>
                        <span className="text-[13px] text-[#999] font-lato">({quiz.marks}/{quiz.totalMarks})</span>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Time</span>
                      <span className="text-base text-[#333] font-lato font-bold">{quiz.time}</span>
                    </div>

                    {/* Result */}
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Result</span>
                      <span className="text-base text-[#333] font-lato font-bold">{quiz.result}</span>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Status</span>
                      <div
                        className={`inline-flex px-2 py-1 rounded-md w-fit opacity-80 ${
                          quiz.status === "Passed"
                            ? "bg-[rgba(28,166,114,0.1)] text-[#1CA672]"
                            : "bg-[rgba(220,53,69,0.1)] text-[#DC3545]"
                        }`}
                      >
                        <span className="text-base font-poppins">{quiz.status}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {detailsOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center">
          {/* Backdrop for details popup */}
          <button
            aria-label="Close detailed questions"
            onClick={() => setDetailsOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="relative">
            <QuestionsDetailPopup onClose={() => setDetailsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
