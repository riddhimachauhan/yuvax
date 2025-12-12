// import type { StaticImageData } from "next/image";


// export type Trend = "up" | "down";

// export interface PerformanceMetric {
//   title: string;
//   value: string;
//   trend: Trend;
//   trendValue: string;
//   trendLabel: string;
//   icon: StaticImageData | string;
// }

// export interface PerformanceOverviewProps {
//   className?: string;
//   performanceData?: PerformanceMetric[];
// }


import type { StaticImageData } from "next/image";

export type Trend = "up" | "down";

export interface PerformanceMetric {
  title: string;
  value: string; // e.g. "34%", "6 Hr"
  trend: Trend;
  trendValue: string; // e.g. "24%", "20 mins"
  trendLabel: string; // e.g. "Since Last Week"
  icon: StaticImageData | string;
}

export interface PerformanceOverviewProps {
  className?: string;
  performanceData?: PerformanceMetric[];
}
