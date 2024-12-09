export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  thumbnail: string;
  topics: string[];
  includes: string[];
  enrolled?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  courseId: string;
}