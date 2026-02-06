// src/components/layout/CourseLayout.jsx
import React, { useState, useEffect, useContext } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar"; // Adjust path if needed (../Components/Navbar)
import Sidebar from "./Sidebar"; 
import { AuthContext } from "../../context/AuthContext";
import { fetchFullCourseStructure } from "../../utils/courseHelpers";
import { getUserProgress, toggleLessonCompletion } from "../../api/progress";

const CourseLayout = () => {
  const { courseId } = useParams();
  const { profile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [sidebarData, setSidebarData] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  // 1. FETCH EVERYTHING ONCE
  useEffect(() => {
    // Wait for profile to be loaded
    if (!courseId) return;

    const loadData = async () => {
      setLoading(true);
      try {
        // If profile exists, fetch progress. If not, just fetch course.
        const promises = [fetchFullCourseStructure(courseId)];
        if (profile) promises.push(getUserProgress(profile.id));

        const [courseData, progressData] = await Promise.all(promises);
        
        setSidebarData(courseData);
        if (progressData) setCompletedLessons(progressData);
        
      } catch (error) {
        console.error("Layout Load Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [courseId, profile]);

  // 2. SHARED COMPLETION LOGIC
  const markLessonComplete = async (lessonId) => {
    if (!profile) return; // Guard for non-logged in users
    
    if (!completedLessons.includes(lessonId)) {
      // Optimistic Update
      setCompletedLessons((prev) => [...prev, lessonId]);
      // DB Update
      await toggleLessonCompletion(profile.id, lessonId, true);
    }
  };

  // 3. SHARED NAVIGATION
  const handleNavigation = (lessonId) => {
    const lesson = sidebarData.flatMap((c) => c.lessons).find((x) => x.id === lessonId);
    if (!lesson) return;

    const pathBase = `/course/${courseId}`;
    if (lesson.contentType === "video") navigate(`${pathBase}/player/${lessonId}`);
    else if (lesson.contentType === "article") navigate(`${pathBase}/textbook/${lessonId}`);
    else if (lesson.contentType === "assignment" || lesson.contentType === "quiz") navigate(`${pathBase}/assignment/${lessonId}`);

    setShowSidebar(false);
  };

  if (loading) return <div className="p-20 text-center">Loading Course...</div>;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <Navbar />

      <div className="flex flex-1 overflow-hidden relative">
        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:block w-[280px] h-full overflow-y-auto border-r border-gray-100 bg-white shrink-0">
          <Sidebar
            data={sidebarData}
            activeId={window.location.pathname.split('/').pop()} 
            onSelect={handleNavigation}
            completedIds={completedLessons}
          />
        </div>

        {/* MOBILE SIDEBAR */}
        {showSidebar && (
          <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setShowSidebar(false)}>
            <div className="bg-white w-[85%] max-w-sm h-full p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <Sidebar
                data={sidebarData}
                activeId={window.location.pathname.split('/').pop()}
                onSelect={handleNavigation}
                completedIds={completedLessons}
              />
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 overflow-y-auto relative">
          <div className="lg:hidden p-4 pb-0">
            <button onClick={() => setShowSidebar(true)} className="text-purple-600 font-semibold">
              ☰ Course Menu
            </button>
          </div>

          {/* THIS IS WHERE THE CHILD PAGES RENDER */}
          <Outlet context={{ sidebarData, markLessonComplete, completedLessons }} />
          
        </div>
      </div>
    </div>
  );
};

export default CourseLayout;