"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Tick from "@/assets/tick.svg";
import RedTick from "@/assets/red-tick.svg";

const assignments = [
  {
    title: "Polynomial Practice Set",
    time: "2 days ago",
    score: "92%",
    status: "Completed",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    title: "Quadratic Word Problems",
    time: "3 days ago",
    score: "88%",
    status: "Complete",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    title: "Function Graphing Exercise",
    time: "5 day overdue",
    score: null,
    status: "Overdue",
    statusColor: "bg-red-50 text-red-700 border-red-200",
  },
  {
    title: "Linear Equations Worksheet",
    time: "1 week ago",
    score: "95%",
    status: "Completed",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
];

const RecentAssignments: React.FC = () => {
  return (
    // Ensure this card fills the flex container on the right column
    <Card className="p-6 bg-white rounded-[21px] border-0 w-full h-full flex-1">
      <p className="text-2xl font-semibold text-gray-900 mb-6">Recent Assignments</p>

      <div className="space-y-4">
        {assignments.map((assignment, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            {/* Directly render the icon SVG without the colored circular wrapper */}
            {assignment.status === "Overdue" ? (
              <Image
                src={RedTick}
                alt="Overdue"
                width={22}
                height={22}
                aria-hidden
              />
            ) : (
              <Image
                src={Tick}
                alt="Completed"
                width={22}
                height={22}
                aria-hidden
              />
            )}

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                {assignment.title}
              </h3>
              <p className="text-xs text-gray-500">{assignment.time}</p>
            </div>

            <div className="flex items-center gap-3">
              {assignment.score && (
                <span className="text-sm font-semibold text-gray-900">
                  {assignment.score}
                </span>
              )}
              <Badge
                variant="outline"
                className={`${assignment.statusColor} border font-medium`}
              >
                {assignment.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentAssignments;
