"use client";
import Image from "next/image";
import Container from "./common/Container";

import aiImage from "../assets/aiimage.svg";
import studentRobo from "../assets/studentrobo.svg";
import pathImage from "../assets/pathimage.svg";
import mission from "../assets/mission.svg";
import teaches from "../assets/teacher.svg";

const aboutpageData = {
    pageTitle: "Aboutpage",
    sections: [
        {
            id: "our-story",
            title: "Our Story",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            image: {
                src: pathImage,
                alt: "Educational illustration with graduation cap and books",
                width: 395,
                height: 418,
            },
            imageOrder: 2, // Image on right
        },
        {
            id: "mission-vision",
            title: "Our Mission & Vision",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            image: {
                src: mission,
                alt: "Robot character with graduation cap",
                width: 395,
                height: 418,
            },
            imageOrder: 1, // Image on left
        },
        {
            id: "teaches",
            title: "Teaches",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: {
                src: teaches,
                alt: "Robot character with graduation cap",
                width: 395,
                height: 418,
            },
            imageOrder: 2, // Image on right
        },
        {
            id: "student",
            title: "Student",
            description: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
            ],
            image: {
                src: studentRobo,
                alt: "Robot character with graduation cap",
                width: 395,
                height: 418,
            },
            imageOrder: 1, // Image on left
        },
        {
            id: "ai",
            title: "AI",
            description: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
            ],
            image: {
                src: aiImage,
                alt: "Person working at computer with AI elements",
                width: 395,
                height: 418,
            },
            imageOrder: 2, // Image on right
        },
    ],
};

export default function About() {
    return (
        <Container>
            <main className="min-h-screen bg-white hover:shadow-2xl">
                <div className="w-full py-16 space-y-24">
                    {aboutpageData.sections.map((section) => (
                        <section
                            id={section.id}
                            key={section.id}
                            className="grid md:grid-cols-2 gap-12 items-center"
                        >
                            <div
                                className={`${section.imageOrder === 1 ? "md:order-1" : "md:order-2"
                                    } flex justify-center items-center`}
                                style={{ minHeight: section.image.height }}
                            >
                                <Image
                                    src={section.image.src}
                                    alt={section.image.alt}
                                    width={section.image.width}
                                    height={section.image.height}
                                    className="w-full max-w-[395px] h-auto object-contain"
                                />
                            </div>

                            <div
                                className={`${section.imageOrder === 1 ? "md:order-2" : "md:order-1"
                                    } flex flex-col justify-center`}
                                style={{ minHeight: section.image.height }}
                            >
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                    {section.title}
                                </h2>

                                {Array.isArray(section.description) ? (
                                    section.description.map((paragraph, index) => (
                                        <p
                                            key={index}
                                            className="text-[#333333] leading-relaxed mb-4 text-md"
                                        >
                                            {paragraph}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-[#333333] leading-relaxed text-md">
                                        {section.description}
                                    </p>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </Container>
    );
}
