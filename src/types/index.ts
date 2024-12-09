export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Content {
  id: string;
  title: string;
  type: 'pdf' | 'video';
  url: string;
  description: string;
  category: string;
  extractedText?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}