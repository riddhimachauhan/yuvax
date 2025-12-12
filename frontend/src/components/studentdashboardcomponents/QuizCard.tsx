"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, ChevronRight } from "lucide-react";
import background from "@/assets/quizbackground.svg";

const QUIZ_DURATION_SECONDS = 300;

const quizData = [
  {
    id: 1,
    question: "What do plants need to grow?",
    icon: "🌱",
    options: [
      { id: 1, text: "Water, sunlight and soil" },
      { id: 2, text: "Only water" },
      { id: 3, text: "Only sunlight" },
      { id: 4, text: "Only soil" },
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "What is the largest planet in our solar system?",
    icon: "🪐",
    options: [
      { id: 1, text: "Earth" },
      { id: 2, text: "Jupiter" },
      { id: 3, text: "Saturn" },
      { id: 4, text: "Mars" },
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "What is the process by which plants make their food?",
    icon: "🌿",
    options: [
      { id: 1, text: "Respiration" },
      { id: 2, text: "Digestion" },
      { id: 3, text: "Photosynthesis" },
      { id: 4, text: "Absorption" },
    ],
    correctAnswer: 3,
  },
  {
    id: 4,
    question: "What is the center of an atom called?",
    icon: "⚛️",
    options: [
      { id: 1, text: "Electron" },
      { id: 2, text: "Nucleus" },
      { id: 3, text: "Proton" },
      { id: 4, text: "Neutron" },
    ],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "What is the chemical symbol for water?",
    icon: "💧",
    options: [
      { id: 1, text: "H2O" },
      { id: 2, text: "CO2" },
      { id: 3, text: "O2" },
      { id: 4, text: "NaCl" },
    ],
    correctAnswer: 1,
  },
];

function formatMMSS(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const mPart = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const sPart = (s % 60).toString().padStart(2, "0");
  return `${mPart}:${sPart}`;
}

export default function ScienceQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Timers
  const [remainingSeconds, setRemainingSeconds] = useState(
    QUIZ_DURATION_SECONDS
  );
  const perQuestionStartRef = useRef<number>(Date.now()); // timestamp (ms) when current question became active
  const [questionTimes, setQuestionTimes] = useState<number[]>([]); // seconds per answered question (in order)

  // Memoized helpers
  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  const elapsedTotalSeconds = useMemo(
    () => QUIZ_DURATION_SECONDS - remainingSeconds,
    [remainingSeconds]
  );

  // Global countdown timer effect
  useEffect(() => {
    if (showResults) return;

    const id = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(id);
        }
        return Math.max(0, prev - 1);
      });
    }, 1000);

    return () => clearInterval(id);
  }, [showResults]);

  // When timer hits zero, auto-finish the quiz
  useEffect(() => {
    if (!showResults && remainingSeconds === 0) {
      finishQuizOnTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSeconds, showResults]);

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const pushCurrentQuestionTime = () => {
    const now = Date.now();
    const deltaSec = (now - perQuestionStartRef.current) / 1000;
    setQuestionTimes((prev) => [...prev, deltaSec]);
    // prepare for next question
    perQuestionStartRef.current = Date.now();
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    // Record time for this question before answering
    pushCurrentQuestionTime();

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      // Going back means we are "undoing" the last answered/skipped item
      const prevAnswer = answers[currentQuestion - 1] ?? 0;
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(prevAnswer === 0 ? null : prevAnswer);
      setAnswers((prev) => prev.slice(0, -1));
      setQuestionTimes((prev) => prev.slice(0, -1));

      // Reset the per-question start for the now-active question
      perQuestionStartRef.current = Date.now();
    }
  };

  const handleSkip = () => {
    // Record time spent before skipping
    pushCurrentQuestionTime();

    const newAnswers = [...answers, 0];
    setAnswers(newAnswers);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const finishQuizOnTimeout = () => {
    // If we already finished, ignore
    if (showResults) return;

    const timeForCurrent = (Date.now() - perQuestionStartRef.current) / 1000;

    // Start with existing recorded answers & times
    const completedAnswers: number[] = [...answers];
    const completedTimes: number[] = [...questionTimes];

    // If the current question hasn't been recorded yet, treat as skipped but capture time spent so far
    if (completedAnswers.length < quizData.length) {
      completedAnswers.push(0); // skipped
      completedTimes.push(timeForCurrent);
    }

    // Any remaining questions (not reached) are unanswered with 0 time
    while (completedAnswers.length < quizData.length) {
      completedAnswers.push(0);
      completedTimes.push(0);
    }

    setAnswers(completedAnswers);
    setQuestionTimes(completedTimes);
    setShowResults(true);
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResults(false);
    setRemainingSeconds(QUIZ_DURATION_SECONDS);
    setQuestionTimes([]);
    perQuestionStartRef.current = Date.now();
  };

  // Initialize per-question start at mount and whenever quiz restarts
  useEffect(() => {
    perQuestionStartRef.current = Date.now();
  }, []);

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quizData.length) * 100);

    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-8 left-8 text-4xl opacity-60">🎈</div>
        <div className="absolute top-20 right-32 text-3xl opacity-50">🧊</div>
        <div className="absolute top-40 left-20 text-2xl opacity-40">🍄</div>
        <div className="absolute bottom-32 left-16 text-3xl opacity-50">🧊</div>
        <div className="absolute bottom-20 right-24 text-4xl opacity-60">
          🌸
        </div>
        <div className="absolute top-1/2 right-12 text-3xl opacity-50">🌼</div>
        <div className="absolute bottom-1/3 left-1/4 text-2xl opacity-40">🍄</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-50">⏳</div>

        {/* Results card */}
        <div className="rounded-3xl shadow-2xl w-full max-w-2xl p-8 md:p-10 relative text-center  border border-gray-300 stroke-4">
          {/* Close button */}
          <button className="absolute top-6 right-6 text-gray-500 hover:text-gray-900 cursor-pointer">
            <X className="w-6 h-6" />
          </button>

          {/* Trophy icons */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-4xl">🎯</span>
            <span className="text-5xl">🏆</span>
            <span className="text-4xl">🎖️</span>
            <span className="text-3xl">⚽</span>
          </div>

          {/* Score */}
          <div className="mb-2">
            <p className="text-3xl font-semibold text-gray-600">
              {score}/{quizData.length}
            </p>
          </div>

          {/* Percentage */}
          <div className="mb-2">
            <h2 className="text-6xl md:text-7xl font-bold text-[#D148D1]">
              {percentage}%
            </h2>
          </div>

          {/* Total time used */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Total time used: <span className="font-semibold">{formatMMSS(elapsedTotalSeconds)}</span>
              {remainingSeconds === 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 align-middle">
                  Time up
                </span>
              )}
            </p>
          </div>

          {/* Message */}
          <p className="text-xl text-gray-500 mb-8">Fantastic Job! 🎉</p>

          {/* Achievement badges (text inside the box) */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[
              { emoji: "🎯", label: "Quiz Starter" },
              { emoji: "⭐", label: "Rising Star" },
              { emoji: "🔥", label: "On Fire" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-between">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#6798FF] to-[#A655FF] flex flex-col items-center justify-center text-white p-2 mb-1 shadow-md">
                  <div className="text-3xl mb-1">{item.emoji}</div>
                  <div className="text-xs font-semibold text-center leading-tight">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Play again button */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handlePlayAgain}
              className="px-8 py-6 bg-gradient-to-r cursor-pointer from-[#FF842C] to-[#F73D94] hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-semibold text-lg"
            >
              🎮 Play Again!
            </Button>
            <Button
              onClick={handlePlayAgain}
              className="px-8 py-6 bg-gradient-to-r cursor-pointer from-[#92FF2C] to-[#3DD8F7] hover:from-green-600 hover:to-green-600 text-white rounded-lg font-semibold text-lg"
            >
              🔂  View Report
            </Button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 relative overflow-hidden ">
      {/* Decorative background elements
      <div className="absolute top-8 left-8 text-4xl opacity-60">🎈</div>
      <div className="absolute top-20 right-32 text-3xl opacity-50">🧊</div>
      <div className="absolute top-40 left-20 text-2xl opacity-40">🍄</div>
      <div className="absolute bottom-32 left-16 text-3xl opacity-50">🧊</div>
      <div className="absolute bottom-20 right-24 text-4xl opacity-60">🌸</div>
      <div className="absolute top-1/2 right-12 text-3xl opacity-50">🌼</div>
      <div className="absolute bottom-1/3 left-1/4 text-2xl opacity-40">🍄</div>
      <div className="absolute top-1/3 right-1/4 text-3xl opacity-50">⏳</div>
      <div className="absolute bottom-1/2 right-1/3 text-2xl opacity-40">✅</div>
      <div className="absolute top-2/3 right-16 text-3xl opacity-50">🌸</div> */}

      {/* Main quiz card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 overflow-hidden">
        {/* Background image as a full-bleed background */}
        <Image src={background} alt="background" fill className="object-cover opacity-90 overflow-hidden" />

        {/* Overlay content: keep everything above the background */}
        <div className="relative z-10">
          {/* Close button */}
          <button className="absolute top-6 right-6 text-gray-600 hover:text-gray-900">
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">🧮 Science Quiz</h1>

            {/* Badges row */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">Math</span>
              <span className="px-3 py-1 bg-orange-500 text-white rounded-md text-sm font-medium">Intermediate</span>
              <span className="px-3 py-1 bg-[#FFEBA6] text-gray-900 rounded-md text-sm font-semibold">+250 XP</span>

              {/* Global Timer Badge */}
              <span
                className={`px-3 py-1 rounded-md text-sm font-semibold ${remainingSeconds <= 15
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
                  }`}
                title="Time remaining for the whole quiz"
              >
                ⏳ {formatMMSS(remainingSeconds)}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full mb-3 overflow-hidden bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-green-400 to-lime-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Question {currentQuestion + 1} of {quizData.length}</span>
              <button
                onClick={handleSkip}
                className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1 cursor-pointer"
              >
                Skip <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question */}
          <div className="border-4 border-orange-400 rounded-2xl p-6 mb-6 bg-orange-50/30 relative">
            <div className="absolute -top-3 left-6">
              <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-medium">Question {question.id}</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="text-5xl">{question.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900">{question.question}</h2>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedAnswer(option.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${selectedAnswer === option.id
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-gray-50 border-gray-200 text-gray-900 hover:border-gray-300"
                  }`}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-[#FFEBA6] text-gray-900">{option.id}</div>
                <span className="text-lg font-medium">{option.text}</span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="px-6 py-3 border-2 cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 rotate-180 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="px-8 py-3 bg-black cursor-pointer text-white hover:bg-gray-900 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
