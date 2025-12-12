import QuickQuizzes from "@/components/studentdashboardcomponents/quickquiz/QuickQuizzes";

export default function QuizPage() {
    return (
        <div className="flex bg-[#F4FAFC]">
            <div className="bg-[#F4FAFC] flex-1 ml-[249px]">
                <div className="pr-4 py-6">
                    <QuickQuizzes variant="full" />
                </div>
            </div>
        </div>
    );
}
