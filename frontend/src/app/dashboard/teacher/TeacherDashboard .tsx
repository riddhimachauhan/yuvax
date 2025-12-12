"use client";

import React, { useState } from 'react';
import {
    BookOpen,
    Users,
    FileText,
    ClipboardCheck,
    Calendar,
    User,
    Bell,
    Search,
    Menu,
    X,
    Home,
    Clock,
    AlertCircle,
    Plus,
    Edit,
    MessageCircle,
    BarChart3,
    ChevronRight,
    Star,
  
    LucideIcon
} from 'lucide-react';

// Type definitions
interface MenuItem {
    id: string;
    label: string;
    icon: LucideIcon;
    href: string;
    badge?: string;
}

interface Stat {
    label: string;
    value: string;
    change: string;
    icon: LucideIcon;
    color: string;
}

interface Course {
    title: string;
    students: number;
    assignments: number;
    nextClass: string;
    room: string;
    color: string;
    progress: number;
}

interface Activity {
    student: string;
    action: string;
    time: string;
    type: 'submission' | 'question' | 'quiz' | 'review';
}

interface ScheduleItem {
    time: string;
    course: string;
    room: string;
    type: 'lecture' | 'office' | 'meeting';
    students: number | null;
}

interface PendingGrade {
    assignment: string;
    course: string;
    submitted: number;
    graded: number;
    dueDate: string;
}

const TeacherDashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [activeMenu, setActiveMenu] = useState<string>('dashboard');

    const menuItems: MenuItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard/teacher' },
        {
            id: 'courses',
            label: 'My Courses',
            icon: BookOpen,
            href: '/dashboard/teacher/courses',
            badge: '4'
        },
        {
            id: 'students',
            label: 'Students',
            icon: Users,
            href: '/dashboard/teacher/students',
            badge: '127'
        },
        {
            id: 'assignments',
            label: 'Assignments',
            icon: FileText,
            href: '/dashboard/teacher/assignments',
            badge: '8'
        },
        {
            id: 'grades',
            label: 'Grading',
            icon: ClipboardCheck,
            href: '/dashboard/teacher/grades',
            badge: '23'
        },
        { id: 'schedule', label: 'Schedule', icon: Calendar, href: '/dashboard/teacher/schedule' },
        { id: 'profile', label: 'Profile', icon: User, href: '/dashboard/teacher/profile' }
    ];

    const stats: Stat[] = [
        { label: 'Active Courses', value: '4', change: '+1 this semester', icon: BookOpen, color: 'bg-blue-500' },
        { label: 'Total Students', value: '127', change: '+15 new enrollments', icon: Users, color: 'bg-green-500' },
        { label: 'Pending Grades', value: '23', change: 'Due this week', icon: ClipboardCheck, color: 'bg-orange-500' },
        { label: 'Avg Class Rating', value: '4.8', change: '+0.2 improvement', icon: Star, color: 'bg-purple-500' }
    ];

    const myCourses: Course[] = [
        {
            title: 'Advanced Calculus',
            students: 32,
            assignments: 3,
            nextClass: 'Today 10:00 AM',
            room: 'Room 201',
            color: 'bg-blue-500',
            progress: 65
        },
        {
            title: 'Linear Algebra',
            students: 28,
            assignments: 2,
            nextClass: 'Tomorrow 2:00 PM',
            room: 'Room 105',
            color: 'bg-green-500',
            progress: 45
        },
        {
            title: 'Statistics',
            students: 35,
            assignments: 1,
            nextClass: 'Wed 11:00 AM',
            room: 'Room 302',
            color: 'bg-purple-500',
            progress: 78
        },
        {
            title: 'Discrete Mathematics',
            students: 22,
            assignments: 4,
            nextClass: 'Fri 9:00 AM',
            room: 'Room 150',
            color: 'bg-indigo-500',
            progress: 52
        }
    ];

    const recentActivities: Activity[] = [
        { student: 'Sarah Johnson', action: 'Submitted Advanced Calculus Assignment', time: '15 minutes ago', type: 'submission' },
        { student: 'Mike Chen', action: 'Asked question in Linear Algebra', time: '1 hour ago', type: 'question' },
        { student: 'Emma Davis', action: 'Completed Statistics Quiz', time: '2 hours ago', type: 'quiz' },
        { student: 'John Smith', action: 'Requested grade review', time: '3 hours ago', type: 'review' }
    ];

    const todaySchedule: ScheduleItem[] = [
        { time: '09:00 AM', course: 'Advanced Calculus', room: 'Room 201', type: 'lecture', students: 32 },
        { time: '11:00 AM', course: 'Office Hours', room: 'Office 3B', type: 'office', students: null },
        { time: '02:00 PM', course: 'Linear Algebra', room: 'Room 105', type: 'lecture', students: 28 },
        { time: '04:00 PM', course: 'Faculty Meeting', room: 'Conference Room', type: 'meeting', students: null }
    ];

    const pendingGrades: PendingGrade[] = [
        { assignment: 'Calculus Midterm', course: 'Advanced Calculus', submitted: 32, graded: 20, dueDate: '2 days' },
        { assignment: 'Algebra Quiz 3', course: 'Linear Algebra', submitted: 28, graded: 28, dueDate: 'Completed' },
        { assignment: 'Stats Project', course: 'Statistics', submitted: 30, graded: 15, dueDate: '1 week' }
    ];

    const getActivityIcon = (type: Activity['type']): LucideIcon => {
        switch (type) {
            case 'submission': return FileText;
            case 'question': return MessageCircle;
            case 'quiz': return ClipboardCheck;
            case 'review': return Edit;
            default: return AlertCircle;
        }
    };

    const getTypeIcon = (type: ScheduleItem['type']): LucideIcon => {
        switch (type) {
            case 'lecture': return BookOpen;
            case 'office': return MessageCircle;
            case 'meeting': return Users;
            default: return Clock;
        }
    };

    const handleMenuClick = (menuId: string): void => {
        setActiveMenu(menuId);
        // In a real app, you would navigate to the route here
        // For example, using Next.js router:
        // router.push(menuItems.find(item => item.id === menuId)?.href || '/');
    };

    const handleSignOut = (): void => {
        // Handle sign out logic
        console.log('Sign out clicked');
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // Handle search logic
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
           

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden lg:ml-[249px]">
                {/* Top Navbar */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                type="button"
                                aria-label="Toggle sidebar"
                            >
                                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>

                            <form onSubmit={handleSearch} className="relative ml-4">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search students, courses, assignments..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-64"
                                />
                            </form>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button 
                                className="relative p-2 text-gray-400 hover:text-gray-500"
                                type="button"
                                aria-label="Notifications"
                            >
                                <Bell className="h-6 w-6" />
                                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" aria-hidden="true"></span>
                            </button>

                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">Dr</span>
                                </div>
                                <div className="hidden md:block">
                                    <div className="text-sm font-medium text-gray-900">Dr. Sarah Wilson</div>
                                    <div className="text-xs text-gray-500">Mathematics Department</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Page Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Good morning, Dr. Wilson! 🌟</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Ready to inspire minds today? Here&apos;s your teaching overview
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat, index) => {
                                const IconComponent = stat.icon;
                                return (
                                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                                            </div>
                                            <div className={`p-3 rounded-full ${stat.color}`}>
                                                <IconComponent className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            {/* My Courses */}
                            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">My Courses</h3>
                                        <button 
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                                            type="button"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            New Course
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    {myCourses.map((course, index) => (
                                        <div key={index} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-10 h-10 ${course.color} rounded-lg flex items-center justify-center`}>
                                                        <BookOpen className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                            <span>{course.students} students</span>
                                                            <span>{course.assignments} assignments</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button 
                                                    className="text-green-600 hover:text-green-700"
                                                    type="button"
                                                    aria-label={`View ${course.title}`}
                                                >
                                                    <ChevronRight className="h-5 w-5" />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1 mr-4">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm text-gray-600">Course Progress</span>
                                                        <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full ${course.color}`}
                                                            style={{ width: `${course.progress}%` }}
                                                            role="progressbar"
                                                            aria-valuenow={course.progress}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500">Next Class</p>
                                                    <p className="text-sm font-medium text-gray-900">{course.nextClass}</p>
                                                    <p className="text-xs text-gray-500">{course.room}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Today's Schedule */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-900">Today&apos;s Schedule</h3>
                                </div>
                                <div className="p-6 space-y-3">
                                    {todaySchedule.map((item, index) => {
                                        const IconComponent = getTypeIcon(item.type);
                                        return (
                                            <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                                <div className="flex-shrink-0">
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <IconComponent className="h-4 w-4 text-green-600" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900">{item.course}</p>
                                                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                        <span>{item.room}</span>
                                                        {item.students && <span>• {item.students} students</span>}
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0 text-right">
                                                    <p className="text-sm font-medium text-gray-900">{item.time}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Pending Grades & Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Pending Grades */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Pending Grades</h3>
                                        <button 
                                            className="text-sm text-green-600 hover:text-green-500 font-medium"
                                            type="button"
                                        >
                                            View All
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    {pendingGrades.map((grade, index) => (
                                        <div key={index} className="border border-gray-100 rounded-lg p-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{grade.assignment}</h4>
                                                    <p className="text-sm text-gray-500">{grade.course}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    grade.dueDate === 'Completed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-orange-100 text-orange-800'
                                                }`}>
                                                    {grade.dueDate}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium">{grade.graded}</span> of <span className="font-medium">{grade.submitted}</span> graded
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="h-2 bg-green-500 rounded-full"
                                                            style={{ width: `${(grade.graded / grade.submitted) * 100}%` }}
                                                            role="progressbar"
                                                            aria-valuenow={Math.round((grade.graded / grade.submitted) * 100)}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-gray-500">
                                                        {Math.round((grade.graded / grade.submitted) * 100)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Student Activity */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-900">Recent Student Activity</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    {recentActivities.map((activity, index) => {
                                        const IconComponent = getActivityIcon(activity.type);
                                        return (
                                            <div key={index} className="flex items-start space-x-3">
                                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                    <IconComponent className="h-4 w-4 text-green-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900">{activity.student}</p>
                                                    <p className="text-sm text-gray-600">{activity.action}</p>
                                                    <p className="text-xs text-gray-400">{activity.time}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <button 
                                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl text-center transition-colors duration-200"
                                type="button"
                            >
                                <Plus className="h-6 w-6 mx-auto mb-2" />
                                <span className="text-sm font-medium">Create Assignment</span>
                            </button>
                            <button 
                                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-center transition-colors duration-200"
                                type="button"
                            >
                                <ClipboardCheck className="h-6 w-6 mx-auto mb-2" />
                                <span className="text-sm font-medium">Grade Submissions</span>
                            </button>
                            <button 
                                className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl text-center transition-colors duration-200"
                                type="button"
                            >
                                <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                                <span className="text-sm font-medium">View Analytics</span>
                            </button>
                            <button 
                                className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-xl text-center transition-colors duration-200"
                                type="button"
                            >
                                <MessageCircle className="h-6 w-6 mx-auto mb-2" />
                                <span className="text-sm font-medium">Message Students</span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            setSidebarOpen(false);
                        }
                    }}
                    aria-label="Close sidebar"
                />
            )}
        </div>
    );
};

export default TeacherDashboard;