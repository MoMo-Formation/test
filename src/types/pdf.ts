export interface Annotation {
  id: string;
  pageNumber: number;
  content: string;
  color: string;
  position: {
    x: number;
    y: number;
  };
  createdAt: Date;
}

export interface PDFDocument {
  id: string;
  title: string;
  url: string;
  annotations: Annotation[];
}