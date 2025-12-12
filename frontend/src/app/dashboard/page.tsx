'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RootState } from '@/store/store';
import StudentDashboard from '@/components/studentdashboardcomponents/Student-Dashboard';
import { UserRole } from '@/lib/types';
import TeacherDashboard from './teacher/TeacherDashboard ';
import SuperAdminDashboard from './superadmin/SuperAdminDashboard ';
import AdminDashboard from './admin/AdminDashboard';

// Import dashboard components


export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/'); // Adjust to your auth route
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    // Render dashboard based on user role
    const renderDashboard = () => {
        console.log(user, "user")
        switch (user.role) {
            case UserRole.STUDENT:
                return <StudentDashboard />;
             case UserRole.ADMIN:
                return <AdminDashboard />;

            case UserRole.TEACHER:
                return <TeacherDashboard />;

            case UserRole.SUPER_ADMIN:
                return <SuperAdminDashboard />;

            default:
                return (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-red-600 mb-4">
                                Invalid Role
                            </h1>
                            <p className="text-gray-600">
                                Your account role is not recognized. Please contact support.
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return <>{renderDashboard()}</>;
}