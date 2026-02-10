import React, { useContext } from "react";
import { CoursesThemeContext } from "../context/themes/coursesThemes";

const CourseCard = ({ category, title, grade, lessons, onView }) => {
  
  // 🎨 Theme values from CoursesTheme
  const {
    cardBg,
    border,
    shadow,
    tagBg,
    tagText,
    textPrimary,
    textSecondary,
    gradient,
  } = useContext(CoursesThemeContext);

  return (
    <div
      className="rounded-2xl p-5 w-full max-w-sm transition hover:scale-[1.02]"
      style={{
        background: cardBg,
        border: `1px solid ${border}`,
        boxShadow: shadow,
      }}
    >
      
      {/* Category Tag */}
      <span
        className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-3"
        style={{
          background: tagBg,
          color: tagText,
        }}
      >
        {category}
      </span>

      {/* Title */}
      <h3
        className="text-lg font-semibold"
        style={{ color: textPrimary }}
      >
        {title}
      </h3>

      {/* Details */}
      <p
        className="text-sm mt-1"
        style={{ color: textSecondary }}
      >
        Grade {grade}
      </p>

      <p
        className="text-sm"
        style={{ color: textSecondary }}
      >
        {lessons} Lessons
      </p>

      {/* Button */}
      <button
        onClick={onView}
        className="mt-5 w-full text-white py-2 rounded-lg font-medium transition duration-300 hover:scale-105"
        style={{
          background: gradient,
        }}
      >
        View Course
      </button>
    </div>
  );
};

export default CourseCard;
