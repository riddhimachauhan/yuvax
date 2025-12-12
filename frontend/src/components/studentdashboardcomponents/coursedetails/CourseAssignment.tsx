import React from 'react';

// Mock data matching your image structure
const assignmentsData = [
  {
    id: 1,
    title: "Quadratic Equations Quiz",
    dueDate: "Due: Dec 20, 2024",
    status: "review",
    tags: ["Review", "Completed"],
    progress: 92
  },
  {
    id: 2,
    title: "Polynomial Operations Homework",
    dueDate: "Due: Dec 20, 2024",
    status: "start",
    tags: ["Start", "Pending"],
    progress: 0
  },
  {
    id: 3,
    title: "Trigonometry Problem Set",
    dueDate: "Due: Dec 20, 2024",
    status: "start",
    tags: ["Start", "Upcoming"],
    progress: 0
  },
  {
    id: 4,
    title: "Mid-term Exam",
    dueDate: "Due: Dec 20, 2024",
    status: "review",
    tags: ["Review", "Completed"],
    progress: 88
  }
];

const CourseAssignment: React.FC = () => {
  // Function to determine tag styles based on tag type
  const getTagStyles = (tag: string, assignmentTags: string[]): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      borderRadius: '16px',
      padding: '4px 12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.3px'
    };

    switch (tag.toLowerCase()) {
      case 'review':
        return {
          ...baseStyles,
          backgroundColor: '#10B981',
          color: 'white',
          boxShadow: '0 1px 2px rgba(16, 185, 129, 0.2)'
        };
      case 'completed':
        return {
          ...baseStyles,
          backgroundColor: '#ECFDF5',
          color: '#047857',
          border: '1px solid #D1FAE5'
        };
      case 'start':
        // Check if this start tag is with upcoming (yellow) or pending (red)
        if (assignmentTags.includes('Upcoming')) {
          return {
            ...baseStyles,
            backgroundColor: '#F59E0B',
            color: 'white',
            boxShadow: '0 1px 2px rgba(245, 158, 11, 0.2)'
          };
        } else {
          return {
            ...baseStyles,
            backgroundColor: '#EF4444',
            color: 'white',
            boxShadow: '0 1px 2px rgba(239, 68, 68, 0.2)'
          };
        }
      case 'pending':
        return {
          ...baseStyles,
          backgroundColor: '#FEF2F2',
          color: '#DC2626',
          border: '1px solid #FECACA'
        };
      case 'upcoming':
        return {
          ...baseStyles,
          backgroundColor: '#FFFBEB',
          color: '#D97706',
          border: '1px solid #FDE68A'
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Course Assignments</h1>
            <p className="text-gray-600 text-sm mt-1">Manage and track your assignment progress</p>
          </div>
        </div>

        {/* Assignment List */}
        <div className="space-y-3">
          {assignmentsData.map((assignment) => (
            <div
              key={assignment.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white hover:border-gray-300 group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start space-x-3">
                    {/* Assignment Icon */}
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <span className="text-blue-600 text-base font-bold">📝</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {assignment.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1 flex items-center">
                        <span className="mr-1">📅</span>
                        {assignment.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 ml-4">
                  {/* Percentage indicator - only for review status */}
                  {assignment.status === 'review' && (
                    <div className="text-right">
                      <span className="text-3xl font-semibold mt-2 text-gray-900">
                        {assignment.progress}%
                      </span>
                    </div>
                  )}
                  
                  {/* Tags */}
                  <div className="flex flex-col space-y-1.5 min-w-[100px]">
                    {assignment.tags.map((tag, index) => (
                      <div
                        key={index}
                        style={getTagStyles(tag, assignment.tags)}
                        className="transition-transform hover:scale-105"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Stats */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">4</div>
              <div className="text-xs text-gray-600">Total Assignments</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">2</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">2</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAssignment;