
import React from "react";

const CourseCard = ({ category, title, grade, lessons, onView }) => {
  return (
    <div className="bg-white border border-[#8B1CC342] rounded-2xl p-5 w-full max-w-sm shadow-sm hover:shadow-lg transition">
      
      {/* Category Tag */}
      <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mb-3">
        {category}
      </span>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

      {/* Details */}
      <p className="text-sm text-gray-500 mt-1">Grade {grade}</p>
      <p className="text-sm text-gray-500">{lessons} Lessons</p>

      {/* Button */}
      <button
        onClick={onView}
        className="mt-5 border border-[#8B1CC342] shadow-[0px_4px_4px_0px_#00000040] w-full bg-[linear-gradient(90deg,#4846C6_0%,#DD9AFF_100%)] text-white py-2 rounded-lg font-medium transition ease-out duration-[340ms] hover:scale-105"
      >
        View Course
      </button>
    </div>
  );
};

export default CourseCard;


