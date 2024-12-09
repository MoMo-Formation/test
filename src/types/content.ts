export interface CourseModule {
  id: string;
  title: string;
  order: number;
  courseId: string;
  content: (PDFContent | VideoContent)[];
}

export interface PDFContent {
  id: string;
  type: 'pdf';
  title: string;
  description: string;
  url: string;
  duration: string; // Estimated reading time
}

export interface VideoContent {
  id: string;
  type: 'video';
  title: string;
  description: string;
  url: string;
  duration: string; // Video length
  thumbnail: string;
}