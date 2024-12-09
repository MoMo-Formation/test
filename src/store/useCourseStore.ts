import { create } from 'zustand';
import type { Course, ChatMessage } from '../types/course';
import type { CourseModule } from '../types/content';
import { courseModules } from '../data/courseContent';

interface CourseStore {
  courses: Course[];
  modules: CourseModule[];
  enrolledCourses: string[];
  chatMessages: ChatMessage[];
  setCourses: (courses: Course[]) => void;
  enrollInCourse: (courseId: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  getModulesForCourse: (courseId: string) => CourseModule[];
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  modules: courseModules,
  enrolledCourses: [],
  chatMessages: [],
  setCourses: (courses) => set({ courses }),
  enrollInCourse: (courseId) =>
    set((state) => ({
      enrolledCourses: [...state.enrolledCourses, courseId],
    })),
  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    })),
  getModulesForCourse: (courseId) => {
    return get().modules.filter((module) => module.courseId === courseId);
  },
}));