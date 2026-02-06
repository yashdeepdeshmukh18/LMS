// // src/pages/Assignment.jsx
// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// import Sidebar from "../components/layout/Sidebar";
// import { fetchFullCourseStructure } from "../utils/courseHelpers"; 
// import { AlertCircle, CheckCircle, Code, Upload, FileText } from "lucide-react";

// const Assignment = () => {
//     const navigate = useNavigate();
//     const { courseId, lessonId } = useParams();

//     const [sidebarData, setSidebarData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showSidebar, setShowSidebar] = useState(false);
    
//     // State for inputs
//     const [answers, setAnswers] = useState({}); 
//     const [submitted, setSubmitted] = useState(false);


//     // --- ADD THESE STATES AT THE TOP OF YOUR COMPONENT ---
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [quizFinished, setQuizFinished] = useState(false);
//     const [score, setScore] = useState(0);
//     const [wrongAnswers, setWrongAnswers] = useState(0);
//     const [selectedOption, setSelectedOption] = useState(null); // Current selection
//     const [isAnswerChecked, setIsAnswerChecked] = useState(false); // Has user submitted?
//     const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question

   

//     // --- HANDLERS ---
//     const handleOptionClick = (option) => {
//         if (isAnswerChecked) return; // Prevent changing answer
        
//         setSelectedOption(option);
//         setIsAnswerChecked(true);

//         const currentQuestion = questions[currentQuestionIndex];
//         if (option === currentQuestion.answer) {
//             setScore(prev => prev + 1);
//         } else {
//             setWrongAnswers(prev => prev + 1);
//         }
//     };

//     const handleNextQuestion = () => {
//         if (currentQuestionIndex + 1 < questions.length) {
//             setCurrentQuestionIndex(prev => prev + 1);
//             setSelectedOption(null);
//             setIsAnswerChecked(false);
//             setTimeLeft(60); // Reset timer
//         } else {
//             setQuizFinished(true);
//         }
//     };

    

//     // 1. FETCH DATA
//     useEffect(() => {
//         if (!courseId) return;
//         const loadData = async () => {
//             setLoading(true);
//             const data = await fetchFullCourseStructure(courseId);
//             setSidebarData(data);
//             setLoading(false);
//         };
//         loadData();
//     }, [courseId]);

//     // 2. FIND ACTIVE LESSON
//     const activeLesson = sidebarData
//         .flatMap(ch => ch.lessons)
//         .find(l => l.id === lessonId);


//      const isQuiz = activeLesson?.contentType === 'quiz';

//       // --- TIMER LOGIC ---
//     useEffect(() => {
//         if (!isQuiz || quizFinished || isAnswerChecked) return;

//         const timer = setInterval(() => {
//             setTimeLeft((prev) => {
//                 if (prev <= 1) {
//                     handleNextQuestion(); // Auto-skip if time runs out
//                     return 60;
//                 }
//                 return prev - 1;
//             });
//         }, 1000);

//         return () => clearInterval(timer);
//     }, [isQuiz, quizFinished, isAnswerChecked, currentQuestionIndex]);

//     // 3. NAVIGATION
//     const handleNavigation = (id) => {
//         const lesson = sidebarData.flatMap(c => c.lessons).find(x => x.id === id);
//         if (!lesson) return;
//         const pathBase = `/course/${courseId}`;
        
//         if (lesson.contentType === "video") navigate(`${pathBase}/player/${id}`);
//         else if (lesson.contentType === "article") navigate(`${pathBase}/textbook/${id}`);
//         else if (lesson.contentType === "assignment" || lesson.contentType === "quiz") navigate(`${pathBase}/assignment/${id}`);
        
//         setShowSidebar(false);
//     };

    

//     if (loading) return <div className="p-10 text-center">Loading Content...</div>;
    
//     // Guard Clause
//     if (!activeLesson || (activeLesson.contentType !== 'quiz' && activeLesson.contentType !== 'assignment')) {
//         return (
//              <div className="page-fade">
//                 <Navbar />
//                 <div className="p-10 text-center">Lesson not found or invalid type.</div>
//                 <Footer />
//             </div>
//         );
//     }

//     // --- DETERMINE MODE ---
   
//     const isAssignment = activeLesson.contentType === 'assignment';

//     const data = activeLesson.quizData || {};
    
//     // Normalize Questions: 
//     // If it's an array, use it. If it's an object (instructions only), create a dummy question list or handle gracefully.
//     const questions = Array.isArray(data) ? data : (data.questions || []); 
    
//     // Fallback for Assignment if DB only has "instructions" string
//     const assignmentInstructions = data.instructions || "Complete the following tasks.";

//     const handleSubmit = () => {
//         setSubmitted(true);
//         // Add your API submission logic here
//         alert("Submission Received!");
//     };


    

//     return (
//         <div className="page-fade flex flex-col h-screen overflow-hidden">
//             <Navbar />

//             <div className="flex flex-1 overflow-hidden relative">
                
//                 {/* SIDEBAR */}
//                 <div className="hidden lg:block w-[280px] h-full overflow-y-auto border-r border-gray-100 bg-white z-10 shrink-0">
//                     <Sidebar data={sidebarData} activeId={lessonId} onSelect={handleNavigation} />
//                 </div>

//                 {/* MOBILE OVERLAY */}
//                 {showSidebar && (
//                     <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setShowSidebar(false)}>
//                         <div className="bg-white w-[85%] max-w-sm h-full p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
//                             <button onClick={() => setShowSidebar(false)} className="mb-4 text-purple-600 font-bold">✕ Close</button>
//                             <Sidebar data={sidebarData} activeId={lessonId} onSelect={handleNavigation} />
//                         </div>
//                     </div>
//                 )}

//                 {/* MAIN CONTENT */}
//                 <div className="flex-1 overflow-y-auto bg-gray-50">
//                     <div className="max-w-4xl mx-auto px-4 py-8">
                        
//                         {/* Header Controls */}
//                         <div className="lg:hidden mb-4">
//                             <button onClick={() => setShowSidebar(true)} className="text-purple-600 font-semibold">☰ Show Course Menu</button>
//                         </div>

//                         {/* Lesson Header */}
//                         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                                 {activeLesson.title}
//                             </h2>
//                             <div className="flex justify-between items-center text-sm text-gray-500">
//                                 <span className="flex items-center gap-2">
//                                     {isQuiz ? <CheckCircle size={16} className="text-blue-500"/> : <Code size={16} className="text-green-600"/>}
//                                     {isQuiz ? "Quiz Mode" : "Assignment Mode"}
//                                 </span>
//                                 <span>Points: {data.points || 20}</span>
//                             </div>
//                              {isAssignment && !Array.isArray(data) && (
//                                 <p className="mt-4 text-gray-700">{assignmentInstructions}</p>
//                             )}
//                         </div>

//                         {/* ==========================
//                             CASE 1: QUIZ UI (Multiple Choice)
//                            ========================== */}
//                         {isQuiz && (
//                             <div >
                                
//                                 {/* QUIZ ACTIVE STATE */}
//                                 {!quizFinished ? (
//                                     <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100">
                                        
//                                         {/* Header: Progress & Timer */}
//                                         <div className="bg-purple-50 p-4 flex justify-between items-center border-b border-purple-100">
//                                             <span className="font-semibold text-purple-700">
//                                                 Question {currentQuestionIndex + 1} of {questions.length}
//                                             </span>
//                                             <div className={`flex items-center gap-2 px-3 py-1 rounded-full font-bold text-sm ${timeLeft < 10 ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>
//                                                 <span>⏱ {timeLeft}s</span>
//                                             </div>
//                                         </div>

//                                         {/* Question Area */}
//                                         <div className="p-6 sm:p-8">
//                                             <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8">
//                                                 {questions[currentQuestionIndex]?.question}
//                                             </h3>

//                                             <div className="space-y-3">
//                                                 {questions[currentQuestionIndex]?.options?.map((opt, idx) => {
//                                                     // Logic to determine color
//                                                     const isSelected = selectedOption === opt;
//                                                     const isCorrect = opt === questions[currentQuestionIndex].answer;
                                                    
//                                                     let borderClass = "border-gray-200 hover:border-purple-300";
//                                                     let bgClass = "bg-white hover:bg-gray-50";
//                                                     let icon = <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>;

