"use client";

import React from 'react';
import problemSet from "@/assets/problemSet.svg";
import trophy from "@/assets/trophy.svg";
import pending from "@/assets/pending.svg";
import completed from "@/assets/completed.svg";
import overdue from "@/assets/waiting.svg";
import Image from 'next/image';
import Link from 'next/link';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface AssignmentHomeworkDetailsProps {
    className?: string;
}

interface AssignmentCardProps {
    id: string;
    status: 'overdue' | 'in-progress' | 'completed' | 'upcoming';
    title: string;
    subject: string;
    description: string;
    duration: string;
    overdueDays?: number;
    xpPoints: number;
    originalXpPoints?: number;
    onAction: () => void;
}

type StatusColor = 'red' | 'blue' | 'green' | 'yellow';

interface StatusConfig {
    color: StatusColor;
    label: string;
    buttonText: string;
    href: string;
    icon: string | StaticImport;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
    id,
    status,
    title,
    subject,
    description,
    duration,
    overdueDays,
    xpPoints,
    originalXpPoints,
    onAction,
}) => {
    const statusConfig: Record<AssignmentCardProps['status'], StatusConfig> = {
        overdue: {
            color: 'red',
            label: 'Overdue',
            buttonText: 'Start',
            href: `/dashboard/assignments/start/${id}`,
            icon: overdue
        },
        'in-progress': {
            color: 'blue',
            label: 'In Progress',
            buttonText: 'Resume',
            href: `/dashboard/assignments/resume`,
            icon: pending
        },
        completed: {
            color: 'green',
            label: 'Completed',
            buttonText: 'Review',
            href: `/dashboard/assignments/report/${id}`,
            icon: completed
        },
        upcoming: {
            color: 'yellow',
            label: 'Upcoming',
            buttonText: 'Start',
            href: `/dashboard/assignments/upcoming`,
            icon: pending
        }
    };

    const colorClasses: Record<StatusColor, {
        bg: string;
        text: string;
        border: string;
        button: string;
        iconBg: string;
        statusBg: string;
        statusDot: string;
    }> = {
        red: {
            bg: 'bg-white',
            text: 'text-red-600',
            border: 'border-red-200',
            button: 'bg-red-500 hover:bg-red-600 border-red-600',
            iconBg: 'bg-red-500',
            statusBg: 'bg-red-50 border-red-200',
            statusDot: 'bg-red-500'
        },
        blue: {
            bg: 'bg-white',
            text: 'text-blue-600',
            border: 'border-blue-200',
            button: 'bg-blue-500 hover:bg-blue-600 border-blue-600',
            iconBg: 'bg-blue-500',
            statusBg: 'bg-blue-50 border-blue-200',
            statusDot: 'bg-blue-500'
        },
        green: {
            bg: 'bg-white',
            text: 'text-green-600',
            border: 'border-green-200',
            button: 'bg-green-500 hover:bg-green-600 border-green-600',
            iconBg: 'bg-green-500',
            statusBg: 'bg-green-50 border-green-200',
            statusDot: 'bg-green-500'
        },
        yellow: {
            bg: 'bg-white',
            text: 'text-yellow-600',
            border: 'border-yellow-200',
            button: 'bg-yellow-500 hover:bg-yellow-600 border-yellow-600',
            iconBg: 'bg-yellow-500',
            statusBg: 'bg-yellow-50 border-yellow-200',
            statusDot: 'bg-yellow-500'
        }
    };

    const config = statusConfig[status];
    const colors = colorClasses[config.color];

    return (
        <div className={`p-4 ${colors.bg} rounded-lg border ${colors.border} shadow-sm hover:shadow-md transition-all duration-200`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 relative">
                        <div className={`w-7 h-7 absolute top-0.5 left-0.5 rounded-md ${colors.iconBg} border-2 border-white shadow-sm`} />
                        <div className="w-4 h-4 absolute top-2 left-2">
                            <Image
                                src={problemSet}
                                alt={title}
                                width={16}
                                height={16}
                                className="relative z-10 brightness-0 invert"
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <span className={`text-base font-semibold ${colors.text}`}>
                        Problem Set
                    </span>
                </div>
                <div className={`px-3 py-1 rounded-lg ${colors.statusBg} border ${colors.border} flex items-center gap-1`}>
                    <div className="w-3 h-3 flex items-center justify-center">
                        <Image
                            src={config.icon}
                            alt={config.label}
                            width={12}
                            height={12}
                            className="object-contain"
                        />
                    </div>
                    <span className={`text-xs font-medium ${colors.text}`}>
                        {config.label}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-2 mb-4">
                <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        {overdueDays && (
                            <>
                                <span>{overdueDays} days overdue</span>
                                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                            </>
                        )}
                        <span>{duration}</span>
                        {status === 'completed' && (
                            <>
                                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                <span>Completed</span>
                            </>
                        )}
                    </div>
                </div>

                <div>
                    <p className="text-gray-700 text-sm font-medium mb-1">
                        {subject}
                    </p>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 ${colors.statusBg} rounded-md flex items-center justify-center`}>
                        {status === 'completed' ? (
                            <Image
                                src={trophy}
                                alt="Trophy"
                                width={28}
                                height={28}
                                className={colors.text}
                            />
                        ) : (
                            <span className={`text-xs font-bold ${colors.text}`}>XP</span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <div className={`text-sm font-bold ${colors.text}`}>
                            {xpPoints} {status === 'completed' ? 'XP Gained' : 'XP Points'}
                        </div>

                        {status === 'completed' && originalXpPoints && (
                            <div className="text-gray-400 text-xs font-medium">
                                {originalXpPoints} Total XP
                            </div>
                        )}
                    </div>
                </div>
                <Link
                    href={config.href}
                    onClick={onAction}
                    className={`px-6 py-1.5 rounded-lg text-white text-sm font-bold transition-colors border ${colors.button} text-center`}
                >
                    {config.buttonText}
                </Link>
            </div>
        </div>
    );
};

const AssignmentHomeworkDetails: React.FC<AssignmentHomeworkDetailsProps> = ({ className = '' }) => {
    const handleAssignmentAction = (assignmentId: string, status: string) => {
        console.log(`Action triggered for ${status} assignment:`, assignmentId);
        // You can add additional logic here if needed
        // For example: track analytics, update state, etc.
    };

    // Enhanced assignments data with more variety
    const assignments = [
        {
            id: 'quadratic-equations-1',
            status: 'overdue' as const,
            title: 'Quadratic Equations Practice Set',
            subject: 'Algebra II - Chapter 3',
            description: 'Test your understanding of quadratic equations and solution methods.',
            duration: '30 mins',
            overdueDays: 10,
            xpPoints: 50,
            originalXpPoints: 100
        },
        {
            id: 'polynomial-functions-2',
            status: 'in-progress' as const,
            title: 'Polynomial Functions Advanced',
            subject: 'Algebra II - Chapter 4',
            description: 'Master polynomial functions and their graphs.',
            duration: '45 mins',
            xpPoints: 75
        },
        {
            id: 'linear-equations-3',
            status: 'completed' as const,
            title: 'Linear Equations Review',
            subject: 'Algebra I - Chapter 2',
            description: 'Comprehensive review of linear equations.',
            duration: '25 mins',
            xpPoints: 78,
            originalXpPoints: 85
        },
        {
            id: 'exponential-functions-4',
            status: 'upcoming' as const,
            title: 'Exponential Functions',
            subject: 'Algebra II - Chapter 5',
            description: 'Introduction to exponential functions and applications.',
            duration: '35 mins',
            xpPoints: 60
        },
        {
            id: 'gravitational-forces-5',
            status: 'upcoming' as const,
            title: 'Gravitational Forces',
            subject: 'Physics - Mechanics',
            description: 'Understanding gravitational force and its effects.',
            duration: '40 mins',
            xpPoints: 90
        },
        {
            id: 'french-revolution-6',
            status: 'in-progress' as const,
            title: 'The French Revolution',
            subject: 'History - Modern Europe',
            description: 'Causes and impacts of the French Revolution.',
            duration: '35 mins',
            xpPoints: 70
        },
        {
            id: 'atomic-structure-7',
            status: 'completed' as const,
            title: 'Atomic Structure',
            subject: 'Chemistry - Fundamentals',
            description: 'Evolution of atomic theory and structure.',
            duration: '30 mins',
            xpPoints: 65,
            originalXpPoints: 80
        },
        {
            id: 'world-war-ii-8',
            status: 'overdue' as const,
            title: 'World War II Analysis',
            subject: 'History - Global Conflicts',
            description: 'Causes, events, and consequences of WWII.',
            duration: '45 mins',
            overdueDays: 3,
            xpPoints: 85,
            originalXpPoints: 100
        }
    ];

    return (
        <div className={`${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {assignments.map((assignment) => (
                    <AssignmentCard
                        key={assignment.id}
                        id={assignment.id}
                        status={assignment.status}
                        title={assignment.title}
                        subject={assignment.subject}
                        description={assignment.description}
                        duration={assignment.duration}
                        overdueDays={assignment.overdueDays}
                        xpPoints={assignment.xpPoints}
                        originalXpPoints={assignment.originalXpPoints}
                        onAction={() => handleAssignmentAction(assignment.id, assignment.status)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AssignmentHomeworkDetails;