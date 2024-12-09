export const courseModules = [
  {
    id: 'module-1',
    courseId: '1', // Transformation des Produits Laitiers
    title: 'Introduction aux produits laitiers',
    order: 1,
    content: [
      {
        id: 'pdf-1',
        type: 'pdf' as const,
        title: 'Bases de la transformation laitière',
        description: 'Introduction aux principes fondamentaux',
        url: 'https://example.com/course-1/module-1/basics.pdf',
        duration: '20 min'
      },
      {
        id: 'video-1',
        type: 'video' as const,
        title: 'Processus de pasteurisation',
        description: 'Démonstration des techniques de pasteurisation',
        url: 'https://example.com/course-1/module-1/pasteurization.mp4',
        duration: '15:30',
        thumbnail: 'https://images.unsplash.com/photo-1563636619-e9143da7973b'
      }
    ]
  }
];