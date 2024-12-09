import { create } from 'zustand';
import type { Video, VideoProgress } from '../types/video';

interface VideoStore {
  videos: Video[];
  currentVideo: Video | null;
  progress: VideoProgress[];
  setCurrentVideo: (video: Video | null) => void;
  updateProgress: (progress: VideoProgress) => void;
  addVideo: (video: Video) => void;
  removeVideo: (id: string) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  videos: [],
  currentVideo: null,
  progress: [],
  setCurrentVideo: (video) => set({ currentVideo: video }),
  updateProgress: (newProgress) =>
    set((state) => ({
      progress: [
        ...state.progress.filter((p) => p.videoId !== newProgress.videoId),
        newProgress,
      ],
    })),
  addVideo: (video) =>
    set((state) => ({ videos: [...state.videos, video] })),
  removeVideo: (id) =>
    set((state) => ({
      videos: state.videos.filter((video) => video.id !== id),
    })),
}));