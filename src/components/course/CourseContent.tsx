import React from 'react';
import { FileText, Video, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CourseModule } from '../../types/content';
import { useCourseStore } from '../../store/useCourseStore';

interface CourseContentProps {
  modules: CourseModule[];
  courseId: string;
}

export function CourseContent({ modules, courseId }: CourseContentProps) {
  const { enrolledCourses } = useCourseStore();
  const isEnrolled = enrolledCourses.includes(courseId);

  return (
    <div className="space-y-6">
      {modules.map((module) => (
        <div key={module.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">{module.title}</h3>
          
          <div className="space-y-4">
            {module.content.map((content) => (
              <div
                key={content.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {content.type === 'pdf' ? (
                    <FileText className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Video className="h-5 w-5 text-blue-600" />
                  )}
                  <div>
                    <h4 className="font-medium">{content.title}</h4>
                    <p className="text-sm text-gray-600">{content.duration}</p>
                  </div>
                </div>

                {isEnrolled ? (
                  <Link
                    to={`/${content.type}s/${content.id}`}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {content.type === 'pdf' ? 'Lire' : 'Regarder'}
                  </Link>
                ) : (
                  <div className="flex items-center text-gray-500">
                    <Lock className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}