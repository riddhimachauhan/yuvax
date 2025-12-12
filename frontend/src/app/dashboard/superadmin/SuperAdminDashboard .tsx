"use client";
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openSignupModal } from "@/store/slices/modalSlice";

import {
    Users,
    Settings,
    BarChart3,
    Shield,
    FileText,
    Bell,
    Search,
    Menu,
    X,
    Home,
    Database,
    Activity,
    TrendingUp,
    AlertTriangle,
} from 'lucide-react';

const SuperAdminDashboard = () => {
    const dispatch = useAppDispatch();
    console.log(useAppSelector((state) => state))
    const handleSignupClick = () => {
        console.log("clicked")
        dispatch(openSignupModal())
    };
  
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const handleSignupClick = () => dispatch(openSignupModal());

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard/super-admin' },
        {
            id: 'users',
            label: 'User Management',
            icon: Users,
            href: '/dashboard/super-admin/users',
            submenu: [
                { label: 'All Users', href: '/dashboard/super-admin/users' },
                { label: 'Create User', href: '/dashboard/super-admin/users/create' },
                { label: 'User Roles', href: '/dashboard/super-admin/users/roles' }
            ]
        },
        { id: 'roles', label: 'Roles & Permissions', icon: Shield, href: '/dashboard/super-admin/roles' },
        { id: 'system', label: 'System Settings', icon: Settings, href: '/dashboard/super-admin/system-settings' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/dashboard/super-admin/analytics' },
        { id: 'audit', label: 'Audit Logs', icon: FileText, href: '/dashboard/super-admin/audit-logs' },
        { id: 'database', label: 'Database', icon: Database, href: '/dashboard/super-admin/database' }
    ];

    const stats = [
        { label: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'bg-blue-500' },
        { label: 'Active Sessions', value: '1,234', change: '+5%', icon: Activity, color: 'bg-green-500' },
        { label: 'System Health', value: '99.9%', change: '0%', icon: TrendingUp, color: 'bg-emerald-500' },
        { label: 'Critical Alerts', value: '3', change: '-2', icon: AlertTriangle, color: 'bg-red-500' }
    ];

    const recentActivities = [
        { user: 'John Admin', action: 'Created new teacher account', time: '2 minutes ago', type: 'user' },
        { user: 'System', action: 'Database backup completed', time: '15 minutes ago', type: 'system' },
        { user: 'Sarah Manager', action: 'Updated system settings', time: '1 hour ago', type: 'settings' },
        { user: 'Mike Teacher', action: 'Course published', time: '2 hours ago', type: 'content' }
    ];

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
                            >
                                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>

                            <div className="relative ml-4">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search users, settings, logs..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="relative p-2 text-gray-400 hover:text-gray-500">
                                <Bell className="h-6 w-6" />
                                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                            </button>

                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">SA</span>
                                </div>
                                <div className="hidden md:block">
                                    <div className="text-sm font-medium text-gray-900">Super Admin</div>
                                    <div className="text-xs text-gray-500">admin@yuvax.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Page Header */}


                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                            </div>
                            <div className="p-6 space-y-3">
                                <button className=" bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200" onClick={handleSignupClick}
                                >Add Member
                                </button>


                            </div>
                        </div>




                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default SuperAdminDashboard;