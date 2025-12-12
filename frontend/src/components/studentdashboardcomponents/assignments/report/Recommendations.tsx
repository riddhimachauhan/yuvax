function Recommendations() {
    return (
        <div className="w-full h-full p-4 bg-white rounded-xl shadow-xs border border-gray-200/60 flex flex-col">
            <div className="flex flex-col gap-3 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                    Recommendations
                </h3>
                <div className="text-gray-600 text-sm leading-relaxed space-y-2 flex-1">
                    <p className="flex items-start gap-2">
                        <span className="text-gray-400 shrink-0">•</span>
                        <span>Review integration by substitution and practice more complex integral problems</span>
                    </p>
                    <p className="flex items-start gap-2">
                        <span className="text-gray-400 shrink-0">•</span>
                        <span>Work through limit problems using L{"'"}Hôpital{"'"}s rule</span>                    
                    </p>
                    <p className="flex items-start gap-2">
                        <span className="text-gray-400 shrink-0">•</span>
                        <span>Complete the additional practice problems in Chapter 6</span>
                    </p>
                    <p className="flex items-start gap-2">
                        <span className="text-gray-400 shrink-0">•</span>
                        <span>Join the study group sessions on Wednesdays for collaborative problem-solving</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Recommendations;