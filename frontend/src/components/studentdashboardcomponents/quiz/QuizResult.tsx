"use client";

import React from "react";
import { CheckCircle2, XCircle, Clock, Minus } from "lucide-react";

interface Question {
  id: number;
  label: string;
  status: "correct" | "incorrect" | "neutral" | "unanswered";
}

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  questions: Question[];
}

export function QuizResults({
  score,
  totalQuestions,
  correctAnswers,
  questions,
}: QuizResultsProps) {
  const getStatusColor = (status: Question["status"]) => {
    switch (status) {
      case "correct":
        return "bg-green-100 border-green-500 text-green-700";
      case "incorrect":
        return "bg-red-100 border-red-500 text-red-700";
      case "neutral":
        return "bg-gray-100 border-gray-400 text-gray-700";
      case "unanswered":
        return "bg-gray-50 border-gray-300 text-gray-500";
      default:
        return "bg-gray-50 border-gray-300 text-gray-500";
    }
  };

  const getStatusIcon = (status: Question["status"]) => {
    switch (status) {
      case "correct":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "incorrect":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "neutral":
        return <Minus className="w-4 h-4 text-gray-600" />;
      case "unanswered":
        return <Clock className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const incorrectAnswers = questions.filter(
    (q) => q.status === "incorrect"
  ).length;
  const skippedAnswers = questions.filter(
    (q) => q.status === "unanswered" || q.status === "neutral"
  ).length;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Quiz Results
        </h2>
        <div className="text-3xl font-bold text-teal-600 mb-2">
          {score.toFixed(1)}%
        </div>
        <div className="text-sm text-gray-600">
          {correctAnswers} out of {totalQuestions} questions correct
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Correct</span>
          </div>
          <span className="font-semibold text-green-700">{correctAnswers}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-700">Incorrect</span>
          </div>
          <span className="font-semibold text-red-700">{incorrectAnswers}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Skipped</span>
          </div>
          <span className="font-semibold text-gray-700">{skippedAnswers}</span>
        </div>
      </div>

      {/* Question List */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Question Overview
        </h3>
        <div className="space-y-2">
          {questions.map((question) => (
            <div
              key={question.id}
              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${getStatusColor(
                question.status
              )}`}
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(question.status)}
                <span className="font-medium text-sm">{question.label}</span>
              </div>
              <div className="text-xs font-semibold">Q{question.id}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
