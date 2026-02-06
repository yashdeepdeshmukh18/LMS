import React from "react";
import PlaybuttonIcon from "../assets/icons/playbutton.svg"

const Dashcard = ({
  title,
  subject,
  grade,
  lessons,
  progress,
}) => {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-purple-200 bg-white p-8 shadow-md">
      {/* Thumbnail */}
      <div className="relative mb-3 h-36 w-full rounded-xl bg-[#989696] flex items-center justify-center">
        <img src={PlaybuttonIcon} alt="play button"/>
      </div>

      {/* Progress */}
      <p className="text-xs text-black mb-1">
        In Progress ({progress}% completed)
      </p>
      <div className="h-1.5 w-full rounded-full bg-gray-200 mb-3">
        <div
          className="h-1.5 rounded-full bg-purple-600"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <span className="inline-block mt-8 mb-2 rounded-md bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
        {subject}
      </span>

        <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-gray-900">
                {title}
            </h3>
            <p className="text-xs text-gray-500">
                {grade}
            </p>
            <p className="text-xs text-gray-500">
                {lessons} Lessons
            </p>
        </div>


      {/* Button */}
      <button className="mt-5 border border-[#8B1CC342] shadow-[0px_4px_4px_0px_#00000040] w-full bg-[linear-gradient(90deg,#4846C6_0%,#DD9AFF_100%)] text-white py-2 rounded-lg font-medium transition ease-out duration-[340ms] hover:scale-105">
        View Course
      </button>
    </div>
  );
};


export default Dashcard;