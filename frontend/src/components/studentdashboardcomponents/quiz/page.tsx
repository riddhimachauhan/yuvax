import React from "react";
// import QuizProgress from "./ScienceQuiz";
// import { QuizResults } from "./QuizResult";
import QuickQuizzes from "../quickquiz/QuickQuizzes";
import Leaderboard from "../leaderboard/Leaderboard";
import Achievements from "../achievement/Achievement";
const page = () => {
  // const quizData = {
  //   score: 83.3,
  //   totalQuestions: 8,
  //   correctAnswers: 5,
  //   questions: [
  //     { id: 1, label: "Question 1", status: "correct" as const },
  //     { id: 2, label: "Question 2", status: "correct" as const },
  //     { id: 3, label: "Question 3", status: "incorrect" as const },
  //     { id: 4, label: "Question 4", status: "neutral" as const },
  //     { id: 5, label: "Question 5", status: "unanswered" as const },
  //     { id: 6, label: "Question 6", status: "unanswered" as const },
  //     { id: 7, label: "Question 7", status: "unanswered" as const },
  //     { id: 8, label: "Question 8", status: "unanswered" as const },
  //   ],
  // };

  return (
    <>
      {/* <Sidebar />
      <Header className="ml-[249px] mr-4 mt-2" /> */}
      <div className="min-h-screen ">
        {/* Main Content Container */}
        <div className="ml-[249px] mr-4 mt-4 p-4">
          <div className="flex gap-6">
            {/* Quiz Component - 70% width */}
            <div className="w-[70%]  rounded-3xl p-5">
              <QuickQuizzes />
            </div>

            {/* Quiz Results Component - 30% width */}
            <div className="w-[30%] bg-white  p-4 h-full">
              <Leaderboard />
              <div className="mt-6">
                <Achievements />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
