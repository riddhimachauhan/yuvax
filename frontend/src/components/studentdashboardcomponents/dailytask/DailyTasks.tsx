"use client";

import React from "react";
import { CheckCircle, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DailyTasksProps, TaskItem } from "@/lib/types/studentdashboard/types";

const defaultTasks: TaskItem[] = [
  { completed: true,  title: "Design System", date: "01 Feb 2025", grade: "86/100" },
  { completed: true,  title: "Design System", date: "01 Feb 2025", grade: "86/100" },
  { completed: false, title: "Design System", date: "01 Feb 2025", grade: "86/100" },
  { completed: false, title: "Design System", date: "01 Feb 2025", grade: "86/100" },
  { completed: false, title: "Design System", date: "01 Feb 2025", grade: "86/100" },
];

export default function DailyTasks({
  tasks = defaultTasks,
  total = defaultTasks.length,
  completedCount = defaultTasks.filter(t => t.completed).length,
  badgeCount = total + completedCount, // example badge logic
  className = "",
}: DailyTasksProps) {
  return (
    <Card className={`rounded-3xl bg-white p-5 shadow-2xl border-none ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#111]">Daily Tasks</h3>
        <Badge className="bg-red-500 text-white text-xs px-2">{badgeCount}</Badge>
      </div>
      <div className="flex items-center gap-1">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <div className="text-xs text-[#666]">
          {completedCount}/{total} completed
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 rounded-xl border border-[#E5E5E5]"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {task.completed ? (
                <CheckCircle className="w-4 h-4 text-green-500 fill-green-500 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-[#999] flex-shrink-0" />
              )}
              <div className="min-w-0">
                <div className={`text-xs font-bold ${task.completed ? "text-[#333]" : "text-[#666]"}`}>
                  {task.title}
                </div>
                <div className={`text-[10px] ${task.completed ? "text-[#666]" : "text-[#999]"}`}>
                  {task.date}
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className={`text-xs font-bold ${task.completed ? "text-[#333]" : "text-[#666]"}`}>
                {task.grade}
              </div>
              <div className={`text-[10px] ${task.completed ? "text-[#666]" : "text-[#999]"}`}>
                Grade
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}


