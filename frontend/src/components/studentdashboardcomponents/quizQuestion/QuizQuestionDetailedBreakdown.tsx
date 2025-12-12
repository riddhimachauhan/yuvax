import React from 'react';

interface QuestionItem {
  id: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  status: 'correct' | 'incorrect' | 'skipped';
  points: string;
}

interface QuizQuestionDetailedBreakdownProps {
  questions?: QuestionItem[];
  className?: string;
}

const QuizQuestionDetailedBreakdown: React.FC<QuizQuestionDetailedBreakdownProps> = ({ 
  questions, 
  className = "" 
}) => {
  const defaultQuestions: QuestionItem[] = [
    {
      id: 1,
      question: "Find the derivative of f(x) = 3x + 2x = 5",
      userAnswer: "8",
      correctAnswer: "8",
      status: "correct",
      points: "5/5 pts"
    },
    {
      id: 2,
      question: "Find the derivative of f(x) = 3x + 2x = 5",
      userAnswer: "8",
      correctAnswer: "not answered",
      status: "skipped",
      points: "Skipped"
    },
    {
      id: 3,
      question: "Find the derivative of f(x) = 3x + 2x = 5",
      userAnswer: "8",
      correctAnswer: "8",
      status: "correct",
      points: "5/5 pts"
    },
    {
      id: 4,
      question: "Find the derivative of f(x) = 3x + 2x = 5",
      userAnswer: "8",
      correctAnswer: "8",
      status: "correct",
      points: "5/5 pts"
    },
    {
      id: 5,
      question: "Find the derivative of f(x) = 3x + 2x = 5",
      userAnswer: "8",
      correctAnswer: "8",
      status: "correct",
      points: "5/5 pts"
    },
    {
      id: 6,
      question: "Find the derivative of f(x) = 3x + 2x = 5",
      userAnswer: "8",
      correctAnswer: "9",
      status: "incorrect",
      points: "Incorrect"
    }
  ];

  const displayQuestions = questions || defaultQuestions;

  const getStatusStyles = (status: QuestionItem['status']) => {
    switch (status) {
      case 'correct':
        return {
          container: 'bg-emerald-500',
          text: 'text-white'
        };
      case 'incorrect':
        return {
          container: 'bg-red-500/10',
          text: 'text-red-500'
        };
      case 'skipped':
        return {
          container: 'bg-yellow-600/10',
          text: 'text-yellow-600'
        };
      default:
        return {
          container: 'bg-gray-100',
          text: 'text-gray-600'
        };
    }
  };

  const getAnswerColor = (userAnswer: string, correctAnswer: string, status: QuestionItem['status']) => {
    if (status === 'skipped') return 'text-stone-500';
    if (status === 'correct') return 'text-emerald-500';
    return userAnswer === correctAnswer ? 'text-emerald-500' : 'text-red-500';
  };

  return (
    <div className={`bg-white rounded-3xl p-6 w-full ${className}`}>
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-zinc-800 text-xl font-bold leading-loose">
          Detailed Question Breakdown
        </h2>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {displayQuestions.map((question) => {
          const statusStyles = getStatusStyles(question.status);
          
          return (
            <div
              key={question.id}
              className={`p-4 border-b border-neutral-200 ${
                question.id % 2 === 0 ? 'bg-stone-50' : 'bg-slate-50'
              } flex justify-between items-start gap-4`}
            >
              {/* Question Content */}
              <div className="flex-1 min-w-0">
                {/* Question Header */}
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-stone-500 text-lg font-medium tracking-tight">
                    #{question.id}
                  </span>
                  <span className="text-stone-500 text-xl font-medium leading-loose">
                    Question
                  </span>
                </div>

                {/* Question Text */}
                <div className="text-zinc-800 text-base font-semibold leading-relaxed mb-3">
                  {question.question}
                </div>

                {/* Answers */}
                <div className="flex flex-wrap gap-10">
                  {/* User Answer */}
                  <div className="flex items-end gap-1">
                    <span className="text-zinc-800 text-base font-medium leading-relaxed">
                      Your Answer:
                    </span>
                    <span className={`text-base font-bold leading-relaxed ${
                      getAnswerColor(question.userAnswer, question.correctAnswer, question.status)
                    }`}>
                      {question.userAnswer}
                    </span>
                  </div>

                  {/* Correct Answer */}
                  <div className="flex items-end gap-1">
                    <span className="text-zinc-800 text-base font-medium leading-relaxed">
                      Correct Answer:
                    </span>
                    <span className={`${
                      question.status === 'skipped' 
                        ? 'text-stone-500 text-sm font-medium leading-tight'
                        : 'text-emerald-500 text-base font-bold leading-relaxed'
                    }`}>
                      {question.correctAnswer}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`px-3 py-2 rounded-lg flex justify-center items-center gap-2.5 flex-shrink-0 ${
                statusStyles.container
              }`}>
                <span className={`text-base font-medium leading-tight ${
                  statusStyles.text
                }`}>
                  {question.points}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestionDetailedBreakdown;