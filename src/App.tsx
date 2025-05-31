import { useState } from 'react';
import QuestionForm from './components/QuestionForm';
import Result from './components/Result';

type Answer = {
  questionId: number;
  value: number;
};

function App() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (newAnswers: Answer[]) => {
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + answer.value, 0);
  };

  const getGrade = (score: number): string => {
    if (score >= 81) return 'A';
    if (score >= 61) return 'B';
    if (score >= 41) return 'C';
    if (score >= 21) return 'D';
    return 'E';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {!showResult ? (
                  <QuestionForm onSubmit={handleSubmit} />
                ) : (
                  <div className="w-screen flex justify-center">
                    <Result
                      score={calculateScore()}
                      grade={getGrade(calculateScore())}
                      onReset={() => setShowResult(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 