"use client";

import React from "react";

type QuestionStatus = "correct" | "skipped" | "incorrect";

type Question = {
  id: number;
  title: string;
  question: string;
  yourAnswer: string;
  correctAnswer?: string | null;
  status: QuestionStatus;
  points?: string; // e.g. "5/5 pts"
  bgColor: string;
};


const sampleQuestions: Question[] = [
  {
    id: 1,
    title: "#1",
    question: "Find the derivate of f(x)= 3x + 2x = 5",
    yourAnswer: "8",
    correctAnswer: "8",
    status: "correct",
    points: "5/5 pts",
    bgColor: "#F8FFFD",
  },
  {
    id: 2,
    title: "#2",
    question: "Find the derivate of f(x)= 3x + 2x = 5",
    yourAnswer: "8",
    correctAnswer: null,
    status: "skipped",
    bgColor: "#FFFCF7",
  },
  {
    id: 3,
    title: "#3",
    question: "Find the derivate of f(x)= 3x + 2x = 5",
    yourAnswer: "8",
    correctAnswer: "8",
    status: "correct",
    points: "5/5 pts",
    bgColor: "#F8FFFD",
  },
  {
    id: 4,
    title: "#4",
    question: "Find the derivate of f(x)= 3x + 2x = 5",
    yourAnswer: "8",
    correctAnswer: "8",
    status: "correct",
    points: "5/5 pts",
    bgColor: "#F8FFFD",
  },
  {
    id: 5,
    title: "#5",
    question: "Find the derivate of f(x)= 3x + 2x = 5",
    yourAnswer: "8",
    correctAnswer: "8",
    status: "correct",
    points: "5/5 pts",
    bgColor: "#F8FFFD",
  },
  {
    id: 6,
    title: "#6",
    question: "Find the derivate of f(x)= 3x + 2x = 5",
    yourAnswer: "8",
    correctAnswer: "9",
    status: "incorrect",
    bgColor: "#FFF8F8",
  },
];

function StatusBadge({ status, points }: { status: QuestionStatus; points?: string }) {
  if (status === "correct") {
    return (
      <div className="px-3 py-2 opacity-90 bg-emerald-500 rounded-lg flex justify-center items-center gap-2.5">
        <div className=" text-white text-[16px] font-medium  leading-tight">{points} </div>
      </div>
    );
  }

  if (status === "skipped") {
    return (
      <div className="px-3 py-2 opacity-90 bg-yellow-600/10 rounded-lg flex justify-center items-center gap-2.5">
        <div className="text-[#D28900] text-[16px] font-medium leading-tight">Skipped</div>
      </div>
    );
  }

  return (
    <div className="px-3 py-2 opacity-90 bg-red-500/10 rounded-lg flex justify-center items-center gap-2.5">
      <div className="text-[#DC3545] text-[16px] font-medium leading-tight">Incorrect</div>
    </div>
  );
}

export default function QuestionsDetailPopup(
  { questions = sampleQuestions, onClose }: { questions?: Question[]; onClose?: () => void }
) {
  return (
    <div className="w-[100%]  p-6  bg-white rounded-3xl inline-flex flex-col justify-start items-start gap-4 shadow-lg">
      <div className="self-stretch inline-flex justify-between items-start">
        <div className="text-[#333333] text-[20px] font-bold  ">Detailed Question Breakdown</div>

        {/* Close icon (simple custom) */}
        <button
          aria-label="close"
          className="w-6 h-6 relative rounded-md overflow-hidden flex items-center justify-center"
          onClick={() => {
            /* hook into parent/modal close */
            onClose?.();
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L18 18" stroke="#374151" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 18L18 6" stroke="#374151" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="w-[1056px] flex flex-col justify-start items-start gap-3 max-h-[64vh] overflow-y-auto">
        {questions.map((q) => (
            <div
              key={q.id}
              className="self-stretch p-4 border-b border-neutral-200 inline-flex justify-between items-start"
              style={{ backgroundColor: q.bgColor }}
            >
              <div className="w-[80%] inline-flex flex-col justify-start items-start gap-2">
                <div className="inline-flex justify-start items-baseline gap-3">
                  <div className="text-[#666666] text-[18px] font-medium">{q.title}</div>
                  <div className="text-[#666666] text-[20px] font-medium ">Questions</div>
                </div>

                <div className="self-stretch text-[#333333] text-[16px] font-semibold ">{q.question}</div>

                <div className="self-stretch inline-flex justify-start items-center gap-10 mt-1">
                  <div className="flex justify-start items-end gap-1">
                    <div className="text-[#333333] text-[16px] font-medium ">Your Answer :</div>
                    <div className="text-[#1CA672] text-[16px] font-bold " >
                      {q.yourAnswer}
                    </div>
                  </div>

                  <div className="flex justify-start items-end gap-1">
                    <div className="text-[#333333] text-[16px] font-medium ">Correct Answer :</div>
                    <div
                      className={`text-[16px] font-bold  ${
                        q.status === "incorrect" ? "text-[#DC3545]" : q.correctAnswer ? "text-[#1CA672]" : "text-[#666666] text-[14px] font-medium"
                      }`}
                    >
                      {q.correctAnswer ?? "not answered"}
                    </div>
                  </div>
                </div>
              </div>

              <StatusBadge status={q.status} points={q.points} />
            </div>
        ))}
      </div>
    </div>
  );
}
