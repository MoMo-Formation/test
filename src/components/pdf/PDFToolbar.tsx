import React from 'react';
import { Download, Plus, ZoomIn, ZoomOut } from 'lucide-react';

interface PDFToolbarProps {
  pageNumber: number;
  numPages: number;
}

export function PDFToolbar({ pageNumber, numPages }: PDFToolbarProps) {
  return (
    <div className="flex items-center justify-between w-full bg-white p-2 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Zoom avant">
          <ZoomIn className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Zoom arrière">
          <ZoomOut className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">
          Page {pageNumber} sur {numPages}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Ajouter une annotation"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Télécharger le PDF"
        >
          <Download className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}