// AllAssignmentPopup.tsx
"use client";
import React from "react";
import { X } from "lucide-react";

export type Assignment = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  dueOn: string;
  marks: string; // ex "85% (85/100)" or "-"
  grade: string; // ex "A" or "-"
  status: "completed" | "overdue" | "not_submitted";
};

type Props = {
  open: boolean;
  onClose: () => void;
  assignments?: Assignment[];
};

const sampleAssignments: Assignment[] = [
  {
    id: "1",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    dueDate: "10/10/2024",
    dueOn: "10/10/2024",
    marks: "85% (85/100)",
    grade: "A",
    status: "completed",
  },
  {
    id: "2",
    title: "Chemical Reactions",
    subject: "Chemistry",
    dueDate: "10/10/2024",
    dueOn: "Not Submitted",
    marks: "-",
    grade: "-",
    status: "overdue",
  },
  {
    id: "3",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    dueDate: "10/10/2024",
    dueOn: "10/10/2024",
    marks: "85% (85/100)",
    grade: "A",
    status: "completed",
  },
  {
    id: "4",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    dueDate: "10/10/2024",
    dueOn: "10/10/2024",
    marks: "85% (85/100)",
    grade: "A",
    status: "completed",
  },
  {
    id: "5",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    dueDate: "10/10/2024",
    dueOn: "10/10/2024",
    marks: "85% (85/100)",
    grade: "A",
    status: "completed",
  },
  {
    id: "6",
    title: "Chemical Reactions",
    subject: "Chemistry",
    dueDate: "10/10/2024",
    dueOn: "Not Submitted",
    marks: "-",
    grade: "-",
    status: "overdue",
  },
];

export default function AllAssignmentPopup({ open, onClose, assignments = sampleAssignments }: Props) {
  if (!open) return null;

  const displayStatus = (status: Assignment["status"]) => {
    if (status === "completed") return "Completed";
    if (status === "overdue") return "Overdue";
    return "Not Submitted";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop closes popup */}
      <button aria-label="Close popup" onClick={onClose} className="absolute inset-0 bg-black/50" />

      {/* Modal Card - matches AllQuizResultPopup structure */}
      <div className="relative w-[95%] max-w-5xl rounded-[21px] bg-[#EDEDED] p-3 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="rounded-[18px] bg-white p-4 sm:p-5 lg:p-6 border border-[#E2E2E2]">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl sm:text-2xl font-bold text-[#333] font-lato">All Assignments</p>
            <button
              aria-label="Close"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6 text-[#333C41]" strokeWidth={1.5} />
            </button>
          </div>

          {/* Table */}
          <div className="flex flex-col gap-4">
            {/* Headers (desktop) */}
            <div className="hidden lg:grid lg:grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.2fr_1.2fr_1.2fr] gap-4 px-6 sm:px-10 py-4 border-b border-[#DADADA] bg-white">
              <div className="text-zinc-800 font-poppins text-base font-medium">Assignment Title</div>
              <div className="text-zinc-800 font-poppins text-base font-medium">Subject</div>
              <div className="text-zinc-800 font-poppins text-base font-medium">Due Date</div>
              <div className="text-zinc-800 font-poppins text-base font-medium">Due On</div>
              <div className="text-zinc-800 font-poppins text-base font-medium">Marks</div>
              <div className="text-zinc-800 font-poppins text-base font-medium">Grade</div>
              <div className="text-zinc-800 font-poppins text-base font-normal">Status</div>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-3  h-full ">
              {assignments.map((a) => (
                <div
                  key={a.id}
                  className={`rounded-lg transition-all ${
                    a.status === "completed"
                      ? "bg-[rgba(239,255,249,0.48)]"
                      : "bg-[rgba(255,245,245,0.56)]"
                  }`}
                  style={{ boxShadow: "0 0 6.1px 0 rgba(0, 0, 0, 0.09)" }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.2fr_1.2fr_1.2fr] gap-2 lg:gap-4 px-4 sm:px-10 py-5 lg:py-6">
                    {/* Assignment Title */}
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Assignment Title</span>
                      <span className="text-sm text-[#333] font-lato">{a.title}</span>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Subject</span>
                      <span className="text-sm text-[#333] font-lato">{a.subject}</span>
                    </div>

                    {/* Due Date */}
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Due Date</span>
                      <span className="text-sm text-[#333] font-lato">{a.dueDate}</span>
                    </div>

                    {/* Due On */}
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Due On</span>
                      <span className="text-sm text-[#333] font-lato">{a.dueOn}</span>
                    </div>

                    {/* Marks */}
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Marks</span>
                      {a.marks === "-" ? (
                        <span className="text-sm text-[#333] font-lato">-</span>
                      ) : (
                        <div className="flex items-end gap-1">
                          <span className="text-base text-[#666] font-lato font-bold">{a.marks.split(" ")[0]}</span>
                          <span className="text-[13px] text-[#999] font-lato">{a.marks.match(/\(.+\)/)?.[0]}</span>
                        </div>
                      )}
                    </div>

                    {/* Grade */}
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Grade</span>
                      <div className="w-8 p-1.5 rounded-[5px] outline outline-offset-[-1px] outline-stone-300 flex items-center justify-center">
                        <div className="text-zinc-800 text-base font-semibold font-['Lato']">{a.grade}</div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col lg:block">
                      <span className="text-xs text-[#999] font-poppins lg:hidden mb-1">Status</span>
                      <div
                        className={`inline-flex px-2 py-1 rounded-md w-fit opacity-80 ${
                          a.status === "completed"
                            ? "bg-[rgba(28,166,114,0.1)] text-[#1CA672]"
                            : "bg-[rgba(220,53,69,0.1)] text-[#DC3545]"
                        }`}
                      >
                        <span className="text-base font-poppins">{displayStatus(a.status)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
