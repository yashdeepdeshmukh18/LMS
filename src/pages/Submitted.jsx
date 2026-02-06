import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CourseSlider from "../Components/CourseSlider";

const QuizSubmitted = () => {
  const navigate = useNavigate();

  const academicCourses = [
    {
      id: 1,
      category: "Mathematics",
      title: "Complete Mathematics Course",
      grade: "10",
      lessons: 36,
    },
    {
      id: 2,
      category: "Mathematics",
      title: "Complete Mathematics Course",
      grade: "10",
      lessons: 46,
    },
    {
      id: 3,
      category: "Mathematics",
      title: "Complete Mathematics Course",
      grade: "10",
      lessons: 56,
    },
    {
      id: 4,
      category: "Mathematics",
      title: "Complete Mathematics Course",
      grade: "10",
      lessons: 66,
    },

  ];

  return (
    <div className="min-h-screen bg-[#FFF7FF]">


      {/* SUCCESS SECTION */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <div className="w-32 h-32 rounded-full border-[10px] border-purple-700 flex items-center justify-center mb-6">
          <span className="text-6xl text-purple-700">✓</span>
        </div>

        <h1 className="text-4xl font-semibold font-openSans text-gray-800 mb-8">
          Successfully Submitted
        </h1>

        {/* Feedback */}
        <div className="bg-[#F4D9FF] flex items-center gap-6 px-6 py-4 rounded-xl shadow-md mb-6">
          <p className="text-purple-700 font-medium">
            Is this Quiz helpful ?
          </p>
          <button className="w-10 h-10 border border-purple-600 rounded-full flex items-center justify-center text-purple-700">
            <FaThumbsUp />
          </button>
          <button className="w-10 h-10 border border-purple-600 rounded-full flex items-center justify-center text-purple-700">
            <FaThumbsDown />
          </button>
        </div>

        <button
          onClick={() => navigate("/courses")}
          className="text-blue-700 underline text-lg font-medium"
        >
          Continue Learning
        </button>
      </div>

      {/* EXPLORE MORE COURSES */}
      <div className="border-t border-purple-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-10">
            Explore more courses
          </h2>
        
        <CourseSlider
            title=""
            courses={academicCourses}
        />
                
        </div>
      </div>

    </div>
  );
};

export default QuizSubmitted;
