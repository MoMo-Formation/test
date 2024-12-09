import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { useInstructorStore } from '../../store/useInstructorStore';
import type { ContentUpload } from '../../types/instructor';

interface ContentUploaderProps {
  moduleId: string;
  type: 'pdf' | 'video';
}

export function ContentUploader({ moduleId, type }: ContentUploaderProps) {
  const { uploads, addUpload, removeUpload } = useInstructorStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const upload: ContentUpload = {
        id: crypto.randomUUID(),
        type,
        title: file.name,
        moduleId,
        status: 'uploading',
        progress: 0
      };
      addUpload(upload);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress > 100) {
          clearInterval(interval);
          addUpload({ ...upload, status: 'complete', progress: 100 });
        } else {
          addUpload({ ...upload, progress });
        }
      }, 500);
    });
  }, [moduleId, type, addUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': type === 'pdf' ? ['.pdf'] : [],
      'video/*': type === 'video' ? ['.mp4', '.webm'] : []
    }
  });

  const moduleUploads = uploads.filter(upload => upload.moduleId === moduleId);

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">
          {isDragActive
            ? 'Déposez les fichiers ici...'
            : `Glissez-déposez vos fichiers ${type.toUpperCase()} ici, ou cliquez pour sélectionner`}
        </p>
      </div>

      {moduleUploads.length > 0 && (
        <div className="space-y-2">
          {moduleUploads.map(upload => (
            <div
              key={upload.id}
              className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <File className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{upload.title}</p>
                  <p className="text-sm text-gray-500">
                    {upload.status === 'complete' ? 'Téléchargé' : `${upload.progress}%`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeUpload(upload.id)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}