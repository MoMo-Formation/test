import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Users, BookOpen, Activity } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { ProgressChart } from '../../components/instructor/ProgressChart';
import { RecentActivity } from '../../components/instructor/RecentActivity';

export function InstructorDashboard() {
  const navigate = useNavigate();
  const { user } = useStore();

  if (!user?.isInstructor) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord formateur</h1>
        <button
          onClick={() => navigate('/instructor/course/new')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Nouvelle formation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Étudiants actifs</p>
              <h3 className="text-2xl font-bold">127</h3>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Formations</p>
              <h3 className="text-2xl font-bold">8</h3>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Taux de complétion</p>
              <h3 className="text-2xl font-bold">76%</h3>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Progression des étudiants</h2>
          <ProgressChart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}