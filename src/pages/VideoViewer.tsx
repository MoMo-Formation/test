import React from 'react';
import { useParams } from 'react-router-dom';
import { VideoPlayer } from '../components/video/VideoPlayer';
import { useVideoStore } from '../store/useVideoStore';
import { useStore } from '../store/useStore';
import { nanoid } from 'nanoid';

export function VideoViewer() {
  const { id } = useParams<{ id: string }>();
  const { videos, updateProgress } = useVideoStore();
  const { user } = useStore();
  const video = videos.find((v) => v.id === id);

  const handleProgress = (progress: number) => {
    if (!user || !video) return;
    
    updateProgress({
      videoId: video.id,
      userId: user.id,
      progress,
      completed: progress >= 0.9,
      lastWatched: new Date(),
    });
  };

  const handleEnded = () => {
    if (!user || !video) return;
    
    updateProgress({
      videoId: video.id,
      userId: user.id,
      progress: 1,
      completed: true,
      lastWatched: new Date(),
    });
  };

  if (!video) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Vidéo non trouvée</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <VideoPlayer
        url={video.url}
        onProgress={handleProgress}
        onEnded={handleEnded}
      />
      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-gray-600">{video.description}</p>
        <div className="flex flex-wrap gap-2">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}