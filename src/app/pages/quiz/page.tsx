"use client";

import { useState, useEffect } from "react";
import { Play, SkipForward, CheckCircle, XCircle } from "lucide-react";

interface Word {
  id: number;
  word: string;
  meaning: string;
}

interface QuizState {
  currentIndex: number;
  score: number;
  showResult: boolean;
  userAnswer: string;
}

export default function QuizPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [quizWords, setQuizWords] = useState<Word[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentIndex: 0,
    score: 0,
    showResult: false,
    userAnswer: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedWords = localStorage.getItem("wordwise-words");
    if (storedWords) {
      try {
        const parsedWords = JSON.parse(storedWords);
        setWords(parsedWords);
      } catch (error) {
        console.error("Error parsing words:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const startQuiz = () => {
    if (words.length < 3) return;

    // Kelimeleri karıştır
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setQuizWords(shuffled.slice(0, Math.min(10, words.length)));
    setQuizState({
      currentIndex: 0,
      score: 0,
      showResult: false,
      userAnswer: "",
    });
  };

  const checkAnswer = () => {
    if (!quizState.userAnswer.trim()) return;

    const currentWord = quizWords[quizState.currentIndex];
    const isCorrect =
      quizState.userAnswer.trim().toLowerCase() ===
      currentWord.meaning.toLowerCase();

    setQuizState((prev) => ({
      ...prev,
      showResult: true,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const nextQuestion = () => {
    if (quizState.currentIndex >= quizWords.length - 1) {
      // Quiz bitti
      return;
    }

    setQuizState((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex + 1,
      showResult: false,
      userAnswer: "",
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (words.length < 3) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Yeterli Kelime Yok
            </h1>
            <p className="text-gray-600 mb-6">
              Quiz yapabilmek için en az 3 kelime eklemen gerekiyor. Şu anda{" "}
              {words.length} kelimen var.
            </p>
            <a
              href="/words"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg inline-flex items-center"
            >
              Kelime Ekle
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (quizWords.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Kelime Quizine Hazır mısın?
            </h1>
            <p className="text-gray-600 mb-8">
              {words.length} kelime arasından rastgele seçilecek 10 kelimenin
              anlamını bilmeye çalış!
            </p>
            <button
              onClick={startQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg inline-flex items-center text-lg"
            >
              <Play className="h-5 w-5 mr-2" />
              Quiz Başlat
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentWord = quizWords[quizState.currentIndex];
  const isLastQuestion = quizState.currentIndex >= quizWords.length - 1;
  const progress = ((quizState.currentIndex + 1) / quizWords.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Soru {quizState.currentIndex + 1}/{quizWords.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              Skor: {quizState.score}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          {!quizState.showResult ? (
            <>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                &quot;{currentWord.word}&quot; kelimesinin anlamı nedir?
              </h2>

              <input
                type="text"
                value={quizState.userAnswer}
                onChange={(e) =>
                  setQuizState((prev) => ({
                    ...prev,
                    userAnswer: e.target.value,
                  }))
                }
                onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                placeholder="Cevabını yaz..."
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                autoFocus
              />

              <button
                onClick={checkAnswer}
                disabled={!quizState.userAnswer.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg text-lg"
              >
                Cevapla
              </button>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                {quizState.userAnswer.toLowerCase() ===
                currentWord.meaning.toLowerCase() ? (
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                ) : (
                  <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                )}

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {quizState.userAnswer.toLowerCase() ===
                  currentWord.meaning.toLowerCase()
                    ? "Doğru! 🎉"
                    : "Yanlış! 😢"}
                </h2>

                <p className="text-gray-600">
                  <span className="font-semibold">{currentWord.word}</span> ={" "}
                  {currentWord.meaning}
                </p>

                {quizState.userAnswer.toLowerCase() !==
                  currentWord.meaning.toLowerCase() && (
                  <p className="text-red-500 mt-2">
                    Senin cevabın: {quizState.userAnswer}
                  </p>
                )}
              </div>

              <button
                onClick={nextQuestion}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-lg inline-flex items-center justify-center"
              >
                {isLastQuestion ? "Quiz Sonucunu Gör" : "Sonraki Soru"}
                <SkipForward className="h-5 w-5 ml-2" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
