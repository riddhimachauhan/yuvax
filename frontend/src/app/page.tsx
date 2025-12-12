// "use client";
import Courses from "@/components/Courses";

import Footer from "@/components/common/Footer";
import Toppicks from "@/components/Toppicks";
import CareerPath from "@/components/CareerPath";
import SignupModel from "@/components/SignupModal"
import FAQ from "@/components/Faq";
import TestimonialsSection from "@/components/TestimonialSection";
import Pricing from "@/components/Pricing";
import Strick from "@/components/Strick";
import Payment from "@/components/Payment";
import HeroWithNavbar from "@/components/HeroSection";
import Navbar from "@/components/common/NavBar";
import PublicRoute from "@/components/auth/PublicRoute";


export default function Home() {
  return (
    <PublicRoute>
      <div className="bg-[#F4FAFC]">
        <Navbar />
        <HeroWithNavbar />
        <Courses />
        <Strick />
        <Pricing />
        <Payment />
        <CareerPath />
        <Toppicks />
        <TestimonialsSection />
        <FAQ />
        <SignupModel />
        <Footer />
      </div>
      {/* <Dyte /> */}

    </PublicRoute>
  );
}
// "use client";
// import React, { useState } from 'react';
// // import MeetingLobby from './components/meeting/MeetingLobby';
// // import MeetingRoom from './components/meeting/MeetingRoom';
// // import './global.css';
// import MeetingLobby from '@/components/MetingLobby';
// import MeetingRoom from '@/components/MeetingRoom';

// interface MeetingData {
//   meetingId: string;
//   token: string;
// }

// const App: React.FC = () => {
//   const [meetingData, setMeetingData] = useState<MeetingData | null>(null);
//   const [isInMeeting, setIsInMeeting] = useState<boolean>(false);

//   const handleJoinMeeting = (meetingId: string, token: string) => {
//     setMeetingData({ meetingId, token });
//     setIsInMeeting(true);
//   };

//   const handleLeaveMeeting = () => {
//     setMeetingData(null);
//     setIsInMeeting(false);
//   };

//   return (
//     <div className="App">
//       {!isInMeeting ? (
//         <MeetingLobby onJoinMeeting={handleJoinMeeting} />
//       ) : (
//         meetingData && (
//           <MeetingRoom
//             meetingId={meetingData.meetingId}
//             token={meetingData.token}
//             onLeaveMeeting={handleLeaveMeeting}
//           />
//         )
//       )}
//     </div>
//   );
// };

// export default App;