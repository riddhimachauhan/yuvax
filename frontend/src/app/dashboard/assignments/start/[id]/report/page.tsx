import { Metadata } from 'next';
import Sidebar from "@/components/studentdashboardcomponents/sidebar/Sidebar";
import QuizSummary from '@/components/studentdashboardcomponents/quizQuestion/QuizSummary';
import QuizQuestionResultSummary from '@/components/studentdashboardcomponents/quizQuestion/QuizQuestionResultSummary';
import QuizQuestionDetailedBreakdown from '@/components/studentdashboardcomponents/quizQuestion/QuizQuestionDetailedBreakdown';

export const metadata: Metadata = {
    title: 'Assignment Report',
    description: 'View your assignment results and progress',
};

export function generateStaticParams() {
    return [
        { id: 'linear-equations-3' },
        { id: 'atomic-structure-7' },
        { id: 'quadratic-equations-1' },
        { id: 'polynomial-functions-2' },
    ];
}

interface AssignmentReportPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AssignmentReportPage({  }: AssignmentReportPageProps) {

    return (
        <div className="flex min-h-screen bg-[#F4FAFC]">
            <Sidebar />
            <div className="flex-1 ml-64 min-h-screen flex flex-col mt-2 mr-2 ">
                {/* <Header /> */}
                <div className="mt-4 w-full">
                   <QuizSummary/>
                </div>
                <div className='w-full mt-4'>
                  <QuizQuestionResultSummary/>
                </div>
                <div className='w-full mt-4'>
                    <QuizQuestionDetailedBreakdown/>
                </div>
            </div>
        </div>
    );
}