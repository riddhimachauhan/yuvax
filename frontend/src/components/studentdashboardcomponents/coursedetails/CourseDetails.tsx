import Sidebar from "../sidebar/Sidebar"
import Header from "../header/HeaderBar";
import SubjectCard from "./SubjectCard";

function CourseDetails() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-[249px]">
                <Header className="mr-4" />
                <div className="pr-4 py-6 ">
                    <SubjectCard />
                </div>
                {/* <CourseSection /> */}
            </div>
        </div>
);
}

export default CourseDetails;