// // src/components/layout/Sidebar.jsx
// import { useState, useEffect } from "react";
// import { PlayCircle, BookOpen, ClipboardList } from "lucide-react";

// const Sidebar = ({ 
//     data = [], // Receive real data here
//     activeId = null, 
//     completed = [], 
//     onSelect = () => { } 
// }) => {
    
//     // Open the chapter that contains the active lesson
//     const [openChapters, setOpenChapters] = useState([]);

//     useEffect(() => {
//         if(data.length > 0 && activeId) {
//             const activeChapter = data.find(ch => ch.lessons.some(l => l.id === activeId));
//             if(activeChapter && !openChapters.includes(activeChapter.chapterId)) {
//                 setOpenChapters(prev => [...prev, activeChapter.chapterId]);
//             }
//         } else if (data.length > 0 && openChapters.length === 0) {
//              // Default open first chapter
//              setOpenChapters([data[0].chapterId]);
//         }
//     }, [data, activeId]);

//     const toggleChapter = (id) => {
//         setOpenChapters(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
//     };

//     return (
//         <aside className="w-full shrink-0 p-4">
//             <h3 className="text-xl font-semibold text-gray-900 mb-1">Course Content</h3>
//             <p className="text-sm text-gray-700 mb-4">Your learning journey</p>

//             {data.map((chapter) => (
//                 <div key={chapter.chapterId} className="mb-6 pb-4 border-b border-gray-200">
//                     <div onClick={() => toggleChapter(chapter.chapterId)} className="flex justify-between items-center text-lg font-semibold cursor-pointer hover:text-purple-600">
//                         <span>{chapter.chapterTitle}</span>
//                         <span>{openChapters.includes(chapter.chapterId) ? "−" : "+"}</span>
//                     </div>

//                     {openChapters.includes(chapter.chapterId) && (
//                         <ul className="mt-3 space-y-1">
//                             {chapter.lessons.map((lesson) => {
//                                 const isActive = activeId === lesson.id;
//                                 const isCompleted = completed.includes(lesson.id);
//                                 return (
//                                     <li key={lesson.id} onClick={() => onSelect(lesson.id)} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${isActive ? "bg-purple-200 text-purple-700 font-medium" : "text-purple-600 hover:bg-purple-100"}`}>
//                                         {lesson.contentType === "video" && <PlayCircle size={18} />}
//                                         {lesson.contentType === "article" && <BookOpen size={18} />}
//                                         {(lesson.contentType === "assignment" || lesson.contentType === "quiz") && <ClipboardList size={18} />}
                                        
//                                         <span className="truncate flex-1">{lesson.title}</span>
//                                         {isCompleted && <span className="text-green-600 text-xs">✓</span>}
//                                     </li>
//                                 );
//                             })}
//                         </ul>
//                     )}
//                 </div>
//             ))}
//         </aside>
//     );
// };

// export default Sidebar;


// // // src/components/layout/Sidebar.jsx
// // import React from "react";
// // import { PlayCircle, FileText, CheckCircle, Lock } from "lucide-react";

// // const Sidebar = ({ data, activeId, onSelect, completedIds = [] }) => {
  
// //   return (
// //     <div className="py-4">
// //       {data.map((section, idx) => (
// //         <div key={idx} className="mb-6">
// //           <h3 className="px-6 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
// //             {section.title}
// //           </h3>
// //           <ul>
// //             {section.lessons.map((lesson) => {
// //               const isActive = lesson.id === activeId;
// //               const isCompleted = completedIds.includes(lesson.id);

// //               return (
// //                 <li key={lesson.id}>
// //                   <button
// //                     onClick={() => onSelect(lesson.id)}
// //                     className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors border-l-4 
// //                       ${isActive 
// //                         ? "border-purple-600 bg-purple-50 text-purple-700" 
// //                         : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
// //                       }`}
// //                   >
// //                     {/* Icon Logic */}
// //                     <div className="mr-3">
// //                       {isCompleted ? (
// //                         <CheckCircle size={18} className="text-green-500 fill-green-100" />
// //                       ) : (
// //                         lesson.contentType === 'video' ? <PlayCircle size={18} /> : <FileText size={18} />
// //                       )}
// //                     </div>
                    
