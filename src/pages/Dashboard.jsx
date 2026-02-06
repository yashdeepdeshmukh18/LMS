import React, { useContext, useState } from 'react';
import Dashcard from '../Components/Dashcard';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import CompletedCourseCard from "../Components/CompletedCourseCard";
import { AuthContext } from '../context/AuthContext';

const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("inProgress");

  const { profile, myCourses } = useContext(AuthContext);

  // 1. Helper to get user initial
  const getUserInitial = () => {
    return profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : "S";
  };

  // 2. Helper to get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // 3. Mock Data for Completed (Since API only returned enrolled courses)
  // You can filter myCourses later if you add a 'status' field to your DB
  const completedCourses = [
    {
      id: "c1",
      category: "Mathematics",
      title: "Algebra Foundations",
      grade: "Grade 10",
      lessons: 56,
      mediaType: "image",
      mediaUrl: "/assets/math-course.jpg",
    }
  ];

  return (
    <div className="min-h-screen bg-purple-50">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className='max-w-7xl mx-auto py-10 sm:py-12 px-4 sm:px-6'>
        <h1 className="mb-10 text-center text-3xl font-bold text-[#8300C4]">
          YOUR DASHBOARD
        </h1>

        {/* Dynamic Greeting Section */}
        <div className="mb-12 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#BA68C8] text-2xl font-semibold text-white shadow-md">
            {getUserInitial()}
          </div>
          <div className='flex flex-col gap-1'>
            <h2 className="text-2xl font-semibold text-gray-900">
              {getGreeting()}, {profile?.full_name || "Student"}
            </h2>
            <p className="text-sm text-gray-600">
              {profile?.role === 'student' 
                ? "Your goal is to master your enrolled subjects this term."
                : "Welcome back to your instructor dashboard."}
            </p>
          </div>
        </div>

        {/* Courses Section */}
        <section>
          <h3 className="mb-4 text-xl font-semibold text-gray-900">
            Your Courses
          </h3>

          {/* Tabs */}
          <div className="mb-14 mt-9 flex gap-4">
            <button 
              className={`rounded-full px-6 py-2 text-sm transition-all duration-200 ${
                activeTab === "inProgress"
                  ? "bg-[#BA68C8] text-white shadow-md"
                  : "border border-[#BA68C8] text-[#8300C4] hover:bg-purple-100"
              }`}
              onClick={() => setActiveTab("inProgress")}
            >
              In Progress
            </button>

            <button 
              className={`rounded-full px-6 py-2 text-sm transition-all duration-200 ${
                activeTab === "completed"
                  ? "bg-[#BA68C8] text-white shadow-md"
                  : "border border-[#BA68C8] text-[#8300C4] hover:bg-purple-100"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
          </div>

          {/* Tab Content: IN PROGRESS */}
          {activeTab === "inProgress" && (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {myCourses && myCourses.length > 0 ? (
                myCourses.map((item) => (
                  // Wrap Dashcard in a div to handle navigation 
                  // (unless Dashcard accepts an onClick prop directly)
                  <div 
                    key={item.course.id} 
                    onClick={() => navigate(`/view-course/${item.course.id}`)}
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                  >
                    <Dashcard
                      title={item.course.title}
                      // Use data from DB or fallbacks if data is missing
                      subject={item.course.category || "General"} 
                      grade={item.course.grade || "All Levels"} 
                      lessons={item.course.lessons_count || 12} // Fallback if count not in DB
                      progress={item.progress || 0} // Fallback if progress not in DB
                      thumbnail={item.course.thumbnail_url}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
                  <button 
                    onClick={() => navigate("/courses")}
                    className="text-[#8300C4] font-semibold hover:underline"
                  >
                    Browse Courses
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab Content: COMPLETED */}
          {activeTab === "completed" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {completedCourses.length > 0 ? (
                completedCourses.map((course) => (
                  <CompletedCourseCard key={course.id} course={course} />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No completed courses yet. Keep learning!
                </div>
              )}
            </div>
          )}

          {/* Explore Button */}
          <div className="mt-16 mb-8 flex justify-center">
            <button 
              className="rounded-lg border border-[#440067] shadow-md px-6 py-2 text-md font-medium text-black hover:bg-purple-100 transition-colors"
              onClick={() => navigate("/courses")}
            >
              Explore more courses →
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;