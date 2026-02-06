// src/pages/TextbookReading.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Sidebar from "../components/layout/Sidebar";
import { Download, BookOpen } from "lucide-react";
import { COURSE_OVERVIEW_PATH } from "../constants/routes";
import { fetchFullCourseStructure } from "../utils/courseHelpers"; // Import the helper

const TextbookReading = () => {
    const navigate = useNavigate();
    // Get courseId AND lessonId from URL
    const { courseId, lessonId } = useParams();

    const [sidebarData, setSidebarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    // 1. FETCH DATA
    useEffect(() => {
        if (!courseId) return;
        const loadData = async () => {
            setLoading(true);
            const data = await fetchFullCourseStructure(courseId);
            setSidebarData(data);
            setLoading(false);
        };
        loadData();
    }, [courseId]);

    // 2. FIND ACTIVE LESSON
    const activeLesson = sidebarData
        .flatMap(ch => ch.lessons)
        .find(l => l.id === lessonId);

    const chapter = sidebarData.find(ch =>
        ch.lessons.some(l => l.id === lessonId)
    );

    console.log(chapter)

    const chapterNumber = chapter?.chapterId?.replace("ch", "") || "1";

    // 3. NAVIGATION HANDLER
    const handleNavigation = (id) => {
        const lesson = sidebarData.flatMap(c => c.lessons).find(x => x.id === id);
        if (!lesson) return;

        const pathBase = `/course/${courseId}`;
        if (lesson.contentType === "video") navigate(`${pathBase}/player/${id}`);
        else if (lesson.contentType === "article") navigate(`${pathBase}/textbook/${id}`);
        else if (lesson.contentType === "assignment" || lesson.contentType === "quiz") navigate(`${pathBase}/assignment/${id}`);
        
        setShowSidebar(false);
    };

    if (loading) return <div className="p-10 text-center">Loading Content...</div>;

    // Guard: Check if content exists and is valid
    if (!activeLesson || activeLesson.contentType !== "article") {
        return (
            <div className="page-fade">
                <Navbar />
                <div className="course-page p-8 text-center text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300"/>
                    <p>Article content not found.</p>
                    <button onClick={() => navigate(`/view-course/${courseId}`)} className="text-purple-600 underline mt-4">Back to Course</button>
                </div>
                <Footer />
            </div>
        );
    }

    const textbook = activeLesson.textbook || {};

    return (
        <div className="page-fade">
            <Navbar />

            {/* MOBILE SIDEBAR */}
            <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${showSidebar ? "bg-black/40 opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setShowSidebar(false)}>
                <div className={`absolute left-0 top-0 h-full w-[85%] max-w-[320px] bg-white p-4 transition-transform duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full"}`} onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setShowSidebar(false)} className="mb-4 text-sm text-purple-600 font-medium">✕ Close</button>
                    <Sidebar data={sidebarData} activeId={lessonId} onSelect={handleNavigation} />
                </div>
            </div>

            <div className="course-page flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
                {/* DESKTOP SIDEBAR */}
                <div className="hidden lg:block w-[280px] h-full overflow-y-auto border-r border-gray-100">
                    <Sidebar data={sidebarData} activeId={lessonId} onSelect={handleNavigation} />
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto scroll-on-hover">
                    <div className="course-card px-4 sm:px-6 lg:px-12 py-6">
                        
                        {/* Header */}
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-6">
                            <span onClick={() => navigate(`/view-course/${courseId}`)} className="cursor-pointer text-gray-600 font-semibold hover:text-purple-600">
                                ← Back to course
                            </span>
                            <h2 className="text-lg font-semibold text-gray-900">
                              {chapter?.chapterTitle}
                            </h2>
                        </div>

                        <div className="lg:hidden mb-4">
                            <button onClick={() => setShowSidebar(true)} className="text-sm text-purple-600 font-medium">☰ Course content</button>
                        </div>

                        <h3 className="text-2xl sm:text-3xl text-purple-600 mb-6">
                            {activeLesson.title}
                        </h3>

                        {/* TEXTBOOK SECTIONS */}
                        <div className="max-w-prose">
                            {/* Fallback: If 'sections' array exists use it, 
                               otherwise if there is raw 'content', show that.
                            */}
                            {textbook.sections ? (
                                textbook.sections.slice(0, expanded ? textbook.sections.length : 1).map((section, idx) => (
                                    <div key={idx} className="mb-6">
                                        <h4 className="text-xl font-semibold mb-2">{section.heading}</h4>
                                        <div className="text-gray-700 leading-7 whitespace-pre-line">{section.content}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-700 leading-7 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: textbook.content || "No content available." }}></div>
                            )}
                        </div>

                        {/* EXPAND BUTTON (Only if sections array exists and > 1) */}
                        {textbook.sections?.length > 1 && (
                            <button onClick={() => setExpanded(!expanded)} className="text-purple-600 font-medium hover:underline mb-8">
                                {expanded ? "View less" : "View more"}
                            </button>
                        )}

                        {/* RESOURCES */}
                        {textbook.resources?.length > 0 && (
                            <div className="mt-8 border-t pt-6">
                                <h3 className="text-2xl text-purple-600 mb-4">Resources</h3>
                                <div className="space-y-3">
                                    {textbook.resources.map((res, idx) => (
                                        <a key={idx} href={res.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-purple-600 hover:underline">
                                            <Download size={16} />
                                            <span>{res.label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TextbookReading;