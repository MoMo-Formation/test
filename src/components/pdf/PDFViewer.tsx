import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PDFAnnotationLayer } from './PDFAnnotationLayer';
import { PDFToolbar } from './PDFToolbar';
import { usePDFStore } from '../../store/usePDFStore';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
}

export function PDFViewer({ url }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { currentDocument } = usePDFStore();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages);
    });
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
      <PDFToolbar pageNumber={pageNumber} numPages={numPages} />
      
      <div className="relative mt-4">
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className="shadow-lg"
          />
          {currentDocument && (
            <PDFAnnotationLayer
              pageNumber={pageNumber}
              documentId={currentDocument.id}
            />
          )}
        </Document>
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1}
          className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="text-sm">
          Page {pageNumber} sur {numPages}
        </span>
        <button
          onClick={() => changePage(1)}
          disabled={pageNumber >= numPages}
          className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}