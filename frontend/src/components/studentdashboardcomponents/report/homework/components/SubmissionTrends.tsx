"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, Filler } from "chart.js";
import type { TooltipItem } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Filler);

export default function SubmissionTrendsChart() {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "On Time",
        data: [9, 12, 10, 9, 12, 11],
        backgroundColor: "#1CA672",
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: "Late",
        data: [3, 0, 2, 3, 0, 1],
        backgroundColor: "#FB2C36",
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: {
          color: "#6B7280",
          font: { size: 13 },
        },
      },
      y: {
        stacked: true,
        min: 0,
        max: 20,
        ticks: {
          stepSize: 3,
          color: "#6B7280",
          font: { size: 13 },
        },
        grid: {
          color: "#E5E7EB",
          borderDash: [4, 4],
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        align: "center" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          boxWidth: 8,
          boxHeight: 8,
          padding: 16,
          color: "#374151",
          font: { size: 13 },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: (context: TooltipItem<"bar">) => {
            const label = context.dataset?.label ?? "";
            const parsed = context.parsed as unknown;
            let value = 0;
            if (typeof parsed === "number") {
              value = parsed;
            } else if (parsed && typeof (parsed as { y?: unknown }).y === "number") {
              value = (parsed as { y: number }).y;
            } else {
              value = 0;
            }
            return `${label}: ${value}`;
          },
        },
      },
    },
    barPercentage: 0.7,
    categoryPercentage: 0.8,
  } as const;

  return (
    <div className="w-full h-full bg-white rounded-[21px] p-8">
      <p className="text-2xl font-semibold text-gray-800 mb-6">Submission Trends</p>
      <div className="w-full h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
