import React from 'react';
import {
    FileText,
    Download,
    Archive,
    Video,
    File,
} from 'lucide-react';

interface Resource {
    id: number;
    title: string;
    format: string;
    size: string;
    type: 'pdf' | 'zip' | 'doc' | 'video';
    description?: string;
}

const CourseResource = () => {
    const resources: Resource[] = [
        {
            id: 1,
            title: "Advanced Mathematics Textbook",
            format: "PDF",
            size: "45.2 MB",
            type: "pdf",
            description: "Complete course textbook with exercises and solutions"
        },
        {
            id: 2,
            title: "Practice Worksheets Bundle",
            format: "PDF",
            size: "18.7 MB",
            type: "pdf",
            description: "Additional practice problems with step-by-step solutions"
        },
        {
            id: 3,
            title: "Formula Reference Sheet",
            format: "PDF",
            size: "2.1 MB",
            type: "pdf",
            description: "Quick reference for all important formulas and theorems"
        },
        {
            id: 4,
            title: "Video Transcripts & Notes",
            format: "ZIP",
            size: "125.5 MB",
            type: "zip",
            description: "Complete transcripts and supplementary notes for all video lessons"
        }
    ];

    const getFileIcon = (type: string) => {
        const icons = {
            pdf: (
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-red-600" />
                </div>
            ),
            zip: (
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Archive className="w-4 h-4 text-purple-600" />
                </div>
            ),
            doc: (
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <File className="w-4 h-4 text-blue-600" />
                </div>
            ),
            video: (
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Video className="w-4 h-4 text-green-600" />
                </div>
            )
        };

        return icons[type as keyof typeof icons] || icons.pdf;
    };

    const getFileColor = (type: string) => {
        const colors = {
            pdf: 'bg-red-50 border-red-200 text-red-700',
            zip: 'bg-purple-50 border-purple-200 text-purple-700',
            doc: 'bg-blue-50 border-blue-200 text-blue-700',
            video: 'bg-green-50 border-green-200 text-green-700'
        };
        return colors[type as keyof typeof colors] || colors.pdf;
    };

    const getSizeColor = (size: string) => {
        if (size.includes('GB')) return 'text-orange-600 bg-orange-50 border-orange-200';
        if (size.includes('MB')) {
            const mbValue = parseFloat(size);
            if (mbValue > 100) return 'text-red-600 bg-red-50 border-red-200';
            if (mbValue > 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            return 'text-blue-600 bg-blue-50 border-blue-200';
        }
        if (size.includes('KB')) return 'text-green-600 bg-green-50 border-green-200';
        return 'text-gray-600 bg-gray-50 border-gray-200';
    };

    const handleDownload = (resource: Resource) => {
        console.log(`Downloading: ${resource.title}`);
        // Add actual download logic here
    };

    return (
        <div className="font-sans w-full space-y-6 py-6 bg-white rounded-2xl p-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 shadow-md border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">Course Resources</h4>
                        <p className="text-gray-600 text-sm mt-0.5">Download all course materials, textbooks, and supplementary resources</p>
                    </div>
                </div>
            </div>

            {/* Resources Grid */}
            <div className="grid gap-4">
                {resources.map((resource) => (
                    <div
                        key={resource.id}
                        className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:border-blue-200"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                                {/* File Icon */}
                                {getFileIcon(resource.type)}

                                {/* Resource Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                                            {resource.title}
                                        </h3>
                                        <div className="flex gap-1.5 flex-wrap">
                                            <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full border ${getFileColor(resource.type)}`}>
                                                {resource.format}
                                            </span>
                                            <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full border ${getSizeColor(resource.size)}`}>
                                                {resource.size}
                                            </span>
                                        </div>
                                    </div>

                                    {resource.description && (
                                        <p className="text-gray-600 text-xs mb-2 leading-relaxed">
                                            {resource.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Download Button */}
                            <button
                                onClick={() => handleDownload(resource)}
                                className="flex items-center gap-1.5 bg-gradient-to-r from-[#0A9C9D] to-[#088f8f] hover:from-[#088f8f] hover:to-[#077a7a] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-105 group/btn shadow-sm text-sm"
                            >
                                <Download className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform duration-300" />
                                Download
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseResource;