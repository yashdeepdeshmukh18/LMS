import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { DashboardThemeContext } from "../context/themes/dashboardThemes";

const CompletedCourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { profile } = useContext(AuthContext);

  // 🎨 Theme from provider
  const { cardBg, border, title, text, badge, outlineBtn, gradientBtn } =
    useContext(DashboardThemeContext);

  return (
    <div
      className={`${cardBg} ${border} px-6 py-4 rounded-2xl shadow-lg overflow-hidden border transition-all duration-300`}
    >
      {/* Media */}{" "}
      <div className="h-44 w-full bg-gray-100 rounded-xl overflow-hidden">
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
        )}{" "}
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <span
          className={`inline-block text-xs px-3 py-1 rounded-md mb-3 ${badge}`}
        >
          {course.category}
        </span>

        {/* Title */}
        <h3 className={`text-lg font-semibold mb-1 ${title}`}>
          {course.title}
        </h3>

        {/* Meta */}
        <p className={`text-sm ${text}`}>{course.grade}</p>

        <p className={`text-sm mb-5 ${text}`}>{course.lessons} Lessons</p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            className={`flex-1 py-2 font-semibold rounded-lg shadow-[0px_4px_4px_0px_#00000040] transition ease-out duration-[340ms] hover:scale-105 ${outlineBtn}`}
          >
            View Course
          </button>

          <button
            onClick={() => navigate(`/certificate/${profile.id}/${course.id}`)}
            className={`flex-1 py-2 rounded-lg font-medium shadow-[0px_4px_4px_0px_#00000040] transition ease-out duration-[340ms] hover:scale-105 ${gradientBtn}`}
          >
            View Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletedCourseCard;
