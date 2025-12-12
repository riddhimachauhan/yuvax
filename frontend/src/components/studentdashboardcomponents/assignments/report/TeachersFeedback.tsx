function TeachersFeedback() {
    return (
        <div className="w-full h-full p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex flex-col gap-3 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                    <div>{`Teacher's Feedback`}</div>
                </h3>
                <div className="text-gray-600 text-sm leading-relaxed flex-1">
                    Excellent work on this midterm exam! You demonstrated a strong understanding of derivatives and showed excellent problem-solving skills. Your approach to critical points was particularly impressive. Focus on integration techniques for the next unit, especially substitution methods.
                </div>
            </div>
        </div>
    );
}
export default TeachersFeedback;