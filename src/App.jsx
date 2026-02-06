// src/App.js
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import CourseDetail from "./pages/CourseDetails";
import ProfilePage from './pages/Profile';
import QuizPage from './pages/Quiz';
import CoursePlayer from './pages/CoursePlayer';
import TextbookReading from './pages/TextbookReading';
import Assignment from './pages/Assignment';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/courses" element={<Courses />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        
        {/* Course Details (Entry Point) */}
        <Route path="/view-course/:courseId" element={<CourseDetail />} />

        {/* UPDATED PLAYER ROUTES 
           We include :courseId so we can fetch the sidebar data on these pages 
        */}
        <Route path="/course/:courseId/learn" element={<CoursePlayer />} />
        <Route path="/course/:courseId/player/:lessonId" element={<CoursePlayer />} />
        <Route path="/course/:courseId/textbook/:lessonId" element={<TextbookReading />} />
        <Route path="/course/:courseId/assignment/:lessonId" element={<Assignment />} />

        <Route path="/profile" element={<ProfilePage /> } />
        <Route path="/quiz" element={<QuizPage/>}/> 
      </Routes>
    </div>
  );
}

export default App;