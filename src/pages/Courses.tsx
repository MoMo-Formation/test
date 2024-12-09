import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Check } from 'lucide-react';
import { useCourseStore } from '../store/useCourseStore';

export function Courses() {
  const { courses, enrolledCourses } = useCourseStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nos Formations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{course.topics.length} modules</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  {course.price}€
                </div>
                
                {enrolledCourses.includes(course.id) ? (
                  <Link
                    to={`/course/${course.id}`}
                    className="flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Accéder au cours
                  </Link>
                ) : (
                  <Link
                    to={`/checkout/${course.id}`}
                    className="block text-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    S'inscrire
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}