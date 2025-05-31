import { useState } from 'react';
import React from 'react';

type Answer = {
  questionId: number;
  value: number;
};

type Question = {
  id: number;
  text: string;
};

const questions: Question[] = [
  { id: 1, text: "あなたは現在の生活に満足していますか？" },
  { id: 2, text: "毎日の生活に充実感を感じていますか？" },
  { id: 3, text: "自分の趣味や好きなことを楽しむ時間が十分にありますか？" },
  { id: 4, text: "家族や友人との関係は良好ですか？" },
  { id: 5, text: "仕事や学業にやりがいを感じていますか？" },
  { id: 6, text: "自分の健康状態に自信がありますか？" },
  { id: 7, text: "将来の目標や夢が明確にありますか？" },
  { id: 8, text: "ストレスをうまく解消できていますか？" },
  { id: 9, text: "自分の時間を有意義に使えていますか？" },
  { id: 10, text: "周囲の人々と良好なコミュニケーションが取れていますか？" },
  { id: 11, text: "自分の性格や特徴を理解していると感じますか？" },
  { id: 12, text: "新しいことに挑戦する意欲がありますか？" },
  { id: 13, text: "自分の感情をコントロールできていると感じますか？" },
  { id: 14, text: "生活のリズムは整っていますか？" },
  { id: 15, text: "自分の価値観や信念が明確にありますか？" },
  { id: 16, text: "周囲の人々から信頼されていると感じますか？" },
  { id: 17, text: "自分の強みを活かせていると感じますか？" },
  { id: 18, text: "生活の中で感謝の気持ちを感じることがありますか？" },
  { id: 19, text: "自分の人生に責任を持って取り組めていますか？" },
  { id: 20, text: "全体的に見て、幸せだと感じていますか？" }
];

type QuestionFormProps = {
  onSubmit: (answers: Answer[]) => void;
};

const QuestionForm = ({ onSubmit }: QuestionFormProps) => {
  const [answers, setAnswers] = useState<Answer[]>(
    questions.map(q => ({ questionId: q.id, value: 0 }))
  );

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev =>
      prev.map(answer =>
        answer.questionId === questionId ? { ...answer, value } : answer
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answers.every(answer => answer.value > 0)) {
      onSubmit(answers);
    } else {
      alert('すべての質問に回答してください。');
    }
  };

  const answerLabels = [
    "1：全くそう思わない",
    "2：あまりそう思わない",
    "3：どちらとも言えない",
    "4：ややそう思う",
    "5：非常にそう思う"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">生活満足度診断</h2>
      <p className="text-sm text-gray-600 text-center mb-8">
        各質問に対して「1：全くそう思わない」から「5：非常にそう思う」までの5段階で回答してください。
      </p>
      {questions.map((question, idx) => (
        <React.Fragment key={question.id}>
          <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
            <div className="block text-sm font-medium text-gray-700">
              <span className="font-bold">【質問{question.id}】</span><br />
              <span className="pl-4">　{question.text}</span>
            </div>
            <div className="flex justify-between mt-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="inline-flex items-center">
                  <span>　</span>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={value}
                    checked={answers.find(a => a.questionId === question.id)?.value === value}
                    onChange={() => handleAnswerChange(question.id, value)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">
                    {answerLabels[value - 1]}
                  </span>
                </label>
              ))}
            </div>
          </div>
          {idx !== questions.length - 1 && <div style={{ height: '2em' }} />}
        </React.Fragment>
      ))}
      <div className="flex justify-center mt-8">
        <div style={{ height: '2em' }} />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          診断結果を見る
        </button>
      </div>
    </form>
  );
};

export default QuestionForm; 