import Image from "next/image";
import robo from "@/assets/AIimage.png";
export default function Index() {
    return (
        <div className="h-full py-6 ">
            <div className="w-full bg-blue-600 rounded-2xl ">
                <div className="relative  overflow-hidden ">
                    <div className="flex items-center justify-between px-8 md:px-12 lg:px-16 py-8 md:py-10 lg:py-10">
                        <div className="flex-1 text-white pr-4 md:pr-8">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold font-sans leading-tight mb-1">
                                Hi! Ishant,
                            </h1>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold font-sans leading-tight mb-3 md:mb-4">
                                Welcome back{' '}
                                <span role="img" aria-label="raising hands">
                                    🙌
                                </span>
                            </h2>
                            <p className="text-sm sm:text-base md:text-md lg:text-xl opacity-95 leading-relaxed font-sans">
                                I`m your AI Buddy. Here`s your study plan for today.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <Image
                                src={robo}
                                alt="AI Buddy Robot"
                                className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-56 xl:h-56 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
