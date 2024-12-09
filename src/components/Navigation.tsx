import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, FileText, Video, Search, LogOut, BookOpen } from 'lucide-react';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';

export function Navigation() {
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">AgroFormation</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/courses" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <BookOpen className="h-5 w-5" />
              <span>Formations</span>
            </Link>
            <Link to="/documents" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <FileText className="h-5 w-5" />
              <span>Documents</span>
            </Link>
            <Link to="/videos" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Video className="h-5 w-5" />
              <span>Vidéos</span>
            </Link>
            <Link to="/search" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Search className="h-5 w-5" />
              <span>Rechercher</span>
            </Link>
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Déconnexion</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}