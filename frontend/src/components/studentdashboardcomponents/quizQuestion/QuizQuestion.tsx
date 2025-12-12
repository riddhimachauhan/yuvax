"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  FileText,
  Lightbulb,
  SkipForward
} from 'lucide-react';

import winnerRocket from "@/assets/winnerRocket.svg";
import Trophy from "@/assets/trophy.svg";
import xp from "@/assets/xp.svg"
import clock from "@/assets/ClockStreamlineFeather.svg"
import target from "@/assets/targetSuccess.svg"

interface Question {
  id: number;
  type: 'mcq' | 'written';
  question: string;
  points: number;
  options?: string[];
  correctAnswer: string;
  category?: string;
}

interface QuestionTime {
  questionId: number;
  timeSpent: number; // in seconds
}

const quizData: Question[] = [
  {
    id: 1,
    type: 'mcq',
    question: "Solve for x: 2x + 5 = 13",
    points: 8,
    options: ["2/4", "3/4", "4/8", "5/10"],
    correctAnswer: "4/8",
    category: "Algebra",
  },
  {
    id: 2,
    type: 'written',
    question: "What is the chemical symbol for gold?",
    points: 10,
    correctAnswer: "Au",
    category: "Chemistry",
  },
  {
    id: 3,
    type: 'mcq',
    question: "Which planet is known as the Red Planet?",
    points: 6,
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    category: "Astronomy",
  },
  {
    id: 4,
    type: 'written',
    question: "What is the speed of light in vacuum?",
    points: 12,
    correctAnswer: "299792458 m/s",
    category: "Physics",
  },
  {
    id: 5,
    type: 'mcq',
    question: "What is the atomic number of oxygen?",
    points: 7,
    options: ["6", "7", "8", "9"],
    correctAnswer: "8",
    category: "Chemistry",
  }
];

const QuizQuestionPopup = ({
  onClose,
  onBackToHome,
  onViewReport,
  totalTime,
}: {
  onClose?: () => void;
  onBackToHome?: () => void;
  onViewReport?: () => void;
  totalTime: number;
  questionTimes: QuestionTime[];
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-2xl p-6 sm:p-8 relative bg-white rounded-3xl shadow-2xl shadow-emerald-500/20 border border-emerald-100 inline-flex flex-col justify-center items-center gap-6 sm:gap-8 overflow-hidden mx-4">
      {/* Header with image and title */}
      <div className="flex flex-col justify-start items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-lg animate-pulse"></div>
          <Image
            src={winnerRocket}
            alt="Homework complete celebration"
            width={120}
            height={120}
            className="relative w-24 h-24 sm:w-28 sm:h-28 animate-bounce"
          />
        </div>
        <div className="text-center justify-start bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent text-xl sm:text-2xl font-bold leading-tight">
          Homework Complete!
        </div>
      </div>

      {/* Stats section */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Total XP */}
        <div className="h-20 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl p-1.5 shadow-lg">
          <div className="h-full bg-white rounded-xl flex flex-col justify-center items-center gap-2 p-3">
            <div className="flex items-center gap-2 text-yellow-600">
              <Image
                src={xp}
                alt="XP"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold">Total XP</span>
            </div>
            <div className="text-lg font-bold text-yellow-600">500</div>
          </div>
        </div>

        {/* Total Time */}
        <div className="h-20 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl p-1.5 shadow-lg">
          <div className="h-full bg-white rounded-xl flex flex-col justify-center items-center gap-2 p-3">
            <div className="flex items-center gap-2 text-rose-500">
              <Image
                src={clock}
                alt="Time"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold">Total Time</span>
            </div>
            <div className="text-lg font-bold text-rose-500">{formatTime(totalTime)}</div>
          </div>
        </div>

        {/* Perfect */}
        <div className="h-20 bg-gradient-to-br from-slate-600 to-gray-600 rounded-2xl p-1.5 shadow-lg">
          <div className="h-full bg-white rounded-xl flex flex-col justify-center items-center gap-2 p-3">
            <div className="flex items-center gap-2 text-slate-600">
              <Image
                src={target}
                alt="Target"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold">Perfect!</span>
            </div>
            <div className="text-lg font-bold text-slate-600">100%</div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full flex flex-col sm:flex-row gap-3">
        <button
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 flex justify-center items-center gap-3 hover:bg-gray-50 transition-all duration-200 hover:border-gray-400 active:scale-95"
          onClick={onBackToHome}
        >
          <Home className="w-4 h-4 text-black" />
          <span className="text-sm font-semibold text-gray-800">Back to home</span>
        </button>
        <button
          className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl flex justify-center items-center gap-3 hover:shadow-xl transition-all duration-200 active:scale-95"
          onClick={onViewReport}
        >
          <FileText className="w-4 h-4" />
          <span className="text-sm font-semibold">View Report</span>
        </button>
      </div>

      {/* Close button */}
      <button
        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
        onClick={onClose}
      >
        <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
      </button>
    </div>
  );
};

