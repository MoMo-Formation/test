import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { PDFDocument, Annotation } from '../types/pdf';

interface PDFStore {
  documents: PDFDocument[];
  currentDocument: PDFDocument | null;
  setCurrentDocument: (doc: PDFDocument | null) => void;
  addAnnotation: (docId: string, annotation: Omit<Annotation, 'id' | 'createdAt'>) => void;
  removeAnnotation: (docId: string, annotationId: string) => void;
}

export const usePDFStore = create<PDFStore>((set) => ({
  documents: [],
  currentDocument: null,
  setCurrentDocument: (doc) => set({ currentDocument: doc }),
  addAnnotation: (docId, annotation) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              annotations: [
                ...doc.annotations,
                {
                  ...annotation,
                  id: nanoid(),
                  createdAt: new Date(),
                },
              ],
            }
          : doc
      ),
    })),
  removeAnnotation: (docId, annotationId) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              annotations: doc.annotations.filter((a) => a.id !== annotationId),
            }
          : doc
      ),
    })),
}));