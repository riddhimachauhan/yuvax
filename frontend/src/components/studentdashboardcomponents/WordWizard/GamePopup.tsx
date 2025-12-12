"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Elsie } from "next/font/google";
import bg2 from "@/assets/WordWizard2.svg";
import timeIcon from "@/assets/time.svg";
import trophyIcon from "@/assets/trophy.svg";
import correctBg from "@/assets/correct_word_wizard.svg";
import rightAnswerIcon from "@/assets/right_answer_img.svg";
import notCorrectBg from "@/assets/not-correct_word_wizard.svg";
import wrongAnswerIcon from "@/assets/wronganswerimg.svg";

import type { Question } from "@/app/dashboard/wordwizard/page";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function difficultyPoints(len: number) {
  if (len <= 3) return 100;
  if (len <= 5) return 150;
  return 200;
}

const elsie = Elsie({ subsets: ["latin"], weight: "900" });

// Word pools and picker outside component to avoid hook deps churn
const beginnerWords = ["cat", "sun", "map", "fox", "jar", "gem", "owl"] as const;
const intermediateWords = ["cloud", "piano", "magic", "river", "stone", "wolf", "trail"] as const;
const advancedWords = ["wizard", "mystery", "planet", "galaxy", "throne", "castle", "dragon"] as const;

