type ResultProps = {
  score: number;
  grade: string;
  onReset: () => void;
};

const getComment = (grade: string): string => {
  switch (grade) {
    case 'A':
      return 'あなたは非常に高い生活満足度を持っています。日々の生活に充実感を感じ、自己実現や人間関係も良好な状態です。今後もこの調子で、自分らしい人生を歩んでいきましょう。周囲の人々にもその前向きな姿勢を分け与えることができるでしょう。';
    case 'B':
      return 'あなたは全体的に生活に満足しているようです。時にはストレスや不安を感じることもあるかもしれませんが、基本的には前向きに日々を過ごせています。今後は自分の目標や夢にさらに意識を向けてみると、より充実した毎日になるでしょう。';
    case 'C':
      return 'あなたの生活満足度は平均的です。良い面もあれば、改善したい点もあるかもしれません。自分の気持ちや生活習慣を見直し、小さな変化から始めてみることで、より満足度を高めることができるでしょう。';
    case 'D':
      return 'あなたは生活に対してやや不満を感じているようです。ストレスや悩みを抱えている場合は、信頼できる人に相談したり、リフレッシュする時間を意識的に作ることが大切です。無理せず、少しずつ自分のペースで改善を目指しましょう。';
    case 'E':
      return 'あなたは現在、生活に大きな不満や悩みを抱えている可能性があります。まずは自分を責めず、心身の休息を優先してください。必要であれば専門家や周囲のサポートを受けることも検討しましょう。一歩ずつ、できることから始めてみてください。';
    default:
      return '';
  }
};

// 文章や単語の区切りで50文字程度ごとに改行する関数
const smartWrapText = (text: string, maxLength: number) => {
  const result: string[] = [];
  let current = '';
  const tokens = text.split(/([。、「」、\s])/); // 句読点やスペースで分割
  for (const token of tokens) {
    if ((current + token).length > maxLength && current.length > 0) {
      result.push(current);
      current = '';
    }
    current += token;
  }
  if (current.length > 0) {
    result.push(current);
  }
  return result;
};

const Result = ({ score, grade, onReset }: ResultProps) => {
  // 印刷ボタン押下時の処理
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="text-center space-y-6" style={{ minWidth: 320 }} id="result-print-area">
        <h2 className="text-2xl font-bold">診断結果</h2>
        <div className="space-y-4">
          <p className="text-xl">
            合計スコア: <span className="font-bold">{score}</span>点
          </p>
          <p className="text-2xl font-bold">
            評価: <span className="text-blue-600">{grade}</span>
          </p>
          <p className="text-base text-gray-700 mt-6">
            {smartWrapText(getComment(grade), 50).map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div className="flex flex-row justify-center items-center mt-8 print:hidden w-full" style={{ minWidth: 0 }}>
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-auto"
            type="button"
          >
            印刷
          </button>
          <button
            onClick={onReset}
            style={{ marginLeft: '2rem' }}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-auto"
            type="button"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result; 