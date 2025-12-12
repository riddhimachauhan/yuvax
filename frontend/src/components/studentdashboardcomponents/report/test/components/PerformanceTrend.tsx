"use client";

import React from "react";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ScriptableContext,
  ChartData,
  ChartOptions,
  ChartDataset,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import LegendNode from "@/assets/LegendNode.svg";
// Register Chart.js components & plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartDataLabels
);

const PerformanceTrend: React.FC = () => {
  const labels: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const dataValues: number[] = [19.33, 23.35, 61.19, 26.34, 59.5, 20.67, 51.53, 92.93];

  // Chart.js typed data object
  const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      ({
        label: "Performance",
        data: dataValues,
        borderColor: "#1CA672", // Requested green color
        // gradient via scriptable context
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(139, 92, 246, 0.3)"); // Purple/indigo with opacity
          gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.15)");
          gradient.addColorStop(1, "rgba(139, 92, 246, 0)"); // Fade to transparent
          return gradient;
        },
        borderWidth: 1.05, // Requested line width
        fill: true,
        tension: 0.4, // Smooth curve
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#1CA672",
        pointBorderWidth: 2,
        // The following non-standard props are kept for parity; ignored by Chart.js
        pointShadowOffsetX: 0,
        pointShadowOffsetY: 2,
        pointShadowBlur: 4,
        pointShadowColor: "rgba(0, 0, 0, 0.2)",
      } as unknown as ChartDataset<"line", number[]>) ,
    ],
  };

  // Chart options typed — we cast where necessary to keep datalabels plugin options
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 3,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      datalabels: {
        align: "top",
        anchor: "end",
        offset: 4,
        color: "#6b7280",
        font: {
          size: 11,
          weight: "500",
        },
        formatter: (value: number) => value.toFixed(2),
      },
    },
    elements: {
      line: {
        borderCapStyle: "round",
        borderJoinStyle: "round",
      },
      point: {
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
          borderDash: [3, 3],
          drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
          padding: 8,
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
          borderDash: [3, 3],
          drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
          padding: 8,
          stepSize: 20,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  } as unknown as ChartOptions<"line">;

  return (
    <section className="w-full bg-white rounded-[21px]   p-6 md:p-8">
      <p className="text-2xl font-semibold text-slate-800">Performance Trend</p>

      <div className="mt-4 w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
        {/* Chart wrapper retains relative sizing; Chart canvas height is governed by aspectRatio */}
        <div className="relative w-full h-auto filter drop-shadow-sm">
          {/* Inline plugin to draw layered shadows under the line path */}
          <Line
            data={data}
            options={options}
            plugins={[{
              id: "lineShadows",
              afterDatasetsDraw: (chart) => {
                const meta = chart.getDatasetMeta(0);
                const dataset = meta?.dataset as unknown as { path?: (ctx: CanvasRenderingContext2D) => void };
                if (!dataset || typeof dataset.path !== "function") return;
                const ctx = chart.ctx as CanvasRenderingContext2D;

                const strokeColor = "#1CA672"; // line color
                const shadowColor = "#8979FF40"; // requested shadow color with alpha

                const layers = [
                  { offsetY: 3.15, blur: 3.15 },
                  { offsetY: 6.29, blur: 9.44 },
                  { offsetY: 9.44, blur: 18.88 },
                ];

                for (const l of layers) {
                  ctx.save();
                  ctx.lineWidth = 1.05;
                  ctx.strokeStyle = strokeColor;
                  ctx.shadowColor = shadowColor as unknown as string;
                  ctx.shadowBlur = l.blur;
                  ctx.shadowOffsetX = 0;
                  ctx.shadowOffsetY = l.offsetY;
                  // trace and stroke the same path to render shadow
                  dataset.path!(ctx);
                  ctx.stroke();
                  ctx.restore();
                }
              }
            }]}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-600">
        {/* Diamond + dot icon (SVG) */}
        <div className="w-5 h-5 relative flex-shrink-0">
          <Image
            src={LegendNode}
            alt="legend"
            fill
            sizes="20px"
            style={{ objectFit: "contain" }}
            priority={true}
          />
        </div>

        <span className="text-sm text-slate-600">2020</span>
      </div>

      {/* Footer stats */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-50 border border-slate-200 px-6 py-5 text-center">
          <div className="text-2xl font-semibold text-slate-800">86%</div>
          <div className="text-slate-500 text-sm">Average Accuracy</div>
        </div>
        <div className="rounded-xl bg-emerald-500 text-white px-6 py-5 text-center">
          <div className="text-2xl font-semibold">+12%</div>
          <div className="opacity-90 text-sm">Improvement</div>
        </div>
        <div className="rounded-xl bg-slate-50 border border-slate-200 px-6 py-5 text-center">
          <div className="text-2xl font-semibold text-slate-800">18</div>
          <div className="text-slate-500 text-sm">Total Tests</div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceTrend;

