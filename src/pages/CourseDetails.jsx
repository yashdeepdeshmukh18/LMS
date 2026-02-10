// ===============================
// CourseDetail.jsx (Updated Page Using Theme)
// ===============================

import React, { useContext } from "react";
import { CourseDetailThemeContext } from "../context/themes/courseDetailTheme";

const CourseDetail = () => {
  const {
    pageBg,
    cardBg,
    textPrimary,
    textSecondary,
    tabBg,
    tabActive,
    tabInactive,
    buttonPrimary,
    buttonSecondary,
    avatarBg,
  } = useContext(CourseDetailThemeContext);

  return (
    <div className={`${pageBg} min-h-screen p-10`}>
      {/* Hero Card */}
      <div
        className={`max-w-5xl mx-auto rounded-2xl border p-8 shadow-md ${cardBg}`}
      >
        <h1 className={`text-3xl font-bold mb-3 ${textPrimary}`}>
          Course Title
        </h1>

        <p className={`mb-6 ${textSecondary}`}>
          Course description will appear here aligned with theme.
        </p>

        <div className="flex gap-4">
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition hover:scale-105 ${buttonPrimary}`}
          >
            Enroll Now
          </button>

          <button
            className={`px-6 py-3 rounded-lg font-semibold transition hover:scale-105 ${buttonSecondary}`}
          >
            Share
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        className={`max-w-4xl mx-auto mt-10 flex gap-3 p-3 rounded-full ${tabBg}`}
      >
        {[
          { name: "Overview", active: true },
          { name: "Curriculum" },
          { name: "Instructor" },
          { name: "Reviews" },
        ].map((tab, i) => (
          <button
            key={i}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              tab.active ? tabActive : tabInactive
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Instructor Preview */}
      <div
        className={`max-w-5xl mx-auto mt-10 p-6 rounded-2xl border shadow ${cardBg}`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold ${avatarBg}`}
          >
            A
          </div>

          <div>
            <h3 className={`font-semibold ${textPrimary}`}>
              Instructor Name
            </h3>
            <p className={`text-sm ${textSecondary}`}>
              Instructor details themed dynamically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
