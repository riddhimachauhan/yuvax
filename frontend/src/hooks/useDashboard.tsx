import AdminDashboard from '@/app/dashboard/admin/AdminDashboard';
import SuperAdminDashboard from '@/app/dashboard/superadmin/SuperAdminDashboard ';
import TeacherDashboard from '@/app/dashboard/teacher/TeacherDashboard ';
import StudentDashboard from '@/components/studentdashboardcomponents/Student-Dashboard'
import { UserRole } from '@/lib/types';

// Define proper type for dashboard components (they accept no props or empty props)
type DashboardComponent = React.ComponentType<Record<string, never>>;

export const useDashboard = (role: UserRole): DashboardComponent | null => {
    console.log(role);

    const dashboards: Partial<Record<UserRole, DashboardComponent>> = {
        [UserRole.STUDENT]: StudentDashboard,
        [UserRole.TEACHER]: TeacherDashboard,
        [UserRole.ADMIN]: AdminDashboard,
        [UserRole.SUPER_ADMIN]: SuperAdminDashboard,
    };

    return dashboards[role] ?? null;
};