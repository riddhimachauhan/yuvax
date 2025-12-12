import type { StaticImageData } from "next/image";
import type React from "react";

// Sidebar
export interface SidebarProps {
  className?: string;
}

// Scheduler
export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  duration: string;
  type: string;
  image: StaticImageData | string;
  hasActions: boolean;
}

export interface SchedulerProps {
  schedules?: ScheduleItem[];
  className?: string;
}

// Quick Quiz
export interface QuizData {
  id: string;
  title: string;
  questions: string;
  duration: string;
  bgImage: StaticImageData | string;
  illustration: StaticImageData | string;
  bgColor: string;
  onStartQuiz?: () => void;
}

export interface QuickQuizzesProps {
  className?: string;
  quizzes?: QuizData[];
  title?: string;
}

// Performance Overview
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

// Leaderboard
export type Medal = "gold" | "silver" | "bronze";

export interface Entry {
  id: number;
  name: string;
  xp: number;
  medal: Medal;
}

export interface LeaderboardProps {
  className?: string;
}

// Header
export interface HeaderProps {
  userName?: string;
  className?: string;
}

// Game Card
export type QuizCard = {
  id: number;
  title: string;
  questions: number;
  bgColor: string;
  image: StaticImageData | string; // supports both imported images and public folder paths
  onPlay?: (id: number) => void;
};

export type GameComponentProps = {
  className?: string;
  cards?: QuizCard[];
  title?: string;
};

// Daily Tasks
export interface TaskItem {
  completed: boolean;
  title: string;
  date: string;
  grade: string;
}

export interface DailyTasksProps {
  tasks?: TaskItem[];
  total?: number;
  completedCount?: number;
  badgeCount?: number;
  className?: string;
}

// Completed Course
export interface Course {
  id: number;
  title: string;
  level: string;
  bgColor: string;
  borderColor: string;
  completionBadge: string;
}

// AI Prediction
export interface PredictionItem {
  type: "success" | "warning";
  title: string;
  subtitle: string;
}

// Active Courses
export interface CourseData {
  id: string;
  title: string;
  type: "course" | "add";
  badge?: string;
  subtitle?: string;
  lessons?: string;
  progress?: number;
  progressLabel?: string;
  bgColor?: string;
  icon: StaticImageData | string;
}

export interface ActiveCoursesProps {
  className?: string;
  courses?: CourseData[];
  title?: string;
}

// Achievement
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgGradient: string;
  imageUrl?: StaticImageData | string;
}