// //                     <span className="truncate">{lesson.title}</span>
// //                   </button>
// //                 </li>
// //               );
// //             })}
// //           </ul>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Sidebar;

import React, { useState, useEffect } from "react";
import { PlayCircle, BookOpen, ClipboardList, CheckCircle, Lock } from "lucide-react";

const Sidebar = ({ 
    data = [], 
    activeId = null, 
    completedIds = [], // Renamed to match your Layout prop
    onSelect = () => { } 
}) => {
    
    // State to track which chapters are open
    const [openChapters, setOpenChapters] = useState([]);

    // Effect: Automatically open the chapter that contains the active lesson
    useEffect(() => {
        if(data.length > 0 && activeId) {
            // Find the chapter containing the active lesson
            // Note: Adjust 'ch.lessons' if your data structure is different
            const activeChapter = data.find(ch => ch.lessons?.some(l => l.id === activeId));
            
            if(activeChapter) {
                // If found, add it to openChapters if not already there
                // We use 'id' or 'chapterId' depending on your DB structure. 
                // Using a fallback here to be safe:
                const chId = activeChapter.chapterId || activeChapter.id;
                
                setOpenChapters(prev => {
                    if (!prev.includes(chId)) return [...prev, chId];
                    return prev;
                });
            }
        } else if (data.length > 0 && openChapters.length === 0) {
            // Default: Open the first chapter on load if nothing active
            const firstChId = data[0].chapterId || data[0].id;
            setOpenChapters([firstChId]);
        }
    }, [data, activeId]);

    const toggleChapter = (id) => {
        setOpenChapters(prev => 
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    return (
        <aside className="w-full shrink-0 p-4 pb-20"> {/* pb-20 gives space for scrolling */}
            <h3 className="text-xl font-bold text-gray-900 mb-1">Course Content</h3>
            <p className="text-sm text-gray-500 mb-6">Your learning journey</p>

            {data.map((chapter, idx) => {
                // Handle data inconsistencies (id vs chapterId)
                const chapterId = chapter.chapterId || chapter.id;
                const chapterTitle = chapter.chapterTitle || chapter.title;
                const isOpen = openChapters.includes(chapterId);

                return (
                    <div key={chapterId || idx} className="mb-4 border-b border-gray-100 last:border-0 pb-2">
                        
                        {/* ACCORDION HEADER */}
                        <button 
                            onClick={() => toggleChapter(chapterId)} 
                            className="w-full flex justify-between items-center py-2 text-left group focus:outline-none"
                        >
                            <span className={`font-semibold text-base transition-colors ${isOpen ? 'text-purple-700' : 'text-gray-800 group-hover:text-purple-600'}`}>
                                {chapterTitle}
                            </span>
                            <span className="text-gray-400 font-mono text-lg ml-2">
                                {isOpen ? "−" : "+"}
                            </span>
                        </button>

                        {/* LESSON LIST */}
                        {isOpen && (
                            <ul className="mt-1 space-y-1 mb-3 animate-fade-in-down">
                                {chapter.lessons?.map((lesson) => {
                                    const isActive = activeId === lesson.id;
                                    const isCompleted = completedIds.includes(lesson.id);

                                    // Icon Selection
                                    let Icon = PlayCircle;
                                    if (lesson.contentType === "article") Icon = BookOpen;
                                    if (lesson.contentType === "assignment" || lesson.contentType === "quiz") Icon = ClipboardList;

                                    return (
                                        <li key={lesson.id}>
                                            <button 
                                                onClick={() => onSelect(lesson.id)} 
                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                                    ${isActive 
                                                        ? "bg-purple-100 text-purple-800 shadow-sm" 
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    }`}
                                            >
                                                {/* Left Side: Icon + Title */}
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <Icon size={18} className={isActive ? "text-purple-600" : "text-gray-400"} />
                                                    <span className="truncate">{lesson.title}</span>
                                                </div>

                                                {/* Right Side: Checkmark */}
                                                {isCompleted && (
                                                    <CheckCircle size={16} className="text-green-500 shrink-0 ml-2 fill-green-50" />
                                                )}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                );
            })}
        </aside>
    );
};

export default Sidebar;