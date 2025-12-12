import AssignmentHomeworkDetails from "@/components/studentdashboardcomponents/assignments/AssignmentHomeworkDetails";
import AssignmentHomeworkSummary from "@/components/studentdashboardcomponents/assignments/AssignmentHomeworkSummary";
import SubjectCard from "@/components/studentdashboardcomponents/coursedetails/SubjectCard";



function AssignmentDetails() {
    return (
        <div className="flex min-h-screen bg-[#F4FAFC]">
            {/* <Sidebar /> */}

            <div className="flex-1 ml-[245px] min-h-screen flex flex-col bg-[#F4FAFC]">
                {/* <Header /> */}
                
                <div className="flex-1 overflow-y-auto">
                    <div className="w-full px-2 py-4 space-y-5">
                        <div className="w-full">
                            <SubjectCard />
                        </div>
                        <section className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
                            <AssignmentHomeworkSummary />
                        </section>
                         <section>
                            <AssignmentHomeworkDetails />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignmentDetails;