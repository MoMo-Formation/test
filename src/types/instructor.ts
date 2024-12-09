export interface Instructor {
  id: string;
  name: string;
  email: string;
  courses: string[];
}

export interface StudentProgress {
  userId: string;
  userName: string;
  courseId: string;
  modulesCompleted: number;
  totalModules: number;
  lastAccessed: Date;
  quizScores: Record<string, number>;
}

export interface ContentUpload {
  id: string;
  type: 'pdf' | 'video';
  title: string;
  moduleId: string;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  progress: number;
}