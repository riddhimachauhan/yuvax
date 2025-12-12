import { Target, Rocket } from "lucide-react";

// ========== DATA CONFIGURATION ==========
const COMPONENT_DATA = {
  title: "Strengths & Areas for Improvement",
  sections: [
    {
      type: "strengths",
      title: "Strengths",
      color: "green",
      icon: "rocket",
      items: [
        { id: 1, number: "01", text: "Consistent homework submission" },
        { id: 2, number: "02", text: "Excellent problem-solving abilities" },
        { id: 3, number: "03", text: "Strong mathematical reasoning" },
        { id: 4, number: "04", text: "Active class participation" }
      ]
    },
    {
      type: "focusArea", 
      title: "Focus Area",
      color: "red",
      icon: "target",
      items: [
        { id: 1, number: "01", text: "Time management during tests" },
        { id: 2, number: "02", text: "Word problem interpretation" },
        { id: 3, number: "03", text: "Complex fraction operations" },
        { id: 4, number: "04", text: "Quadratic equation solving" }
      ]
    }
  ]
} as const;

// ========== STYLING CONFIGURATION ==========
const STYLE_CONFIG = {
  colors: {
    green: {
      text: "text-green-500",
      border: "border-green-500"
    },
    red: {
      text: "text-red-400", 
      border: "border-red-400"
    }
  },
  icons: {
    rocket: Rocket,
    target: Target
  }
} as const;

// ========== COMPONENT ==========
function StrengthAndImprovements() {
  const { title, sections } = COMPONENT_DATA;
  const { colors, icons } = STYLE_CONFIG;

  const getColorClasses = (color: keyof typeof colors) => {
    return colors[color];
  };

  const getIconComponent = (iconName: keyof typeof icons) => {
    const IconComponent = icons[iconName];
    return <IconComponent size={20} />;
  };

  return (
    <div className="self-stretch p-6 bg-white rounded-3xl flex flex-col items-start gap-6">
      {/* Header */}
      <div className="flex justify-center items-center gap-2.5">
        <h2 className="text-zinc-800 text-xl font-bold leading-loose">
          {title}
        </h2>
      </div>
      
      {/* Sections Container */}
      <div className="self-stretch flex justify-start items-start gap-6">
        {sections.map((section) => {
          const colorClasses = getColorClasses(section.color as keyof typeof colors);
          const IconComponent = getIconComponent(section.icon as keyof typeof icons);
          
          return (
            <div key={section.type} className="flex-1 flex flex-col items-start gap-5">
              {/* Section Header */}
              <div className="flex justify-center items-center gap-2">
                <div className={colorClasses.text}>
                  {IconComponent}
                </div>
                <h3 className={`${colorClasses.text} text-base font-medium leading-normal`}>
                  {section.title}
                </h3>
              </div>
              
              {/* Items Grid */}
              <div className="self-stretch flex justify-start items-start gap-5">
                {[0, 1].map((columnIndex) => (
                  <div key={columnIndex} className="flex-1 flex flex-col items-start gap-5">
                    {section.items
                      .filter((_, index) => index % 2 === columnIndex)
                      .map((item) => (
                        <div key={item.id} className="self-stretch flex justify-start items-center gap-2.5">
                          <span className="text-stone-500 text-base font-normal leading-normal min-w-[25px]">
                            {item.number}
                          </span>
                          <div className={`flex-1 px-5 border-l-4 ${colorClasses.border} flex flex-col justify-center items-start gap-0.5`}>
                            <p className="self-stretch text-zinc-800 text-sm font-medium leading-tight">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StrengthAndImprovements;