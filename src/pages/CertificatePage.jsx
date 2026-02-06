import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../api/getCourseById";
import { getProfileById } from "../api/getProfileById"; // Uses your new Edge Function
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Download, Share2, Award, CheckCircle } from "lucide-react";
import certificateBadge from "../assets/icons/certifiOfComple.svg"; 

const CertificatePage = () => {
  // 1. Get IDs from URL
  const { userId, courseId } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(true);
  
  const certificateRef = useRef(null);

  // 2. Fetch Data (Course + Student Name)
  useEffect(() => {
    const fetchData = async () => {
      if (!courseId || !userId) return;
      try {
        // Run both fetches in parallel for speed
        const [courseData, profileData] = await Promise.all([
            getCourseById(courseId),
            getProfileById(userId)
        ]);

        if (courseData) setCourse(courseData);
        if (profileData) setStudentName(profileData.full_name);
        
      } catch (error) {
        console.error("Failed to load certificate data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId, userId]);

  const handleDownload = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Certificate link copied to clipboard!");
  };

  // Loading State
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="animate-pulse flex flex-col items-center">
            <Award className="w-12 h-12 text-purple-300 mb-4"/>
            <p className="text-purple-700 font-medium">Verifying Certificate...</p>
        </div>
    </div>
  );
  
  // Error State
  if (!course || !studentName) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4 bg-gray-50">
            <Award className="text-gray-300 w-20 h-20"/>
            <h2 className="text-2xl font-bold text-gray-700">Certificate Not Found</h2>
            <p className="text-gray-500 max-w-md">
                We couldn't verify this certificate. The link might be incorrect or the certificate ID is invalid.
            </p>
            <button 
                onClick={() => navigate("/")} 
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
                Go Home
            </button>
        </div>
    );
  }

  const date = new Date().toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">

      {/* ACTION BAR (Hidden when printing) */}
      <div className="print:hidden bg-white border-b border-gray-200 py-4 px-4 sm:px-8 flex flex-wrap gap-4 justify-between items-center shadow-sm sticky top-0 z-50">
        <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={20} /> 
                Verified Certificate
            </h1>
            <p className="text-xs text-gray-500">Issued to {studentName}</p>
        </div>

        <div className="flex gap-3">
            <button 
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-sm font-medium transition"
            >
                <Share2 size={18} /> <span className="hidden sm:inline">Share</span>
            </button>
            <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md transition-all active:scale-95 text-sm font-medium"
            >
                <Download size={18} /> <span className="hidden sm:inline">Download PDF</span>
            </button>
        </div>
      </div>

      {/* CERTIFICATE PREVIEW AREA */}
      <div className="flex-1 overflow-auto p-6 sm:p-12 flex justify-center items-center print:p-0 print:overflow-visible bg-gray-100">
        
        {/* CERTIFICATE CARD */}
        <div 
            ref={certificateRef}
            className="relative bg-white w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl border-[12px] border-double border-[#E0C0EA] p-10 sm:p-16 text-center flex flex-col justify-between print:shadow-none print:w-full print:h-screen print:border-0 print:m-0"
        >
            {/* Background Texture/Watermark */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center">
                <Award size={600} strokeWidth={0.5} />
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-purple-300"></div>
            <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-purple-300"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-purple-300"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-purple-300"></div>

            {/* Header */}
            <div className="relative z-10 space-y-2 mt-6">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                        S
                    </div>
                </div>
                <h1 className="text-4xl sm:text-6xl font-serif font-bold text-gray-900 uppercase tracking-widest" style={{ fontFamily: "serif" }}>
                    Certificate
                </h1>
                <h2 className="text-xl sm:text-2xl text-purple-600 font-light uppercase tracking-[0.3em]">
                    Of Completion
                </h2>
            </div>

            {/* Body */}
            <div className="relative z-10 my-8 flex-1 flex flex-col justify-center">
                <p className="text-lg text-gray-500 italic font-serif">This certifies that</p>
                
                <h3 className="text-3xl sm:text-5xl font-bold text-gray-800 border-b-2 border-gray-300 inline-block py-4 px-12 min-w-[300px] mx-auto font-serif text-center">
                    {studentName}
                </h3>

                <p className="text-lg text-gray-500 italic mt-6 font-serif">
                    has successfully completed the comprehensive course requirements for
                </p>

                <h4 className="text-2xl sm:text-4xl font-bold text-purple-800 mt-4 max-w-4xl mx-auto leading-tight">
                    {course.title}
                </h4>
            </div>

            {/* Footer / Signatures */}
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center sm:items-end mt-12 px-4 sm:px-16 gap-10 sm:gap-0">
                
                {/* Date */}
                <div className="text-center">
                    <div className="text-lg font-bold text-gray-800 border-t border-gray-400 pt-2 px-8 min-w-[200px] font-mono">
                        {date}
                    </div>
                    <p className="text-xs text-purple-900 uppercase tracking-wider mt-1 font-bold">Date Issued</p>
                </div>

                {/* Badge */}
                <div className="mb-2 hidden sm:block">
                    {/* Assuming you have this SVG imported, otherwise use a placeholder or <Award /> */}
                    <img src={certificateBadge} alt="Seal" className="w-28 h-28 opacity-90 drop-shadow-lg" />
                </div>

                {/* Signature */}
                <div className="text-center">
                    <div className="text-2xl text-gray-800 border-t border-gray-400 pt-1 px-8 min-w-[200px]" style={{ fontFamily: "cursive" }}>
                        Smaran.AI Team
                    </div>
                    <p className="text-xs text-purple-900 uppercase tracking-wider mt-1 font-bold">Authorized Signature</p>
                </div>
            </div>

            {/* Verification ID */}
            <div className="absolute bottom-3 left-0 w-full text-center">
                <p className="text-[10px] text-gray-400 font-mono tracking-wide">
                    VERIFICATION ID: {course.id.split('-')[0].toUpperCase()}-{userId.split('-')[0].toUpperCase()}-{Date.now().toString().slice(-6)}
                </p>
            </div>

        </div>
      </div>
      
     

      {/* PRINT STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        @media print {
          @page { size: landscape; margin: 0; }
          body { -webkit-print-color-adjust: exact; margin: 0; padding: 0; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-0 { border: none !important; }
          .print\\:m-0 { margin: 0 !important; }
          .print\\:w-full { width: 100vw !important; max-width: none !important; }
          .print\\:h-screen { height: 100vh !important; }
        }
      `}</style>
    </div>
  );
};

export default CertificatePage;