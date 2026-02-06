import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { MdOutlineShare, MdOutlineSearchOff } from "react-icons/md";

// Import your Edge Function Wrappers
import { getSections } from "../api/getSections"; 
import { getInstructor } from "../api/getInstructor"; 
import { getReviews } from "../api/getReviews"; 
import { getCourseEnrollmentCount } from "../api/getCourseEnrollmentCount.js";
import { enrollCourse } from "../api/enrollCourse.js";
import { getCourseById } from "../api/getCourseById.js";

// Icons
import CourseDetailsImage from "../assets/CourseDetails.png"; 
import videoLessons from "../assets/icons/videoLessons.svg";
import clockIcon from "../assets/icons/6weekCourse.svg";
import quizIcon from "../assets/icons/interactiveQuizzes.svg";
import certificateIcon from "../assets/icons/certifiOfComple.svg";
import tipsIcon from "../assets/icons/boardExamTips.svg";
import practiceIcon from "../assets/icons/practiceProblems.svg";
import instructorImgPlaceholder from "../assets/instructor.png";
import starIcon from "../assets/icons/star.svg";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  // --- 1. STATE MANAGEMENT ---
  const [course, setCourse] = useState(null); // Main Course Data
  const [loadingCourse, setLoadingCourse] = useState(true); // Initial Page Load
  
  const [activeTab, setActiveTab] = useState("overview");

  // Tab Data States
  const [sections, setSections] = useState([]);
  const [instructor, setInstructor] = useState(null);
  const [reviews, setReviews] = useState([]);
  
  // UI Loading States
  const [loadingTab, setLoadingTab] = useState(false);
  const [enrollmentCount, setEnrollmentCount] = useState(0);
  const [loadingEnrollment, setLoadingEnrollment] = useState(true);




  // --- 2. FETCH MAIN COURSE DATA ---
  useEffect(() => {
    // Guard Clause: Check if ID exists and is valid
    if (!courseId || courseId === 'undefined' || courseId === ':courseId') {
      console.error("Invalid Course ID in URL");
      setLoadingCourse(false);
      return;
    }

    const fetchCourse = async () => {
      setLoadingCourse(true);
      try {
        // Fetch course details using your Edge Function
        // Make sure getCourseById accepts a string, NOT an object {courseId}
        const data = await getCourseById(courseId);
        
        if (data) {
          setCourse(data);
        } else {
          console.error("Course not found in DB");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoadingCourse(false);
      }
    };

    fetchCourse();
  }, [courseId]);


  // --- 3. FETCH TAB DATA (Curriculum, Instructor, Reviews) ---
  useEffect(() => {
    if (!courseId || !course) return; // Don't fetch details if main course isn't loaded

    const fetchTabData = async () => {
      setLoadingTab(true);
      try {
        // A. FETCH CURRICULUM
        if (activeTab === "curriculum" && sections.length === 0) {
          const data = await getSections(courseId);
          setSections(data || []);
        }

        // B. FETCH INSTRUCTOR
        else if (activeTab === "instructor" && !instructor) {
          // If the course object already has instructor data, use it first
          if (course.instructor && !Array.isArray(course.instructor)) {
             setInstructor(course.instructor);
          } else {
             const data = await getInstructor(courseId);
             setInstructor(Array.isArray(data) ? data[0] : data);
          }
        }

        // C. FETCH REVIEWS
        else if (activeTab === "reviews" && reviews.length === 0) {
          const data = await getReviews(courseId);
          setReviews(data || []);
        }
        
      } catch (err) {
        console.error(`Error fetching ${activeTab}:`, err);
      } finally {
        setLoadingTab(false);
      }
    };

    fetchTabData();
  }, [activeTab, courseId, course, sections.length, instructor, reviews.length]);


  // --- 4. FETCH ENROLLMENT COUNT ---
  useEffect(() => {
     if (!courseId) return;
     setLoadingEnrollment(true);
     getCourseEnrollmentCount(courseId)
        .then(num => setEnrollmentCount(num))
        .catch(err => console.error(err))
        .finally(() => setLoadingEnrollment(false));
  }, [courseId]);


  const handleCouseEnrollment = async() => {
    try {
      await enrollCourse(course.id);
      // alert("Enrolled Successfully!");
      navigate(`/course/${courseId}/learn`)
    } catch (e) {
      alert(e.message);
    }
  }


  // --- 5. RENDER: LOADING STATE ---
  if (loadingCourse) {
    return (
      <div className="min-h-screen bg-[#FEF7FF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-purple-900">Loading Course...</h2>
        </div>
      </div>
    );
  }

  // --- 6. RENDER: NOT FOUND STATE ---
  if (!course) {
    return (
      <div className="min-h-screen bg-[#FEF7FF] flex flex-col items-center justify-center px-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-lg w-full border border-purple-100">
          <div className="w-24 h-24 bg-[#F9D8FF] rounded-full flex items-center justify-center mx-auto mb-6">
            <MdOutlineSearchOff className="text-5xl text-[#8300C4]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 font-openSans">
            Course Not Found
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed font-openSans">
            The course you are looking for does not exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/courses')}
            className="bg-[#BA68C8] hover:bg-[#9c4fad] text-white text-lg font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Parse Overview JSON safely
  const overviewStats = course.overview || {};

  // --- 7. RENDER: MAIN CONTENT ---
  return (
    <div className="bg-[#FEF7FF] min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 mb-3">
            {course.title}
          </h1>
          <h2 className="text-lg sm:text-2xl font-medium text-gray-700 mb-4">
             {course.category?.name || "Course"} &nbsp; {course.grade || ""}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
            {course.description || "Master this subject with our comprehensive curriculum."}
          </p>

          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <button
                onClick={()=> handleCouseEnrollment()}
                className="bg-[#c247d7] hover:bg-[#bb78c6] transition text-white px-5 py-3 rounded-lg text-sm sm:text-base"
              >
                Enroll for ₹{course.price}
            </button>

            <button className="w-10 h-10 bg-[#F6E0FFDE] rounded-full border flex items-center justify-center hover:bg-purple-200 transition">
              <MdOutlineShare className="text-xl text-purple-700" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-purple-400 border-2 border-white"></div>
              <div className="w-7 h-7 rounded-full bg-purple-500 border-2 border-white"></div>
              <div className="w-7 h-7 rounded-full bg-purple-600 border-2 border-white"></div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              {loadingEnrollment ? (
                <span className="font-semibold text-gray-400 animate-pulse">
                  ...
                </span>
              ) : (
                <span className="font-semibold text-gray-800">{enrollmentCount}+</span> 
              )}
              {' '} students enrolled
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={course.thumbnail_url || CourseDetailsImage}
            alt="Course Illustration"
            className="w-full max-w-xs sm:max-w-md rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#F9D8FF] rounded-full flex justify-center flex-wrap gap-3 py-3 px-4 mb-10">
          {["overview", "curriculum", "instructor", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full font-openSans text-sm transition ${
                activeTab === tab
                  ? "bg-[#DD9AFF] text-black font-semibold shadow-sm"
                  : "text-black hover:bg-[#EAC1FF]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
        <div className="border border-purple-200 rounded-2xl p-5 sm:p-10 bg-[#FFF5FF] min-h-[300px]">
          
          {loadingTab && (
            <div className="flex justify-center items-center h-40">
              <p className="text-purple-600 font-semibold animate-pulse">Loading {activeTab}...</p>
            </div>
          )}

          {/* 1. OVERVIEW TAB */}
          {!loadingTab && activeTab === "overview" && (
            <>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-8">
                About the Course
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <OverviewItem text={`${overviewStats.lessons || 0} Lessons`} icon={videoLessons} />
                <OverviewItem text={`${overviewStats.hours || 0} Hours Content`} icon={clockIcon} />
                <OverviewItem text={`${overviewStats.quizzes || 0} Interactive Quizzes`} icon={quizIcon} />
                <OverviewItem text="Certificate on Completion" icon={certificateIcon} />
                <OverviewItem text="Practice Problems" icon={practiceIcon} />
                <OverviewItem text="Exam Tips & Tricks" icon={tipsIcon} />
              </div>
            </>
          )}

          {/* 2. CURRICULUM TAB */}
          {!loadingTab && activeTab === "curriculum" && (
            <>
              <h3 className="text-xl sm:text-2xl font-semibold mb-6">Course Syllabus</h3>
              {sections.length > 0 ? (
                <div className="space-y-4">
                  {sections.map((section, index) => (
                    <div key={section.id} className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                      <h4 className="font-bold text-[#8300C4] text-lg mb-2">
                        {/* Chapter {index + 1}:  */}
                        {section.title}
                      </h4>
                      <ul className="pl-5 list-disc space-y-1 text-gray-600 text-sm">
                          {section.lessons && section.lessons.length > 0 ? (
                            section.lessons.map(lesson => (
                              <li key={lesson.id}>
                                {lesson.title} 
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full ml-2 capitalize">
                                  {lesson.content_type}
                                </span>
                              </li>
                            ))
                          ) : (
                           <li>No lessons added yet.</li>
                          )}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No syllabus available.</p>
              )}
            </>
          )}

          {/* 3. INSTRUCTOR TAB */}
          {!loadingTab && activeTab === "instructor" && (
            <div className="bg-[#FFF5FF] rounded-2xl p-2 sm:p-4">
              <h3 className="text-xl sm:text-2xl font-semibold mb-8 text-gray-800">Instructor</h3>
              {instructor ? (
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={instructor.avatar_url || instructorImgPlaceholder}
                      alt="Instructor"
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#E8B8FF]"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {instructor.full_name || "Unknown Instructor"}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                      {instructor.job_title || "Educator"} • {instructor.experience_years || 0}+ years experience
                    </p>
                    <h5 className="font-medium text-gray-800 mb-2">About</h5>
                    <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
                        {instructor.bio || "No bio available."}
                    </p>
                  </div>
                </div>
              ) : (
                 <p className="text-gray-500">Instructor details not found.</p>
              )}
            </div>
          )}

          {/* 4. REVIEWS TAB */}
          {!loadingTab && activeTab === "reviews" && (
            <div className="bg-[#FFF5FF] rounded-2xl p-2 sm:p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">Learner reviews</h3>
                  <div className="flex font-Poppins items-center gap-3 mb-6">
                    <img src={starIcon} alt="star" className="w-8"/>
                    <span className="text-4xl font-bold text-black">4.8</span>
                    <p className="text-sm text-black">({reviews.length} reviews)</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">Latest Comments</h3>
                  <div className="space-y-5">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review.id} className="border-[2px] border-[#DD9AFF] rounded-xl p-4 flex gap-4 bg-white">
                          <div className="w-10 h-10 rounded-full bg-[#BA68C8] flex items-center justify-center text-white font-bold shrink-0 text-sm overflow-hidden">
                             {review.user?.avatar_url ? (
                               <img src={review.user.avatar_url} alt="user" className="w-full h-full object-cover"/>
                             ) : (
                               (review.user?.full_name || "U").charAt(0).toUpperCase()
                             )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                               <h5 className="font-semibold text-sm">{review.user?.full_name || "Anonymous"}</h5>
                               <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(review.rating || 5)].map((_, i) => (
                                <img key={i} src={starIcon} className="w-3" alt="star" />
                              ))}
                            </div>
                            <p className="text-sm text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No reviews yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

// Helper Component
const OverviewItem = ({ text, icon }) => (
  <div className="bg-[#FAE0FE] shadow-md flex items-center justify-between px-5 py-4 rounded-xl text-sm sm:text-base">
    <span className="font-bold text-[#8300C4] font-openSans">{text}</span>
    <img src={icon} alt="icon" className="w-8 h-8 ml-3" />
  </div>
);

export default CourseDetail;



// import React, { useContext, useState, useEffect } from "react";
// import Navbar from "../Components/Navbar.jsx";
// import Footer from "../Components/Footer.jsx";
// import { MdOutlineShare } from "react-icons/md";
// import { MdOutlineSearchOff } from "react-icons/md";
// import { CourseContext } from "../context/CourseContext.jsx";

// // Import your Edge Function Wrappers
// import { getSections} from "../api/getSections"; 
// import { getInstructor} from "../api/getInstructor"; 
// import {  getReviews } from "../api/getReviews"; 

// // Icons
// import CourseDetailsImage from "../assets/CourseDetails.png"; 
// import videoLessons from "../assets/icons/videoLessons.svg";
// import clockIcon from "../assets/icons/6weekCourse.svg";
// import quizIcon from "../assets/icons/interactiveQuizzes.svg";
// import certificateIcon from "../assets/icons/certifiOfComple.svg";
// import tipsIcon from "../assets/icons/boardExamTips.svg";
// import practiceIcon from "../assets/icons/practiceProblems.svg";
// import instructorImgPlaceholder from "../assets/instructor.png";
// import starIcon from "../assets/icons/star.svg";
// import { useNavigate, useParams } from "react-router-dom";
// import { getCourseEnrollmentCount } from "../api/getCourseEnrollmentCount.js";
// import { enrollCourse } from "../api/enrollCourse.js";
// import { getAllCourses } from "../api/getAllCourses.js";
// import { getCourseById } from "../api/getCourseById.js";

// const CourseDetail = () => {
//   const [activeTab, setActiveTab] = useState("overview");
  
  
//   // console.log(courseId);
  
//   // Dynamic State
//   const [sections, setSections] = useState([]);
//   const [instructor, setInstructor] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   const [loadingEnrollment, setLoadingEnrollment] = useState(true)
  
//   const { courseOnView } = useContext(CourseContext);
//   const [course, setCourse] = useState(null);
//   const {courseId} = useParams();

//   console.log("cid 2 : ",courseId)
  

//   useEffect(() => {
//     // DEBUG LOG: See exactly when the effect runs and what the ID is
//     console.log("useEffect Triggered. ID:", courseId, "Type:", typeof courseId);

//     // 1. STRICT GUARD CLAUSE
//     // Checks for: null, undefined, empty string, OR the string "undefined"
//     if (!courseId || courseId === 'undefined' || courseId === ':courseId') {
//       console.log("Skipping API call: Invalid ID");
//       return;
//     }

//     const fetchCourse = async () => {
//       try {
//         console.log("Fetching course data...");
//         const data = await getCourseById(courseId);
//         if (data) setCourse(data);
//       } catch (err) {
//         console.error("Error fetching course:", err);
//       }
//     };

//     fetchCourse();

//   }, [courseId]);


//   // ---------------------------------------------------------
//   // 1. FETCH DATA VIA EDGE FUNCTIONS
//   // ---------------------------------------------------------
//   useEffect(() => {

//     if (!courseOnView) return;

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // A. FETCH CURRICULUM
//         if (activeTab === "curriculum" && sections.length === 0) {
//           const data = await getSections(courseOnView.id);
//           setSections(data || []);
//         }

//         // B. FETCH INSTRUCTOR
//         else if (activeTab === "instructor" && !instructor) {
//           const data = await getInstructor(courseOnView.id);
//           // Edge function might return an array or object, strictly handle it:
//           setInstructor(Array.isArray(data) ? data[0] : data);
//         }

//         // C. FETCH REVIEWS
//         else if (activeTab === "reviews" && reviews.length === 0) {
//           const data = await getReviews(courseOnView.id);
//           setReviews(data || []);
//         }
        
//       } catch (err) {
//         console.error(`Error fetching ${activeTab}:`, err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [
//     activeTab,
//     courseOnView,
//     sections.length,
//     instructor,
//     reviews.length
//   ]);


//   const [enrollmentCount, setEnrollmentCount] = useState(0);

//   useEffect(() => {
//      setLoadingEnrollment(true)
//      if (!courseOnView) return;
//      getCourseEnrollmentCount(courseOnView.id).then(num => setEnrollmentCount(num));
//      setLoadingEnrollment(false)
//   }, [courseOnView.id]);

//   // ---------------------------------------------------------

//   const navigate = useNavigate();

//   if (!courseOnView || Object.keys(courseOnView).length === 0) {
//     return (
//       <div className="min-h-screen bg-[#FEF7FF] flex flex-col items-center justify-center px-4">
        
//         {/* Content Card */}
//         <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-lg w-full border border-purple-100">
          
//           {/* Icon Circle */}
//           <div className="w-24 h-24 bg-[#F9D8FF] rounded-full flex items-center justify-center mx-auto mb-6">
//             <MdOutlineSearchOff className="text-5xl text-[#8300C4]" />
//           </div>

//           {/* Heading */}
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 font-openSans">
//             No Course Selected
//           </h2>

//           {/* Subtext */}
//           <p className="text-gray-600 mb-8 leading-relaxed font-openSans">
//             It looks like you navigated here directly without picking a course. 
//             Please select a course from the library to view its details.
//           </p>

//           {/* Action Button */}
//           <button
//             onClick={() => navigate('/courses')}
//             className="bg-[#BA68C8] hover:bg-[#9c4fad] text-white text-lg font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//           >
//             Back to Courses
//           </button>
          
//         </div>
//       </div>
//     );
//   }

//   // Parse Overview JSON safely
//   const overviewStats = courseOnView.overview || {};

//   return (
//     <div className="bg-[#FEF7FF] min-h-screen">
//       <Navbar />

//       {/* HERO SECTION */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//         {/* Left Content */}
//         <div>
//           <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 mb-3">
//             {courseOnView.title}
//           </h1>
//           <h2 className="text-lg sm:text-2xl font-medium text-gray-700 mb-4">
//              {courseOnView.category || "Course"} &nbsp; {courseOnView.grade || ""}
//           </h2>
//           <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
//             {courseOnView.description || "Master this subject with our comprehensive curriculum."}
//           </p>

//           <div className="flex items-center gap-4 mb-4 flex-wrap">
//             <button
//                 onClick={async() => {
//                   await enrollCourse(courseOnView.id);
//                 }}
//                 className="bg-[#c247d7] hover:bg-[#bb78c6] transition text-white px-5 py-3 rounded-lg text-sm sm:text-base"
//               >
//                 Enroll for ₹{courseOnView.price}
//             </button>

//             <button className="w-10 h-10 bg-[#F6E0FFDE] rounded-full border flex items-center justify-center hover:bg-purple-200 transition">
//               <MdOutlineShare className="text-xl text-purple-700" />
//             </button>
//           </div>

//           <div className="mt-4 flex items-center gap-3">
//             <div className="flex -space-x-2">
//               <div className="w-7 h-7 rounded-full bg-purple-400 border-2 border-white"></div>
//               <div className="w-7 h-7 rounded-full bg-purple-500 border-2 border-white"></div>
//               <div className="w-7 h-7 rounded-full bg-purple-600 border-2 border-white"></div>
//             </div>
//             <p className="text-xs sm:text-sm text-gray-600">

//               {loadingEnrollment ? (
//               <span className="font-semibold text-gray-400 animate-pulse">
//                 loading...
//               </span>
//             ) : (
//               <span className="font-semibold text-gray-800">{enrollmentCount}+</span> 
//             )}
//               students enrolled
//             </p>
//           </div>
//         </div>

//         {/* Right Image */}
//         <div className="flex justify-center">
//           <img
//             src={courseOnView.thumbnail_url || CourseDetailsImage}
//             alt="Course Illustration"
//             className="w-full max-w-xs sm:max-w-md rounded-xl shadow-lg object-cover"
//           />
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6">
//         <div className="bg-[#F9D8FF] rounded-full flex justify-center flex-wrap gap-3 py-3 px-4 mb-10">
//           {["overview", "curriculum", "instructor", "reviews"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-5 py-2 rounded-full font-openSans text-sm transition ${
//                 activeTab === tab
//                   ? "bg-[#DD9AFF] text-black font-semibold shadow-sm"
//                   : "text-black hover:bg-[#EAC1FF]"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* TAB CONTENT */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
//         <div className="border border-purple-200 rounded-2xl p-5 sm:p-10 bg-[#FFF5FF] min-h-[300px]">
          
//           {loading && (
//             <div className="flex justify-center items-center h-40">
//               <p className="text-purple-600 font-semibold animate-pulse">Loading {activeTab}...</p>
//             </div>
//           )}

//           {/* 1. OVERVIEW TAB */}
//           {!loading && activeTab === "overview" && (
//             <>
//               <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-8">
//                 About the Course
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 <OverviewItem text={`${overviewStats.lessons || 0} Lessons`} icon={videoLessons} />
//                 <OverviewItem text={`${overviewStats.hours || 0} Hours Content`} icon={clockIcon} />
//                 <OverviewItem text={`${overviewStats.quizzes || 0} Interactive Quizzes`} icon={quizIcon} />
//                 <OverviewItem text="Certificate on Completion" icon={certificateIcon} />
//                 <OverviewItem text="Practice Problems" icon={practiceIcon} />
//                 <OverviewItem text="Exam Tips & Tricks" icon={tipsIcon} />
//               </div>
//             </>
//           )}

//           {/* 2. CURRICULUM TAB */}
//           {!loading && activeTab === "curriculum" && (
//             <>
//               <h3 className="text-xl sm:text-2xl font-semibold mb-6">Course Syllabus</h3>
//               {sections.length > 0 ? (
//                 <div className="space-y-4">
//                   {sections.map((section, index) => (
//                     <div key={section.id} className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
//                       <h4 className="font-bold text-[#8300C4] text-lg mb-2">
//                         Chapter {index + 1}: {section.title}
//                       </h4>
//                       <ul className="pl-5 list-disc space-y-1 text-gray-600 text-sm">
//                          {/* Assuming Edge Function returns { ...section, lessons: [...] } */}
//                          {section.lessons && section.lessons.length > 0 ? (
//                             section.lessons.map(lesson => (
//                               <li key={lesson.id}>{lesson.title} <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full ml-2 capitalize">{lesson.content_type}</span></li>
//                             ))
//                          ) : (
//                            <li>No lessons added yet.</li>
//                          )}
//                       </ul>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No syllabus available.</p>
//               )}
//             </>
//           )}

//           {/* 3. INSTRUCTOR TAB */}
//           {!loading && activeTab === "instructor" && (
//             <div className="bg-[#FFF5FF] rounded-2xl p-2 sm:p-4">
//               <h3 className="text-xl sm:text-2xl font-semibold mb-8 text-gray-800">Instructor</h3>
//               {instructor ? (
//                 <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
//                   <div className="flex-shrink-0">
//                     <img
//                       src={instructor.avatar_url || instructorImgPlaceholder}
//                       alt="Instructor"
//                       className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#E8B8FF]"
//                     />
//                   </div>
//                   <div>
//                     <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
//                       {instructor.full_name || "Unknown Instructor"}
//                     </h4>
//                     <p className="text-sm sm:text-base text-gray-600 mb-4">
//                       {instructor.job_title || "Educator"} • {instructor.experience_years || 0}+ years experience
//                     </p>
//                     <h5 className="font-medium text-gray-800 mb-2">About</h5>
//                     <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
//                        {instructor.bio || "No bio available."}
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                  <p className="text-gray-500">Instructor details not found.</p>
//               )}
//             </div>
//           )}

//           {/* 4. REVIEWS TAB */}
//           {!loading && activeTab === "reviews" && (
//             <div className="bg-[#FFF5FF] rounded-2xl p-2 sm:p-4">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//                 <div>
//                   <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">Learner reviews</h3>
//                   <div className="flex font-Poppins items-center gap-3 mb-6">
//                     <img src={starIcon} alt="star" className="w-8"/>
//                     <span className="text-4xl font-bold text-black">4.8</span>
//                     <p className="text-sm text-black">({reviews.length} reviews)</p>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">Latest Comments</h3>
//                   <div className="space-y-5">
//                     {reviews.length > 0 ? (
//                       reviews.map((review) => (
//                         <div key={review.id} className="border-[2px] border-[#DD9AFF] rounded-xl p-4 flex gap-4 bg-white">
//                           <div className="w-10 h-10 rounded-full bg-[#BA68C8] flex items-center justify-center text-white font-bold shrink-0 text-sm overflow-hidden">
//                              {review.user?.avatar_url ? (
//                                <img src={review.user.avatar_url} alt="user" className="w-full h-full object-cover"/>
//                              ) : (
//                                (review.user?.full_name || "U").charAt(0).toUpperCase()
//                              )}
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex justify-between items-start mb-1">
//                                <h5 className="font-semibold text-sm">{review.user?.full_name || "Anonymous"}</h5>
//                                <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
//                             </div>
//                             <div className="flex items-center gap-1 mb-2">
//                               {[...Array(review.rating || 5)].map((_, i) => (
//                                 <img key={i} src={starIcon} className="w-3" alt="star" />
//                               ))}
//                             </div>
//                             <p className="text-sm text-gray-700">{review.comment}</p>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-gray-500 italic">No reviews yet.</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// // Helper Component
// const OverviewItem = ({ text, icon }) => (
//   <div className="bg-[#FAE0FE] shadow-md flex items-center justify-between px-5 py-4 rounded-xl text-sm sm:text-base">
//     <span className="font-bold text-[#8300C4] font-openSans">{text}</span>
//     <img src={icon} alt="icon" className="w-8 h-8 ml-3" />
//   </div>
// );

// export default CourseDetail;