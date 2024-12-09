import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Send } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useCourseStore } from '../store/useCourseStore';
import { ChatMessage } from '../components/chat/ChatMessage';
import { CourseContent } from '../components/course/CourseContent';
import { askQuestion } from '../lib/openai';

export function CourseView() {
  const { id } = useParams<{ id: string }>();
  const { courses, chatMessages, addChatMessage, getModulesForCourse } = useCourseStore();
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const course = courses.find((c) => c.id === id);
  const modules = course ? getModulesForCourse(course.id) : [];
  const courseMessages = chatMessages.filter((msg) => msg.courseId === id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !course) return;

    const userMessage: ChatMessage = {
      id: nanoid(),
      role: 'user',
      content: question,
      timestamp: new Date(),
      courseId: course.id,
    };

    addChatMessage(userMessage);
    setQuestion('');
    setIsLoading(true);

    try {
      const response = await askQuestion(question, course.title);
      const assistantMessage: ChatMessage = {
        id: nanoid(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        courseId: course.id,
      };
      addChatMessage(assistantMessage);
    } catch (error) {
      console.error('Error getting response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{course.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CourseContent modules={modules} courseId={course.id} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Questions sur le cours</h2>
          
          <div className="h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {courseMessages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-auto">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}