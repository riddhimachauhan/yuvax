import download from "@/assets/download.svg";
import restart from "@/assets/restart.svg";
import Image from "next/image";

function DownloadReport() {
    return (
        <div className="self-stretch flex flex-col items-end gap-12">
            <div className="h-10 flex items-center gap-4">
                {/* Restart Button */}
                <button className="px-5 py-2.5 rounded-2xl border border-black hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 flex items-center gap-2 group">
                    <div className="w-5 h-5 flex items-center justify-center">
                        <Image 
                            src={restart} 
                            alt="Restart" 
                            width={20} 
                            height={20}
                            className="group-hover:scale-110 transition-transform duration-200"
                        />
                    </div>
                    <span className="text-black text-xs font-bold  leading-tight">
                        Start Again
                    </span>
                </button>

                {/* Download Button */}
                <button className="px-5 py-2.5 bg-black rounded-2xl hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 flex items-center gap-2 group">
                    <div className="w-5 h-5 flex items-center justify-center">
                        <Image 
                            src={download} 
                            alt="Download" 
                            width={20} 
                            height={20}
                            className="brightness-0 invert group-hover:scale-110 transition-transform duration-200"
                        />
                    </div>
                    <span className="text-white text-xs font-bold  leading-tight">
                        Download Report (PDF)
                    </span>
                </button>
            </div>
        </div>
    );
}

export default DownloadReport;