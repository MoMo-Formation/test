import React from 'react';
import { useParams } from 'react-router-dom';
import { PDFViewer } from '../components/pdf/PDFViewer';
import { usePDFStore } from '../store/usePDFStore';

export function DocumentViewer() {
  const { id } = useParams<{ id: string }>();
  const { documents, setCurrentDocument } = usePDFStore();
  const document = documents.find((doc) => doc.id === id);

  React.useEffect(() => {
    if (document) {
      setCurrentDocument(document);
    }
    return () => setCurrentDocument(null);
  }, [document, setCurrentDocument]);

  if (!document) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Document non trouvé</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{document.title}</h1>
      <PDFViewer url={document.url} />
    </div>
  );
}