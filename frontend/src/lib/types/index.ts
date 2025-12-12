import type { StaticImageData } from "next/image"; // needed for SVG imports

export enum UserRole {
  STUDENT = 'Student',
  TEACHER = 'Teacher',
  ADMIN = 'Admin',
  SUPER_ADMIN = 'SuperAdmin',
}
export interface User {
  id: string
  email: string
  full_name: string
  role: 'SUPER_ADMIN' | 'STUDENT' | 'TEACHER' | 'ADMIN'
  avatar?: string
}

// Login request - what data is sent to login API
export interface LoginRequest {
  identifier: string
  password: string
}
export interface PerformanceMetric {
  title: string;
  value: string;
  trend: "up" | "down";
  trendValue: string;
  trendLabel: string;
  icon: string | StaticImageData;
}
// Auth response - what your backend returns after successful login
export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

// Signup request - payload for creating a new user account
export interface SignupRequest {
  full_name: string
  email: string
  password: string
  gender: string
  dob: string
  address: string
  country: string
  zone: string
  confirm_password: string
  date_of_birth: string
  role: string
  parentsName: string
  phone: string

}

// Auth state - structure of authentication state in Redux
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Student interface - for future use
export interface Student {
  id: string
  name: string
  grade: number
  interests: string[]
  parentId: string
  createdAt: string
}

// Teacher interface - for future use
export interface Teacher {
  id: string
  name: string
  email: string
  avatar?: string
  specialization: string[]
  rating?: number
}

// Trial Class interface - for future use
export interface TrialClass {
  id: string
  studentId: string
  teacherId: string
  scheduledAt: string
  duration: number
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  meetingUrl?: string
  aiTestTriggered: boolean
  teacher: Teacher
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgGradient: string;
  imageUrl?: StaticImageData | string;
}
