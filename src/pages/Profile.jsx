import React, { useState, useContext, useEffect } from "react";

import editIcon from "../assets/icons/editIcon.svg";
import shareIcon from "../assets/icons/share.svg";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "../api/updateProfile";

import { Save, Plus, Trash2, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { profile, setProfile , myCourses} = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Initial State
  const [formData, setFormData] = useState({
    full_name: "",
    school_name: "",
    grade_level: "",
    bio: "",
    preferred_subjects: [],
    education_history: [], // Array for Education
    projects: []           // Array for Projects
  });

  // Sync state with context
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        school_name: profile.school_name || "",
        grade_level: profile.grade_level || "",
        bio: profile.bio || "",
        preferred_subjects: profile.preferred_subjects || [],
        // Ensure these are arrays to prevent crashes
        education_history: Array.isArray(profile.education_history) ? profile.education_history : [],
        projects: Array.isArray(profile.projects) ? profile.projects : [], 
      });
    }
  }, [profile]);

  // --- GENERIC HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectsChange = (e) => {
    const subjects = e.target.value.split(",").map((s) => s.trim());
    setFormData((prev) => ({ ...prev, preferred_subjects: subjects }));
  };

  // --- LIST HANDLERS (Education & Projects) ---
  
  // 1. Update a specific field in a specific item
  const handleItemChange = (section, index, field, value) => {
    setFormData((prev) => {
      const updatedList = [...prev[section]];
      updatedList[index] = { ...updatedList[index], [field]: value };
      return { ...prev, [section]: updatedList };
    });
  };

  // 2. Add a new empty item
  const addItem = (section, template) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], template]
    }));
  };

  // 3. Remove an item
  const removeItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedProfile = await updateProfile(formData);
      setProfile(updatedProfile);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <div>Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-[#FDF6FF]">
    

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* === LEFT SIDEBAR === */}
        <div className="space-y-6">
          
          {/* Main Profile Card */}
          <div className="relative bg-white rounded-2xl shadow-md p-6">
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="absolute top-4 right-4 text-purple-600 hover:text-purple-800 transition-colors"
            >
               {isEditing ? (
                 <div className="flex items-center gap-1 font-semibold text-sm bg-purple-100 px-3 py-1 rounded-full">
                    {loading ? <span>Saving...</span> : <><Save size={16} /> Save</>}
                 </div>
               ) : (
                 <img src={editIcon} className="w-5" alt="Edit" />
               )}
            </button>

            <div className="relative mx-auto text-center w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-white text-4xl font-semibold mb-4 shadow-inner">
              {formData.full_name ? formData.full_name.charAt(0).toUpperCase() : "S"}
            </div>

            <div className="flex flex-col gap-3 justify-center text-center">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="border border-purple-300 rounded px-2 py-1 text-center font-semibold w-full"
                    placeholder="Full Name"
                  />
                  <input
                    name="grade_level"
                    value={formData.grade_level}
                    onChange={handleChange}
                    className="border border-purple-300 rounded px-2 py-1 text-sm text-center w-full"
                    placeholder="Class/Grade"
                  />
                  <input
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleChange}
                    className="border border-purple-300 rounded px-2 py-1 text-sm text-center w-full"
                    placeholder="School Name"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800">{formData.full_name || "Student Name"}</h2>
                  <p className="font-openSans text-sm text-gray-600">{formData.grade_level || "Grade Not Set"}</p>
                  <p className="font-openSans text-sm text-gray-500">{formData.school_name || "School Not Set"}</p>
                </>
              )}
            </div>

            <button className="mt-6 border flex gap-2 justify-center items-center border-purple-400 text-purple-600 px-4 py-2 rounded-lg w-full hover:bg-purple-50 transition">
              <img src={shareIcon} className="w-5" alt="share" />
              Share Profile Link
            </button>
          </div>

          {/* Learning Preferences */}
          <div className="bg-white rounded-2xl flex flex-col gap-2 shadow-md p-6">
            <h3 className="font-semibold font-openSans text-gray-800 mb-2">Learning Preferences</h3>
            {isEditing ? (
              <textarea
                name="preferred_subjects"
                value={formData.preferred_subjects.join(", ")}
                onChange={handleSubjectsChange}
                className="border border-purple-300 rounded p-2 text-sm w-full h-20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Math, Science, English (comma separated)"
              />
            ) : (
              <ul className="list-disc font-openSans font-medium ml-5 text-purple-600 text-sm space-y-1">
                {formData.preferred_subjects.length > 0 ? (
                  formData.preferred_subjects.map((sub, idx) => <li key={idx}>{sub}</li>)
                ) : (
                  <li className="text-gray-400 font-normal italic">No subjects added</li>
                )}
              </ul>
            )}
          </div>

          {/* About Me */}
          <div className="bg-white flex flex-col gap-3 rounded-2xl font-openSans shadow-md p-6">
            <h3 className="font-semibold text-gray-800">About Me</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="border border-purple-300 rounded p-2 text-sm w-full h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{formData.bio || "No bio available."}</p>
            )}
            <p className="text-sm text-gray-500 break-all">📧 {profile.email}</p>
          </div>
        </div>

        {/* === RIGHT SECTION === */}
        <div className="lg:col-span-3 font-openSans space-y-6">
          
          <h2 className="text-2xl font-semibold text-gray-800">Progress</h2>
          
          {/* Enrolled Courses Card */}
          <div className="bg-white flex flex-col gap-3 rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-800">Enrolled Courses</h3>
              <span 
                onClick={() => navigate("/dashboard")} 
                className="text-[#1877F2] text-sm cursor-pointer hover:underline"
              >
                view all
              </span>
            </div>

            {myCourses && myCourses.length > 0 ? (
              <div className="flex flex-col gap-3">
                {myCourses.map((item) => (
                  <button
                    key={item.course.id}
                    onClick={() => navigate(`/view-course/${item.course.id}`)}
                    className="flex items-center justify-between w-full p-3 text-left border border-purple-100 rounded-xl hover:bg-purple-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-purple-100 p-2 rounded-lg text-purple-600 shrink-0">
                        <BookOpen size={20} />
                      </div>
                      <span className="font-medium text-gray-700 truncate group-hover:text-purple-700">
                        {item.course.title}
                      </span>
                    </div>
                    {/* Optional Arrow or Status */}
                    <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-purple-700">
                You haven't enrolled in any courses yet.
              </p>
            )}
          </div>

          {/* === PROJECTS SECTION (EDITABLE) === */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">Projects / Assignments</h3>
                <p className="text-sm text-gray-600">Showcase your work here.</p>
              </div>
              {isEditing && (
                <button 
                  onClick={() => addItem("projects", { title: "", description: "" })}
                  className="flex items-center gap-1 text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-md hover:bg-purple-200"
                >
                  <Plus size={16}/> Add
                </button>
              )}
            </div>

            <div className="space-y-4">
              {formData.projects.length > 0 ? (
                formData.projects.map((proj, idx) => (
                  <div key={idx} className="p-4 border border-purple-100 rounded-lg bg-purple-50 relative group">
                    {isEditing ? (
                      <>
                        <button 
                          onClick={() => removeItem("projects", idx)}
                          className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                        >
                          <Trash2 size={16}/>
                        </button>
                        <input
                          value={proj.title}
                          onChange={(e) => handleItemChange("projects", idx, "title", e.target.value)}
                          className="w-full mb-2 p-1 border border-purple-300 rounded text-sm font-semibold"
                          placeholder="Project Title"
                        />
                        <textarea
                          value={proj.description}
                          onChange={(e) => handleItemChange("projects", idx, "description", e.target.value)}
                          className="w-full p-1 border border-purple-300 rounded text-sm h-16 resize-none"
                          placeholder="Project Description"
                        />
                      </>
                    ) : (
                      <>
                        <h4 className="font-semibold text-purple-900">{proj.title}</h4>
                        <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">No projects added yet.</p>
              )}
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8">Education History</h2>
          
          {/* === EDUCATION SECTION (EDITABLE) === */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">Credentials</h3>
                <p className="text-sm text-gray-600">Your educational background.</p>
              </div>
              {isEditing && (
                <button 
                  onClick={() => addItem("education_history", { institution: "", year: "", degree: "" })}
                  className="flex items-center gap-1 text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-md hover:bg-purple-200"
                >
                  <Plus size={16}/> Add
                </button>
              )}
            </div>

            <div className="space-y-4">
              {formData.education_history.length > 0 ? (
                formData.education_history.map((edu, idx) => (
                  <div key={idx} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 relative">
                    {isEditing ? (
                      <>
                        <button 
                          onClick={() => removeItem("education_history", idx)}
                          className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                        >
                          <Trash2 size={16}/>
                        </button>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <input
                            value={edu.institution}
                            onChange={(e) => handleItemChange("education_history", idx, "institution", e.target.value)}
                            className="p-1 border border-gray-300 rounded text-sm"
                            placeholder="School / College"
                          />
                          <input
                            value={edu.year}
                            onChange={(e) => handleItemChange("education_history", idx, "year", e.target.value)}
                            className="p-1 border border-gray-300 rounded text-sm"
                            placeholder="Year (e.g. 2024)"
                          />
                        </div>
                        <input
                          value={edu.degree}
                          onChange={(e) => handleItemChange("education_history", idx, "degree", e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded text-sm"
                          placeholder="Degree / Class"
                        />
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <h4 className="font-semibold text-gray-800">{edu.institution}</h4>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{edu.year}</span>
                        </div>
                        <p className="text-sm text-purple-600">{edu.degree}</p>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">No education history added.</p>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProfilePage;