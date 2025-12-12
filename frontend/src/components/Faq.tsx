"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import classIcon from "../assets/class.svg";
import teacherIcon from "../assets/teacher.svg";
import customerIcon from "../assets/coustmer.svg";
import Container from "./common/Container";

const categories = [
  {
    id: "class-experience",
    shortLabel: "Class Experience",
    label: (
      <>
        <span className="font-bold text-xl sm:block mr-1">Class</span>
        <span className="text-bold sm:block">Experience</span>
      </>
    ),
    icon: classIcon,
  },
  {
    id: "teacher-queries",
    shortLabel: "Teacher Queries",
    label: (
      <>
        <span className="font-bold text-xl sm:block mr-1">Teacher</span>
        <span className="text-semibold sm:block">Queries</span>
      </>
    ),
    icon: teacherIcon,
  },
  {
    id: "customer-support",
    shortLabel: "Customer Support",
    label: (
      <>
        <span className="font-bold text-xl sm:block mr-1">Customer</span>
        <span className="text-semibold sm:block">Support</span>
      </>
    ),
    icon: customerIcon,
  },
];

const faqData = {
  "class-experience": [
    {
      question: "What age group are YuvaX courses designed for?",
      answer:
        "YuvaX courses are designed for children aged 6-16 years, with age-appropriate curriculum and teaching methods for each group.",
    },
    {
      question: "How is my child's data and privacy protected?",
      answer:
        "We follow strict data protection protocols and comply with international privacy standards to ensure your child's information is secure.",
    },
    {
      question: "Can I get the recording of the classes for my child?",
      answer:
        "Yes, all live classes are recorded and made available to students for review within 24 hours of the session.",
    },
    {
      question: "Is there any homework or outside practice required?",
      answer:
        "We provide optional practice exercises and projects to reinforce learning, but they are designed to be engaging rather than burdensome.",
    },
  ],
  "teacher-queries": [
    {
      question: "How are teachers selected and trained?",
      answer:
        "Our teachers undergo a rigorous selection process and receive comprehensive training in our teaching methodology.",
    },
    {
      question: "What qualifications do the instructors have?",
      answer:
        "All our instructors have relevant degrees and certifications in their subject areas, plus specialized training in online education.",
    },
  ],
  "customer-support": [
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our support team via email, phone, or live chat available 24/7 on our website.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "We offer a 30-day money-back guarantee if you're not satisfied with our courses.",
    },
  ],
};

const Faq: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("class-experience");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (index: number) => {
    const itemId = `${activeCategory}-${index}`;
    setOpenItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSetCategory = (id: string) => {
    setActiveCategory(id);
    // close any opened FAQ items when category changes
    setOpenItems([]);
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Container>
      <div className="w-full py-20">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#111111] mb-12">
          Frequently Asked Questions
        </p>

        <div className="flex justify-center mb-12 ">
          {/* Desktop pill buttons (hidden on small screens) */}
          <div className="hidden sm:flex bg-white rounded-full gap-2 lg:gap-4 overflow-x-auto border border-gray-300">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleSetCategory(category.id)}
                className={cn(
                  "flex items-center gap-2 sm:gap-3 lg:gap-6 p-2 px-3 sm:px-4 lg:px-8 py-1 rounded-full text-sm sm:text-md font-semibold text-[#000000] transition-all cursor-pointer transparent whitespace-nowrap",
                  activeCategory === category.id
                    ? "bg-[#10A337] text-white border-[#FEE472]"
                    : "text-gray-600 hover:text-gray-900 border-[#E5E5E5]"
                )}
              >
                <Image
                  src={category.icon}
                  alt={category.id}
                  width={32}
                  height={32}
                  className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 object-contain"
                />
                <span className="text-xs sm:text-sm lg:text-base">
                  {category.label}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile: show a single dropdown/select with the active icon to the left */}
          <div className="flex sm:hidden flex-col w-full">
            <label htmlFor="faq-category" className="sr-only">
              Select FAQ category
            </label>

            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => setMobileOpen((s) => !s)}
                    className={cn(
                      "w-full flex items-center gap-3 p-2 px-4 rounded-lg border text-sm font-medium justify-between",
                      "bg-white text-gray-800 border-[#E5E5E5] shadow-sm"
                    )}
                    aria-expanded={mobileOpen}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          categories.find((c) => c.id === activeCategory)!.icon
                        }
                        alt="active category"
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain flex-shrink-0"
                      />
                      <span>
                        {
                          categories.find((c) => c.id === activeCategory)!
                            .shortLabel
                        }
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-gray-500 transition-transform",
                        mobileOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {mobileOpen && (
                    <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden z-50">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            handleSetCategory(category.id);
                            setMobileOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 p-3 text-left text-sm font-semibold hover:bg-gray-50 transition-colors",
                            activeCategory === category.id
                              ? "bg-[#10A337] text-white"
                              : "text-gray-700"
                          )}
                        >
                          <Image
                            src={category.icon}
                            alt={category.id}
                            width={36}
                            height={36}
                            className="w-8 h-8 object-contain"
                          />
                          <span>{category.shortLabel}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* if you prefer a full-width select only, replace above with a single select element */}
          </div>
        </div>

        <div className="space-y-4 sm:px-[90px] w-full">
          {faqData[activeCategory as keyof typeof faqData]?.map(
            (item, index) => {
              const itemId = `${activeCategory}-${index}`;
              const isOpen = openItems.includes(itemId);

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-300 overflow-hidden p-1"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-4 sm:px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors "
                  >
                    <span className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-gray-500 transition-transform flex-shrink-0",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-3 p-2 border-t border-gray-200">
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </Container>
  );
};

export default Faq;
