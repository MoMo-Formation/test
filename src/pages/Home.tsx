import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Video, Users } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Formation en Transformation Agroalimentaire
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Accédez à des ressources pédagogiques de qualité pour développer vos compétences
          dans le secteur agroalimentaire.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Book className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Documents Techniques</h2>
          <p className="text-gray-600 mb-4">
            Consultez notre bibliothèque de documents PDF sur les processus et normes.
          </p>
          <Link
            to="/documents"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Accéder aux documents →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Video className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Vidéos Explicatives</h2>
          <p className="text-gray-600 mb-4">
            Regardez nos vidéos détaillées sur les techniques de transformation.
          </p>
          <Link
            to="/videos"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir les vidéos →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Users className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Communauté</h2>
          <p className="text-gray-600 mb-4">
            Rejoignez notre communauté de professionnels et d'apprenants.
          </p>
          <Link
            to="/community"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Rejoindre la communauté →
          </Link>
        </div>
      </div>
    </div>
  );
}