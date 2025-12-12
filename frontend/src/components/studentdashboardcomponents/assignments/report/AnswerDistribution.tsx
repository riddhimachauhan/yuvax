"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  type PieLabelRenderProps,
} from "recharts";

const answerData = [
  { name: "Correct", value: 12 },
  { name: "Wrong", value: 5 },
  { name: "Miss", value: 3 },
];

const ANSWER_COLORS = ["#0E395C", "#01568F", "#56BDCC"];

const totalQuestions = answerData.reduce((acc, d) => acc + d.value, 0);
const accuracyRate = Math.round((answerData[0].value / totalQuestions) * 100);

const renderAnswerDistributionLabel = (props: PieLabelRenderProps) => {
  // Explicitly coerce possibly unknown types to number
  const cx = Number(props.cx ?? 0);
  const cy = Number(props.cy ?? 0);
  const midAngle = Number(props.midAngle ?? 0);
  const outerRadius = Number(props.outerRadius ?? 0);
  const index = Number(props.index ?? 0);

  const RAD = Math.PI / 180;
  const radius = outerRadius + 15;
  const x = cx + radius * Math.cos(-midAngle * RAD);
  const y = cy + radius * Math.sin(-midAngle * RAD);

  const lineStartX = cx + outerRadius * Math.cos(-midAngle * RAD);
  const lineStartY = cy + outerRadius * Math.sin(-midAngle * RAD);

  const textAnchor = x > cx ? "start" : "end";
  const label = answerData[index];

  if (!label) return null;

  return (
    <g key={`answer-${index}`}>
      <line
        x1={lineStartX}
        y1={lineStartY}
        x2={x}
        y2={y}
        stroke="#9ca3af"
        strokeWidth={1}
      />
      <line
        x1={x}
        y1={y}
        x2={x + (x > cx ? 18 : -18)}
        y2={y}
        stroke="#9ca3af"
        strokeWidth={1}
      />
      <text
        x={x + (x > cx ? 22 : -22)}
        y={y - 4}
        textAnchor={textAnchor}
        fontSize={11}
        fill="#374151"
      >
        {label.name}
      </text>
      <text
        x={x + (x > cx ? 22 : -22)}
        y={y + 8}
        textAnchor={textAnchor}
        fontSize={11}
        fill="#111827"
        fontWeight={700}
      >
        {label.value}
      </text>
    </g>
  );
};

const AnswerDistribution: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-white/60 p-4 min-h-[220px]">
      <p className="text-xl font-bold text-gray-900 mb-4">
        Answer Distribution
      </p>

      <div className="flex items-center justify-center py-2 px-4">
        <div style={{ width: 460, height: 240 }} className="relative overflow-visible">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 40, left: 40, bottom: 0 }}>
              <Pie
                data={answerData}
                cx="50%"
                cy="50%"
                innerRadius={32}
                outerRadius={90}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                paddingAngle={0}
                labelLine={false}
                label={renderAnswerDistributionLabel}
              >
                {answerData.map((entry, index) => (
                  <Cell
                    key={`answer-cell-${index}`}
                    fill={ANSWER_COLORS[index % ANSWER_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Circle */}
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full flex flex-col items-center justify-center"
            style={{ width: 80, height: 80 }}
          >
            <div className="text-base font-semibold text-slate-900">
              {totalQuestions}
            </div>
            <div className="text-xs text-slate-500">total</div>
          </div>
        </div>
      </div>

      {/* Accuracy Rate */}
      <div className="text-center mt-2">
        <div className="text-lg font-bold text-slate-900">{accuracyRate}%</div>
        <div className="text-xs text-slate-600">Accuracy Rate</div>
      </div>
    </div>
  );
};

export default AnswerDistribution;
