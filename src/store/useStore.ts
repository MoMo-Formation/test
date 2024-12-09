import { create } from 'zustand';
import type { User, Content } from '../types';

interface Store {
  user: User | null;
  contents: Content[];
  setUser: (user: User | null) => void;
  addContent: (content: Content) => void;
  removeContent: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  contents: [],
  setUser: (user) => set({ user }),
  addContent: (content) =>
    set((state) => ({ contents: [...state.contents, content] })),
  removeContent: (id) =>
    set((state) => ({
      contents: state.contents.filter((content) => content.id !== id),
    })),
}));