"use client";
import React, { useState } from "react";
import {
    Users,
    Settings,
    BarChart3,
    Shield,
    FileText,
    Home,
    Database,

} from "lucide-react";
import CreateUserModal from "@/components/admin/CreateUserModal";
import AllUsersTable from "./AllUsersTable";


const AdminDashboard = () => {
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const [activeView, setActiveView] = useState<"dashboard" | "allUsers">("dashboard");
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: Home },
        {
            id: "users",
            label: "User Management",
            icon: Users,
            submenu: [
                { id: "all-users", label: "All Users" },
                { id: "create-user", label: "Create User" },
                { id: "user-roles", label: "User Roles" },
            ],
        },
        { id: "roles", label: "Roles & Permissions", icon: Shield },
        { id: "system", label: "System Settings", icon: Settings },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "audit", label: "Audit Logs", icon: FileText },
        { id: "database", label: "Database", icon: Database },
    ];

    const handleMenuClick = (menuId: string, subItemId?: string) => {
        setActiveMenu(menuId);

        if (subItemId === "all-users") {
            setActiveView("allUsers");
        } else if (subItemId === "create-user") {
            setShowCreateUserModal(true);
        } else if (menuId === "dashboard") {
            setActiveView("dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">


            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                {/* Top Navbar */}
                {/* <header className="bg-white shadow-sm border-b border-gray-200">
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
                                    <div className="text-sm font-medium text-gray-900">Admin</div>
                                    <div className="text-xs text-gray-500">admin@yuvax.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header> */}
                {/* <Navbar /> */}
                {/* Dashboard Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 mt-6 ml-[249px]">
                    <div className="max-w-7xl mx-auto">
                        {activeView === "dashboard" ? (
                            <>
                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Total Users</p>
                                                <p className="text-2xl font-bold text-gray-900 mt-1">1,234</p>
                                            </div>
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Users className="w-6 h-6 text-blue-600" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Active Teachers</p>
                                                <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
                                            </div>
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                                <Users className="w-6 h-6 text-green-600" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Students</p>
                                                <p className="text-2xl font-bold text-gray-900 mt-1">987</p>
                                            </div>
                                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <Users className="w-6 h-6 text-purple-600" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Sales Team</p>
                                                <p className="text-2xl font-bold text-gray-900 mt-1">45</p>
                                            </div>
                                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <Users className="w-6 h-6 text-orange-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
                                    <div className="p-6 border-b border-gray-100">
                                        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                                    </div>

                                    <div className="p-6 flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setShowCreateUserModal(true)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                                        >
                                            <Users className="w-4 h-4" />
                                            Create New User
                                        </button>
                                        <button
                                            onClick={() => setActiveView("allUsers")}
                                            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200"
                                        >
                                            View All Users
                                        </button>
                                        <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200">
                                            Export Data
                                        </button>
                                    </div>
                                </div>

                                {/* Recent Users Preview */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
                                        <button
                                            onClick={() => setActiveView("allUsers")}
                                            className="text-sm text-blue-600 hover:text-blue-700"
                                        >
                                            View All →
                                        </button>
                                    </div>
                                    {/* Preview table here - or just link to all users */}
                                </div>
                            </>
                        ) : activeView === "allUsers" ? (
                            <>
                                {/* Breadcrumb */}
                                <div className="mb-6">
                                    <button
                                        onClick={() => setActiveView("dashboard")}
                                        className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                                    >
                                        ← Back to Dashboard
                                    </button>
                                </div>

                                {/* All Users Table */}
                                <AllUsersTable />
                            </>
                        ) : null}
                    </div>
                </main>
            </div>

            {/* Create User Modal */}
            <CreateUserModal
                isOpen={showCreateUserModal}
                onClose={() => setShowCreateUserModal(false)}
            />
        </div>
    );
};

export default AdminDashboard;