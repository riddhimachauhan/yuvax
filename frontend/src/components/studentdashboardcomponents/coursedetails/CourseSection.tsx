"use client"
import { useState } from 'react';
import CourseOverview from './CourseOverview';
import CourseModule from './CourseModule';
import CourseAssignment from './CourseAssignment';
import CourseResource from './CourseResource';

const tabs = [
  { id: 'overview', label: 'Overview', component: CourseOverview },
  { id: 'modules', label: 'Modules', component: CourseModule },
  { id: 'assignments', label: 'Assignments', component: CourseAssignment },
  { id: 'resources', label: 'Resources', component: CourseResource },
] as const;

function CourseSection() {
  const [activeTab, setActiveTab] = useState('overview');

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="container mx-auto px-4">
        <div className="font-sans rounded-3xl bg-white shadow-lg border border-gray-200/60 transition-all duration-300">
          <div className="flex w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative py-2 px-3 group flex-1 text-center"
              >
                <div
                  className={`absolute inset-0 bg-[#1CA672] rounded-full transition-all duration-300 ${
                    activeTab === tab.id ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                  }`}
                />
                <span
                  className={`relative z-10 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto ">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
}

export default CourseSection;