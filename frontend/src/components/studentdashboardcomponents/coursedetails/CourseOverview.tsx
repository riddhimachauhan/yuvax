import React from 'react';

interface LearningObjective {
  id: number;
  number: string;
  title: string;
}

const colorPalette = [
  "bg-gradient-to-br from-amber-400 to-amber-600",
  "bg-gradient-to-br from-orange-400 to-orange-600",
  "bg-gradient-to-br from-cyan-500 to-cyan-700",
  "bg-gradient-to-br from-fuchsia-600 to-fuchsia-800",
  "bg-gradient-to-br from-red-500 to-red-700",
  "bg-gradient-to-br from-blue-400 to-blue-600",
  "bg-gradient-to-br from-emerald-400 to-emerald-600",
  "bg-gradient-to-br from-purple-400 to-purple-600",
  "bg-gradient-to-br from-pink-400 to-pink-600",
];

const CourseOverview = () => {
  const courseData = {
    description:
      "This comprehensive Grade 10 Mathematics course follows the CBSE curriculum, covering Algebra, Geometry, Trigonometry, Statistics, and Probability. Students will master solving quadratic equations, understanding geometric proofs, applying trigonometric ratios, analyzing data, and calculating probabilities. The course includes practical applications, real-world problem solving, and prepares students for board examinations with structured lesson plans and regular assessments.",
  };

  const objectives: LearningObjective[] = [
    {
      id: 1,
      number: "01",
      title: "Solve quadratic equations and arithmetic progressions with confidence",
    },
    { id: 2, number: "02", title: "lore" },
    {
      id: 3,
      number: "03",
      title: "Master trigonometric ratios and identities for practical applications",
    },
    {
      id: 4,
      number: "04",
      title: "Understand circle theorems and construct geometric proofs",
    },
    {
      id: 5,
      number: "05",
      title: "Analyze data using mean, median, mode and calculate probabilities",
    },
    {
      id: 6,
      number: "06",
      title: "Solve problems involving surface areas and volumes of solid shapes",
    },
    {
      id: 7,
      number: "07",
      title: "Apply mathematical concepts to real-life situations and problem solving",
    },
    {
      id: 8,
      number: "08",
      title: "Develop logical reasoning and analytical thinking skills",
    },
    {
      id: 9,
      number: "09",
      title: "Prepare for advanced mathematical concepts in higher grades",
    },
  ];

  const getColorByIndex = (index: number): string =>
    colorPalette[index % colorPalette.length];

  const chunkObjectives = (
    objectives: LearningObjective[],
    chunkSize: number = 2
  ) => {
    const chunks = [];
    for (let i = 0; i < objectives.length; i += chunkSize) {
      chunks.push(objectives.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const objectiveChunks = chunkObjectives(objectives);

  const ObjectiveCard: React.FC<{ objective: LearningObjective; index: number }> = ({
    objective,
    index,
  }) => {
    const color = getColorByIndex(index);

    return (
      <div className="flex items-start gap-4 group">
        {/* Number box */}
        <div
          className={`w-16 h-16 sm:w-18 sm:h-18 ${color} rounded-tl-[16px] rounded-tr-[16px] rounded-br-[16px] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl min-w-[64px] relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-white/10"></div>
          <span className="text-white text-lg sm:text-xl font-bold  leading-8 relative z-10">
            {objective.number}
          </span>
        </div>

        {/* Objective text */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-tl-[16px] rounded-tr-[16px] rounded-br-[16px] shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200 p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-80"></div>
            <div className="relative z-10">
              <h4 className="text-stone-700 text-xs sm:text-sm font-semibold  leading-relaxed tracking-wide">
                {objective.title}
              </h4>
            </div>
            <div
              className={`absolute top-0 right-0 w-5 h-5 ${color} rounded-bl-full opacity-20`}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans w-full space-y-4 sm:space-y-6 lg:space-y-8 py-4 sm:py-6 px-2 sm:px-4 bg-gray-50/30">
      {/* Course Description */}
      <div className="w-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-900">
            Course Description
          </h3>
        </div>
        <p className="text-gray-700 text-sm sm:text-sm lg:text-sm font-medium leading-relaxed sm:leading-relaxed tracking-wide">
          {courseData.description}
        </p>
      </div>

      {/* Learning Objectives */}
      <div className="w-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-1.5 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
          <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-900">
            Learning Objectives ({objectives.length})
          </h3>
        </div>

        <div className="w-full flex flex-col gap-6 sm:gap-8 lg:gap-10">
          {objectiveChunks.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
            >
              {chunk.map((objective, indexInChunk) => {
                const globalIndex = chunkIndex * 2 + indexInChunk;
                return (
                  <ObjectiveCard
                    key={objective.id}
                    objective={objective}
                    index={globalIndex}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;