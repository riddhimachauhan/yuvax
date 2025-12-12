"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import gameboardImg from "@/assets/gameboard.svg";
import startquiz from "@/assets/quizstartimage.svg";

type PieceType = "number" | "variable" | "operator";
type Piece = {
  id: string;
  label: string;
  type: PieceType;
};
type Slot = {
  id: string;
  accept: PieceType | "equals";
  piece?: Piece | null;
};

type Question = {
  id: number;
  description: string;
  instruction: string;
  answer: string;
  slots: Array<{
    id: string;
    accept: PieceType | "equals";
    expected: string;
  }>;
  pool: Piece[];
};

const questions: Question[] = [
  {
    id: 1,
    description: "BUILD THE EQUATION THAT EQUALS 17",
    instruction: "Click on pieces below to build: 2x + 5 = 17",
    answer: "2x + 5 = 17",
    slots: [
      { id: "s-1", accept: "number", expected: "2" },
      { id: "s-2", accept: "variable", expected: "x" },
      { id: "s-3", accept: "operator", expected: "+" },
      { id: "s-4", accept: "number", expected: "5" },
      { id: "s-eq", accept: "equals", expected: "=" },
      { id: "s-5", accept: "number", expected: "17" },
    ],
    pool: [
      { id: "p-x-1", label: "x", type: "variable" },
      { id: "p-2", label: "2", type: "number" },
      { id: "p-5", label: "5", type: "number" },
      { id: "p-6", label: "6", type: "number" },
      { id: "p-10", label: "10", type: "number" },
      { id: "p-17", label: "17", type: "number" },
      { id: "p-plus", label: "+", type: "operator" },
      { id: "p-minus", label: "-", type: "operator" },
      { id: "p-times", label: "×", type: "operator" },
      { id: "p-div", label: "÷", type: "operator" },
      { id: "p-x-2", label: "x", type: "variable" },
    ],
  },
];

const makeSlots = (question: Question): Slot[] => {
  return question.slots.map((slot) => ({
    id: slot.id,
    accept: slot.accept,
    piece: null,
  }));
};

