import React from 'react';
import ReactPlayer from 'react-player';
import { useVideoStore } from '../../store/useVideoStore';

interface VideoPlayerProps {
  url: string;
  onProgress: (progress: number) => void;
  onEnded: () => void;
}

export function VideoPlayer({ url, onProgress, onEnded }: VideoPlayerProps) {
  return (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        onProgress={(state) => onProgress(state.played)}
        onEnded={onEnded}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
            },
          },
        }}
      />
    </div>
  );
}