"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
    Search,
    Filter,
    Download,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    X
} from "lucide-react";
import { api } from "@/lib/apiClient";

interface User {
    user_id: string;
    email: string;
    full_name: string;
    phone: string;
    role: string;
    gender: string;
    is_active: boolean;
    created_at: string;
    country?: string;
    zone?: string;
}

interface PaginationData {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
    message?: string;
}

const AllUsersTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Pagination & Filters
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pagination, setPagination] = useState<PaginationData>({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    });

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [showFilters, setShowFilters] = useState(false);

    // Fetch users - wrapped in useCallback to fix exhaustive-deps warning
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            // Build query params
            const params: Record<string, string | number> = {
                page,
                limit
            };

            if (searchQuery) params.search = searchQuery;
            if (roleFilter !== "all") params.role = roleFilter;
            if (statusFilter !== "all") params.status = statusFilter === "active" ? "true" : "false";

            const response = await api.get("api/admin/users", {
                params,
                withCredentials: true
            });

            setUsers(response.data.data || []);
            setPagination(response.data.pagination || {
                total: 0,
                page: 1,
                limit: 10,
                totalPages: 0
            });
        } catch (err) {
            const apiError = err as ApiError;
            console.error("Fetch users error:", apiError);
            setError(apiError.response?.data?.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    }, [page, limit, searchQuery, roleFilter, statusFilter]);

    // Fetch on mount and when filters change
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Handle search with debounce
    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1); // Reset to first page
    };

    // Handle delete user
    const handleDelete = async (userId: string, userName: string) => {
        if (!confirm(`Are you sure you want to delete ${userName}?`)) {
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
                withCredentials: true
            });

            // Refresh users list
            fetchUsers();
        } catch (err) {
            const apiError = err as ApiError;
            alert(apiError.response?.data?.message || "Failed to delete user");
        }
    };

    // Export users
    const handleExport = () => {
        // Simple CSV export
        const csvContent = [
            ["Name", "Email", "Phone", "Role", "Status", "Created At"].join(","),
            ...users.map(user => [
                user.full_name,
                user.email,
                user.phone,
                user.role,
                user.is_active ? "Active" : "Inactive",
                new Date(user.created_at).toLocaleDateString()
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `users-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {pagination.total} total users
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
                        >
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                        <button
                            onClick={fetchUsers}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mt-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => handleSearch("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                            </label>
                            <select
                                value={roleFilter}
                                onChange={(e) => {
                                    setRoleFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Roles</option>
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Sales">Sales</option>
                                <option value="Admin">Admin</option>
                                <option value="SuperAdmin">SuperAdmin</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Items per page
                            </label>
                            <select
                                value={limit}
                                onChange={(e) => {
                                    setLimit(Number(e.target.value));
                                    setPage(1);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 m-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />
                </div>
            ) : (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Joined
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.user_id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <span className="text-blue-600 font-medium text-sm">
                                                            {user.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.full_name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {user.gender}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.phone}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.role === "Student" ? "bg-purple-100 text-purple-800" :
                                                        user.role === "Teacher" ? "bg-blue-100 text-blue-800" :
                                                            user.role === "Sales" ? "bg-orange-100 text-orange-800" :
                                                                user.role === "Admin" ? "bg-green-100 text-green-800" :
                                                                    "bg-red-100 text-red-800"
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.is_active
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                    }`}>
                                                    {user.is_active ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => alert(`Edit user: ${user.user_id}`)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                        title="Edit user"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.user_id, user.full_name)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Delete user"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{((page - 1) * limit) + 1}</span> to{" "}
                                    <span className="font-medium">
                                        {Math.min(page * limit, pagination.total)}
                                    </span> of{" "}
                                    <span className="font-medium">{pagination.total}</span> results
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (pagination.totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (page <= 3) {
                                                pageNum = i + 1;
                                            } else if (page >= pagination.totalPages - 2) {
                                                pageNum = pagination.totalPages - 4 + i;
                                            } else {
                                                pageNum = page - 2 + i;
                                            }

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setPage(pageNum)}
                                                    className={`px-3 py-2 rounded-lg text-sm ${page === pageNum
                                                            ? "bg-blue-600 text-white"
                                                            : "border border-gray-300 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                                        disabled={page === pagination.totalPages}
                                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllUsersTable;