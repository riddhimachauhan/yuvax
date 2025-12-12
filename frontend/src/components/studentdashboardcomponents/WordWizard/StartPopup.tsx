"use client";
import React from "react";
import Image from "next/image";
import { Elsie } from "next/font/google";

import bg1 from "@/assets/WordWizard1.svg";

const elsie = Elsie({ subsets: ["latin"], weight: "900" });

export default function StartPopup({ onStart }: { onStart: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div
        className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden border border-zinc-800"
      >
        <Image src={bg1} alt="Word Wizard start background" fill priority className="object-cover" />
        <button
          aria-label="close"
          className="absolute right-4 top-3 text-zinc-800/80 hover:text-black"
          onClick={onStart}
        >
          ✕
        </button>
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-10">
          <div className="hidden md:block" />
          <div className="text-center drop-shadow-[0_2px_0_rgba(0,0,0,0.15)]">
            <p
              className={`${elsie.className} text-white [text-shadow:2px_2px_0_rgba(0,0,0,0.25)]`}
              style={{ fontSize: "146.31px", lineHeight: "100%", letterSpacing: "0px" }}
            >
              <span className="block">Word</span>
              <span className="block mt-2">Wizardy</span>
            </p>
            <button
              onClick={onStart}
              className="mt-8 inline-flex items-center justify-center rounded-md bg-pink-500 px-6 py-3 text-white text-lg font-semibold shadow hover:bg-pink-600 transition"
            >
              Start Game
            </button>
          </div>
          <div className="hidden md:block" />
        </div>
      </div>
    </div>
  );
}
