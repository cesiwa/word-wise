import Link from "next/link";
import { Plus, Target, BookOpen, Brain, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Brain className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            İngilizce Kelime Öğrenmenin
            <span className="text-blue-600"> Akıllı Yolu</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Bilmediğiniz kelimeleri kaydedin, etkili quizlerle pekiştirin ve
            kelime dağarcığınızı kalıcı şekilde genişletin.
          </p>

          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <Link
              href="/words"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Kelime Ekle
            </Link>
            <Link
              href="/quiz"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <Target className="h-5 w-5 mr-2" />
              Quiz Başlat
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nasıl Çalışır?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Kelime Ekle</h3>
              <p className="text-gray-600 mb-4">
                Öğrenmek istediğin İngilizce kelimeleri ve Türkçe anlamlarını
                kolayca kaydet.
              </p>
              <Link
                href="/words"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center"
              >
                Kelime ekle <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Listele & Tekrarla</h3>
              <p className="text-gray-600 mb-4">
                Eklediğin tüm kelimeleri düzenli bir şekilde görüntüle ve
                tekrarla.
              </p>
              <Link
                href="/words"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center"
              >
                Kelimeleri gör <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Pekiştir</h3>
              <p className="text-gray-600 mb-4">
                Eğlenceli quizlerle kelimeleri kalıcı şekilde öğren ve ölç.
              </p>
              <Link
                href="/quiz"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center"
              >
                Quiz yap <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Hemen Başla!
            </h3>
            <p className="text-gray-600 mb-6">
              İlk kelimelerini ekleyerek İngilizce öğrenme yolculuğuna başla.
            </p>
            <Link
              href="/words"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              İlk Kelimeni Ekle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