const QuizQuestion: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Timer states
  const [currentQuestionTime, setCurrentQuestionTime] = useState(0);
  const [totalQuizTime, setTotalQuizTime] = useState(0);
  const [questionTimes, setQuestionTimes] = useState<QuestionTime[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = quizData[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;
  const totalQuestions = quizData.length;

  // Get the assignment ID from URL params
  const assignmentId = params.id as string;

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Start/stop timer for current question
  useEffect(() => {
    if (!isPaused && !showPopup) {
      timerRef.current = setInterval(() => {
        setCurrentQuestionTime(prev => prev + 1);
        setTotalQuizTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, showPopup]);

  // Reset timer when question changes
  useEffect(() => {
    // Save time for previous question
    if (currentQuestionIndex > 0) {
      setQuestionTimes(prev => [
        ...prev,
        { questionId: quizData[currentQuestionIndex - 1].id, timeSpent: currentQuestionTime }
      ]);
    }

    // Reset timer for new question
    setCurrentQuestionTime(0);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (option: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option
    }));
  };

  const handleWrittenAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const answer = e.target.value;
    setWrittenAnswer(answer);
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleSkip = () => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: 'skipped'
    }));

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setWrittenAnswer(userAnswers[quizData[currentQuestionIndex + 1].id] || '');
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setWrittenAnswer(userAnswers[quizData[currentQuestionIndex + 1].id] || '');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setWrittenAnswer(userAnswers[quizData[currentQuestionIndex - 1].id] || '');
    }
  };

  const handleSubmit = () => {
    // Save time for the last question
    const finalQuestionTimes = [
      ...questionTimes,
      { questionId: currentQuestion.id, timeSpent: currentQuestionTime }
    ];

    setQuestionTimes(finalQuestionTimes);
    console.log('User answers:', userAnswers);
    console.log('Question times:', finalQuestionTimes);
    console.log('Total quiz time:', totalQuizTime);

    setQuizSubmitted(true);
    setShowPopup(true);

    // Stop the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleBackToHome = () => {
    console.log('Going back to home');
    setShowPopup(false);
    // Navigate to assignments home page
    router.push('/dashboard/assignments');
  };

  const handleViewReport = () => {
    console.log('Viewing report');
    console.log('Question times:', questionTimes);
    console.log('Total time:', totalQuizTime);
    
    // Navigate to report page with quiz data
    const reportData = {
      userAnswers,
      questionTimes: [
        ...questionTimes,
        { questionId: currentQuestion.id, timeSpent: currentQuestionTime }
      ],
      totalTime: totalQuizTime,
      quizData,
      assignmentId
    };
    
    // Store data in sessionStorage for the report page
    sessionStorage.setItem('quizReportData', JSON.stringify(reportData));
    
    // Navigate to the specific assignment report page
    router.push(`/dashboard/assignments/start/${assignmentId}/report`);
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / totalQuestions) * 100;
  };

  if (showPopup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-4 px-3 flex items-center justify-center">
        <QuizQuestionPopup
          onClose={handleClosePopup}
          onBackToHome={handleBackToHome}
          onViewReport={handleViewReport}
          totalTime={totalQuizTime}
          questionTimes={questionTimes}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-4 px-3">
      <div className="w-full max-w-4xl mx-auto">
        {/* Quiz Card */}
        <div className="bg-white rounded-xl shadow-lg shadow-blue-100/50 overflow-hidden border border-blue-100/50">
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
                  Science Quiz
                </h1>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                  {currentQuestion.category}
                </span>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                  Intermediate
                </span>
                <span className="px-2 py-1 bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <Image
                    src={Trophy}
                    alt="XP points"
                    width={12}
                    height={12}
                  />
                  250 XP
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4 sm:mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                  Progress
                </span>
                <span className="text-xs font-semibold text-gray-700">
                  {currentQuestionIndex + 1} / {totalQuestions}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
                <div
                  className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="relative bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-cyan-200/50 shadow-sm">
              <div className="absolute -top-2 left-4">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                  <FileText className="w-2 h-2" />
                  Question {currentQuestion.id}
                </span>
              </div>

              <div className="flex flex-col gap-3 mb-4">
                <div className="flex-1 mt-4">
                  <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 leading-relaxed">
                    {currentQuestion.question}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                      <Image
                        src={xp}
                        alt="XP points"
                        width={12}
                        height={12}
                      />
                      Points: <span className="text-amber-600 font-bold">{currentQuestion.points}</span>
                    </span>

                    <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                      <Image
                        src={clock}
                        alt="Time spent"
                        width={12}
                        height={12}
                      />
                      Total: <span className="text-green-600 font-bold">{formatTime(totalQuizTime)}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Answer Section */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    {currentQuestion.type === 'mcq' ? (
                      <>
                        <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-bold">A</span>
                        </div>
                        Select one option
                      </>
                    ) : (
                      <>
                        <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                          <FileText className="w-2 h-2 text-green-600" />
                        </div>
                        Write your answer
                      </>
                    )}
                  </h3>
                  <button
                    onClick={handleSkip}
                    className="flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium text-xs transition-all duration-200 px-2 py-1 hover:bg-amber-50 rounded border border-amber-200 hover:border-amber-300 w-fit self-end sm:self-auto"
                  >
                    <SkipForward className="w-3 h-3" />
                    Skip Question
                  </button>
                </div>

                {currentQuestion.type === 'mcq' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentQuestion.options?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        className={`p-3 rounded-lg border transition-all duration-200 text-left group hover:scale-[1.02] active:scale-[0.98] ${userAnswers[currentQuestion.id] === option
                          ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-green-50 shadow-md shadow-emerald-500/20'
                          : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-sm'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm transition-all duration-200 shadow-sm ${userAnswers[currentQuestion.id] === option
                              ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                              }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span
                            className={`text-sm font-medium ${userAnswers[currentQuestion.id] === option
                              ? 'text-emerald-800'
                              : 'text-gray-700'
                              }`}
                          >
                            {option}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      value={writtenAnswer}
                      onChange={handleWrittenAnswerChange}
                      placeholder="Type your detailed answer here..."
                      className="w-full h-24 sm:h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200 text-sm placeholder-gray-400"
                    />
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" />
                      Be as specific as possible in your answer. Full sentences are recommended.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <button
                onClick={handleBack}
                disabled={isFirstQuestion}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition-all duration-200 w-full sm:w-auto justify-center ${isFirstQuestion
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm active:scale-95'
                  }`}
              >
                <ChevronLeft className="w-3 h-3" />
                <span className="font-semibold text-xs">Previous</span>
              </button>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={isLastQuestion ? handleSubmit : handleNext}
                  className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg font-semibold text-xs shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto justify-center hover:scale-105 active:scale-95"
                >
                  {isLastQuestion ? (
                    <>
                      Submit Quiz
                    </>
                  ) : (
                    <>
                      <span>Next Question</span>
                      <ChevronRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;