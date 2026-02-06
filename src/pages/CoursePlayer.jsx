// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// import Sidebar from "../components/layout/Sidebar";
// import { fetchFullCourseStructure } from "../utils/courseHelpers";
// import { FileText, PlayCircle } from "lucide-react";

// const CoursePlayer = () => {
//     const { courseId, lessonId } = useParams(); 
//     const navigate = useNavigate();

//     const [sidebarData, setSidebarData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showSidebar, setShowSidebar] = useState(false);
//     const [activeLessonId, setActiveLessonId] = useState(lessonId);

//     // 1. FETCH DATA
//     useEffect(() => {
//         if (!courseId) return;
//         const loadData = async () => {
//             setLoading(true);
//             const data = await fetchFullCourseStructure(courseId);
//             setSidebarData(data);
            
//             // If no lesson selected, open the first one automatically
//             if (!lessonId && data.length > 0 && data[0].lessons.length > 0) {
//                 const firstLesson = data[0].lessons[0];
//                 // Navigate using the ID directly
//                 handleNavigation(firstLesson.id, data); 
//             }
//             setLoading(false);
//         };
//         loadData();
//     }, [courseId]);

//     // 2. SYNC ACTIVE LESSON ID
//     useEffect(() => {
//         if (lessonId) setActiveLessonId(lessonId);
//     }, [lessonId]);

//     // 3. FIND ACTIVE LESSON OBJECT
//     const activeLesson = sidebarData
//         .flatMap(ch => ch.lessons)
//         .find(l => l.id === activeLessonId);

//     // 4. FIXED NAVIGATION HANDLER
//     // Now accepts an ID (string) because Sidebar sends an ID
//     const handleNavigation = (id, dataOverride = null) => {
//         const currentData = dataOverride || sidebarData;
//         // Find the full lesson object using the ID
//         const lesson = currentData.flatMap(c => c.lessons).find(x => x.id === id);
        
//         if (!lesson) return;

//         const pathBase = `/course/${courseId}`;
        
//         // Route based on the lesson's type
//         if (lesson.contentType === "video") {
//             navigate(`${pathBase}/player/${lesson.id}`);
//         } else if (lesson.contentType === "article") {
//             navigate(`${pathBase}/textbook/${lesson.id}`);
//         } else if (lesson.contentType === "assignment" || lesson.contentType === "quiz") {
//             navigate(`${pathBase}/assignment/${lesson.id}`);
//         }
        
//         setShowSidebar(false);
//     };

//     // --- HELPER: Fix YouTube URLs ---
//     const getEmbedUrl = (url) => {
//         if (!url) return "";
//         const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//         const match = url.match(regExp);
//         if (match && match[2].length === 11) {
//             return `https://www.youtube.com/embed/${match[2]}`;
//         }
//         return url;
//     };

//     // --- RENDER: Video Player ---
//     const renderVideoPlayer = () => {
//         const rawUrl = activeLesson.videoUrl;
//         if (!rawUrl) return <div className="bg-gray-100 h-full flex items-center justify-center">No Video URL</div>;

//         const isYouTube = rawUrl.includes("youtube.com") || rawUrl.includes("youtu.be");

//         if (isYouTube) {
//             return (
//                 <iframe 
//                     src={getEmbedUrl(rawUrl)} 
//                     title={activeLesson.title}
//                     className="w-full h-full rounded-xl"
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                 ></iframe>
//             );
//         } else {
//             return (
//                 <video 
//                     key={activeLesson.id} // Forces player refresh on video change
//                     src={rawUrl} 
//                     controls 
//                     className="w-full h-full rounded-xl bg-black"
//                 >
//                     Your browser does not support the video tag.
//                 </video>
//             );
//         }
//     };

//     if (loading) return <div className="p-20 text-center font-bold text-gray-500">Loading Course...</div>;
//     if (!activeLesson) return null; 

//     return (
//         <div className="page-fade flex flex-col h-screen overflow-hidden">
//             <Navbar />

//             <div className="flex flex-1 overflow-hidden relative">
                
//                 {/* DESKTOP SIDEBAR */}
//                 <div className="hidden lg:block w-[280px] h-full overflow-y-auto border-r border-gray-100 bg-white z-10 shrink-0">
//                     <Sidebar 
//                         data={sidebarData} 
//                         activeId={activeLessonId} 
//                         onSelect={handleNavigation} // Fixed: Now works with IDs
//                     />
//                 </div>

//                 {/* MOBILE SIDEBAR */}
//                 {showSidebar && (
//                     <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setShowSidebar(false)}>
//                         <div className="bg-white w-[85%] max-w-sm h-full p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
//                             <button onClick={() => setShowSidebar(false)} className="mb-4 text-purple-600 font-bold">✕ Close</button>
//                             <Sidebar 
//                                 data={sidebarData} 
//                                 activeId={activeLessonId} 
//                                 onSelect={handleNavigation} 
//                             />
//                         </div>
//                     </div>
//                 )}

