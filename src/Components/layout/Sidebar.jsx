// src/components/layout/Sidebar.jsx
import { useState, useEffect } from "react";
import { PlayCircle, BookOpen, ClipboardList } from "lucide-react";

const Sidebar = ({ 
    data = [], // Receive real data here
    activeId = null, 
    completed = [], 
    onSelect = () => { } 
}) => {
    
    // Open the chapter that contains the active lesson
    const [openChapters, setOpenChapters] = useState([]);

    useEffect(() => {
        if(data.length > 0 && activeId) {
            const activeChapter = data.find(ch => ch.lessons.some(l => l.id === activeId));
            if(activeChapter && !openChapters.includes(activeChapter.chapterId)) {
                setOpenChapters(prev => [...prev, activeChapter.chapterId]);
            }
        } else if (data.length > 0 && openChapters.length === 0) {
             // Default open first chapter
             setOpenChapters([data[0].chapterId]);
        }
    }, [data, activeId]);

    const toggleChapter = (id) => {
        setOpenChapters(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
    };

    return (
        <aside className="w-full shrink-0 p-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Course Content</h3>
            <p className="text-sm text-gray-700 mb-4">Your learning journey</p>

            {data.map((chapter) => (
                <div key={chapter.chapterId} className="mb-6 pb-4 border-b border-gray-200">
                    <div onClick={() => toggleChapter(chapter.chapterId)} className="flex justify-between items-center text-lg font-semibold cursor-pointer hover:text-purple-600">
                        <span>{chapter.chapterTitle}</span>
                        <span>{openChapters.includes(chapter.chapterId) ? "−" : "+"}</span>
                    </div>

                    {openChapters.includes(chapter.chapterId) && (
                        <ul className="mt-3 space-y-1">
                            {chapter.lessons.map((lesson) => {
                                const isActive = activeId === lesson.id;
                                const isCompleted = completed.includes(lesson.id);
                                return (
                                    <li key={lesson.id} onClick={() => onSelect(lesson.id)} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${isActive ? "bg-purple-200 text-purple-700 font-medium" : "text-purple-600 hover:bg-purple-100"}`}>
                                        {lesson.contentType === "video" && <PlayCircle size={18} />}
                                        {lesson.contentType === "article" && <BookOpen size={18} />}
                                        {(lesson.contentType === "assignment" || lesson.contentType === "quiz") && <ClipboardList size={18} />}
                                        
                                        <span className="truncate flex-1">{lesson.title}</span>
                                        {isCompleted && <span className="text-green-600 text-xs">✓</span>}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            ))}
        </aside>
    );
};

export default Sidebar;