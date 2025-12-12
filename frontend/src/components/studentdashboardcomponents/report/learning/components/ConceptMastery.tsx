"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceArea,
  Tooltip,
} from "recharts";

type Group = "Strong" | "Average" | "Needs Improvement";

type Datum = {
  name: string;
  value: number;
  group: Group;
};

const data: Datum[] = [
  { name: "Problem Solving", value: 92, group: "Strong" },
  { name: "Formula Application", value: 88, group: "Strong" },
  { name: "Graph Interpretation", value: 72, group: "Average" },
  { name: "Word Problems", value: 58, group: "Needs Improvement" },
  { name: "Advanced Calculations", value: 75, group: "Average" },
];

const COLORS: Record<Group, string> = {
  Strong: "#28c76f",
  Average: "#f2c94c",
  "Needs Improvement": "#ff6b6b",
};

const shade = (hex: string | undefined, amt: number) => {
  const base = typeof hex === "string" ? hex : "#8884d8";
  const cleaned = base.startsWith("#") ? base.slice(1) : base;
  const num = Number.parseInt(cleaned, 16);
  if (Number.isNaN(num)) return base;
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0xff) + amt;
  let b = (num & 0xff) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * ShapeProps: explicit typing for the custom bar shape.
 * Matches the properties Recharts passes when rendering a custom shape.
 */
interface ShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  payload?: Datum;
  value?: number;
}

const Custom3DBar: React.FC<ShapeProps> = (props) => {
  const { x, y, width, height, fill, payload } = props;

  // Depth scales with bar width to look good on all sizes
  const depth = Math.max(6, Math.min(14, Math.round(width * 0.2)));
  const value = payload?.value ?? props.value;

  // Shift the rectangular bar down by `depth` so that the visible top face (3D cap)
  // aligns with the actual scaled Y position. This way, the perceived bar height
  // corresponds exactly to its value on the Y-axis.
  const rectY = y + depth;
  const rectH = Math.max(0, height - depth);

  const topPoints = [
    `${x},${rectY}`,
    `${x + depth},${rectY - depth}`,
    `${x + width + depth},${rectY - depth}`,
    `${x + width},${rectY}`,
  ].join(" ");

  const rightPoints = [
    `${x + width},${rectY}`,
    `${x + width + depth},${rectY - depth}`,
    `${x + width + depth},${rectY + rectH - depth}`,
    `${x + width},${rectY + rectH}`,
  ].join(" ");

  const labelX = x + width / 2 + depth / 2;
  // Place label just above the scaled top (not the extruded cap)
  const labelY = y - 6;

  return (
    <g>
      <rect x={x} y={rectY} width={width} height={rectH} fill={fill} rx={3} />
      <polygon points={topPoints} fill={shade(fill, 22)} opacity={0.98} />
      <polygon points={rightPoints} fill={shade(fill, -25)} opacity={0.95} />
      <polyline
        points={topPoints}
        fill="none"
        stroke={shade(fill, -40)}
        strokeWidth={0.7}
        opacity={0.7}
      />
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill="#333"
      >
        {/* round numeric values; fall back to raw if not a number */}
        {typeof value === "number" ? Math.round(value) : value}
      </text>
    </g>
  );
};

/**
 * Runtime type guard to check whether an unknown value is ShapeProps.
 * Avoids using `any` and satisfies strict/no-explicit-any linters.
 */
function isShapeProps(obj: unknown): obj is ShapeProps {
  if (obj === null || typeof obj !== "object") return false;
  const o = obj as Record<string, unknown>;
  return (
    typeof o.x === "number" &&
    typeof o.y === "number" &&
    typeof o.width === "number" &&
    typeof o.height === "number"
  );
}

/**
 * XTickProps: typed props for the custom X tick renderer.
 * payload.value can be string or number depending on your data.
 */
type XTickProps = {
  x?: number;
  y?: number;
  payload?: {
    value?: string | number;
  };
};

const XTick: React.FC<XTickProps> = ({ x = 0, y = 0, payload }) => {
  const full = String(payload?.value ?? "");
  // split into first word and the rest (works well for your two-word labels)
  const [first, ...rest] = full.split(" ");
  const second = rest.join(" ");

  return (
    <g transform={`translate(${x},${y})`}>
      <title>{full}</title>
      <text textAnchor="middle" fontSize={11} fill="#374151">
        <tspan x={0} dy={0} style={{ fontWeight: 500 }}>
          {first}
        </tspan>
        <tspan x={0} dy={14}>
          {second}
        </tspan>
      </text>
    </g>
  );
};

const LegendDot: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-sm" style={{ background: color }} />
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

const ConceptMastery: React.FC = () => {
  return (
    <div className="h-full w-full bg-white rounded-[21px]  p-6 flex flex-col">
      <div className="flex items-start justify-between gap-6">
        <h2 className="text-2xl font-semibold text-gray-800">Concept Mastery</h2>
      </div>

      {/* Chart area fills available height from parent */}
      <div className="mt-4 flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
            barCategoryGap={24}
          >
            <ReferenceArea y1={80} y2={100} fill="#eaf7f1" strokeOpacity={0} />
            <ReferenceArea y1={60} y2={79} fill="#fff7e6" strokeOpacity={0} />
            <ReferenceArea y1={0} y2={59} fill="#fff1f2" strokeOpacity={0} />

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6e6e6" />

            <YAxis
              domain={[0, 100]}
              tickCount={10}
              ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              allowDecimals={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              interval={0}
              tickMargin={12}
              /* pass a typed function so TS can check props */
              tick={(props: XTickProps) => <XTick {...props} />}
            />

            <Tooltip formatter={(v: number) => [`${v}`, "Score"]} />

            <Bar
              dataKey="value"
              /* Accept unknown param, validate with isShapeProps, render only when valid.
                 Return a safe empty <g/> fallback instead of using `any` or `null`. */
              shape={(p: unknown): React.ReactElement => (isShapeProps(p) ? <Custom3DBar {...p} /> : <g />)}
              isAnimationActive
            >
              {data.map((d, i) => (
                <Cell key={i} fill={COLORS[d.group]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className=" flex items-center mt-2 justify-center gap-6">
        <LegendDot color={COLORS.Strong} label="Strong" />
        <LegendDot color={COLORS.Average} label="Average" />
        <LegendDot color={COLORS["Needs Improvement"]} label="Needs Improvement" />
      </div>
    </div>
  );
};

export default ConceptMastery;