//                 {/* MAIN CONTENT AREA */}
//                 <div className="flex-1 overflow-y-auto bg-gray-50">
//                     <div className="max-w-5xl mx-auto px-4 py-8">
                        
//                         <div className="lg:hidden mb-4">
//                             <button onClick={() => setShowSidebar(true)} className="text-purple-600 font-semibold">☰ Course Content</button>
//                         </div>

//                         <div className="flex items-center gap-3 mb-6">
//                             <PlayCircle className="text-purple-600" size={28} />
//                             <h1 className="text-2xl font-bold text-gray-800">{activeLesson.title}</h1>
//                         </div>

//                         {/* PLAYER */}
//                         <div className="w-full aspect-video bg-black rounded-xl shadow-lg mb-8">
//                             {renderVideoPlayer()}
//                         </div>

//                         {/* NOTES */}
//                         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//                             <div className="flex items-center gap-2 mb-4 border-b pb-4">
//                                 <FileText className="text-gray-500" size={20}/>
//                                 <h3 className="text-lg font-semibold text-gray-900">Transcript / Notes</h3>
//                             </div>
//                             <div className="prose text-gray-600 leading-relaxed">
//                                 {activeLesson.transcripts?.en || 
//                                  activeLesson.transcripts || 
//                                  "No transcript available for this lesson."}
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CoursePlayer;









// import React, { useState, useEffect } from "react";
// import { useParams, useOutletContext } from "react-router-dom"; // <--- MUST IMPORT THIS
// import { FileText, PlayCircle, CheckCircle } from "lucide-react";

// const CoursePlayer = () => {
//     const { lessonId } = useParams(); 
    
//     // 1. GRAB DATA FROM PARENT LAYOUT
//     // If this is null, it means 'CoursePlayer' is not nested inside 'CourseLayout' in App.js
//     const { sidebarData, markLessonComplete, completedLessons } = useOutletContext();

//     const [activeLessonId, setActiveLessonId] = useState(lessonId);

//     // 2. SYNC ACTIVE LESSON ID
//     useEffect(() => {
//         if (lessonId) setActiveLessonId(lessonId);
//     }, [lessonId]);

//     // 3. FIND ACTIVE LESSON OBJECT
//     // We safeguard against sidebarData being undefined
//     const activeLesson = sidebarData
//         ?.flatMap(ch => ch.lessons)
//         .find(l => l.id === activeLessonId);

//     // --- HELPER: Fix YouTube URLs ---
//     const getEmbedUrl = (url) => {
//         if (!url) return "";
//         const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//         const match = url.match(regExp);
//         if (match && match[2].length === 11) {
//             return `https://www.youtube.com/embed/${match[2]}`;
//         }
//         return url;
//     };

//     // --- RENDER: Video Player ---
//     const renderVideoPlayer = () => {
//         const rawUrl = activeLesson.videoUrl;
//         if (!rawUrl) return <div className="bg-gray-100 h-full flex items-center justify-center">No Video URL</div>;

//         const isYouTube = rawUrl.includes("youtube.com") || rawUrl.includes("youtu.be");

//         if (isYouTube) {
//             return (
//                 <iframe 
//                     src={getEmbedUrl(rawUrl)} 
//                     title={activeLesson.title}
//                     className="w-full h-full rounded-xl"
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                 ></iframe>
//             );
//         } else {
//             return (
//                 <video 
//                     key={activeLesson.id} 
//                     src={rawUrl} 
//                     controls 
//                     className="w-full h-full rounded-xl bg-black"
//                     // ✅ AUTO-COMPLETE: Marks lesson as done when video ends
//                     onEnded={() => markLessonComplete(lessonId)} 
//                 >
//                     Your browser does not support the video tag.
//                 </video>
//             );
//         }
//     };

//     // Guard Clause
//     if (!activeLesson) return <div className="p-10 text-center">Loading Lesson...</div>; 

//     // Check if current lesson is in the completed list
//     const isCompleted = completedLessons.includes(lessonId);

//     return (
//         <div className="max-w-5xl mx-auto px-4 py-8">
            
//             {/* HEADER */}
//             <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                     <PlayCircle className="text-purple-600" size={28} />
//                     <h1 className="text-2xl font-bold text-gray-800">{activeLesson.title}</h1>
//                 </div>
                
//                 {/* Manual Complete Button */}
//                 <button 
//                     onClick={() => markLessonComplete(lessonId)}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all
//                     ${isCompleted 
//                         ? "bg-green-100 text-green-700 cursor-default" 
//                         : "bg-purple-600 text-white hover:bg-purple-700 shadow-md"}`}
//                 >
//                     {isCompleted ? <><CheckCircle size={18}/> Watched</> : "Mark as Watched"}
//                 </button>
//             </div>

