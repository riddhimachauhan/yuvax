import AnswerDistribution from "@/components/studentdashboardcomponents/assignments/report/AnswerDistribution";
import ReportCardOverview from "@/components/studentdashboardcomponents/assignments/report/CardOverview";
import DetailedQuestionBreakdown from "@/components/studentdashboardcomponents/assignments/report/DetailedQuestionsBreakdown";
import DownloadReport from "@/components/studentdashboardcomponents/assignments/report/DownloadReport";
import Recommendations from "@/components/studentdashboardcomponents/assignments/report/Recommendations";
import StrengthAndImprovements from "@/components/studentdashboardcomponents/assignments/report/StrenghtAndImprovements";
import TeachersFeedback from "@/components/studentdashboardcomponents/assignments/report/TeachersFeedback";
import Sidebar from "@/components/studentdashboardcomponents/sidebar/Sidebar";
import PerformanceComparison from "@/components/studentdashboardcomponents/assignments/report/PerformanceComparison";



// Generate static params for SSG
export function generateStaticParams() {
  // Return the IDs you want to pre-render at build time
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

async function AssignmentReportPage({  }: AssignmentReportPageProps) {
  return (
    <div className="flex min-h-screen bg-[#F4FAFC]">
      <Sidebar />

      <div className="flex-1 ml-[245px] min-h-screen flex flex-col bg-[#F4FAFC] mt-2 mr-1">
        {/* <Header /> */}

        <div className="flex-1 overflow-y-auto">
          <div className="w-full px-2 py-4 space-y-5">


            <div className="w-full">
              <ReportCardOverview />
            </div>

            <div className="flex flex-col lg:flex-row gap-3 w-full h-fit">
              <AnswerDistribution />
              <PerformanceComparison />
            </div>

            <div className="w-full">
              <DetailedQuestionBreakdown />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 w-full h-fit">
              <div className="flex-1 min-h-[200px]">
                <TeachersFeedback />
              </div>
              <div className="flex-1 min-h-[200px]">
                <Recommendations />
              </div>
            </div>

            <div className="w-full">
              <StrengthAndImprovements />
            </div>

            <div className="w-full">
              <DownloadReport />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentReportPage;