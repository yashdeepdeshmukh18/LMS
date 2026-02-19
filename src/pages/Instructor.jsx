import React, { useState } from "react";
import { Search, Plus, X } from "lucide-react";

const initialInstructors = [
  {
    id: 1,
    name: "Rahul Mehta",
    email: "rahul@mail.com",
    bio: "Math Instructor",
    status: "Active",
    courses: 3,
    students: 1250,
  },
];

export default function InstructorPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialInstructors);
  const [openModal, setOpenModal] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState(true);
  const [profile, setProfile] = useState(null);

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddInstructor = () => {
    if (!name || !email) return;

    const newInstructor = {
      id: Date.now(),
      name,
      email,
      bio,
      status: status ? "Active" : "Inactive",
      courses: 0,
      students: 0,
    };

    setData((prev) => [...prev, newInstructor]);

    // Reset
    setName("");
    setEmail("");
    setBio("");
    setStatus(true);
    setProfile(null);
    setOpenModal(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-purple-200 to-purple-300 p-4 md:p-10">
      {/* Header */}
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

      {/* Table */}
      <div className="max-w-6xl mx-auto mt-10 bg-gradient-to-r from-blue-400 to-purple-400 p-[2px] rounded-2xl shadow-xl">
        <div className="bg-white rounded-2xl p-4 md:p-8">
          <div className="hidden md:grid grid-cols-5 bg-gray-100 rounded-xl px-6 py-4 font-semibold text-gray-700">
            <span>Instructor</span>
            <span>Status</span>
            <span>Course</span>
            <span>Student</span>
            <span>Action</span>
          </div>

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
                    {item.status}
                  </span>
                </span>

                <span>{item.courses}</span>
                <span>{item.students}</span>

                <button className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm w-fit">
                  View
                </button>
              </div>
            ))}
          </div>

          {/* Add Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 border border-blue-500 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition"
            >
              <Plus size={16} /> Add Instructor
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-center border-b p-6">
              <div>
                <h2 className="text-2xl font-semibold">Add Instructor</h2>
                <p className="text-sm text-gray-500">
                  create and assign a new course instructor
                </p>
              </div>

              <button onClick={() => setOpenModal(false)}>
                <X />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email address</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Bio</label>
                <input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Profile Picture</label>
                <input
                  type="file"
                  onChange={(e) => setProfile(e.target.files[0])}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium">Status</label>
                <input
                  type="checkbox"
                  checked={status}
                  onChange={() => setStatus(!status)}
                />
                <span className="text-sm">
                  {status ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t p-6">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handleAddInstructor}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Save Instructor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