//             {/* PLAYER */}
//             <div className="w-full aspect-video bg-black rounded-xl shadow-lg mb-8 overflow-hidden">
//                 {renderVideoPlayer()}
//             </div>

//             {/* NOTES */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//                 <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
//                     <FileText className="text-gray-500" size={20}/>
//                     <h3 className="text-lg font-semibold text-gray-900">Transcript / Notes</h3>
//                 </div>
//                 <div className="prose text-gray-600 leading-relaxed max-w-none">
//                     {activeLesson.transcripts?.en || 
//                      activeLesson.transcripts || 
//                      "No transcript available for this lesson."}
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default CoursePlayer;






import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { FileText, PlayCircle, CheckCircle } from "lucide-react";

const CoursePlayer = () => {
    const { courseId, lessonId } = useParams(); // 2. Get courseId too
    const navigate = useNavigate();
    
    const { sidebarData, markLessonComplete, completedLessons } = useOutletContext();

    const [activeLessonId, setActiveLessonId] = useState(lessonId);

    // 3. AUTO-REDIRECT LOGIC (The Fix)
    useEffect(() => {
        // If we have data, but NO lessonId (meaning we are at /learn route)
        if (sidebarData?.length > 0 && !lessonId) {
            
            // Find the very first lesson of the first chapter
            const firstChapter = sidebarData[0];
            const firstLesson = firstChapter?.lessons?.[0];

            if (firstLesson) {
                // Redirect based on the lesson type
                const pathBase = `/course/${courseId}`;
                
                if (firstLesson.contentType === "video") {
                    navigate(`${pathBase}/player/${firstLesson.id}`, { replace: true });
                } else if (firstLesson.contentType === "article") {
                    navigate(`${pathBase}/textbook/${firstLesson.id}`, { replace: true });
                } else {
                    navigate(`${pathBase}/assignment/${firstLesson.id}`, { replace: true });
                }
            }
        }
    }, [sidebarData, lessonId, courseId, navigate]);

    // Sync state when URL changes
    useEffect(() => {
        if (lessonId) setActiveLessonId(lessonId);
    }, [lessonId]);

    // Find Active Lesson
    const activeLesson = sidebarData
        ?.flatMap(ch => ch.lessons)
        .find(l => l.id === activeLessonId);

    // --- HELPER: Fix YouTube URLs ---
    const getEmbedUrl = (url) => {
        if (!url) return "";
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`;
        }
        return url;
    };

    // --- RENDER: Video Player ---
    const renderVideoPlayer = () => {
        const rawUrl = activeLesson.videoUrl;
        if (!rawUrl) return <div className="bg-gray-100 h-full flex items-center justify-center">No Video URL</div>;

        const isYouTube = rawUrl.includes("youtube.com") || rawUrl.includes("youtu.be");

        if (isYouTube) {
            return (
                <iframe 
                    src={getEmbedUrl(rawUrl)} 
                    title={activeLesson.title}
                    className="w-full h-full rounded-xl"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            );
        } else {
            return (
                <video 
                    key={activeLesson.id} 
                    src={rawUrl} 
                    controls 
                    className="w-full h-full rounded-xl bg-black"
                    onEnded={() => markLessonComplete(lessonId)} 
                >
                    Your browser does not support the video tag.
                </video>
            );
        }
    };

    // Loading State
    if (!activeLesson) return <div className="p-20 text-center font-medium text-gray-500">Loading Lesson...</div>; 

    const isCompleted = completedLessons.includes(lessonId);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <PlayCircle className="text-purple-600" size={28} />
                    <h1 className="text-2xl font-bold text-gray-800">{activeLesson.title}</h1>
                </div>
                
                <button 
                    onClick={() => markLessonComplete(lessonId)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all
                    ${isCompleted 
                        ? "bg-green-100 text-green-700 cursor-default" 
                        : "bg-purple-600 text-white hover:bg-purple-700 shadow-md"}`}
                >
                    {isCompleted ? <><CheckCircle size={18}/> Watched</> : "Mark as Watched"}
                </button>
            </div>

            {/* PLAYER */}
            <div className="w-full aspect-video bg-black rounded-xl shadow-lg mb-8 overflow-hidden">
                {renderVideoPlayer()}
            </div>

            {/* NOTES */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
                    <FileText className="text-gray-500" size={20}/>
                    <h3 className="text-lg font-semibold text-gray-900">Transcript / Notes</h3>
                </div>
                <div className="prose text-gray-600 leading-relaxed max-w-none">
                    {activeLesson.transcripts?.en || 
                     activeLesson.transcripts || 
                     "No transcript available for this lesson."}
                </div>
            </div>

        </div>
    );
};

export default CoursePlayer;