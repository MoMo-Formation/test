import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/search/SearchBar';
import { useStore } from '../store/useStore';
import { usePDFStore } from '../store/usePDFStore';
import { useVideoStore } from '../store/useVideoStore';
import { FileText, Video } from 'lucide-react';

export function Search() {
  const [searchResults, setSearchResults] = useState<Array<{
    id: string;
    title: string;
    type: 'pdf' | 'video';
    description?: string;
  }>>([]);

  const { contents } = useStore();
  const { documents } = usePDFStore();
  const { videos } = useVideoStore();

  const handleSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase();
    
    const results = [
      ...documents.map((doc) => ({
        id: doc.id,
        title: doc.title,
        type: 'pdf' as const,
      })),
      ...videos.map((video) => ({
        id: video.id,
        title: video.title,
        type: 'video' as const,
        description: video.description,
      })),
    ].filter((item) =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description?.toLowerCase().includes(normalizedQuery)
    );

    setSearchResults(results);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Rechercher</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="space-y-4">
        {searchResults.map((result) => (
          <Link
            key={result.id}
            to={`/${result.type}s/${result.id}`}
            className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              {result.type === 'pdf' ? (
                <FileText className="h-6 w-6 text-blue-600 flex-shrink-0" />
              ) : (
                <Video className="h-6 w-6 text-blue-600 flex-shrink-0" />
              )}
              <div>
                <h2 className="text-lg font-semibold">{result.title}</h2>
                {result.description && (
                  <p className="text-gray-600 mt-1">{result.description}</p>
                )}
                <span className="text-sm text-gray-500 mt-2 inline-block">
                  Type: {result.type.toUpperCase()}
                </span>
              </div>
            </div>
          </Link>
        ))}

        {searchResults.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Aucun résultat trouvé
          </div>
        )}
      </div>
    </div>
  );
}