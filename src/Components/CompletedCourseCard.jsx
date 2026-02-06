import React from "react";

const CompletedCourseCard = ({ course }) => {
  return (
    <div className="bg-white px-6 py-4 rounded-2xl shadow-lg overflow-hidden border border-[#8B1CC342]">
      
      {/* Top Media Section */}
      <div className="h-44 w-full bg-gray-100">
        {course.mediaType === "video" ? (
          <video
            src={course.mediaUrl}
            className="w-full h-full object-cover"
            muted
            loop
            autoPlay
          />
        ) : (
          <img
            src={course.mediaUrl}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <span className="inline-block bg-blue-200 text-blue-700 text-xs px-3 py-1 rounded-md mb-3">
          {course.category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-1">
          {course.title}
        </h3>

        {/* Meta */}
        <p className="text-sm text-gray-500">{course.grade}</p>
        <p className="text-sm text-gray-500 mb-5">
          {course.lessons} Lessons
        </p>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="flex-1 mt-5 py-2 font-semibold border border-[#8B1CC342] rounded-lg  text-[#8B1CC3] shadow-[0px_4px_4px_0px_#00000040] transition ease-out duration-[340ms] hover:scale-105">
            View Course
          </button>

          <button className="mt-5 flex-1 border border-[#8B1CC342] shadow-[0px_4px_4px_0px_#00000040] bg-[linear-gradient(90deg,#4846C6_0%,#DD9AFF_100%)] text-white py-4 rounded-lg font-medium transition ease-out duration-[340ms] hover:scale-105">
            View Certificate 
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletedCourseCard;
