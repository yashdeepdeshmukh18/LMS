import React, { useState } from "react";
import { Upload } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const [formData, setFormData] = useState({
    platformName: "",
    signatureText: "",
    description: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, logo: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Settings:", formData);
    alert("Settings Saved Successfully ✅");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-200 via-indigo-200 to-purple-300 p-4 md:p-8">
      {/* Card Wrapper */}
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-sky-400 to-purple-400 p-[2px] rounded-2xl shadow-xl">
        <div className="bg-white rounded-2xl p-4 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
            <p className="text-gray-500 text-sm">
              manage platform configuration
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { id: "general", label: "General" },
              { id: "authentication", label: "Authentication" },
              { id: "payment", label: "Payment" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* GENERAL TAB */}
          {activeTab === "general" && (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-3xl"
            >
              {/* Platform Name */}
              <div>
                <label className="block font-medium mb-2">
                  Platform Name
                </label>
                <input
                  type="text"
                  name="platformName"
                  value={formData.platformName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter platform name"
                />
              </div>

              {/* Signature Text */}
              <div>
                <label className="block font-medium mb-2">
                  Signature Text
                </label>
                <input
                  type="text"
                  name="signatureText"
                  value={formData.signatureText}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter signature text"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block font-medium mb-2">
                  Platform Logo
                </label>

                <label className="flex flex-col items-center justify-center w-56 h-40 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition">
                  <Upload className="w-8 h-8 text-purple-500 mb-2" />
                  <p className="text-xs text-gray-500">
                    JPG/PNG, max 2MB
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                {formData.logo && (
                  <p className="text-sm mt-2 text-gray-600">
                    Selected: {formData.logo.name}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter platform description"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
              >
                Save Changes
              </button>
            </form>
          )}

          {/* OTHER TABS PLACEHOLDER */}
          {activeTab !== "general" && (
            <div className="text-gray-500 text-sm">
              {activeTab === "authentication" && (
                <p>Authentication settings UI goes here.</p>
              )}
              {activeTab === "payment" && (
                <p>Payment gateway settings UI goes here.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
