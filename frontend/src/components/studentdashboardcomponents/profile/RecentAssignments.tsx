"use client";

import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import Tick from "@/assets/tick.svg";
import AllAssignmentPopup from "./AllAssignmentPopup";

const Row = () => (
  <div className="rounded-xl border border-gray-100 p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
          <Image src={Tick} alt="Completed" width={24} height={24} />
    <div>
      <div className="text-xs text-green-600 font-medium">Mathematics</div>
      <div className="text-[20px] font-semibold text-[#666666]">Algebra Fundamentals</div>
      <div className="text-xs text-[#999999]">Due: 10/1/2024 • Submitted: 10/1/2024</div>
    </div>
    </div>
    <div className="text-right">
      <div className="text-[24px] font-semibold text-[#666666]">85%</div>
      <div className="text-xs text-[#999999]">Grade: A</div>
    </div>
  </div>
);

const RecentAssignments: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[20px] font-semibold text-[#333333] ">Recent Assignments</p>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          className="text-xs text-gray-500"
        >
          View More →
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <Row />
        <Row />
        <Row />
      </div>
      <AllAssignmentPopup open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default RecentAssignments;
