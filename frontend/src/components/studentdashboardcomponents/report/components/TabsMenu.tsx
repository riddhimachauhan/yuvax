"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";

// Import SVGs from your assets folder
import classSvg from "@/assets/class.svg";
import teacherSvg from "@/assets/teacher.svg";
import tabsmenu2 from "@/assets/tabsmenu2.svg";
import tabsmenu3 from "@/assets/tabsmenu3.svg";
import tabsmenu4 from "@/assets/tabsmenu4.svg";
import tabsmenu5 from "@/assets/tabsmenu5.svg";
import Link from "next/link";

type Tab = {
  key: string;
  icon: StaticImageData | string; // supports Next static import or string path
  href: string;
};

const tabs: Tab[] = [
  { key: "Attendance", icon: classSvg, href: "/dashboard/report/attendance" },
  { key: "Learning", icon: teacherSvg, href: "/dashboard/report/learning" },
  { key: "Test", icon: tabsmenu2, href:"/dashboard/report/test" },
  { key: "Homework", icon: tabsmenu3, href: "/dashboard/report/homework" },
  { key: "Behavior", icon: tabsmenu4,href: "/dashboard/report/behavior" },
  { key: "AI Analytics", icon: tabsmenu5, href: "/dashboard/report/ai-analytics" },
];

const TabsMenu: React.FC = () => {
  const pathname = usePathname();
  

  return (
    <div className="w-full flex justify-center">
      {/* Outer container (pill-shaped, fully rounded) */}
      <div
        className="
          inline-flex w-full 
          items-center justify-between
          rounded-[24px] border border-[#E5E5E5]
          bg-white   
        "
        role="tablist"
        aria-label="Primary sections"
      >
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const imgSize = isActive ? 28 : 24;

          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={[
                // layout — center text only (icons hidden via CSS)
                "flex items-center justify-center",
                // sizing tuned to match the visual reference (no icon)
                "h-12 min-w-[150px] px-6",
                // rounded pill look for each tab
                "rounded-full border transition-all duration-200",
                // typography & spacing
                "text-sm font-medium",
                // focus ring
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70",
                // active vs inactive styles
                isActive
                  ? "bg-emerald-500 text-white border-emerald-500 shadow"
                  : "bg-transparent text-slate-600 border-transparent hover:bg-slate-50",
              ].join(" ")}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Icon is left in the markup for compatibility but hidden via CSS so only text shows */}
              <Image
                src={tab.icon}
                alt={`${tab.key} icon`}
                width={imgSize}
                height={imgSize}
                priority={false}
                className="hidden"
              />
              <span className={`${isActive ? "font-semibold" : "font-medium"}`}>
                {tab.key}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TabsMenu;
