"use client";

import { useEffect, useState } from "react";

interface DashboardData {
  overallScore: number;
  quizzesScore: number;
  attendance: number;
  coursesComplete: number;
  studyHours: string;
  submissionRate: number;
  streakDays: number;
  xp: number;
  notificationsCount: number;
}

export function useDashboardOverview() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/dashboard/overview"); // adjust baseURL if server-side
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    }
    fetchData();
  }, []);

  return data;
}
