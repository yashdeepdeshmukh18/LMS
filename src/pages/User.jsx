import React, { useState } from "react";

export default function UserAnalyticsPage() {
  const [search, setSearch] = useState("");

  // Dummy dynamic data
  const user = {
    name: "Rahul Mehta",
    initials: "RM",
    active: true,
    overallProgress: 72,
    instructor: "Neha Verma",
    courses: [
      { title: "Complete Mathematics Course", progress: 69 },
      { title: "Complete Mathematics Course", progress: 50 },
    ],
    continueCourse: {
      title: "Complete Mathematics Course",
      progress: 60,
      students: 82,
    },
  };

  const ProgressCircle = ({ value, color }) => (
    <div
      className="w-40 h-40 rounded-full flex items-center justify-center"
      style={{
        background: `conic-gradient(${color} ${value}%, #e5e7eb ${value}%)`,
      }}
    >
      <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-inner">
        <span className="font-semibold text-lg">{value}%</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-purple-200 to-purple-300 p-4 md:p-8">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">User</h1>
          <p className="text-gray-500 text-sm">
            view learner activity & achievements
          </p>
        </div>

        <input
          type="text"
          placeholder="Search user by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none"
        />
      </div>

      {/* Content Wrapper */}
      <div className="mt-8 bg-white/70 backdrop-blur-lg rounded-2xl p-4 md:p-8 shadow-lg">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="space-y-6">
            {/* User Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold text-purple-600 mb-4">
                User Summary
              </h2>

              <ProgressCircle value={user.overallProgress} color="#7c3aed" />

              <p className="text-gray-500 mt-4">Overall progress</p>

              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                View Profile
              </button>
            </div>

            {/* Second Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full border flex items-center justify-center font-semibold">
                  {user.initials}
                </div>
                <h3 className="text-lg font-semibold text-purple-600">
                  {user.name}
                </h3>
              </div>

              <div className="flex flex-col items-center">
                <ProgressCircle value={56} color="#ef4444" />
                <p className="text-gray-500 mt-3">Overall progress</p>
              </div>

              <div className="flex justify-between mt-6 text-sm text-gray-600">
                <span>📚 Courses: 4</span>
                <span className="text-green-600">🟡 Last seen</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-purple-200 rounded-2xl p-6 shadow-inner">
            {/* User Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border flex items-center justify-center font-semibold">
                  {user.initials}
                </div>
                <h3 className="text-xl font-semibold text-purple-700">
                  {user.name}
                </h3>
              </div>

              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                Active
              </span>
            </div>

            {/* Instructor */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">About Instructor</h4>
              <div className="bg-white rounded-xl p-4 shadow flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <span>{user.instructor}</span>
              </div>
            </div>

            {/* Course Progress */}
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold">Course Progress</h4>

              {user.courses.map((course, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 flex justify-between items-center shadow"
                >
                  <span className="text-sm">{course.title}</span>
                  <span
                    className={`px-3 py-1 text-xs rounded-full text-white ${
                      course.progress > 60
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {course.progress}%
                  </span>
                </div>
              ))}
            </div>

            {/* Continue Course */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Continue</h4>

              <div className="bg-white rounded-xl p-4 shadow">
                <div className="flex justify-between text-sm mb-2">
                  <span>{user.continueCourse.title}</span>
                  <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs">
                    {user.continueCourse.progress}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{
                      width: `${user.continueCourse.progress}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                  <span>
                    {user.continueCourse.progress}% complete • {" "}
                    {user.continueCourse.students} students enroll
                  </span>

                  <button className="border px-3 py-1 rounded-md text-xs">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
