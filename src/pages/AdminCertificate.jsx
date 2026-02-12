import React, { useState } from "react";
import { Upload } from "lucide-react";

export default function CertificatesPage() {
  const [template, setTemplate] = useState(null);
  const [platformName, setPlatformName] = useState("");
  const [certificateTitle, setCertificateTitle] = useState("");
  const [signatureText, setSignatureText] = useState("");
  const [autoIssue, setAutoIssue] = useState(true);

  const issuedCertificates = [
    {
      id: 1,
      user: "Rahul Mehta",
      course: "Complete Mathematics",
      date: "02.02.2026",
    },
    {
      id: 2,
      user: "Rahul Mehta",
      course: "Complete Mathematics",
      date: "02.02.2026",
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTemplate(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-purple-300 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-sky-400 to-purple-400 p-[2px] rounded-2xl shadow-lg">
          <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Certificates
              </h1>
              <p className="text-gray-500 text-sm">
                Manage certificate templates and issued certificates
              </p>
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm">
              Save Templates
            </button>
          </div>
        </div>

        {/* Template Form */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-8">

          {/* Logo + Upload */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">

            {/* Upload Box */}
            <label className="border-2 border-dashed rounded-xl p-6 w-56 h-40 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50">
              <Upload className="w-8 h-8 text-purple-600 mb-2" />
              <p className="text-xs text-gray-500">JPG/PNG, max 2MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Preview */}
            {template && (
              <img
                src={template}
                alt="Template Preview"
                className="h-32 object-contain border rounded-lg p-2 bg-gray-50"
              />
            )}
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-gray-700 mb-2">
                Platform Name
              </label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Certificate Title
              </label>
              <input
                type="text"
                value={certificateTitle}
                onChange={(e) => setCertificateTitle(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">
                Signature Text
              </label>
              <input
                type="text"
                value={signatureText}
                onChange={(e) => setSignatureText(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-between border rounded-xl p-4">
            <div>
              <p className="font-medium text-gray-800">
                Auto‑Issue Certificate
              </p>
              <p className="text-sm text-gray-500">
                Certificate will be issued automatically
              </p>
            </div>

            <button
              onClick={() => setAutoIssue(!autoIssue)}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                autoIssue ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                  autoIssue ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Issued Certificates */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Issued Certificates
          </h2>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-4 bg-gray-100 rounded-xl px-4 py-3 font-semibold text-gray-700">
            <p>User</p>
            <p>Course</p>
            <p>Date</p>
            <p>Certificate</p>
          </div>

          {/* Rows */}
          <div className="space-y-4">
            {issuedCertificates.map((cert) => (
              <div
                key={cert.id}
                className="grid grid-cols-1 md:grid-cols-4 items-center gap-3 bg-purple-100 border border-purple-200 rounded-xl px-4 py-4 shadow-sm"
              >
                <p className="text-gray-800 font-medium">
                  {cert.user}
                </p>
                <p className="text-gray-700">{cert.course}</p>
                <p className="text-gray-700">{cert.date}</p>

                <button className="w-fit bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1 rounded-lg">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
