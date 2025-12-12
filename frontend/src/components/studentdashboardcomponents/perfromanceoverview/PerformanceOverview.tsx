"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

import overallIcon from "@/assets/overall.svg";
import quizIcon from "@/assets/quizz.svg";
import attendanceIcon from "@/assets/attendance.svg";
import courseCompleteIcon from "@/assets/coursecomplete.svg";
import studyHoursIcon from "@/assets/studyhours.svg";
import submissionRateIcon from "@/assets/submissionrate.svg";

import type { PerformanceOverviewProps, PerformanceMetric } from "./types";
import type { User } from "@/lib/types";
import { api } from "@/lib/apiClient";

// type LocalAuth = { user?: User | null; token?: string | null };

export default function PerformanceOverview({
  className = "",
  performanceData: initialPerformanceData = [],
}: PerformanceOverviewProps) {
  // const router = useRouter();

  const [performanceData, setPerformanceData] = useState<PerformanceMetric[]>(
    initialPerformanceData.length > 0
      ? initialPerformanceData
      : [

      ]
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  useEffect(() => {
    const fetchPerformance = async () => {
      setLoading(true);
      setErrorMsg(null);
      setStatusCode(null);

      try {

        // Make the request
        const resp = await api.get(
          "/api/dashboard/overview",
          {

            timeout: 10000,
          }
        );

        // handle normal success
        const data = resp?.data;
        if (data?.success && data.data) {
          const performance_data = data.data;
          const mapped: PerformanceMetric[] = [
            {
              title: "Overall Score",
              value:
                performance_data.overallScore !== undefined
                  ? `${performance_data.overallScore}%`
                  : "—",
              trend: "down",
              trendValue: "0%",
              trendLabel: "Since Last Week",
              icon: overallIcon,
            },
            {
              title: "Quizzes Score",
              value:
                performance_data.quizzesScore !== undefined
                  ? `${performance_data.quizzesScore}%`
                  : "—",
              trend: "up",
              trendValue: "10%",
              trendLabel: "Since Last Week",
              icon: quizIcon,
            },
            {
              title: "Attendance",
              value:
                performance_data.attendance !== undefined
                  ? `${performance_data.attendance}%`
                  : "—",
              trend: "down",
              trendValue: "0%",
              trendLabel: "Since Last Month",
              icon: attendanceIcon,
            },
            {
              title: "Course Complete",
              value:
                performance_data.coursesComplete !== undefined
                  ? `${performance_data.coursesComplete}`
                  : "0",
              trend: "up",
              trendValue: "0%",
              trendLabel: "Since Last Week",
              icon: courseCompleteIcon,
            },
            {
              title: "Study Hours",
              value:
                performance_data.studyHours !== undefined
                  ? `${performance_data.studyHours}`
                  : "0",
              trend: "up",
              trendValue: "0",
              trendLabel: "Since Last Week",
              icon: studyHoursIcon,
            },
            {
              title: "Submission Rate",
              value:
                performance_data.submissionRate !== undefined
                  ? `${performance_data.submissionRate}%`
                  : "—",
              trend: "down",
              trendValue: "0%",
              trendLabel: "Since Last Month",
              icon: submissionRateIcon,
            },
          ];
          setPerformanceData(mapped);
          setLoading(false);
          return;
        }

        // If we reach here, the API returned but did not include expected data
        setErrorMsg("Unexpected response from server.");
        setLoading(false);
        console.warn("[PerformanceOverview] unexpected API response:", data);
      } catch (err: unknown) {
        // Detailed axios error handling
        setLoading(false);

        // Non-axios error
        console.error("[PerformanceOverview] unknown error", err);
        setErrorMsg("An unexpected error occurred.");
      }
    };

    fetchPerformance();
  }, []);

  return (
    <Card
      className={`rounded-3xl p-5 shadow-2xl border-none scroll-smooth ${className}`}
      style={{ background: "linear-gradient(360deg,#1CA672,#0A9C9D)" }}
    >
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-white">Performance Overview</h2>
      </div>

      {/* Error banner */}
      {errorMsg && (
        <div className="mt-3 text-sm text-yellow-800 bg-yellow-100 border border-yellow-200 p-2 rounded">
          {errorMsg} {statusCode ? <strong>({statusCode})</strong> : null}
        </div>
      )}

      {/* Loading skeleton minimal */}
      {loading ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl px-3 py-6 animate-pulse"
            >
              <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
              <div className="h-8 w-20 bg-gray-200 rounded mb-4" />
              <div className="h-4 w-36 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {performanceData.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl px-3 py-4 flex items-center justify-between"
            >
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-[#666666]">
                    {item.title}
                  </span>
                  <HelpCircle className="w-3 h-3 text-[#999999]" />
                </div>
                <div className="text-2xl font-bold text-[#333]">{item.value}</div>
                <div className="flex items-center gap-0.5 flex-wrap">
                  {item.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 text-[#00C239] flex-shrink-0" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-[#DC3545] flex-shrink-0" />
                  )}
                  <span
                    className={`text-xs font-bold ${item.trend === "up" ? "text-[#00C239]" : "text-[#DC3545]"
                      }`}
                  >
                    {item.trendValue}
                  </span>
                  <span className="text-xs ml-0.5 text-[#999] whitespace-nowrap">
                    {item.trendLabel}
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <Image src={item.icon} alt={item.title} className="w-10 h-10" />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
