export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number;
  thumbnail: string;
  category: string;
  tags: string[];
}

export interface VideoProgress {
  videoId: string;
  userId: string;
  progress: number;
  completed: boolean;
  lastWatched: Date;
}