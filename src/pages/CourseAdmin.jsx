import React from "react";
import { Eye } from "lucide-react";

export default function CoursesManagement() {
  const courses = Array(5).fill({
    name: "Complete Mathematics Course",
    instructor: "Anita Roy",
    status: "live",
    students: "Rahul Mehta",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-purple-300 p-6">
      {/* Page Wrapper */}
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Courses Header Card */}
        <div className="bg-gradient-to-r from-sky-400 to-purple-400 p-[2px] rounded-2xl shadow-lg">
          <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
              <p className="text-gray-500 text-sm">
                manage and publish your content
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search course"
                className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-400"
              />

              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow">
                Add Course
              </button>
            </div>
          </div>
        </div>

        {/* Status Filter Card */}
        <div className="bg-gradient-to-r from-sky-400 to-purple-400 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-black mb-4">Status</h2>

          <div className="bg-white rounded-xl p-3 flex flex-wrap gap-3 w-fit">
            {[
              "All",
              "Draft",
              "Instructor",
              "All Instructor",
              "Sort",
              "Latest",
            ].map((item) => (
              <button
                key={item}
                className="px-4 py-1.5 text-sm rounded-lg border bg-gray-100 hover:bg-gray-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-gradient-to-r from-sky-400 to-purple-400 p-6 rounded-2xl shadow-lg">
          <div className="bg-white rounded-2xl p-6 overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-5 font-semibold text-gray-700 mb-4 px-2">
              <p>Course Name</p>
              <p>Instructor</p>
              <p>Status</p>
              <p>Students</p>
              <p>Action</p>
            </div>

            {/* Rows */}
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 items-center bg-purple-100 border border-purple-200 rounded-xl p-4 shadow-sm"
                >
                  <p className="text-gray-800 font-medium">
                    {course.name}
                  </p>

                  <p className="text-gray-700">{course.instructor}</p>

                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded w-fit capitalize">
                    {course.status}
                  </span>

                  <p className="text-gray-700">{course.students}</p>

                  <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg w-fit">
                    <Eye size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
