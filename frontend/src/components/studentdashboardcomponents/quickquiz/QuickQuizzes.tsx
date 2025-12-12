"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import type { AppDispatch, RootState } from "@/store";
// import { fetchQuizzes } from "@/store/quizSlice";
import scienceIllustration from "@/assets/quiz1image.svg";
import quickQuizBg from "@/assets/quickquizbackground1.svg";
import scienceIllustration1 from "@/assets/quickquiz2.svg";
import mathIllustration from "@/assets/quickquiz3.svg";
import quickQuizBg2 from "@/assets/quizbg2.svg";
import quickQuizBg3 from "@/assets/quizbg3.svg";
import { AppDispatch, RootState } from "@/store/store";
import { fetchQuizzes } from "@/store/slices/quizSlice";
import ScienceQuiz from "@/components/studentdashboardcomponents/quiz/ScienceQuiz";

interface QuickQuizzesProps {
  className?: string;
  title?: string;
  variant?: "dashboard" | "full";
}

export default function QuickQuizzes({
  className = "",
  title = "Quick Quizzes",
  variant = "dashboard",
}: QuickQuizzesProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { quizzes, loading, error } = useSelector(
    (state: RootState) => state.quiz
  );
  const [showScienceQuiz, setShowScienceQuiz] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const cardsPerPage = variant === "dashboard" ? 3 : 9;
  const totalPages = Math.ceil(quizzes?.length / cardsPerPage);

  const displayedQuizzes =
    quizzes?.length
      ? (variant === "dashboard"
        ? quizzes.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage)
        : quizzes.slice(0, 9))
      : [];


  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };
  // Map quiz data to visual assets
  const getQuizAssets = (index: number) => {
    const assets = [
      {
        bgImage: quickQuizBg,
        illustration: scienceIllustration,
        bgColor: "#E1832B",
      },
      {
        bgImage: quickQuizBg2,
        illustration: scienceIllustration1,
        bgColor: "#194DC3",
      },
      {
        bgImage: quickQuizBg3,
        illustration: mathIllustration,
        bgColor: "#0A9C9D",
      },
    ];
    return assets[index % assets?.length];
  };

  useEffect(() => {
    console.log('🔄 Fetching quizzes...');
    dispatch(fetchQuizzes());
  }, [dispatch]);

  // Debug logging
  console.log('📊 QuickQuizzes State:', {
    loading,
    error,
    quizzesCount: quizzes?.length || 0,
    displayedQuizzesCount: displayedQuizzes.length,
    variant,
    quizzes: quizzes
  });

  const handleStartQuiz = (quizId: string) => {
    console.log(`Starting quiz: ${quizId}`);
    // For now, open ScienceQuiz modal for any quiz
    setShowScienceQuiz(true);
  };

  if (loading) {
    return (
      <Card
        className={`rounded-3xl bg-white p-5 shadow-2xl border-none ${className}`}
      >
        <h2 className="text-lg font-bold text-[#111] mb-4">{title}</h2>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading quizzes...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        className={`rounded-3xl  p-5 shadow-2xl border-none ${className}`}
      >
        <h2 className="text-lg font-bold text-[#111] mb-4">{title}</h2>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card
        className={`rounded-3xl bg-white p-5 shadow-2xl gap-4 border-none ${className}`}
      >
        <h2 className="text-lg font-bold text-[#111] mb-4">{title}</h2>

        {displayedQuizzes.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">No quizzes available</p>
              <p className="text-sm">Check the console for API details</p>
            </div>
          </div>
        ) : variant === "dashboard" ? (
          <div className="flex items-center gap-3">
            {/* Left button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-[#F5F5F7] h-8 w-8 flex-shrink-0"
              aria-label="Previous quizzes"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex-1 grid grid-cols-3 gap-3">
              {displayedQuizzes.map((quiz, index) => {
                const assets = getQuizAssets(index);
                const questionCount = quiz?.questions?.length;
                const estimatedDuration = Math.max(10, questionCount * 2);

                return (
                  <div
                    key={quiz.quiz_id}
                    className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm"
                    aria-label={`${quiz.title} card`}
                  >
                    <Image
                      src={assets.bgImage}
                      alt="Quiz Background"
                      className="absolute inset-0 w-full h-full object-cover"
                      priority
                    />
                    <div className="absolute right-2 top-1">
                      <div className="bg-white/30 text-white text-xs font-semibold rounded-full px-2 py-1 backdrop-blur-sm">
                        {estimatedDuration} min
                      </div>
                    </div>

                    <div className="relative z-20 h-full p-2 flex flex-col justify-between text-white">
                      <div className="flex justify-center mt-6">
                        <div className="w-[75%] h-[100px] rounded-lg flex items-center justify-center">
                          <Image
                            src={assets.illustration}
                            alt={`${quiz.title} illustration`}
                            className="object-contain"
                            width={120}
                            height={90}
                            priority
                          />
                        </div>
                      </div>

                      <div
                        className="rounded-xl p-1 text-left"
                        style={{ backgroundColor: assets.bgColor }}
                      >
                        <div className="flex items-start justify-between p-1">
                          <div>
                            <div className="font-bold text-sm text-white">
                              {quiz.title}
                            </div>
                            <div className="text-[10px] text-white">
                              {questionCount}{" "}
                              {questionCount === 1 ? "question" : "questions"} •{" "}
                              {quiz.total_marks} marks
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleStartQuiz(quiz.quiz_id)}
                          className="mt-1 w-full rounded-full bg-white text-[#333] text-[14px] font-semibold py-2 shadow-sm hover:brightness-95 transition-all cursor-pointer"
                        >
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-[#F5F5F7] h-8 w-8 flex-shrink-0"
              aria-label="Next quizzes"
              onClick={handleNext}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {displayedQuizzes.map((quiz, index) => {
              const assets = getQuizAssets(index);
              const questionCount = quiz?.questions?.length;
              const estimatedDuration = Math.max(10, questionCount * 2);

              return (
                <div
                  key={quiz.quiz_id}
                  className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm"
                  aria-label={`${quiz.title} card`}
                >
                  <Image
                    src={assets.bgImage}
                    alt="Quiz Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    priority
                  />
                  <div className="absolute right-2 top-1">
                    <div className="bg-white/30 text-white text-xs font-semibold rounded-full px-2 py-1 backdrop-blur-sm">
                      {estimatedDuration} min
                    </div>
                  </div>

                  <div className="relative z-20 h-full p-2 flex flex-col justify-between text-white">
                    <div className="flex justify-center mt-6">
                      <div className="w-[75%] h-[100px] rounded-lg flex items-center justify-center">
                        <Image
                          src={assets.illustration}
                          alt={`${quiz.title} illustration`}
                          className="object-contain"
                          width={120}
                          height={90}
                          priority
                        />
                      </div>
                    </div>

                    <div
                      className="rounded-xl p-1 text-left"
                      style={{ backgroundColor: assets.bgColor }}
                    >
                      <div className="flex items-start justify-between p-1">
                        <div>
                          <div className="font-bold text-sm text-white">
                            {quiz.title}
                          </div>
                          <div className="text-[10px] text-white">
                            {questionCount}{" "}
                            {questionCount === 1 ? "question" : "questions"} •{" "}
                            {quiz.total_marks} marks
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleStartQuiz(quiz.quiz_id)}
                        className="mt-1 w-full rounded-full cursor-pointer bg-white text-[#333] text-[14px] font-semibold py-2 shadow-sm hover:brightness-95 transition-all"
                      >
                        Start Quiz
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {showScienceQuiz && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl h-[38rem]">
            <ScienceQuiz onClose={() => setShowScienceQuiz(false)} />
          </div>
        </div>
      )}
    </>
  );
}
