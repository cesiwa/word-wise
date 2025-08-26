"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, BookOpen } from "lucide-react";

interface Word {
  id: number;
  word: string;
  meaning: string;
  createdAt: Date;
}

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedWords = localStorage.getItem("wordwise-words");
    if (storedWords) {
      try {
        const parsedWords: Word[] = JSON.parse(storedWords);
        const formattedWords: Word[] = parsedWords.map((word: Word) => ({
          ...word,
          createdAt: new Date(word.createdAt),
        }));
        setWords(formattedWords);
      } catch (error) {
        console.error("Error parsing words:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const saveWords = (newWords: Word[]) => {
    setWords(newWords);
    localStorage.setItem("wordwise-words", JSON.stringify(newWords));
  };

  const addWord = () => {
    if (!newWord.trim() || !newMeaning.trim()) return;

    const newWordItem: Word = {
      id: Date.now(),
      word: newWord.trim(),
      meaning: newMeaning.trim(),
      createdAt: new Date(),
    };

    const updatedWords = [...words, newWordItem];
    saveWords(updatedWords);
    setNewWord("");
    setNewMeaning("");
  };

  const deleteWord = (id: number) => {
    const updatedWords = words.filter((word) => word.id !== id);
    saveWords(updatedWords);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addWord();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Kelimelerim</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Yeni Kelime Ekle</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İngilizce Kelime
              </label>
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Örn: apple"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Türkçe Anlamı
              </label>
              <input
                type="text"
                value={newMeaning}
                onChange={(e) => setNewMeaning(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Örn: elma"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={addWord}
            disabled={!newWord.trim() || !newMeaning.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Kelime Ekle
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Kayıtlı Kelimeler ({words.length})
          </h2>

          {words.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Henüz hiç kelime eklenmemiş.
              </p>
              <p className="text-gray-400">
                Yukarıdaki formu kullanarak ilk kelimeni ekleyebilirsin!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {words.map((word) => (
                <div
                  key={word.id}
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <span className="font-bold text-lg text-blue-600">
                      {word.word}
                    </span>
                    <span className="mx-2 text-gray-400">-</span>
                    <span className="text-gray-700">{word.meaning}</span>
                  </div>
                  <button
                    onClick={() => deleteWord(word.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                    title="Kelimeyi sil"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
