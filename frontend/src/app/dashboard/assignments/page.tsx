
import Achievements from "@/components/studentdashboardcomponents/achievement/Achievement";
import AIPredictions from "@/components/studentdashboardcomponents/aiprediction/AiPrediction";
import AssignmentOverview from "@/components/studentdashboardcomponents/assignments/AssignmentOverview";
import DailyTasks from "@/components/studentdashboardcomponents/dailytask/DailyTasks";


function AssignmentPage() {
    return (
        <div className="flex min-h-screen bg-[#F4FAFC]">
            <div className="w-64">
                {/* <Sidebar /> */}
            </div>

            <div className="flex-1 flex flex-col mt-2  ">
                {/* <Header /> */}

                <div className="flex-1 flex flex-col lg:flex-row">
                    <AssignmentOverview />



                    <div className="w-80 lg:w-80 flex-shrink-0">
                        <div className="h-full overflow-y-auto p-6 space-y-8">

                            <DailyTasks />

                            <Achievements />


                            <AIPredictions />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AssignmentPage;