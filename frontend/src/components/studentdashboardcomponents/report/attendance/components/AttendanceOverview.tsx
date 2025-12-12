"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { PieLabelRenderProps } from "recharts";
import Image from "next/image";

// Import SVGs from assets
import AttendanceOverview2 from "@/assets/attendanceoverview2.svg";
import AttendanceOverview3 from "@/assets/attendanceoverview3.svg";
import AttendanceOverview4 from "@/assets/attendanceoverview4.svg";

type MetricCardProps = {
  value: string | number;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  isSpecial?: boolean;
};

// Wrap SVGs in tiny components so we can keep the same MetricCard API
const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Image src={AttendanceOverview2} alt="Rescheduled" width={20} height={20} className={className} />
);
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Image src={AttendanceOverview3} alt="Late Arrival" width={20} height={20} className={className} />
);
const AlertIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Image src={AttendanceOverview4} alt="Class Missed" width={20} height={20} className={className} />
);


const MetricCard: React.FC<MetricCardProps> = ({ value, label, icon: Icon, iconColor, isSpecial }) => {
  // Keep the first block (no icon) exactly as-is
  if (!Icon) {
    return (
      <div className="flex items-center gap-3">
        <div>
          <div className={`text-3xl text-center font-bold text-metric-value`}>{value}</div>
          <div className={`text-sm ${isSpecial ? "text-red-500 font-semibold" : "text-slate-600"}`}>{label}</div>
        </div>
      </div>
    );
  }

  // For blocks with an icon: icon + number on top (row), label below (column)
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2">
        <div className="shrink-0" style={{ color: iconColor }}>
          <Icon className="w-6 h-6" />
        </div>
        {/* number as a small tag-like emphasis */}
        <span className="text-3xl font-bold text-slate-900">{value}</span>
      </div>
      <div className={`text-sm ${isSpecial ? "text-red-500 font-semibold" : "text-slate-600"}`}
      style={{
        fontFamily: "Lato, sans-serif",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: 14,
        letterSpacing: 0,
               }}>{label}</div>
    </div>
  );
};

const data = [
  { name: "Class attended", value: 8 },
  { name: "Rescheduled", value: 7},
  { name: "Late arrival", value: 3 },
  { name: "Class missed", value: 2 },
];

const COLORS = [
  "#0E395C", // attended - dark
  "#01568F", // rescheduled
  "#008BAC", // late
  "#56BDCC", // missed - light
];

const total = data.reduce((acc, d) => acc + d.value, 0);
const attendanceRate = Math.round((data[0].value / total) * 100);

// Customized label renderer to place connector and text outside the donut
const renderCustomizedLabel = (props: PieLabelRenderProps) => {
  const toNumber = (v: unknown) =>
    typeof v === "number" ? v : parseFloat(String(v ?? 0)) || 0;

  const cx = toNumber(props.cx);
  const cy = toNumber(props.cy);
  const midAngle = toNumber((props as PieLabelRenderProps & { midAngle?: number | string }).midAngle);
  const outerRadius = toNumber((props as PieLabelRenderProps & { outerRadius?: number | string }).outerRadius);
  const index = (props as PieLabelRenderProps & { index?: number }).index ?? 0;

  const RAD = Math.PI / 180;
  const radius = outerRadius + 18; // distance of label from center
  const x = cx + radius * Math.cos(-midAngle * RAD);
  const y = cy + radius * Math.sin(-midAngle * RAD);

  const lineStartX = cx + outerRadius * Math.cos(-midAngle * RAD);
  const lineStartY = cy + outerRadius * Math.sin(-midAngle * RAD);

  const textAnchor = x > cx ? "start" : "end";
  const label = data[index] ?? { name: "", value: 0 };

  return (
    <g key={`label-${index}`}>
      {/* Connector line */}
      <line x1={lineStartX} y1={lineStartY} x2={x} y2={y} stroke="#9ca3af" strokeWidth={1} />
      {/* Short horizontal tail to align number under label text */}
      <line
        x1={x}
        y1={y}
        x2={x + (x > cx ? 22 : -22)}
        y2={y}
        stroke="#9ca3af"
        strokeWidth={1}
      />

      {/* Label name */}
      <text
        x={x + (x > cx ? 26 : -26)}
        y={y - 6}
        textAnchor={textAnchor}
        fontSize={12}
        fill="#374151"
      >
        {label.name}
      </text>

      {/* Label value (number) */}
      <text
        x={x + (x > cx ? 26 : -26)}
        y={y + 10}
        textAnchor={textAnchor}
        fontSize={12}
        fill="#111827"
        fontWeight={700 as unknown as number}
      >
        {label.value}
      </text>
    </g>
  );
};

const AttendanceOverview: React.FC = () => {
  return (
    <div className="bg-white rounded-[21px] p-6 min-h-[260px]">
      <div className="w-full">
        <p className="text-2xl font-semibold text-metric-text mb-8">Attendance Overview</p>

        {/* Metric Cards - keep exactly as specified */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-5">
          <MetricCard value={`${attendanceRate}%`} label="Attendance Rate" />
          <MetricCard value={data[1].value} label="Rescheduled" icon={ClockIcon} iconColor="#3b82f6" />
          <MetricCard value={data[2].value} label="Late Arrival" icon={AlertIcon} iconColor="#f59e0b" />
          <MetricCard value={data[3].value} label="Class Missed" icon={CalendarIcon} iconColor="#ef4444" isSpecial={true} />
        </div>

        {/* Main content with donut chart and center number */}
<div className="flex items-center justify-center py-4 px-6">
  {/* Increased width and made container overflow-visible so labels on left/right won't get clipped */}
  <div style={{ width: 480, height: 300 }} className="relative overflow-visible">
    <ResponsiveContainer width="100%" height="100%">
      {/* add horizontal margin on the SVG to give space for left/right labels */}
      <PieChart margin={{ top: 0, right: 53, left: 53, bottom: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={110}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          paddingAngle={0}
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>

    {/* Center white circle with total number */}
    <div
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full flex items-center justify-center"
      style={{ width: 68, height: 68 }}
    >
      <div className="text-lg font-semibold text-slate-900">{total}</div>
    </div>
  </div>
</div>
{/* End donut section */}

        {/* End donut section */}
      </div>
    </div>
  );
};

export default AttendanceOverview;
