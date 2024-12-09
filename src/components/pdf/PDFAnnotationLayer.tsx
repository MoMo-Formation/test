import React, { useState } from 'react';
import { usePDFStore } from '../../store/usePDFStore';

interface PDFAnnotationLayerProps {
  pageNumber: number;
  documentId: string;
}

export function PDFAnnotationLayer({ pageNumber, documentId }: PDFAnnotationLayerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { documents, addAnnotation } = usePDFStore();
  const document = documents.find((doc) => doc.id === documentId);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAdding) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const content = window.prompt('Entrez votre annotation:');
    if (content) {
      addAnnotation(documentId, {
        pageNumber,
        content,
        color: '#FFD700',
        position: { x, y },
      });
    }

    setIsAdding(false);
  };

  return (
    <div
      className="absolute inset-0"
      onClick={handleClick}
      style={{ cursor: isAdding ? 'crosshair' : 'default' }}
    >
      {document?.annotations
        .filter((annotation) => annotation.pageNumber === pageNumber)
        .map((annotation) => (
          <div
            key={annotation.id}
            className="absolute bg-yellow-200 p-2 rounded shadow-md"
            style={{
              left: `${annotation.position.x}%`,
              top: `${annotation.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {annotation.content}
          </div>
        ))}
    </div>
  );
}