function pickWordByDifficulty(difficulty: Question["difficulty"]): string {
  const pool =
    difficulty === "beginner"
      ? beginnerWords
      : difficulty === "intermediate"
      ? intermediateWords
      : advancedWords;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

export default function GamePopup({
  index,
  total,
  question,
  score,
  onCorrect,
  onRetry,
}: {
  index: number;
  total: number;
  question: Question;
  score: number;
  onCorrect: (points: number) => void;
  onRetry: () => void;
}) {
  const [bank, setBank] = useState<string[]>([]); // remaining letters
  const [picked, setPicked] = useState<string[]>([]); // arranged letters
  const [usedHint, setUsedHint] = useState(0);
  const [showResult, setShowResult] = useState<null | "correct" | "wrong">(null);
  const [pendingPoints, setPendingPoints] = useState(0);
  const [evaluated, setEvaluated] = useState(false);

  // Active answer for this round (auto-generated each time index/difficulty changes)
  const [activeAnswer, setActiveAnswer] = useState<string>("");
  useEffect(() => {
    const word = pickWordByDifficulty(question.difficulty).toLowerCase();
    setActiveAnswer(word);
  }, [index, question.difficulty]);

  const letters = useMemo(() => activeAnswer.split(""), [activeAnswer]);

  useEffect(() => {
    setBank(shuffle(letters));
    setPicked([]);
    setUsedHint(0);
    setShowResult(null);
    setPendingPoints(0);
    setEvaluated(false);
  }, [letters]);

  const progress = ((index + 1) / total) * 100;
  const canCast = picked.length === letters.length;

  // Local score to reflect hint deductions without touching parent
  const [localScore, setLocalScore] = useState<number>(score);
  useEffect(() => {
    setLocalScore(score);
  }, [score]);

  // Countdown timer: 10:00 that persists across question mounts
  const START_MS = 10 * 60 * 1000;
  const STORAGE_KEY = "ww_timer_remaining";
  const [remainingMs, setRemainingMs] = useState<number>(() => {
    if (typeof window === "undefined") return START_MS;
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    return saved ? Math.max(0, parseInt(saved, 10)) : START_MS;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingMs((prev) => {
        const next = Math.max(0, prev - 1000);
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(STORAGE_KEY, String(next));
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mm = String(Math.floor(remainingMs / 60000)).padStart(2, "0");
  const ss = String(Math.floor((remainingMs % 60000) / 1000)).padStart(2, "0");

  const onDropToPicked = (char: string, fromIdx: number) => {
    setBank((b) => b.filter((_, i) => i !== fromIdx));
    setPicked((p) => [...p, char]);
  };

  const onRemovePicked = (idx: number) => {
    setPicked((p) => {
      const copy = [...p];
      const [ch] = copy.splice(idx, 1);
      setBank((b) => [...b, ch]);
      return copy;
    });
  };

  const evaluateAttempt = () => {
    if (evaluated) return;
    if (picked.length !== letters.length) return;
    const attempt = picked.join("");
    if (attempt.toLowerCase() === activeAnswer) {
      const base = difficultyPoints(letters.length);
      const pts = Math.max(0, base - usedHint * 25);
      setPendingPoints(pts);
      setShowResult("correct");
    } else {
      setShowResult("wrong");
    }
    setEvaluated(true);
  };

  const castSpell = () => {
    evaluateAttempt();
  };

  useEffect(() => {
    if (picked.length === letters.length) {
      if (!evaluated) {
        const attempt = picked.join("");
        if (attempt.toLowerCase() === activeAnswer) {
          const base = difficultyPoints(letters.length);
          const pts = Math.max(0, base - usedHint * 25);
          setPendingPoints(pts);
          setShowResult("correct");
        } else {
          setShowResult("wrong");
        }
        setEvaluated(true);
      }
    } else {
      setEvaluated(false);
      setShowResult(null);
    }
  }, [picked, letters.length, activeAnswer, usedHint, evaluated]);

  const hint = () => {
    if (picked.length < letters.length) {
      const nextCorrect = letters[picked.length];
      // find an occurrence in bank
      const idx = bank.findIndex((c) => c === nextCorrect);
      if (idx !== -1) {
        onDropToPicked(nextCorrect, idx);
        setUsedHint((h) => h + 1);
        // Deduct 5 points from local score for each hint usage
        setLocalScore((s) => s - 5);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div
        className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden border border-zinc-800"
      >
        <Image src={bg2} alt="Word Wizard gameplay background" fill priority className="object-cover" />
        {/* Top heading and progress */}
        <div className="absolute left-8 right-8 top-8">
          <div className="flex items-start justify-between text-white">
            {/* Left description */}
            <div className="flex items-start gap-3">
              <span className="text-xl">🎯</span>
              <div>
                <div className="font-semibold text-xl md:text-2xl">Magical Challenge:</div>
                <div className="text-sm md:text-base opacity-90">Rearrange the magical letters to form the correct word!</div>
              </div>
            </div>

            {/* Right-side timer & XP (vertical) */}
            <div className="hidden md:flex flex-col items-start gap-3 pr-1">
              <div className="flex items-center gap-2">
                <Image src={timeIcon} alt="timer" width={22} height={22} />
                <span className="text-white font-semibold drop-shadow">{mm}:{ss}</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src={trophyIcon} alt="xp" width={22} height={22} />
                <span className="text-white font-semibold drop-shadow">{localScore} XP</span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="h-3 rounded-full bg-white/50 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 via-green-400 to-yellow-400 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center text-white mt-1 text-sm">Question {index + 1} of {total}</div>
          </div>
        </div>

        {/* Main area */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-24">
          <h2
            className={`${elsie.className} text-white [text-shadow:2px_2px_0_rgba(0,0,0,0.25)] mb-6`}
            style={{ fontSize: "64px", lineHeight: "100%", letterSpacing: "0px" }}
          >
            Cast your spell:
          </h2>

          {/* Answer box */}
          <div
            className="w-[min(720px,90vw)] min-h-[70px] rounded-2xl bg-white/80 backdrop-blur-sm text-zinc-700 flex flex-wrap items-center gap-3 justify-center px-4 py-4 border border-white/70"
            onDragOver={(e) => e.preventDefault()}
          >
            {picked.length === 0 && (
              <span className="opacity-60">Drag letters here or type your answer</span>
            )}
            {picked.map((c, i) => (
              <button
                key={i}
                className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 font-bold grid place-items-center shadow"
                onClick={() => onRemovePicked(i)}
                title="Remove letter"
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Bank letters */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            {bank.map((c, i) => (
              <div
                key={`${c}-${i}`}
                className="w-16 h-16 rounded-full bg-white text-pink-600 text-2xl font-bold grid place-items-center shadow cursor-grab select-none"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", JSON.stringify({ c, i }));
                }}
                onDoubleClick={() => onDropToPicked(c, i)}
                onDragEnd={() => {
                  // if dropped over answer box, handle in onDrop via window listener
                }}
              >
                {c.toUpperCase()}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={hint}
              className="px-4 py-2 rounded-md bg-white text-pink-600 font-semibold border border-pink-200 hover:bg-pink-50"
            >
              Get Hint (-5 pts)
            </button>
            <button
              onClick={castSpell}
              disabled={!canCast}
              className={`px-5 py-2 rounded-md text-white font-semibold shadow ${canCast ? "bg-slate-700 hover:bg-slate-800" : "bg-slate-400 cursor-not-allowed"}`}
            >
              Cast Spell
            </button>
            <button
              onClick={() => {
                setBank(shuffle(letters));
                setPicked([]);
                setUsedHint(0);
              }}
              className="px-4 py-2 rounded-md bg-white/80 text-slate-700 border border-white/70 hover:bg-white"
            >
              Reset
            </button>
          </div>

          {/* Score inline */}
          <div className="mt-3 text-white drop-shadow">Score: {localScore}</div>
        </div>

        {/* Drop handling overlay */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[46%] w-[min(740px,92vw)] h-[90px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            try {
              const data = JSON.parse(e.dataTransfer.getData("text/plain"));
              if (data && typeof data.i === "number" && typeof data.c === "string") {
                onDropToPicked(data.c, data.i);
              }
            } catch {}
          }}
        />

        {showResult && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-[min(940px,95vw)] h-[220px] rounded-2xl overflow-hidden shadow-2xl pointer-events-auto">
              <Image
                src={showResult === "correct" ? correctBg : notCorrectBg}
                alt={showResult === "correct" ? "Correct" : "Not Correct"}
                fill
                className="object-cover pointer-events-none"
                priority
              />
              <button
                className="absolute top-2 right-2 text-white/90 bg-black/30 hover:bg-black/40 rounded-full w-8 h-8 grid place-items-center z-[2]"
                onClick={() => {
                  if (showResult === "correct") {
                    const pts = pendingPoints;
                    setShowResult(null);
                    setPendingPoints(0);
                    setTimeout(() => onCorrect(pts), 0);
                  } else {
                    setShowResult(null);
                    onRetry();
                    setBank(shuffle(letters));
                    setPicked([]);
                    setUsedHint(0);
                  }
                }}
                aria-label="Close"
                title="Close"
                type="button"
              >
                ×
              </button>
              <div className="relative z-[1] h-full w-full flex items-center gap-6 px-8">
                <div className="shrink-0">
                  <Image
                    src={showResult === "correct" ? rightAnswerIcon : wrongAnswerIcon}
                    alt="result icon"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="text-white">
                  <div className="text-4xl font-extrabold mb-2">
                    {showResult === "correct" ? "Awesome!" : "Not quite!"}
                  </div>
                  <div className="text-xl leading-snug max-w-[620px]">
                    Jupiter is the biggest planet — it’s like a giant ball of gas. Try next time!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
