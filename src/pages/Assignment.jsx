// src/pages/Assignment.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Sidebar from "../components/layout/Sidebar";
import { fetchFullCourseStructure } from "../utils/courseHelpers"; 
import { AlertCircle, CheckCircle, Code, Upload, FileText } from "lucide-react";

const Assignment = () => {
    const navigate = useNavigate();
    const { courseId, lessonId } = useParams();

    const [sidebarData, setSidebarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);
    
    // State for inputs
    const [answers, setAnswers] = useState({}); 
    const [submitted, setSubmitted] = useState(false);

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

    // 3. NAVIGATION
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
    
    // Guard Clause
    if (!activeLesson || (activeLesson.contentType !== 'quiz' && activeLesson.contentType !== 'assignment')) {
        return (
             <div className="page-fade">
                <Navbar />
                <div className="p-10 text-center">Lesson not found or invalid type.</div>
                <Footer />
            </div>
        );
    }

    // --- DETERMINE MODE ---
    const isQuiz = activeLesson.contentType === 'quiz';
    const isAssignment = activeLesson.contentType === 'assignment';

    const data = activeLesson.quizData || {};
    
    // Normalize Questions: 
    // If it's an array, use it. If it's an object (instructions only), create a dummy question list or handle gracefully.
    const questions = Array.isArray(data) ? data : (data.questions || []); 
    
    // Fallback for Assignment if DB only has "instructions" string
    const assignmentInstructions = data.instructions || "Complete the following tasks.";

    const handleSubmit = () => {
        setSubmitted(true);
        // Add your API submission logic here
        alert("Submission Received!");
    };

    return (
        <div className="page-fade flex flex-col h-screen overflow-hidden">
            <Navbar />

            <div className="flex flex-1 overflow-hidden relative">
                
                {/* SIDEBAR */}
                <div className="hidden lg:block w-[280px] h-full overflow-y-auto border-r border-gray-100 bg-white z-10 shrink-0">
                    <Sidebar data={sidebarData} activeId={lessonId} onSelect={handleNavigation} />
                </div>

                {/* MOBILE OVERLAY */}
                {showSidebar && (
                    <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setShowSidebar(false)}>
                        <div className="bg-white w-[85%] max-w-sm h-full p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setShowSidebar(false)} className="mb-4 text-purple-600 font-bold">✕ Close</button>
                            <Sidebar data={sidebarData} activeId={lessonId} onSelect={handleNavigation} />
                        </div>
                    </div>
                )}

                {/* MAIN CONTENT */}
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 py-8">
                        
                        {/* Header Controls */}
                        <div className="lg:hidden mb-4">
                            <button onClick={() => setShowSidebar(true)} className="text-purple-600 font-semibold">☰ Show Course Menu</button>
                        </div>

                        {/* Lesson Header */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {activeLesson.title}
                            </h2>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span className="flex items-center gap-2">
                                    {isQuiz ? <CheckCircle size={16} className="text-blue-500"/> : <Code size={16} className="text-green-600"/>}
                                    {isQuiz ? "Quiz Mode" : "Assignment Mode"}
                                </span>
                                <span>Points: {data.points || 20}</span>
                            </div>
                             {isAssignment && !Array.isArray(data) && (
                                <p className="mt-4 text-gray-700">{assignmentInstructions}</p>
                            )}
                        </div>

                        {/* ==========================
                            CASE 1: QUIZ UI (Multiple Choice)
                           ========================== */}
                        {isQuiz && (
                            <div className="space-y-6">
                                {questions.map((q, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            <span className="text-purple-600 mr-2">Q{idx + 1}.</span> 
                                            {q.question}
                                        </h3>
                                        
                                        <div className="space-y-3">
                                            {q.options?.map((opt, optIdx) => (
                                                <label 
                                                    key={optIdx} 
                                                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                                                    ${answers[idx] === opt 
                                                        ? 'border-blue-500 bg-blue-50' 
                                                        : 'border-gray-100 hover:border-blue-200'}`}
                                                >
                                                    <input 
                                                        type="radio" 
                                                        name={`question-${idx}`} 
                                                        value={opt}
                                                        checked={answers[idx] === opt}
                                                        onChange={() => setAnswers({...answers, [idx]: opt})}
                                                        className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                                        disabled={submitted}
                                                    />
                                                    <span className="ml-3 text-gray-700 font-medium">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ==========================
                            CASE 2: ASSIGNMENT UI (Code/Text Inputs)
                           ========================== */}
                        {isAssignment && (
                            <div className="space-y-6">
                                {/* If questions exist (Q1, Q2...), render them. Else render generic input */}
                                {questions.length > 0 ? (
                                    questions.map((q, idx) => (
                                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Q{idx + 1}: {q.question}
                                            </h3>
                                            <textarea
                                                className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                                                placeholder="Paste your code snippet here..."
                                                value={answers[`q-${idx}`] || ''}
                                                onChange={(e) => setAnswers({...answers, [`q-${idx}`]: e.target.value})}
                                                disabled={submitted}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    // Fallback if DB data is just instructions
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Solution</h3>
                                        <textarea
                                            className="w-full h-48 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                                            placeholder="Write your answer or code here..."
                                            value={answers['main'] || ''}
                                            onChange={(e) => setAnswers({...answers, main: e.target.value})}
                                            disabled={submitted}
                                        />
                                    </div>
                                )}

                                {/* Google Colab / File Upload Section */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-md font-semibold text-gray-900 mb-3">Additional Submission</h3>
                                    
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Paste your Google Colab link</label>
                                        <input 
                                            type="text"
                                            placeholder="https://colab.research.google.com/..."
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                            value={answers['link'] || ''}
                                            onChange={(e) => setAnswers({...answers, link: e.target.value})}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Or upload a file</label>
                                        <label className="flex items-center gap-2 cursor-pointer w-fit px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                                            <Upload size={16} className="text-gray-500"/>
                                            <span className="text-sm text-gray-600">Upload .ipynb or .py file</span>
                                            <input type="file" className="hidden" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SUBMIT BUTTON */}
                        <div className="mt-8 flex justify-end gap-3 pb-10">
                            <button className="px-6 py-2 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 font-medium transition">
                                ReAttempt
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={submitted}
                                className={`px-8 py-2 rounded-md font-semibold text-white shadow-sm transition-all
                                ${submitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {submitted ? "Submitted" : "Submit"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assignment;