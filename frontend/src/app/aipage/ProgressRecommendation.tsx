import React from "react";
import {
  Star,
  BookOpen,
  Globe,
  FileText,
  Clock,
  Play,
} from "lucide-react";

export default function ProgressRecommendation() {
  const progressItems = [
    { name: "Python Programming", progress: 100, completed: true },
    { name: "Robotics", progress: 100, completed: true },
    { name: "Python Programming", progress: 100, completed: true },
    { name: "Robotics", progress: 100, completed: true },
  ];

  const recommendations = [
    {
      title: "Revise Chapter 3 – Fractions",
      duration: "15 min",
      Icon: BookOpen,
    },
    {
      title: "Geography Quiz",
      duration: "5 min",
      Icon: Globe,
    },
    {
      title: "Complete English Grammar exercises",
      duration: "20 min",
      Icon: FileText,
    },
  ];

  return (
    <div className="w-full bg-gray-50 h-full">
      <div className="w-full">
        <div className="flex flex-col gap-6 lg:flex-row ">
          {/* Progress Insights */}
          <div className="flex-1 bg-white rounded-r-0 lg:rounded-r-[22px] rounded-l-[22px] p-6 w-full shadow-2xl">
            <h2 className="text-xl font-bold text-text-1 mb-4 font-sans">
              Progress Insights
            </h2>

            <div className="space-y-4">
              {/* Study Streak */}
              <div className="pb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-base font-bold text-text-2 font-sans">
                    Study Streak
                  </span>
                  <span className="text-xl font-bold text-streak-orange font-sans">
                    🔥 5 Days
                  </span>
                </div>
                <div className="flex gap-2.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex-1 h-3 rounded-[22px] bg-streak-orange" />
                  ))}
                  {[6, 7].map((i) => (
                    <div key={i} className="flex-1 h-3 rounded-[22px] bg-[#DCDCDC]" />
                  ))}
                </div>
              </div>

              {/* Progress Items */}
              {progressItems.map((item, index) => (
                <div key={index} className="pb-4">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-base font-bold text-text-2 font-sans">
                      {item.name}
                    </span>
                    <span className="text-xl font-bold text-text-2 font-sans">
                      {item.progress}%
                    </span>
                  </div>

                  <div className="relative h-4 px-2">
                    <div className="absolute left-2 top-[5px] w-full h-[7px] rounded-lg bg-[rgba(28,166,114,0.2)]" />
                    <div
                      className="absolute left-2 top-[5px] h-[7px] rounded-lg bg-primary-green"
                      style={{ width: index % 2 === 0 ? "70%" : "55%" }}
                    />
                    {item.completed && (
                      <div className="absolute right-0 top-0 w-[18px] h-4 flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-400" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* AI Insight */}
              <div className="bg-light-green-bg rounded-xl p-3">
                <p className="text-sm text-text-2 font-sans">
                  💡 You`re strong in Science, but need more practice in English
                  Grammar.
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="flex-1 bg-white rounded-l-0 lg:rounded-l-[22px] rounded-r-[22px] p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-text-1 mb-4 font-sans">
              Recommendations
            </h2>

            <div className="space-y-4">
              {/* Today's Progress */}
              <div className="bg-green-200 rounded-xl p-3">
                  <div className="flex justify-between items-center mb-2">
                <div className="pb-3 border-b border-transparent ">
                    <span className="text-lg font-bold text-primary-green font-sans">
                      Today`s Progress
                    </span>
                    <span className="text-lg font-bold text-primary-green font-sans">
                      2/3
                    </span>
                  </div>
                  {/* <div className="relative h-[7px] pr-2 mb-3">
                    <div className="absolute left-0 top-0 w-full h-[7px] rounded-lg bg-[rgba(0,131,202,0.2)]" />
                    <div className="absolute left-0 top-0 w-[79%] h-[7px] rounded-lg bg-progress-blue" />
                  </div> */}
                  <p className="text-lg text-primary-green font-sans">
                    🔥 Keep up your streak, only 1 lesson left today!
                    <br />
                    <span className="font-sans">AI Suggestions</span>
                  </p>
                </div>
              </div>

              {/* Recommendation Cards */}
              {recommendations.map((rec, index) => {
                const Icon = rec.Icon;
                return (
                  <div
                    key={index}
                    className="border border-card-border rounded-xl p-[18px] bg-[#FEFEFE]"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-6 h-6 flex items-center justify-center rounded-md bg-[rgba(10,156,157,0.06)]">
                          <Icon className="w-5 h-5 text-primary-green" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-md font-sans  text-gray-700  mb-1">
                            {rec.title}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 flex items-center gap-2">
                              <Clock className="w-3 h-3 text-text-2" />
                              {rec.duration}
                            </span>
                            <Play className="w-3 h-3 text-primary-green opacity-70" />
                          </div>
                        </div>
                      </div>

                      <button className="px-[10px] py-2 border border-[rgba(28,166,114,0.5)] rounded-xl flex items-center gap-2 hover:bg-primary-green/5 transition-colors">
                        <Play className="w-3 h-3 " />
                        <span className="text-base font-normal text-green-400 cursor-pointer font-sans">
                          Start
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}