//                                                     if (isAnswerChecked) {
//                                                         if (isCorrect) {
//                                                             // Always highlight the correct answer in green
//                                                             borderClass = "border-green-500";
//                                                             bgClass = "bg-green-50";
//                                                             icon = <span className="text-green-600 font-bold">✓</span>;
//                                                         } else if (isSelected && !isCorrect) {
//                                                             // Highlight wrong selection in red
//                                                             borderClass = "border-red-500";
//                                                             bgClass = "bg-red-50";
//                                                             icon = <span className="text-red-600 font-bold">✕</span>;
//                                                         } else {
//                                                             // Dim other options
//                                                             bgClass = "opacity-50";
//                                                         }
//                                                     } else if (isSelected) {
//                                                         borderClass = "border-purple-500";
//                                                         bgClass = "bg-purple-50";
//                                                     }

//                                                     return (
//                                                         <button
//                                                             key={idx}
//                                                             onClick={() => handleOptionClick(opt)}
//                                                             disabled={isAnswerChecked}
//                                                             className={`w-full text-left flex items-center p-4 rounded-xl border-2 transition-all duration-200 ${borderClass} ${bgClass}`}
//                                                         >
//                                                             <div className="mr-4 flex-shrink-0 flex items-center justify-center">
//                                                                 {icon}
//                                                             </div>
//                                                             <span className={`font-medium text-lg ${isAnswerChecked && isCorrect ? 'text-green-800' : 'text-gray-700'}`}>
//                                                                 {opt}
//                                                             </span>
//                                                         </button>
//                                                     );
//                                                 })}
//                                             </div>
//                                         </div>

//                                         {/* Footer: Feedback & Next Button */}
//                                         {isAnswerChecked && (
//                                             <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end items-center animate-fade-in">
//                                                 <div className="mr-auto">
//                                                     {selectedOption === questions[currentQuestionIndex].answer ? (
//                                                         <span className="text-green-600 font-bold flex items-center gap-2">
//                                                             Correct Answer! 🎉
//                                                         </span>
//                                                     ) : (
//                                                         <span className="text-red-500 font-bold flex items-center gap-2">
//                                                             Wrong Answer 😢
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                                 <button
//                                                     onClick={handleNextQuestion}
//                                                     className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all transform active:scale-95"
//                                                 >
//                                                     {currentQuestionIndex + 1 === questions.length ? "Finish Quiz" : "Next Question →"}
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 ) : (
                                    
//                                     /* QUIZ FINISHED STATE (Summary) */
//                                     <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-8 border-purple-500">
//                                         <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                                             <span className="text-4xl">🏆</span>
//                                         </div>
                                        
//                                         <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
//                                         <p className="text-gray-500 mb-8">Here is how you performed</p>

//                                         <div className="grid grid-cols-3 gap-4 mb-8">
//                                             <div className="p-4 bg-green-50 rounded-xl border border-green-100">
//                                                 <div className="text-3xl font-bold text-green-600">{score}</div>
//                                                 <div className="text-sm text-green-800 font-medium">Correct</div>
//                                             </div>
//                                             <div className="p-4 bg-red-50 rounded-xl border border-red-100">
//                                                 <div className="text-3xl font-bold text-red-600">{wrongAnswers}</div>
//                                                 <div className="text-sm text-red-800 font-medium">Wrong</div>
//                                             </div>
//                                             <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
//                                                 <div className="text-3xl font-bold text-blue-600">
//                                                     {Math.round((score / questions.length) * 100)}%
//                                                 </div>
//                                                 <div className="text-sm text-blue-800 font-medium">Score</div>
//                                             </div>
//                                         </div>

//                                         <div className="flex justify-center gap-4">
//                                             <button 
//                                                 onClick={() => window.location.reload()} 
//                                                 className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
//                                             >
//                                                 Retake Quiz
//                                             </button>
//                                             <button 
//                                                 onClick={() => navigate('/dashboard')}
//                                                 className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium shadow-md"
//                                             >
//                                                 Back to Dashboard
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         )}

