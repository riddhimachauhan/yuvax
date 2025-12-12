import React from 'react';

const LearningHelpPage = () => {
  const sidebarItems = [
    { label: 'Learning Help', active: true },
    { label: 'My Courses', href: '/dashboard/mycourse' },
    { label: 'Assignments', href: '/dashboard/assignments' },
    { label: 'Progress', href: '/dashboard/progress' },
    { label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <>
      <div className="">hi </div>
    </>

    // <MainLayout title="Learning Help" sidebarItems={sidebarItems}>
    //   <AiHomePage />
    //   <LearningHelp />
    //   <div className='flex flex-col gap-4 w-full py-6'>
    //     <ProgressRecommendation />
    //   </div>
    // </MainLayout>
  );
};

export default LearningHelpPage;