import Link from "next/link";
import { BookOpen, Brain, Home } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center text-xl font-bold text-blue-600"
            >
              <Brain className="h-8 w-8 mr-2" />
              WordWise
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Home className="h-5 w-5 mr-1" />
              Ana Sayfa
            </Link>
            <Link
              href="/words"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <BookOpen className="h-5 w-5 mr-1" />
              Kelimelerim
            </Link>
            <Link
              href="/quiz"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Quiz Yap
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
