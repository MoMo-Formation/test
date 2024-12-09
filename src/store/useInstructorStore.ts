import { create } from 'zustand';
import type { ContentUpload, StudentProgress } from '../types/instructor';

interface InstructorStore {
  uploads: ContentUpload[];
  studentProgress: StudentProgress[];
  addUpload: (upload: ContentUpload) => void;
  removeUpload: (id: string) => void;
  updateStudentProgress: (progress: StudentProgress) => void;
}

export const useInstructorStore = create<InstructorStore>((set) => ({
  uploads: [],
  studentProgress: [],
  addUpload: (upload) =>
    set((state) => ({
      uploads: [...state.uploads.filter(u => u.id !== upload.id), upload]
    })),
  removeUpload: (id) =>
    set((state) => ({
      uploads: state.uploads.filter(upload => upload.id !== id)
    })),
  updateStudentProgress: (progress) =>
    set((state) => ({
      studentProgress: [
        ...state.studentProgress.filter(p => 
          p.userId !== progress.userId || p.courseId !== progress.courseId
        ),
        progress
      ]
    }))
}));