"use client";
import React from "react";
import Image from "next/image";
import bg3 from "@/assets/WordWizard3.svg";
import { Elsie } from "next/font/google";

const elsie = Elsie({ subsets: ["latin"], weight: "900" });

export default function WinPopup({ score, onRestart }: { score: number; onRestart: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div
        className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden border border-zinc-800"
      >
        <Image src={bg3} alt="Word Wizard win background" fill priority className="object-cover" />
        <button
          aria-label="close"
          className="absolute right-4 top-3 text-zinc-800/80 hover:text-black"
          onClick={onRestart}
        >
          ✕
        </button>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">🏆</div>
            <p
              className={`${elsie.className} text-white [text-shadow:2px_2px_0_rgba(0,0,0,0.25)]`}
              style={{ fontSize: "65px", lineHeight: "69.5px", letterSpacing: "0px" }}
            >
              <span className="block">Word Wizard</span>
              <span className="block mt-2">Master</span>
            </p>
            <p className="text-white mt-6 text-lg">You have completed all the magical puzzles!</p>
            <p className="text-white mt-2 text-xl font-semibold">Your Score: {score}</p>
            <button
              onClick={onRestart}
              className="mt-8 inline-flex items-center justify-center rounded-md bg-pink-500 px-6 py-3 text-white text-lg font-semibold shadow hover:bg-pink-600 transition"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