export default function Game() {
  const [page, setPage] = useState<"start" | "quiz" | "end">("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [pool, setPool] = useState<Piece[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [message, setMessage] = useState<string>("");
  const [score, setScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progressPct = (completedQuestions / totalQuestions) * 100;

  const initializeQuestion = (questionIndex: number) => {
    const question = questions[questionIndex];
    setPool([...question.pool]);
    setSlots(makeSlots(question));
    setMessage("");
  };

  useEffect(() => {
    initializeQuestion(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCorrect = useMemo(() => {
    if (!currentQuestion) return false;
    const userAnswers = Object.fromEntries(
      slots.map((s) => [s.id, s.piece?.label || ""])
    );
    return currentQuestion.slots.every((expectedSlot) => {
      if (expectedSlot.accept === "equals") return true;
      return userAnswers[expectedSlot.id] === expectedSlot.expected;
    });
  }, [slots, currentQuestion]);

  function onDragStart(
    e: React.DragEvent,
    piece: Piece,
    source: "pool" | `slot:${string}`
  ) {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ pieceId: piece.id, source })
    );
    e.dataTransfer.effectAllowed = "move";
  }

  function onDropToSlot(e: React.DragEvent, slotId: string) {
    e.preventDefault();
    const payload = safeParse(e.dataTransfer.getData("text/plain"));
    if (!payload) return;
    const { pieceId, source } = payload as {
      pieceId: string;
      source: "pool" | `slot:${string}`;
    };

    const slotIndex = slots.findIndex((s) => s.id === slotId);
    const target = slots[slotIndex];
    if (!target || target.accept === "equals") return;

    const dragged =
      source === "pool"
        ? pool.find((p) => p.id === pieceId)
        : slots.find((s) => s.id === source.split(":")[1])?.piece;

    if (!dragged) return;
    if (dragged.type !== target.accept) {
      setMessage("That piece doesn't fit here.");
      return;
    }

    setMessage("");
    setSlots((prev) => {
      const next = prev.map((s) => ({ ...s }));
      const displaced = next[slotIndex].piece;
      next[slotIndex].piece = dragged;

      if (source.startsWith("slot:")) {
        const fromId = source.split(":")[1];
        const fromIndex = next.findIndex((s) => s.id === fromId);
        if (fromIndex >= 0) next[fromIndex].piece = null;
      } else {
        setPool((old) => old.filter((p) => p.id !== pieceId));
      }

      if (displaced) {
        setPool((old) => [...old, displaced]);
      }
      return next;
    });
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function resetCurrentQuestion() {
    initializeQuestion(currentQuestionIndex);
  }

  function resetGame() {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCompletedQuestions(0);
    initializeQuestion(0);
  }

  function startGame() {
    setPage("quiz");
    resetGame();
    initializeQuestion(0);
  }

  function submit() {
    if (isCorrect) {
      const questionScore = 250 + completedQuestions * 50;
      setScore((prev) => prev + questionScore);
      setCompletedQuestions((prev) => prev + 1);
      setMessage(`Correct! +${questionScore} points`);

      setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
          const nextIndex = currentQuestionIndex + 1;
          setCurrentQuestionIndex(nextIndex);
          initializeQuestion(nextIndex);
        } else {
          setPage("end");
        }
      }, 900);
    } else {
      setMessage(
        `Not quite. Try arranging the pieces to make ${currentQuestion.answer}.`
      );
    }
  }

  return (
    <main className="min-h-screen w-full shadow-none text-[#12221c] flex items-center justify-center p-4">
      <div className="w-full">
        {page === "start" && <StartScreen onStart={startGame} />}

        {page === "quiz" && currentQuestion && (
          <div className="relative">
            <Chalkboard>
              {/* Mission header */}
              <div className="flex flex-col items-center gap-1">
                <p className="text-white/90 text-xl tracking-wide">
                  📌 MISSION: {currentQuestion.description}
                </p>
                <p className="text-white/70 text-[13px] uppercase tracking-wider">
                  {currentQuestion.instruction}
                </p>
                <div className="w-80 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6EE7B7] rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <p className="text-white/70 text-[12px] mt-1">
                  Question {currentQuestionIndex + 1} of {totalQuestions} |
                  Score: {score}
                </p>
              </div>

              {/* Build panel */}
              <div className="mt-3 w-full flex justify-center">
                <div className="bg-[#2e7a58] rounded-xl p-5 w-[min(760px,92%)]">
                  <p className="text-center text-white/90 text-sm mb-3 font-sans">
                    Build Your Equation:
                  </p>

                  {/* Dynamic slots */}
                  <div
                    className={`grid gap-3 ${
                      currentQuestion.slots.length <= 5
                        ? "grid-cols-5"
                        : "grid-cols-6"
                    }`}
                  >
                    {slots.map((slot) => (
                      <div
                        key={slot.id}
                        onDrop={(e) => onDropToSlot(e, slot.id)}
                        onDragOver={onDragOver}
                        className={[
                          "h-12 w-full rounded-md flex items-center justify-center",
                          slot.accept === "equals"
                            ? "bg-white/20 text-white"
                            : "bg-white/10",
                        ].join(" ")}
                        aria-label={`drop zone for ${slot.accept}`}
                        role="button"
                        tabIndex={0}
                      >
                        {slot.accept === "equals" ? (
                          <span className="text-white text-lg font-semibold font-sans">
                            =
                          </span>
                        ) : slot.piece ? (
                          <DraggableChip
                            key={slot.piece.id}
                            piece={slot.piece}
                            from={`slot:${slot.id}`}
                            onDragStart={onDragStart}
                            zig={0}
                            inSlot={true}
                          />
                        ) : (
                          <span className="text-white/70 text-xs capitalize">
                            {slot.accept}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pool (enlarged area, no scrollbar, zig-zag in row but wraps if needed) */}
              <div className="mt-2 lg:mt-4 w-full flex justify-center">
                <div className="w-[min(900px,92%)] mx-8 md:mx-12">
                  <div className="rounded-lg px-4 py-4 min-h-[96px] flex flex-wrap justify-center gap-8 overflow-hidden">
                    {pool.map((piece, i) => (
                      <DraggableChip
                        key={piece.id}
                        piece={piece}
                        from="pool"
                        onDragStart={onDragStart}
                        zig={i % 2 === 0 ? -8 : 10}
                        size="lg"
                        inSlot={false}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions (all buttons down) */}
              <div className="mt-2 lg:mt-4 flex items-center justify-center gap-5">
                <button
                  onClick={() => {
                    resetGame();
                    setPage("start");
                  }}
                  className="px-5 py-2.5 rounded-full bg-white text-[#175C3A] text-sm font-semibold font-sans cursor-pointer"
                >
                  {"< Back"}
                </button>
                <button
                  onClick={submit}
                  className="px-6 py-2.5 rounded-full bg-[#F470A4] text-white text-sm font-semibold font-sans hover:brightness-110 cursor-pointer"
                  disabled={message.includes("Correct!")}
                >
                  Submit {">"}
                </button>
                <button
                  onClick={resetCurrentQuestion}
                  className="px-5 py-2.5 rounded-full bg-white/90 text-[#175C3A] text-sm font-semibold font-sans cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {message && (
                <p
                  className={`mt-4 text-center ${
                    message.includes("Correct!")
                      ? "text-green-300"
                      : "text-white"
                  }`}
                >
                  {message}
                </p>
              )}
            </Chalkboard>
          </div>
        )}

        {page === "end" && (
          <Chalkboard>
            <div className="flex flex-col items-center gap-6 mt-4">
              <div className="text-5xl md:text-4xl font-extrabold font-sans tracking-[0.4em] text-white text-center">
                ALGEBRA MASTER!
              </div>
              <p className="text-white/90 text-center max-w-md text-2xl leading-relaxed">
                You`ve completed all {totalQuestions} math puzzles!
              </p>
              <div className="text-white text-3xl font-bold font-sans tracking-wider">
                FINAL SCORE: {score}
              </div>
              <div className="text-white/80 text-lg font-sans">
                Questions Completed: {completedQuestions}/{totalQuestions}
              </div>
              <button
                onClick={() => {
                  resetGame();
                  setPage("start");
                }}
                className="px-6 py-2 rounded-full bg-white text-[#175C3A] font-semibold font-sans cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </Chalkboard>
        )}
      </div>
    </main>
  );
}

function DraggableChip({
  piece,
  from,
  onDragStart,
  zig = 0,
  size = "md",
  inSlot = false,
}: {
  piece: Piece;
  from: "pool" | `slot:${string}`;
  onDragStart: (
    e: React.DragEvent,
    piece: Piece,
    source: "pool" | `slot:${string}`
  ) => void;
  zig?: number;
  size?: "md" | "lg";
  inSlot?: boolean;
}) {
  const mainStyle =
    piece.type === "number"
      ? "bg-[#1F78C6] text-white"
      : piece.type === "variable"
      ? "bg-[#CFF5D0] text-[#1B6A2F]"
      : "bg-[#FFB020] text-white";

  const dims = inSlot
    ? "h-full w-full text-lg"
    : size === "lg"
    ? "h-11 w-16 text-2xl"
    : "h-12 w-14 text-2xl";

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, piece, from)}
      className={`select-none cursor-grab active:cursor-grabbing ${dims} flex items-center justify-center rounded-lg shadow-lg ${mainStyle} font-extrabold transition-transform duration-200`}
      style={{
        transform: `translateY(${!inSlot && from === "pool" ? zig : 0}px)`,
      }}
      aria-label={`drag ${piece.label}`}
      role="button"
      tabIndex={0}
      title="Drag me"
    >
      <span className="pointer-events-none leading-none">{piece.label}</span>
    </div>
  );
}

function Chalkboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div
        // reduced height for compact / popup-like appearance:
        className="relative w-full aspect-[1218/630] bg-center bg-contain bg-no-repeat max-h-[650px]"
        style={{ backgroundImage: `url(${gameboardImg.src})` }}
        role="img"
        aria-label="Chalkboard"
      >
        <div className="absolute inset-0 px-8 md:px-20 py-8 md:py-12 flex flex-col items-center justify-start">
          {children}
        </div>
      </div>
    </div>
  );
}

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative">
      <Chalkboard>
        <div className="flex flex-col items-center justify-center h-full">
          <button onClick={onStart}>
            <Image
              src={startquiz}
              alt="Start Quiz"
              width={300}
              height={300}
              className="cursor-pointer"
            />
          </button>
        </div>
      </Chalkboard>
    </div>
  );
}

function safeParse(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
