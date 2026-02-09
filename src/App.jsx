// // src/App.js
// import './App.css';
// import { Routes, Route } from 'react-router-dom';
// import Homepage from './pages/Homepage';
// import Courses from './pages/Courses';
// import Dashboard from './pages/Dashboard';
// import CourseDetail from "./pages/CourseDetails";
// import ProfilePage from './pages/Profile';
// import QuizPage from './pages/Quiz';
// import CoursePlayer from './pages/CoursePlayer';
// import TextbookReading from './pages/TextbookReading';
// import Assignment from './pages/Assignment';
// import PaymentPage from './pages/Payment';
// import CertificatePage from './pages/CertificatePage';
// import SettingsPage from './pages/SettingsPage';
// import HelpCenter from './pages/HelpCenter';

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Homepage />}/>
//         <Route path="/courses" element={<Courses />}/>
//         <Route path="/dashboard" element={<Dashboard />}/>
        
//         {/* Course Details (Entry Point) */}
//         <Route path="/view-course/:courseId" element={<CourseDetail />} />

//         {/* UPDATED PLAYER ROUTES 
//            We include :courseId so we can fetch the sidebar data on these pages 
//         */}
//         <Route path="/course/:courseId/learn" element={<CoursePlayer />} />
//         <Route path="/course/:courseId/player/:lessonId" element={<CoursePlayer />} />
//         <Route path="/course/:courseId/textbook/:lessonId" element={<TextbookReading />} />
//         <Route path="/course/:courseId/assignment/:lessonId" element={<Assignment />} />

//         <Route path="/payment/:courseId" element={<PaymentPage />} />

//         <Route path="/certificate/:userId/:courseId" element={<CertificatePage />} />

//         <Route path="/profile" element={<ProfilePage /> } />
//         <Route path="/quiz" element={<QuizPage/>}/> 


//         <Route path="/settings" element={<SettingsPage />} />
//         <Route path="/help" element={<HelpCenter />} />

//       </Routes>
//     </div>
//   );
// }

// export default App;




// // src/App.js
// import './App.css';
// import { Routes, Route } from 'react-router-dom';
// import Homepage from './pages/Homepage';
// import Courses from './pages/Courses';
// import Dashboard from './pages/Dashboard';
// import CourseDetail from "./pages/CourseDetails";
// import ProfilePage from './pages/Profile';
// import QuizPage from './pages/Quiz';
// import PaymentPage from './pages/Payment'; // Ensure filename matches (Payment.jsx or PaymentPage.jsx)
// import CertificatePage from './pages/CertificatePage';
// import SettingsPage from './pages/SettingsPage';
// import HelpCenter from './pages/HelpCenter';

// // 1. IMPORT THE NEW LAYOUT
// import CourseLayout from './Components/layout/CourseLayout';

// // Child Pages
// import CoursePlayer from './pages/CoursePlayer';
// import TextbookReading from './pages/TextbookReading';
// import Assignment from './pages/Assignment';

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Homepage />}/>
//         <Route path="/courses" element={<Courses />}/>
//         <Route path="/dashboard" element={<Dashboard />}/>
        
//         {/* Course Details (Public View) */}
//         <Route path="/view-course/:courseId" element={<CourseDetail />} />

//         {/* 2. THE FIX: NESTED ROUTES
//             The CourseLayout wraps these pages. 
//             It provides the 'context' so useOutletContext() works. 
//         */}
//         <Route path="/course/:courseId" element={<CourseLayout />}>
//             {/* These routes render INSIDE the layout */}
//             <Route path="learn" element={<CoursePlayer />} />
//             <Route path="player/:lessonId" element={<CoursePlayer />} />
//             <Route path="textbook/:lessonId" element={<TextbookReading />} />
//             <Route path="assignment/:lessonId" element={<Assignment />} />
//         </Route>

//         <Route path="/payment/:courseId" element={<PaymentPage />} />
//         <Route path="/certificate/:userId/:courseId" element={<CertificatePage />} />
//         <Route path="/profile" element={<ProfilePage /> } />
//         <Route path="/quiz" element={<QuizPage/>}/> 
//         <Route path="/settings" element={<SettingsPage />} />
//         <Route path="/help" element={<HelpCenter />} />

//       </Routes>
//     </div>
//   );
// }

// export default App;




import './App.css';
import { Routes, Route } from 'react-router-dom';

// Pages
import Homepage from './pages/Homepage';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import CourseDetail from "./pages/CourseDetails";
import ProfilePage from './pages/Profile';
import QuizPage from './pages/Quiz';
import PaymentPage from './pages/Payment';
import CertificatePage from './pages/CertificatePage';
import SettingsPage from './pages/SettingsPage';
import HelpCenter from './pages/HelpCenter';

// Layouts
import MainLayout from './Components/layout/MainLayout';     // <--- New Wrapper
import CourseLayout from './Components/layout/CourseLayout'; // <--- Learning Wrapper

// Learning Child Pages
import CoursePlayer from './pages/CoursePlayer';
import TextbookReading from './pages/TextbookReading';
import Assignment from './pages/Assignment';

// themes
import {CoursesThemeProvider} from "./context/themes/coursesThemes"

function App() {
  return (
    <div className="App">
      <Routes>
        
        {/* =========================================
            GROUP 1: STANDARD PAGES
            (Have Navbar + Scrolling Content + Footer)
           ========================================= */}
        <Route element={<MainLayout />}>
            <Route path="/" element={<Homepage />}/>
            <Route path="/courses" element={
                                    <CoursesThemeProvider>

                                      <Courses />
                                    </CoursesThemeProvider>
                                     }/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/view-course/:courseId" element={<CourseDetail />} />
            <Route path="/payment/:courseId" element={<PaymentPage />} />
            <Route path="/certificate/:userId/:courseId" element={<CertificatePage />} />
            <Route path="/profile" element={<ProfilePage /> } />
            <Route path="/quiz" element={<QuizPage/>}/> 
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpCenter />} />
        </Route>


        {/* =========================================
            GROUP 2: LEARNING ENVIRONMENT
            (Fixed Height + Sidebar + No Global Footer)
           ========================================= */}
        <Route path="/course/:courseId" element={<CourseLayout />}>
            <Route path="learn" element={<CoursePlayer />} />
            <Route path="player/:lessonId" element={<CoursePlayer />} />
            <Route path="textbook/:lessonId" element={<TextbookReading />} />
            <Route path="assignment/:lessonId" element={<Assignment />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;