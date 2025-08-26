import { Trophy, Star, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function QuizResults({
  score,
  totalQuestions,
  onRestart,
}: QuizResultsProps) {
  const percentage = (score / totalQuestions) * 100;

  const getResultMessage = () => {
    if (percentage >= 90)
      return { message: "Mükemmel! 🎉", color: "text-green-600" };
    if (percentage >= 70)
      return { message: "Çok İyi! 👍", color: "text-blue-600" };
    if (percentage >= 50)
      return { message: "İyi! 😊", color: "text-yellow-600" };
    return { message: "Daha çok çalışmalısın 💪", color: "text-red-600" };
  };

  const result = getResultMessage();

  return (
    <div className="text-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <Trophy className="h-16 w-16 text-yellow-500" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Quiz Tamamlandı! 🎊
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {score} / {totalQuestions}
          </div>
          <div className="text-lg text-gray-600">
            {percentage.toFixed(0)}% Başarı
          </div>
        </div>

        <div className={`text-xl font-semibold ${result.color} mb-6`}>
          {result.message}
        </div>

        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-8 w-8 ${
                star <= Math.ceil(percentage / 20)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{score}</div>
            <div className="text-sm text-gray-600">Doğru Cevap</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {totalQuestions - score}
            </div>
            <div className="text-sm text-gray-600">Yanlış Cevap</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Tekrar Dene
          </button>

          <Link
            href="/"
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Ana Sayfa
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📚 Öğrenmeye Devam Et!
        </h3>
        <p className="text-gray-600 mb-4">
          Her yanlış cevap, doğruyu öğrenmek için bir fırsattır. Kelime eklemeye
          devam ederek İngilizceni geliştirebilirsin!
        </p>
        <Link
          href="/words"
          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
        >
          Yeni kelimeler ekle <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}
