import { Trash2 } from "lucide-react";

interface Word {
  id: number;
  word: string;
  meaning: string;
}

interface WordListProps {
  words: Word[];
  onDeleteWord: (id: number) => void;
}

export default function WordList({ words, onDeleteWord }: WordListProps) {
  if (words.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Henüz hiç kelime eklenmemiş.</p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {words.map((word) => (
        <div
          key={word.id}
          className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
        >
          <div className="flex-1">
            <span className="font-bold text-lg text-blue-600">{word.word}</span>
            <span className="mx-2 text-gray-400">-</span>
            <span className="text-gray-700">{word.meaning}</span>
          </div>
          <button
            onClick={() => onDeleteWord(word.id)}
            className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
            title="Kelimeyi sil"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
