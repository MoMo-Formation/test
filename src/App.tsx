import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RequireAuth } from './components/auth/RequireAuth';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Courses } from './pages/Courses';
import { CourseView } from './pages/CourseView';
import { DocumentViewer } from './pages/DocumentViewer';
import { VideoViewer } from './pages/VideoViewer';
import { Search } from './pages/Search';
import { useCourseStore } from './store/useCourseStore';
import { initialCourses } from './data/initialCourses';

function App() {
  const { setCourses } = useCourseStore();

  useEffect(() => {
    setCourses(initialCourses);
  }, [setCourses]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          } />
          <Route path="/courses" element={
            <RequireAuth>
              <Courses />
            </RequireAuth>
          } />
          <Route path="/course/:id" element={
            <RequireAuth>
              <CourseView />
            </RequireAuth>
          } />
          <Route path="/documents/:id" element={
            <RequireAuth>
              <DocumentViewer />
            </RequireAuth>
          } />
          <Route path="/videos/:id" element={
            <RequireAuth>
              <VideoViewer />
            </RequireAuth>
          } />
          <Route path="/search" element={
            <RequireAuth>
              <Search />
            </RequireAuth>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;