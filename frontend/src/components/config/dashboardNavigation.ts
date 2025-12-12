import {
    BookOpen,
    FileText,
    ClipboardList,
    HelpCircle,
    BarChart3,
    Settings,
    Users,
    Calendar,
    TrendingUp,
    FolderOpen,
    Bot,
    Gamepad2,
    LayoutDashboard,
    GraduationCap,
    Building2,
    ShoppingCart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
    id: string;
    icon: LucideIcon;
    label: string;
    path: string;
    badge?: number | null;
}

export const studentNavigation: NavigationItem[] = [
    {
        id: "overview",
        icon: LayoutDashboard,
        label: "My Dashboard",
        path: "/dashboard",
        badge: null,
    },
    {
        id: "courses",
        icon: BookOpen,
        label: "My Courses",
        path: "/dashboard/mycourse",
        badge: null,
    },
    {
        id: "homework",
        icon: FileText,
        label: "Homework",
        path: "/dashboard/assignments-details",
        badge: null,
    },
    {
        id: "assignment",
        icon: ClipboardList,
        label: "Assignment",
        path: "/dashboard/assignments",
        badge: 2,
    },
    {
        id: "quiz",
        icon: HelpCircle,
        label: "Quiz",
        path: "/dashboard/quiz",
        badge: null,
    },
    {
        id: "report",
        icon: BarChart3,
        label: "Report",
        path: "/dashboard/report",
        badge: null,
    },
    {
        id: "games",
        icon: Gamepad2,
        label: "Games",
        path: "/dashboard/wordwizard",
        badge: null,
    },
    {
        id: "ai-assistance",
        icon: Bot,
        label: "AI Assistance",
        path: "/dashboard/ai-assistance",
        badge: null,
    },
    {
        id: "settings",
        icon: Settings,
        label: "Settings",
        path: "/dashboard/settings",
        badge: null,
    },
];

export const teacherNavigation: NavigationItem[] = [
    {
        id: "overview",
        icon: LayoutDashboard,
        label: "My Dashboard",
        path: "/dashboard",
        badge: null,
    },
    {
        id: "class",
        icon: GraduationCap,
        label: "Class",
        path: "/dashboard/teacher/class",
        badge: null,
    },
    {
        id: "schedule",
        icon: Calendar,
        label: "Schedule",
        path: "/dashboard/teacher/schedule",
        badge: null,
    },
    {
        id: "homework",
        icon: FileText,
        label: "Homework",
        path: "/dashboard/teacher/homework",
        badge: null,
    },
    {
        id: "students",
        icon: Users,
        label: "Students",
        path: "/dashboard/teacher/students",
        badge: null,
    },
    {
        id: "analytics",
        icon: BarChart3,
        label: "Analytics",
        path: "/dashboard/teacher/analytics",
        badge: null,
    },
    {
        id: "resources",
        icon: FolderOpen,
        label: "Resources",
        path: "/dashboard/teacher/resources",
        badge: null,
    },
    {
        id: "ai-assistance",
        icon: Bot,
        label: "AI Assistance",
        path: "/dashboard/teacher/ai-assistance",
        badge: null,
    },
    {
        id: "growth",
        icon: TrendingUp,
        label: "Growth",
        path: "/dashboard/teacher/growth",
        badge: null,
    },
    {
        id: "settings",
        icon: Settings,
        label: "Settings",
        path: "/dashboard/teacher/settings",
        badge: null,
    },
];

export const adminNavigation: NavigationItem[] = [
    {
        id: "overview",
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/dashboard",
        badge: null,
    },
    {
        id: "users",
        icon: Users,
        label: "Users",
        path: "/dashboard/admin/users",
        badge: null,
    },
    {
        id: "teachers",
        icon: GraduationCap,
        label: "Teachers",
        path: "/dashboard/admin/teachers",
        badge: null,
    },
    {
        id: "students",
        icon: BookOpen,
        label: "Students",
        path: "/dashboard/admin/students",
        badge: null,
    },
    {
        id: "courses",
        icon: FolderOpen,
        label: "Courses",
        path: "/dashboard/admin/courses",
        badge: null,
    },
    {
        id: "analytics",
        icon: BarChart3,
        label: "Analytics",
        path: "/dashboard/admin/analytics",
        badge: null,
    },
    {
        id: "reports",
        icon: FileText,
        label: "Reports",
        path: "/dashboard/admin/reports",
        badge: null,
    },
    {
        id: "settings",
        icon: Settings,
        label: "Settings",
        path: "/dashboard/admin/settings",
        badge: null,
    },
];

export const superAdminNavigation: NavigationItem[] = [
    {
        id: "overview",
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/dashboard",
        badge: null,
    },
    {
        id: "organizations",
        icon: Building2,
        label: "Organizations",
        path: "/dashboard/superadmin/organizations",
        badge: null,
    },
    {
        id: "admins",
        icon: Users,
        label: "Admins",
        path: "/dashboard/superadmin/admins",
        badge: null,
    },
    {
        id: "sales",
        icon: ShoppingCart,
        label: "Sales",
        path: "/dashboard/superadmin/sales",
        badge: null,
    },
    {
        id: "analytics",
        icon: BarChart3,
        label: "Analytics",
        path: "/dashboard/superadmin/analytics",
        badge: null,
    },
    {
        id: "billing",
        icon: FileText,
        label: "Billing",
        path: "/dashboard/superadmin/billing",
        badge: null,
    },
    {
        id: "system",
        icon: Settings,
        label: "System",
        path: "/dashboard/superadmin/system",
        badge: null,
    },
    {
        id: "settings",
        icon: Settings,
        label: "Settings",
        path: "/dashboard/superadmin/settings",
        badge: null,
    },
];

export function getNavigationByRole(role: string): NavigationItem[] {
    switch (role) {
        case "Student":
            return studentNavigation;
        case "Teacher":
            return teacherNavigation;
        case "Admin":
            return adminNavigation;
        case "SuperAdmin":
            return superAdminNavigation;
        default:
            return studentNavigation;

    }
}