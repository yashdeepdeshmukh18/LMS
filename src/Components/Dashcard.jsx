import React, { useContext } from "react";
import PlaybuttonIcon from "../assets/icons/playbutton.svg";
import { DashboardThemeContext } from "../context/themes/dashboardThemes";

const Dashcard = ({
  title,
  subject,
  grade,
  lessons,
  progress,
}) => {
  const {
    cardBg,
    title: titleColor,
    text,
    progressText,
    badge,
    progressFill,
    gradientBtn,
  } = useContext(DashboardThemeContext);

  return (
    <div
      className={`w-full max-w-sm rounded-2xl border p-8 shadow-md transition-all duration-300 ${cardBg}`}
    >
      {/* Thumbnail */}
      <div className="relative mb-3 h-36 w-full rounded-xl bg-[#989696] flex items-center justify-center">
        <img src={PlaybuttonIcon} alt="play button" />
      </div>

      {/* Progress Text */}
      <p className={`text-xs mb-1 ${progressText}`}>
        In Progress ({progress}% completed)
      </p>

      {/* Progress Bar */}
      <div className="h-1.5 w-full rounded-full bg-gray-200 mb-3">
        <div
          className={`h-1.5 rounded-full ${progressFill}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Subject */}
      <span
        className={`inline-block mt-8 mb-2 rounded-md px-2 py-0.5 text-xs ${badge}`}
      >
        {subject}
      </span>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className={`text-sm font-semibold ${titleColor}`}>
          {title}
        </h3>

        <p className={`text-xs ${text}`}>{grade}</p>
        <p className={`text-xs ${text}`}>
          {lessons} Lessons
        </p>
      </div>

      {/* Button */}
      <button
        className={`mt-5 shadow-[0px_4px_4px_0px_#00000040] w-full py-2 rounded-lg font-medium transition ease-out duration-[340ms] hover:scale-105 ${gradientBtn}`}
      >
        View Course
      </button>
    </div>
  );
};

export default Dashcard;
