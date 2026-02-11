import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-300 to-purple-300 p-6">
    <div className="max-w-7xl mx-auto">
    {/* Top Card */}
      <div className="bg-white/90 rounded-2xl shadow-md p-6 flex flex-col lg:flex-row justify-between gap-6">
        {/* Left Content */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-purple-700">
              Student Enrollment
            </h2>
            <p className="text-purple-500 text-sm">in last 30 days</p>
          </div>

          <div className="flex gap-10 mt-6">
            <div>
              <p className="text-3xl font-bold text-gray-800">5490</p>
              <p className="text-red-500 text-sm">↓ 16.78%</p>
              <p className="text-gray-500 text-sm">This Month</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-800">1480</p>
              <p className="text-green-500 text-sm">↑ 4.26%</p>
              <p className="text-gray-500 text-sm">This Week</p>
            </div>
          </div>
        </div>

        {/* Chart Bars */}
        <div className="flex items-end gap-4 h-40 w-full lg:w-1/2 border border-dashed p-4">
          {[60, 90, 80, 40, 100, 80, 30, 95].map((h, i) => (
            <div
              key={i}
              className="bg-purple-500 w-6 rounded-t-lg"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Total Sales */}
        <div className="bg-white/90 rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-purple-700">
                Total Sales
              </h3>
              <p className="text-green-600 font-semibold">$945.20</p>
            </div>
            <p className="text-green-600 text-sm">↑ 4.63% vs. last month</p>
          </div>

          <div className="flex items-end gap-4 h-40">
            {[40, 70, 60, 30, 80, 60, 25, 75].map((h, i) => (
              <div
                key={i}
                className="bg-blue-500 w-8 rounded-t-lg"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white/90 rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-purple-700">
              Top Courses
            </h3>
            <select className="border rounded-lg px-2 py-1 text-sm">
              <option>weekly</option>
              <option>monthly</option>
            </select>
          </div>

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex justify-between items-center bg-purple-100 border border-purple-200 rounded-xl p-3 mb-3"
            >
              <p className="text-gray-700 font-medium">
                Complete Mathematics Course
              </p>
              <div className="text-right">
                <p className="text-green-600 font-semibold">$2,125.00</p>
                <p className="text-red-500 text-xs">25 sold</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Active Students */}
        <div className="bg-white/90 rounded-2xl shadow-md p-6 h-64">
          <h3 className="text-lg font-semibold text-gray-700">
            Active Students
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            How do your students visited in the time
          </p>

          <div className="flex gap-10 text-gray-700 font-medium">
            <button>Monthly</button>
            <button>Weekly</button>
            <button>Daily</button>
          </div>
        </div>

        {/* Empty Placeholder Card */}
        <div className="bg-white/60 rounded-2xl shadow-inner h-64" />
      </div>

       </div>
    </div>
  );
}