//                         {/* ==========================
//                             CASE 2: ASSIGNMENT UI (Code/Text Inputs)
//                            ========================== */}
//                         {isAssignment && (
//                             <div className="space-y-6">
//                                 {/* If questions exist (Q1, Q2...), render them. Else render generic input */}
//                                 {questions.length > 0 ? (
//                                     questions.map((q, idx) => (
//                                         <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//                                             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                                                 Q{idx + 1}: {q.question}
//                                             </h3>
//                                             <textarea
//                                                 className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
//                                                 placeholder="Paste your code snippet here..."
//                                                 value={answers[`q-${idx}`] || ''}
//                                                 onChange={(e) => setAnswers({...answers, [`q-${idx}`]: e.target.value})}
//                                                 disabled={submitted}
//                                             />
//                                         </div>
//                                     ))
//                                 ) : (
//                                     // Fallback if DB data is just instructions
//                                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//                                         <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Solution</h3>
//                                         <textarea
//                                             className="w-full h-48 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
//                                             placeholder="Write your answer or code here..."
//                                             value={answers['main'] || ''}
//                                             onChange={(e) => setAnswers({...answers, main: e.target.value})}
//                                             disabled={submitted}
//                                         />
//                                     </div>
//                                 )}

//                                 {/* Drive Link Submission Section */}
//                                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
//                                     <h3 className="text-md font-semibold text-gray-900 mb-3">Submit Work</h3>
                                    
//                                     <div className="mb-1">
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Provide Google Drive Link (containing all answers)
//                                         </label>
//                                         <input 
//                                             type="text"
//                                             placeholder="https://drive.google.com/drive/folders/..."
//                                             className="w-full p-3 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
//                                             value={answers['drive_link'] || ''}
//                                             onChange={(e) => setAnswers({...answers, drive_link: e.target.value})}
//                                             disabled={submitted}
//                                         />
//                                         <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
//                                             ℹ️ Ensure the link permission is set to <b>"Anyone with the link"</b>.
//                                         </p>
//                                     </div>
//                                 </div>

//                             </div>
//                         )}

//                         {!isQuiz && 

                           
//                             (<div className="mt-8 flex justify-end gap-3 pb-10">
//                                 {/* <button className="px-6 py-2 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 font-medium transition">
//                                     ReAttempt
//                                 </button> */}
//                                 <button
//                                     onClick={handleSubmit}
//                                     disabled={submitted}
//                                     className={`px-8 py-2 rounded-md font-semibold text-white shadow-sm transition-all
//                                     ${submitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
//                                 >
//                                     {submitted ? "Submitted" : "Submit"}
//                                 </button>
//                             </div>)
//                         }

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Assignment;


import { useState, useEffect, useContext } from "react"; // 1. Added useContext
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Sidebar from "../components/layout/Sidebar";
import { fetchFullCourseStructure } from "../utils/courseHelpers"; 
import { AuthContext } from "../context/AuthContext"; // 2. Import Auth Context
import { getUserProgress, toggleLessonCompletion } from "../api/progress"; // 3. Import Progress APIs
import { AlertCircle, CheckCircle, Code, Upload, FileText } from "lucide-react";

const Assignment = () => {
    const navigate = useNavigate();
    const { courseId, lessonId } = useParams();
    const { profile } = useContext(AuthContext); // 4. Get User Profile

    const [sidebarData, setSidebarData] = useState([]);
    const [completedLessons, setCompletedLessons] = useState([]); // 5. State for Progress
    const [loading, setLoading] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);
    
    // State for inputs
    const [answers, setAnswers] = useState({}); 
    const [submitted, setSubmitted] = useState(false);

    // --- QUIZ STATES ---
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null); 
    const [isAnswerChecked, setIsAnswerChecked] = useState(false); 
    const [timeLeft, setTimeLeft] = useState(60); 

    // --- 6. NEW FUNCTION: MARK COMPLETE ---
    const handleMarkComplete = async () => {
        if (!profile) return;
        
        // 1. Optimistic UI Update (Show checkmark immediately)
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons(prev => [...prev, lessonId]);
            
            // 2. Database Update
            await toggleLessonCompletion(profile.id, lessonId, true);
        }
    };

    // --- HANDLERS ---
    const handleOptionClick = (option) => {
        if (isAnswerChecked) return; 
        
        setSelectedOption(option);
        setIsAnswerChecked(true);

        const currentQuestion = questions[currentQuestionIndex];
        if (option === currentQuestion.answer) {
            setScore(prev => prev + 1);
        } else {
            setWrongAnswers(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswerChecked(false);
            setTimeLeft(60); 
        } else {
            setQuizFinished(true);
            handleMarkComplete(); // <--- 7. TRIGGER COMPLETE ON QUIZ FINISH
        }
    };

    // --- 1. FETCH DATA (UPDATED) ---
    useEffect(() => {
        if (!courseId || !profile) return; // Wait for profile

        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch Course Structure AND User Progress in parallel
                const [courseData, progressData] = await Promise.all([
                    fetchFullCourseStructure(courseId),
                    getUserProgress(profile.id)
                ]);

                setSidebarData(courseData);
                setCompletedLessons(progressData); // Store progress
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [courseId, profile]);

    // 2. FIND ACTIVE LESSON
    const activeLesson = sidebarData
        .flatMap(ch => ch.lessons)
        .find(l => l.id === lessonId);

    const isQuiz = activeLesson?.contentType === 'quiz';

    // --- TIMER LOGIC ---
    useEffect(() => {
        if (!isQuiz || quizFinished || isAnswerChecked) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleNextQuestion(); 
                    return 60;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isQuiz, quizFinished, isAnswerChecked, currentQuestionIndex]);

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
    const isAssignment = activeLesson.contentType === 'assignment';
    
    // Handle both camelCase and snake_case data from DB
    const rawData = activeLesson.contentData || activeLesson.quizData || activeLesson.content_data || {};
    const data = rawData; 
    
    // Normalize Questions
    const questions = Array.isArray(data) ? data : (data.questions || []); 
    const assignmentInstructions = data.instructions || "Complete the following tasks.";

    const handleSubmit = () => {
        setSubmitted(true);
        // Add your API submission logic here
        // alert("Submission Received!");
        handleMarkComplete(); // <--- 8. TRIGGER COMPLETE ON ASSIGNMENT SUBMIT
    };

    return (
        <div className="page-fade flex flex-col h-screen overflow-hidden">
            {/* <Navbar /> */}

            <div className="flex flex-1 overflow-hidden relative">
                
                

                {/* MAIN CONTENT */}
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 py-8">
                        
                        {/* Header Controls */}
                        <div className="lg:hidden mb-4">
                            <button onClick={() => setShowSidebar(true)} className="text-purple-600 font-semibold">☰ Show Course Menu</button>
                        </div>

                        {/* Lesson Header */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        {activeLesson.title}
                                    </h2>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span className="flex items-center gap-2">
                                            {isQuiz ? <CheckCircle size={16} className="text-blue-500"/> : <Code size={16} className="text-green-600"/>}
                                            {isQuiz ? "Quiz Mode" : "Assignment Mode"}
                                        </span>
                                        <span className="ml-4">Points: {data.points || 20}</span>
                                    </div>
                                </div>
                                {/* Visual Indicator if Complete */}
                                {completedLessons.includes(lessonId) && (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                        <CheckCircle size={14}/> Completed
                                    </span>
                                )}
                            </div>
                            
                             {isAssignment && !Array.isArray(data) && (
                                <p className="mt-4 text-gray-700">{assignmentInstructions}</p>
                            )}
                        </div>

                        {/* ==========================
                            CASE 1: QUIZ UI (Multiple Choice)
                           ========================== */}
                        {isQuiz && (
                            <div >
                                {!quizFinished ? (
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100">
                                        {/* Header: Progress & Timer */}
                                        <div className="bg-purple-50 p-4 flex justify-between items-center border-b border-purple-100">
                                            <span className="font-semibold text-purple-700">
                                                Question {currentQuestionIndex + 1} of {questions.length}
                                            </span>
                                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full font-bold text-sm ${timeLeft < 10 ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>
                                                <span>⏱ {timeLeft}s</span>
                                            </div>
                                        </div>

                                        {/* Question Area */}
                                        <div className="p-6 sm:p-8">
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8">
                                                {questions[currentQuestionIndex]?.question}
                                            </h3>

                                            <div className="space-y-3">
                                                {questions[currentQuestionIndex]?.options?.map((opt, idx) => {
                                                    const isSelected = selectedOption === opt;
                                                    const isCorrect = opt === questions[currentQuestionIndex].answer;
                                                    
                                                    let borderClass = "border-gray-200 hover:border-purple-300";
                                                    let bgClass = "bg-white hover:bg-gray-50";
                                                    let icon = <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>;

                                                    if (isAnswerChecked) {
                                                        if (isCorrect) {
                                                            borderClass = "border-green-500";
                                                            bgClass = "bg-green-50";
                                                            icon = <span className="text-green-600 font-bold">✓</span>;
                                                        } else if (isSelected && !isCorrect) {
                                                            borderClass = "border-red-500";
                                                            bgClass = "bg-red-50";
                                                            icon = <span className="text-red-600 font-bold">✕</span>;
                                                        } else {
                                                            bgClass = "opacity-50";
                                                        }
                                                    } else if (isSelected) {
                                                        borderClass = "border-purple-500";
                                                        bgClass = "bg-purple-50";
                                                    }

                                                    return (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleOptionClick(opt)}
                                                            disabled={isAnswerChecked}
                                                            className={`w-full text-left flex items-center p-4 rounded-xl border-2 transition-all duration-200 ${borderClass} ${bgClass}`}
                                                        >
                                                            <div className="mr-4 flex-shrink-0 flex items-center justify-center">
                                                                {icon}
                                                            </div>
                                                            <span className={`font-medium text-lg ${isAnswerChecked && isCorrect ? 'text-green-800' : 'text-gray-700'}`}>
                                                                {opt}
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Footer: Feedback & Next Button */}
                                        {isAnswerChecked && (
                                            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end items-center animate-fade-in">
                                                <div className="mr-auto">
                                                    {selectedOption === questions[currentQuestionIndex].answer ? (
                                                        <span className="text-green-600 font-bold flex items-center gap-2">
                                                            Correct Answer! 🎉
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-500 font-bold flex items-center gap-2">
                                                            Wrong Answer 😢
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={handleNextQuestion}
                                                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all transform active:scale-95"
                                                >
                                                    {currentQuestionIndex + 1 === questions.length ? "Finish Quiz" : "Next Question →"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* QUIZ FINISHED STATE (Summary) */
                                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-8 border-purple-500">
                                        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <span className="text-4xl">🏆</span>
                                        </div>
                                        
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
                                        <p className="text-gray-500 mb-8">Here is how you performed</p>

                                        <div className="grid grid-cols-3 gap-4 mb-8">
                                            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                                <div className="text-3xl font-bold text-green-600">{score}</div>
                                                <div className="text-sm text-green-800 font-medium">Correct</div>
                                            </div>
                                            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                                <div className="text-3xl font-bold text-red-600">{wrongAnswers}</div>
                                                <div className="text-sm text-red-800 font-medium">Wrong</div>
                                            </div>
                                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                                <div className="text-3xl font-bold text-blue-600">
                                                    {Math.round((score / questions.length) * 100)}%
                                                </div>
                                                <div className="text-sm text-blue-800 font-medium">Score</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center gap-4">
                                            <button 
                                                onClick={() => window.location.reload()} 
                                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
                                            >
                                                Retake Quiz
                                            </button>
                                            <button 
                                                onClick={() => navigate('/dashboard')}
                                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium shadow-md"
                                            >
                                                Back to Dashboard
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ==========================
                            CASE 2: ASSIGNMENT UI
                           ========================== */}
                        {isAssignment && (
                            <div className="space-y-6">
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

                                {/* Drive Link Submission Section */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
                                    <h3 className="text-md font-semibold text-gray-900 mb-3">Submit Work</h3>
                                    
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Provide Google Drive Link (containing all answers)
                                        </label>
                                        <input 
                                            type="text"
                                            placeholder="https://drive.google.com/drive/folders/..."
                                            className="w-full p-3 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                                            value={answers['drive_link'] || ''}
                                            onChange={(e) => setAnswers({...answers, drive_link: e.target.value})}
                                            disabled={submitted}
                                        />
                                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                            ℹ️ Ensure the link permission is set to <b>"Anyone with the link"</b>.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        )}

                        {!isQuiz && (
                            <div className="mt-8 flex justify-end gap-3 pb-10">
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitted}
                                    className={`px-8 py-2 rounded-md font-semibold text-white shadow-sm transition-all
                                    ${submitted ? 'bg-green-600 cursor-default' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {submitted ? "Submitted Successfully" : "Submit"}
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assignment;

