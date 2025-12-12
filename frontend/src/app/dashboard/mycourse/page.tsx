import CourseSection from "@/components/studentdashboardcomponents/coursedetails/CourseSection";
import SubjectCard from "@/components/studentdashboardcomponents/coursedetails/SubjectCard";



function CourseDetails() {
    return (
        <div className="flex bg-[#F4FAFC]">
            {/* <Sidebar /> */}
            <div className="bg-[#F4FAFC] flex-1 ml-[249px]">
                {/* <Header className="mr-4 mt-2" /> */}
                <div className="pr-4 py-6 ">
                    <SubjectCard />
                </div>
                <CourseSection />
            </div>
        </div>
);
}

export default CourseDetails;