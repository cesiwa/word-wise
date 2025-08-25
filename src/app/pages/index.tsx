import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="py-12">
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          İngilizce Kelime Öğrenmenin Akıllı Yolu
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Bilmediğiniz kelimeleri kaydedin, etkili quizlerle pekiştirin ve
          kelime dağarcığınızı genişletin.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/words" className="btn-primary">
            Kelimelerimi Gör
          </Link>
          <Link href="/quiz" className="btn-secondary">
            Quiz Yap
          </Link>
        </div>
      </section>

      <section className="mt-20 grid md:grid-cols-3 gap-8">
        <div className="card text-center">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="font-semibold text-lg mb-2">Kelime Ekle</h3>
          <p className="text-gray-600">
            Öğrenmek istediğin İngilizce kelimeleri ve anlamlarını kaydet.
          </p>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="font-semibold text-lg mb-2">Listele</h3>
          <p className="text-gray-600">
            Eklediğin tüm kelimeleri düzenli bir şekilde görüntüle.
          </p>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="font-semibold text-lg mb-2">Pekiştir</h3>
          <p className="text-gray-600">
            Eğlenceli quizlerle kelimeleri kalıcı şekilde öğren.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
