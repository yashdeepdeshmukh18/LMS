import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { User, Bell, Moon, ChevronRight, LogOut, Globe } from "lucide-react";

const SettingsPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // Mock State for Toggles
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="grid gap-6">
          
          {/* Section 1: General Account */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="text-purple-600" size={20} /> General
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {/* Profile Link */}
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-3 -mx-3 rounded-lg transition group" 
                onClick={() => navigate("/profile")}
              >
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">Edit Profile</p>
                  <p className="text-sm text-gray-500">Update your name, bio, and avatar</p>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-purple-600" />
              </div>

              {/* Language (Static for now) */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                        <Globe size={18} />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">Language</p>
                        <p className="text-sm text-gray-500">English (US)</p>
                    </div>
                </div>
                {/* No action needed for basic info */}
              </div>
            </div>
          </div>

          {/* Section 2: Preferences (Notifications & Theme) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Bell className="text-purple-600" size={20} /> Preferences
              </h2>
            </div>
            <div className="p-5 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Course updates & announcements</p>
                </div>
                <Toggle checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-500">Switch to dark theme</p>
                </div>
                <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              </div>

            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="mt-4 flex items-center justify-center gap-2 text-red-600 font-semibold hover:bg-red-50 bg-white border border-red-100 px-6 py-4 rounded-xl transition w-full shadow-sm"
          >
            <LogOut size={20} /> Log Out
          </button>

        </div>
      </div>
    </div>
  );
};

// Helper Toggle Component
const Toggle = ({ checked, onChange }) => (
  <div 
    onClick={onChange}
    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${checked ? 'bg-purple-600' : 'bg-gray-300'}`}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-5' : ''}`}></div>
  </div>
);

export default SettingsPage;