import React, { useState } from "react";
import { Search, Plus } from "lucide-react";

const initialInstructors = [
  {
    id: 1,
    name: "Rahul Mehta",
    status: "Live",
    courses: 3,
    students: 1250,
    action: "Active",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    status: "Live",
    courses: 3,
    students: 1250,
    action: "Active",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    status: "Live",
    courses: 2,
    students: "Pending",
    action: "Active",
  },
  {
    id: 4,
    name: "Rahul Mehta",
    status: "Live",
    courses: 1,
    students: 1250,
    action: "View",
  },
  {
    id: 5,
    name: "Rahul Mehta",
    status: "Live",
    courses: 2,
    students: "Pending",
    action: "View",
  },
];

export default function InstructorPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialInstructors);

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-purple-200 to-purple-300 p-4 md:p-10">
      {/* Header Card */}
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-400 to-purple-400 p-[2px] rounded-2xl shadow-lg">
        <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Instructor
            </h1>
            <p className="text-gray-500 text-sm">
              manage instructor and assigned course
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border rounded-xl px-3 py-2 w-full md:w-80 bg-gray-50">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search instructor by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="max-w-6xl mx-auto mt-10 bg-gradient-to-r from-blue-400 to-purple-400 p-[2px] rounded-2xl shadow-xl">
        <div className="bg-white rounded-2xl p-4 md:p-8">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-5 bg-gray-100 rounded-xl px-6 py-4 font-semibold text-gray-700">
            <span>Instructor</span>
            <span>Status</span>
            <span>Course</span>
            <span>Student</span>
            <span>Action</span>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-4 mt-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-5 items-center bg-purple-100 rounded-xl px-6 py-4 shadow-sm gap-3"
              >
                <span className="font-medium text-gray-800">
                  {item.name}
                </span>

                <span>
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded">
                    {item.status.toLowerCase()}
                  </span>
                </span>

                <span className="text-gray-700">{item.courses}</span>

                <span>
                  {item.students === "Pending" ? (
                    <span className="bg-yellow-400 text-xs px-3 py-1 rounded font-medium">
                      Pending
                    </span>
                  ) : (
                    item.students.toLocaleString()
                  )}
                </span>

                <span>
                  {item.action === "Active" ? (
                    <button className="bg-green-600 text-white px-4 py-1 rounded-lg text-sm">
                      Active
                    </button>
                  ) : (
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm">
                      View
                    </button>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Add Instructor */}
          <div className="flex justify-end mt-8">
            <button className="flex items-center gap-2 border border-blue-500 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition">
              <Plus size={16} /> Add Instructor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
