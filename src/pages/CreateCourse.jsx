import React, { useState } from "react";
import CourseSchedule from "../Components/Admin/CreateCourse/CourseSchedule";
import { ArrowLeft } from "lucide-react";

export default function CreateCourse() {
  const [activeTab, setActiveTab] = useState("schedule");



  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-purple-200 p-4 md:p-6">
      
      <div className="max-w-7xl mx-auto">

        {/* Top Card */}
        <div className="bg-white rounded-2xl shadow-md p-5 md:p-6 border">

          {/* Title Row */}
          <div className="flex items-start gap-3">

            {/* Back Icon */}
            <button className="mt-1">
              <ArrowLeft className="w-6 h-6 text-gray-500" />
            </button>

            <div>
              {/* Title */}
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Create Course
                </h1>

                {/* Draft Badge */}
                <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                  Draft
                </span>
              </div>

              {/* Breadcrumb */}
              <p className="text-sm text-gray-500 mt-1">
                Dashboard / Course / Create Course
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mt-6">

            {/* Schedule */}
            <button
              onClick={() => setActiveTab("schedule")}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                activeTab === "schedule"
                  ? "bg-blue-100 text-blue-600 border-blue-300 shadow-sm"
                  : "bg-gray-100 text-gray-600 border-gray-200"
              }`}
            >
              ⏱ Course Schedule
            </button>

            {/* Content */}
            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200">
              ✔ Course Content
            </button>

            {/* Pricing */}
            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200">
              ⚡ Pricing Plan
            </button>

            {/* Quiz */}
            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200">
              ❓ Create Quiz
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "schedule" && <CourseSchedule />}
        </div>

      </div>
    </div>
  );
}
