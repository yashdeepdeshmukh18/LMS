// import { useEffect, useState } from 'react'
// import { supabase } from './supabase'
// import { getAllCourses } from './api/getAllCourses'
// import { getCategories } from './api/getCategories'
// import { enrollCourse } from './api/enrollCourse'
// import { getMyCourses } from './api/getMyCourses'
// import { getMyProfile } from './api/getMyProfile' // Import new API
// import { getReviews } from './api/getReviews' // Import new API

// import { getInstructor } from './api/getInstructor' 

// import { getSections } from './api/getSections' // Import new API
// import { getLessonsBySection } from './api/getLessonsBySection' // Import new API

// import { getMyCertificates } from './api/getMyCertificates';



// function App() {
//   const [session, setSession] = useState(null)
  
//   // Data States
//   const [courses, setCourses] = useState([])
//   const [categories, setCategories] = useState([])
//   const [myCourses, setMyCourses] = useState([])
//   const [profile, setProfile] = useState(null) // Profile Data
  
//   // UI States
//   const [selectedCategory, setSelectedCategory] = useState('All')
//   const [loading, setLoading] = useState(true)
//   const [enrollingId, setEnrollingId] = useState(null)
//   const [showProfileModal, setShowProfileModal] = useState(false) // Toggle Modal

//   // REVIEW STATES
//   const [showReviewModal, setShowReviewModal] = useState(false)
//   const [currentReviews, setCurrentReviews] = useState([])
//   const [loadingReviews, setLoadingReviews] = useState(false)




//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//       if (session) handleLoginSuccess()
//     })
    
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//       if (session) {
//         handleLoginSuccess()
//       } else {
//         setMyCourses([])
//         setProfile(null)
//       }
//     })

//     loadPublicData()
//     return () => subscription.unsubscribe()
//   }, [])

//   const loadPublicData = async () => {
//     try {
//       const [allCourses, allCats] = await Promise.all([
//         getAllCourses(),
//         getCategories()
//       ])
//       setCourses(allCourses || [])
//       setCategories(allCats || [])
//     } catch (error) {
//       console.error(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Fetch Private Data (Courses + Profile)
//   const handleLoginSuccess = async () => {
//     try {
//       const [coursesData, profileData] = await Promise.all([
//         getMyCourses(),
//         getMyProfile()
//       ])
//       setMyCourses(coursesData || [])
//       setProfile(profileData)
//     } catch (error) {
//       console.error("Error loading user data", error)
//     }
//   }

//   const handleGoogleLogin = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: { redirectTo: window.location.origin }
//     })
//   }

//   const handleEnroll = async (courseId) => {
//     if (!session) {
//       alert("Please login to enroll!")
//       handleGoogleLogin()
//       return
//     }
//     try {
//       setEnrollingId(courseId)
//       await enrollCourse(courseId)
//       alert("Enrolled Successfully!")
//       handleLoginSuccess() // Refresh list
//     } catch (error) {
//       alert(error.message)
//     } finally {
//       setEnrollingId(null)
//     }
//   }

//   const handleShowReviews = async (courseId) => {
//     setShowReviewModal(true)
//     setLoadingReviews(true)
//     setCurrentReviews([]) // Clear old ones
    
//     try {
//       const data = await getReviews(courseId)
//       console.log(data);
//       setCurrentReviews(data || [])
//     } catch (error) {
//       console.error(error)
//       alert("Could not load reviews")
//       setShowReviewModal(false)
//     } finally {
//       setLoadingReviews(false)
//     }
//   }


//   const [showInstructorModal, setShowInstructorModal] = useState(false)
//   const [currentInstructor, setCurrentInstructor] = useState(null)
//   const [loadingInstructor, setLoadingInstructor] = useState(false)

//   // ... (Keep useEffect, loadData, handleEnroll, handleLogin exactly as before) ...

//   const handleShowInstructor = async (courseId) => {
//     setShowInstructorModal(true)
//     setLoadingInstructor(true)
//     setCurrentInstructor(null)

//     try {
//       const data = await getInstructor(courseId)
//       setCurrentInstructor(data)
//     } catch (error) {
//       console.error(error)
//       alert("Could not load instructor details")
//       setShowInstructorModal(false)
//     } finally {
//       setLoadingInstructor(false)
//     }
//   }

//   // Helper to parse Education JSON safely
//   const renderEducation = (history) => {
//     if (!history || !Array.isArray(history)) return null
//     return history.map((item, index) => (
//       <li key={index} className="mb-2">
//         {item.degree || item} {item.university ? `, ${item.university}` : ''}
//       </li>
//     ))
//   }

//   // NEW: Curriculum Modal State
//   const [showCurriculumModal, setShowCurriculumModal] = useState(false)
//   const [currentSections, setCurrentSections] = useState([])
//   const [loadingSections, setLoadingSections] = useState(false)

//   // ... (Keep useEffect, loadData, handleEnroll, handleLogin, handleShowInstructor etc.) ...

//   // --- NEW: HANDLE SHOW CURRICULUM ---
//   const handleShowCurriculum = async (courseId) => {
//     setShowCurriculumModal(true)
//     setLoadingSections(true)
//     setCurrentSections([])

//     try {
//       const data = await getSections(courseId)
//       setCurrentSections(data || [])
//     } catch (error) {
//       console.error(error)
//       alert("Could not load syllabus")
//       setShowCurriculumModal(false)
//     } finally {
//       setLoadingSections(false)
//     }
//   }


//   // Helper for rendering tabs (visual only for this demo)
//   const ModalTabs = ({ active }) => (
//     <div className="bg-pink-100 p-4 flex justify-between items-center rounded-t-xl">
//       <div className="flex gap-4 text-sm sm:text-base">
//         <span className={`px-3 py-1 cursor-pointer ${active === 'overview' ? 'bg-pink-300 text-purple-900 font-bold rounded-full' : 'text-gray-600'}`}>Overview</span>
//         <span className={`px-3 py-1 cursor-pointer ${active === 'curriculum' ? 'bg-pink-300 text-purple-900 font-bold rounded-full shadow-sm' : 'text-gray-600'}`}>Curriculum</span>
//         <span className={`px-3 py-1 cursor-pointer ${active === 'instructor' ? 'bg-pink-300 text-purple-900 font-bold rounded-full' : 'text-gray-600'}`}>Instructor</span>
//         <span className={`px-3 py-1 cursor-pointer ${active === 'reviews' ? 'bg-pink-300 text-purple-900 font-bold rounded-full' : 'text-gray-600'}`}>Reviews</span>
//       </div>
//       <button 
//         onClick={() => {
//           setShowCurriculumModal(false)
//           setShowInstructorModal(false)
//           setShowReviewModal(false)
//         }} 
//         className="text-gray-500 hover:text-black font-bold text-xl"
//       >✕</button>
//     </div>
//   )



//   const filteredCourses = selectedCategory === 'All' 
//     ? courses 
//     : courses.filter(c => c.category?.name === selectedCategory)

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 relative">

//       <button className='bg-red-300 text-black'  onClick={async()=>{const res = await getMyCertificates()}}>get my certificates</button>


//       {/* --- CURRICULUM MODAL (Matches Screenshot) --- */}
//       {showCurriculumModal && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden relative min-h-[500px] flex flex-col">
            
//             {/* Tabs Header */}
//             <ModalTabs active="curriculum" />

//             <div className="p-8 bg-pink-50/30 flex-1">
//               <h2 className="text-xl font-bold mb-6 text-black">Course Syllabus</h2>

//               {loadingSections && <div className="text-center py-10 text-gray-500">Loading syllabus...</div>}

//               {!loadingSections && currentSections.length === 0 && (
//                 <div className="text-gray-500">No syllabus available yet.</div>
//               )}

//               {/* The Purple List */}
//               <div className="space-y-4">
//                 {currentSections.map((section, index) => (

//                   <div key={section.id} className="flex items-center gap-4 text-lg">
//                     <span className="text-purple-600 font-medium min-w-[100px]">
//                       Chapter {index + 1}
//                     </span>
//                     <span className="text-purple-600 font-medium">:</span>
//                     <span className="text-purple-600 font-medium">
//                       {section.title}
//                     </span>
//                     <button onClick={async()=>{
//                       console.log("section : ",section)
//                       const [res] = await Promise.all([
//                         getLessonsBySection(section?.id)]) 
//                       console.log("hello bhai")}}>get lessons</button>
//                   </div>
//                 ))}
//               </div>

//             </div>
//           </div>
//         </div>
//       )}


//       {/* --- INSTRUCTOR MODAL (Pink Theme) --- */}
//       {showInstructorModal && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative">
            
//             {/* Pink Tab Header */}
//             <div className="bg-pink-100 p-4 flex justify-between items-center">
//               <div className="flex gap-4">
//                 <span className="text-gray-600 font-medium px-3 py-1">Overview</span>
//                 <span className="bg-pink-300 text-purple-900 font-bold px-4 py-1 rounded-full shadow-sm">Instructor</span>
//                 <span className="text-gray-600 font-medium px-3 py-1">Reviews</span>
//               </div>
//               <button onClick={() => setShowInstructorModal(false)} className="text-gray-500 hover:text-black font-bold text-xl">✕</button>
//             </div>

//             <div className="p-8">
//               {loadingInstructor && <div className="text-center py-10">Loading profile...</div>}

//               {!loadingInstructor && currentInstructor && (
//                 <>
//                   {/* Instructor Header */}
//                   <div className="flex items-center gap-6 mb-8">
//                     <img 
//                       src={currentInstructor.avatar_url || 'https://via.placeholder.com/100'} 
//                       className="w-24 h-24 rounded-full object-cover border-4 border-pink-50"
//                     />
//                     <div>
//                       <h2 className="text-3xl font-bold text-gray-900">{currentInstructor.full_name}</h2>
//                       <p className="text-gray-600 text-lg mt-1">
//                         {currentInstructor.job_title} 
//                         {currentInstructor.experience_years && ` (${currentInstructor.experience_years}+ years experience)`}
//                       </p>
//                     </div>
//                   </div>

//                   {/* About Section */}
//                   <h3 className="text-xl font-bold mb-4 text-gray-800">About Instructor</h3>
                  
//                   <div className="text-gray-700 leading-relaxed space-y-4">
//                     {/* Bio Paragraph */}
//                     <p>{currentInstructor.bio}</p>

//                     {/* Education Bullet Points */}
//                     {currentInstructor.education_history && (
//                       <ul className="list-disc pl-5 mt-4 space-y-2">
//                          {renderEducation(currentInstructor.education_history)}
//                       </ul>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}



//       {showReviewModal && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative max-h-[80vh] flex flex-col">
//             <div className="p-4 border-b flex justify-between items-center bg-gray-50">
//               <h3 className="font-bold text-lg">Course Reviews</h3>
//               <button onClick={() => setShowReviewModal(false)} className="text-gray-500 hover:text-black">✕</button>
//             </div>
            
//             <div className="p-6 overflow-y-auto">
//               {loadingReviews && <div className="text-center text-gray-500">Loading reviews...</div>}
              
//               {!loadingReviews && currentReviews.length === 0 && (
//                 <div className="text-center text-gray-500 py-4">No reviews yet. Be the first!</div>
//               )}

//               {!loadingReviews && currentReviews.map(r => (
//                 <div key={r.id} className="mb-4 border-b border-gray-100 pb-4 last:border-0">
//                   <div className="flex items-center gap-2 mb-2">
//                     <img src={r.user?.avatar_url || 'https://via.placeholder.com/30'} className="w-8 h-8 rounded-full" />
//                     <div>
//                       <p className="text-sm font-bold">{r.user?.full_name || 'Student'}</p>
//                       <div className="text-yellow-500 text-xs">{'★'.repeat(r.rating)}</div>
//                     </div>
//                   </div>
//                   <p className="text-gray-600 text-sm">{r.comment}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* --- PROFILE MODAL --- */}
//       {showProfileModal && profile && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
//             <button 
//               onClick={() => setShowProfileModal(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold"
//             >
//               ✕
//             </button>
            
//             {/* Modal Header */}
//             <div className="bg-indigo-600 p-6 text-center">
//               <img 
//                 src={profile.avatar_url || session.user.user_metadata.avatar_url} 
//                 className="w-20 h-20 rounded-full border-4 border-white mx-auto shadow-lg"
//               />
//               <h2 className="text-white text-xl font-bold mt-3">{profile.full_name}</h2>
//               <span className="bg-indigo-500 text-indigo-100 text-xs px-2 py-1 rounded-full uppercase tracking-wide">
//                 {profile.role}
//               </span>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6 space-y-4">
//               <div className="flex justify-between border-b border-gray-100 pb-2">
//                 <span className="text-gray-500 text-sm">Email</span>
//                 <span className="font-medium text-sm">{profile.email}</span>
//               </div>
//               <div className="flex justify-between border-b border-gray-100 pb-2">
//                 <span className="text-gray-500 text-sm">School</span>
//                 <span className="font-medium text-sm">{profile.school_name || 'Not set'}</span>
//               </div>
//               <div className="flex justify-between border-b border-gray-100 pb-2">
//                 <span className="text-gray-500 text-sm">Class/Grade</span>
//                 <span className="font-medium text-sm">{profile.grade_level || 'Not set'}</span>
//               </div>
              
//               <button 
//                 onClick={() => supabase.auth.signOut() && setShowProfileModal(false)}
//                 className="w-full bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition mt-4"
//               >
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* HEADER */}
//       <header className="bg-white shadow-sm sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           <span className="text-2xl font-bold text-indigo-600">SmaranAI</span>
//           {!session ? (
//              <button onClick={handleGoogleLogin} className="text-sm font-medium text-gray-700 hover:text-indigo-600">Login</button>
//           ) : (
//              // AVATAR BUTTON TRIGGERS MODAL
//              <div 
//                onClick={() => setShowProfileModal(true)}
//                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
//              >
//                <span className="text-sm font-medium hidden sm:block">
//                  {profile?.full_name || session.user.user_metadata.full_name}
//                </span>
//                <img 
//                  src={session.user.user_metadata.avatar_url} 
//                  className="h-9 w-9 rounded-full border border-indigo-100" 
//                />
//              </div>
//           )}
//         </div>
//       </header>



//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* ... (Keep your My Learning & Course Grid code exactly as before) ... */}
        
//         {/* Example: Just showing My Learning Section again for context */}
//         {session && myCourses.length > 0 && (
//           <div className="mb-16">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 My Learning</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {myCourses.map((item) => (
//                 <div key={item.course.id} className="bg-white border border-indigo-100 rounded-xl p-4 flex gap-4 shadow-sm">
//                   <img src={item.course.thumbnail_url} className="w-24 h-24 rounded-lg object-cover bg-gray-200" />
//                   <div className="flex flex-col justify-center">
//                     <h3 className="font-bold text-gray-900 line-clamp-1">{item.course.title}</h3>
//                     <button className="text-xs bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full font-semibold w-fit mt-2">
//                       Continue
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="text-center mb-10"><h1 className="text-4xl font-extrabold text-gray-900">Explore Courses</h1></div>
        
//         {/* FILTERS */}
//         <div className="flex flex-wrap justify-center gap-2 mb-10">
//           <button onClick={() => setSelectedCategory('All')} className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'All' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>All</button>
//           {categories.map(cat => (
//             <button key={cat.id} onClick={() => setSelectedCategory(cat.name)} className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === cat.name ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>{cat.name}</button>
//           ))}
//         </div>

//         {/* GRID */}
//         {!loading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredCourses.map((course) => {
//               const isEnrolled = myCourses.some(m => m.course.id === course.id)
//               return (
//                 <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
//                   <div className="h-48 bg-gray-200"><img src={course.thumbnail_url} className="w-full h-full object-cover"/></div>
//                   <div className="p-6 flex-1 flex flex-col">
//                     <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    
//                     {/* INSTRUCTOR LINK */}
//                     <div 
//                       onClick={() => handleShowInstructor(course.id)} // Your previous function
//                       className="flex items-center gap-2 mb-3 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition w-fit"
//                     >
//                        {/* ... Instructor Avatar ... */}
//                        <span className="text-sm text-indigo-600 font-medium">{course.instructor?.full_name}</span>
//                     </div>

//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    
//                     {/* ACTIONS FOOTER */}
//                     <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 gap-2">
                      
//                       {/* NEW: Syllabus Button */}
//                       <button 
//                          onClick={() => handleShowCurriculum(course.id)}
//                          className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium hover:bg-purple-100 transition"
//                       >
//                         📄 Syllabus
//                       </button>

//                       {isEnrolled ? (
//                         <button disabled className="px-3 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium">✓ Enrolled</button>
//                       ) : (
//                         <button onClick={() => handleEnroll(course.id)} disabled={enrollingId === course.id} className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700">
//                           {enrollingId === course.id ? '...' : 'Enroll'}
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }

// export default App





import { useEffect, useState } from 'react'
import { supabase } from './supabase'

// --- 1. Public APIs ---
import { getAllCourses } from './api/getAllCourses'
import { getCategories } from './api/getCategories'
import { getInstructor } from './api/getInstructor'
import { getReviews } from './api/getReviews'
import { getSections } from './api/getSections'
import { getLessonsBySection } from './api/getLessonsBySection'

// --- 2. Private/User APIs ---
import { getMyProfile } from './api/getMyProfile'
import { getMyCourses } from './api/getMyCourses'
import { enrollCourse } from './api/enrollCourse'
import { getMyCertificates } from './api/getMyCertificates'
// import { generateCertificate } from './api/generateCertificate'






function App() {
  // --- STATE MANAGEMENT ---
  const [session, setSession] = useState(null)
  
  // Data Stores
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [myCourses, setMyCourses] = useState([])
  const [profile, setProfile] = useState(null)
  
  // UI Filters & Loading
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [enrollingId, setEnrollingId] = useState(null)

  // --- MODAL STATES ---
  // 1. Profile Modal
  const [showProfileModal, setShowProfileModal] = useState(false)
  
  // 2. Instructor Modal
  const [showInstructorModal, setShowInstructorModal] = useState(false)
  const [currentInstructor, setCurrentInstructor] = useState(null)
  const [loadingInstructor, setLoadingInstructor] = useState(false)

  // 3. Reviews Modal
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [currentReviews, setCurrentReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(false)

  // 4. Curriculum (Syllabus) Modal
  const [showCurriculumModal, setShowCurriculumModal] = useState(false)
  const [currentSections, setCurrentSections] = useState([])
  const [loadingSections, setLoadingSections] = useState(false)
  const [expandedSectionId, setExpandedSectionId] = useState(null) // To track which section is open
  const [currentLessons, setCurrentLessons] = useState([]) // Store lessons of the open section
  const [loadingLessons, setLoadingLessons] = useState(false)

  // 5. Certificates Modal
  const [showCertModal, setShowCertModal] = useState(false)
  const [myCertificates, setMyCertificates] = useState([])
  const [loadingCerts, setLoadingCerts] = useState(false)


  // --- INITIALIZATION ---
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) handleLoginSuccess()
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        handleLoginSuccess()
      } else {
        // Reset private data on logout
        setMyCourses([])
        setProfile(null)
        setMyCertificates([])
      }
    })

    loadPublicData()
    return () => subscription.unsubscribe()
  }, [])

  // --- DATA LOADING FUNCTIONS ---

  const loadPublicData = async () => {
    try {
      const [allCourses, allCats] = await Promise.all([
        getAllCourses(),
        getCategories()
      ])
      setCourses(allCourses || [])
      setCategories(allCats || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginSuccess = async () => {
    try {
      // Load 'My Courses' and 'Profile' in parallel
      const [coursesData, profileData] = await Promise.all([
        getMyCourses(),
        getMyProfile()
      ])
      setMyCourses(coursesData || [])
      setProfile(profileData)
    } catch (error) {
      console.error("Error loading user data", error)
    }
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
  }

  // --- ACTION HANDLERS ---

  const handleEnroll = async (courseId) => {
    if (!session) {
      alert("Please login to enroll!")
      handleGoogleLogin()
      return
    }
    try {
      setEnrollingId(courseId)
      await enrollCourse(courseId)
      alert("Enrolled Successfully! Check 'My Learning'.")
      handleLoginSuccess() // Refresh user data
    } catch (error) {
      alert(error.message)
    } finally {
      setEnrollingId(null)
    }
  }

  const handleGenerateCertificate = async (courseId) => {
    // if (!confirm("Generate certificate for this course?")) return;
    
    // try {
    //   const { message, error } = await generateCertificate(courseId)
    //   if (error) throw error
    //   alert(message)
    //   // Open certificates modal to show the new cert
    //   handleShowCertificates()
    // } catch (error) {
    //   alert("Error: " + error.message)
    // }
  }

  // --- MODAL HANDLERS ---

  const handleShowInstructor = async (courseId) => {
    setShowInstructorModal(true)
    setLoadingInstructor(true)
    setCurrentInstructor(null)
    try {
      const data = await getInstructor(courseId)
      setCurrentInstructor(data)
    } catch (error) {
      alert("Could not load instructor")
    } finally {
      setLoadingInstructor(false)
    }
  }

  const handleShowReviews = async (courseId) => {
    setShowReviewModal(true)
    setLoadingReviews(true)
    setCurrentReviews([])
    try {
      const data = await getReviews(courseId)
      setCurrentReviews(data || [])
    } catch (error) {
      alert("Could not load reviews")
    } finally {
      setLoadingReviews(false)
    }
  }

  const handleShowCurriculum = async (courseId) => {
    setShowCurriculumModal(true)
    setLoadingSections(true)
    setCurrentSections([])
    setExpandedSectionId(null) // Reset expanded state
    try {
      const data = await getSections(courseId)
      setCurrentSections(data || [])
    } catch (error) {
      alert("Could not load syllabus")
    } finally {
      setLoadingSections(false)
    }
  }

  const handleLoadLessons = async (sectionId) => {
    // If clicking the already open section, close it
    if (expandedSectionId === sectionId) {
      setExpandedSectionId(null)
      return
    }

    setExpandedSectionId(sectionId)
    setLoadingLessons(true)
    setCurrentLessons([])
    
    try {
      const { data } = await getLessonsBySection(sectionId)
      setCurrentLessons(data || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingLessons(false)
    }
  }

  const handleShowCertificates = async () => {
    if (!session) return;
    setShowCertModal(true)
    setLoadingCerts(true)
    try {
      const { data } = await getMyCertificates()
      setMyCertificates(data || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingCerts(false)
    }
  }


  // --- RENDER HELPERS ---
  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category?.name === selectedCategory)

  // --- JSX ---
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 relative pb-20">
      
      {/* --- HEADER --- */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">SmaranAI</span>
          
          <div className="flex items-center gap-4">
            {session && (
              <button 
                onClick={handleShowCertificates}
                className="hidden sm:block text-sm bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full font-medium border border-yellow-200 hover:bg-yellow-100"
              >
                🏆 My Certificates
              </button>
            )}

            {!session ? (
               <button onClick={handleGoogleLogin} className="text-sm font-medium text-gray-700 hover:text-indigo-600">Login</button>
            ) : (
               <div onClick={() => setShowProfileModal(true)} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
                 <img src={session.user.user_metadata.avatar_url} className="h-9 w-9 rounded-full border border-indigo-100" />
               </div>
            )}
          </div>
        </div>
      </header>


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* --- SECTION: MY LEARNING --- */}
        {session && myCourses.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 My Learning</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((item) => (
                <div key={item.course.id} className="bg-white border border-indigo-100 rounded-xl p-4 flex gap-4 shadow-sm relative group">
                  <img src={item.course.thumbnail_url} className="w-24 h-24 rounded-lg object-cover bg-gray-200" />
                  <div className="flex flex-col justify-center flex-1">
                    <h3 className="font-bold text-gray-900 line-clamp-1">{item.course.title}</h3>
                    <div className="flex gap-2 mt-3">
                      <button className="text-xs bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full font-semibold">
                        Continue
                      </button>
                      <button 
                        onClick={() => handleGenerateCertificate(item.course.id)}
                        className="text-xs bg-green-100 text-green-700 py-1 px-3 rounded-full font-semibold hover:bg-green-200"
                      >
                        Get Cert
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SECTION: EXPLORE COURSES --- */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Explore Courses</h1>
        </div>
        
        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button onClick={() => setSelectedCategory('All')} className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'All' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>All</button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.name)} className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === cat.name ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>{cat.name}</button>
          ))}
        </div>

        {/* COURSE GRID */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const isEnrolled = myCourses.some(m => m.course.id === course.id)
              return (
                <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition border border-gray-100">
                  {/* Thumbnail */}
                  <div className="h-48 bg-gray-200 relative">
                    <img src={course.thumbnail_url} className="w-full h-full object-cover"/>
                    <span className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-gray-700">
                      ${course.price}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
                    
                    {/* Instructor Clickable */}
                    <div 
                      onClick={() => handleShowInstructor(course.id)} 
                      className="flex items-center gap-2 mb-3 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition w-fit"
                    >
                      <span className="text-sm text-indigo-600 font-medium">👨‍🏫 {course.instructor?.full_name || "Instructor"}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    
                    {/* Actions Footer */}
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 gap-2 flex-wrap">
                      
                      <div className="flex gap-2">
                        <button onClick={() => handleShowCurriculum(course.id)} className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium hover:bg-purple-100 transition">
                          📄 Syllabus
                        </button>
                        <button onClick={() => handleShowReviews(course.id)} className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-medium hover:bg-orange-100 transition">
                          ⭐ Reviews
                        </button>
                      </div>

                      {isEnrolled ? (
                        <button disabled className="px-3 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium">✓ Enrolled</button>
                      ) : (
                        <button 
                          onClick={() => handleEnroll(course.id)} 
                          disabled={enrollingId === course.id} 
                          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 shadow-md"
                        >
                          {enrollingId === course.id ? '...' : 'Enroll'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>


      {/* ================= MODALS START HERE ================= */}

      {/* 1. CURRICULUM MODAL */}
      {showCurriculumModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-pink-100 p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg text-purple-900">Course Syllabus</h3>
              <button onClick={() => setShowCurriculumModal(false)} className="text-gray-500 hover:text-black font-bold text-xl">✕</button>
            </div>

            <div className="p-6 overflow-y-auto bg-pink-50/30 flex-1">
              {loadingSections && <div className="text-center py-10 text-gray-500">Loading syllabus...</div>}
              {!loadingSections && currentSections.length === 0 && <div className="text-center py-10 text-gray-500">No content available.</div>}
              
              <div className="space-y-3">
                {currentSections.map((section, index) => (
                  <div key={section.id} className="border border-purple-100 rounded-lg bg-white overflow-hidden shadow-sm">
                    {/* Section Header */}
                    <div 
                      onClick={() => handleLoadLessons(section.id)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-purple-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-purple-600 font-bold bg-purple-100 px-2 py-1 rounded text-sm">Ch {index + 1}</span>
                        <span className="font-medium text-gray-800">{section.title}</span>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {expandedSectionId === section.id ? '▲' : '▼'}
                      </span>
                    </div>

                    {/* Lessons List (Accordion Content) */}
                    {expandedSectionId === section.id && (
                      <div className="bg-gray-50 border-t border-purple-100 p-4 pl-12">
                         {loadingLessons ? (
                           <div className="text-sm text-gray-500">Loading lessons...</div>
                         ) : (
                           <ul className="space-y-2">
                             {currentLessons.length === 0 ? (
                               <li className="text-sm text-gray-400 italic">No lessons yet.</li>
                             ) : (
                               currentLessons.map(lesson => (
                                 <li key={lesson.id} className="flex items-center gap-2 text-gray-700 text-sm">
                                   <span className="text-green-500">▶</span>
                                   {lesson.title}
                                   {lesson.is_preview && <span className="text-xs bg-green-100 text-green-700 px-1 rounded ml-2">Free</span>}
                                 </li>
                               ))
                             )}
                           </ul>
                         )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. INSTRUCTOR MODAL */}
      {showInstructorModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative">
            <button onClick={() => setShowInstructorModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold">✕</button>
            
            {loadingInstructor && <div className="text-center py-10">Loading profile...</div>}
            
            {!loadingInstructor && currentInstructor && (
              <>
                <div className="flex items-center gap-6 mb-6">
                  <img src={currentInstructor.avatar_url} className="w-20 h-20 rounded-full object-cover border-4 border-pink-50"/>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentInstructor.full_name}</h2>
                    <p className="text-indigo-600">{currentInstructor.job_title}</p>
                  </div>
                </div>
                <div className="prose prose-sm text-gray-600">
                  <p>{currentInstructor.bio}</p>
                  {/* Parse education if exists */}
                  {currentInstructor.education_history && (
                    <ul className="list-disc pl-5 mt-4">
                      {currentInstructor.education_history.map((edu, i) => (
                        <li key={i}>{edu.degree} - {edu.university}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 3. REVIEWS MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg">Student Reviews</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-500 hover:text-black">✕</button>
            </div>
            <div className="p-6 overflow-y-auto">
              {loadingReviews ? <div className="text-center text-gray-500">Loading...</div> : (
                currentReviews.length === 0 ? <div className="text-center text-gray-500">No reviews yet.</div> : (
                  currentReviews.map(r => (
                    <div key={r.id} className="mb-4 border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-1">
                        <img src={r.user?.avatar_url} className="w-6 h-6 rounded-full"/>
                        <span className="font-bold text-sm">{r.user?.full_name}</span>
                        <div className="text-yellow-400 text-xs ml-auto">{'★'.repeat(r.rating)}</div>
                      </div>
                      <p className="text-gray-600 text-sm pl-8">{r.comment}</p>
                    </div>
                  ))
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. CERTIFICATES MODAL */}
      {showCertModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[80vh]">
             <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-4 flex justify-between items-center border-b border-yellow-200">
              <h3 className="font-bold text-lg text-yellow-800 flex items-center gap-2">🏆 My Achievements</h3>
              <button onClick={() => setShowCertModal(false)} className="text-gray-500 hover:text-black font-bold">✕</button>
            </div>
            
            <div className="p-8 bg-gray-50 flex-1 overflow-y-auto">
              {loadingCerts && <div className="text-center">Loading certificates...</div>}
              
              {!loadingCerts && myCertificates.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  <p>You haven't earned any certificates yet.</p>
                  <p className="text-sm mt-2">Complete a course to get one!</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myCertificates.map(cert => (
                  <div key={cert.id} className="bg-white p-4 rounded-lg border border-yellow-200 shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl mb-3">🎓</div>
                    <h4 className="font-bold text-gray-800 mb-1">Course Completed</h4>
                    <p className="text-xs text-gray-500 mb-4">Issued: {new Date(cert.issued_at).toLocaleDateString()}</p>
                    <a href={cert.certificate_url} target="_blank" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 w-full">
                      View Certificate
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PROFILE MODAL */}
      {showProfileModal && profile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
             <button onClick={() => setShowProfileModal(false)} className="absolute top-4 right-4 text-white hover:text-gray-200 font-bold">✕</button>
             
             <div className="bg-indigo-600 p-6 text-center pt-10">
               <img src={profile.avatar_url || session.user.user_metadata.avatar_url} className="w-24 h-24 rounded-full border-4 border-white mx-auto shadow-lg"/>
               <h2 className="text-white text-xl font-bold mt-3">{profile.full_name}</h2>
               <span className="bg-indigo-500 text-indigo-100 text-xs px-2 py-1 rounded-full uppercase tracking-wide">{profile.role}</span>
             </div>

             <div className="p-6 space-y-4">
               <div className="flex justify-between border-b border-gray-100 pb-2">
                 <span className="text-gray-500 text-sm">Email</span>
                 <span className="font-medium text-sm">{profile.email}</span>
               </div>
               <div className="flex justify-between border-b border-gray-100 pb-2">
                 <span className="text-gray-500 text-sm">School</span>
                 <span className="font-medium text-sm">{profile.school_name || 'Not set'}</span>
               </div>
               
               <button onClick={() => { setShowProfileModal(false); handleShowCertificates(); }} className="w-full bg-yellow-50 text-yellow-700 py-3 rounded-lg text-sm font-bold border border-yellow-200 mb-2">
                  View My Certificates
               </button>

               <button onClick={() => { supabase.auth.signOut(); setShowProfileModal(false); }} className="w-full bg-red-50 text-red-600 py-3 rounded-lg text-sm font-medium hover:bg-red-100 transition">
                 Sign Out
               </button>
             </div>
           </div>
        </div>
      )}

    </div>
  )
}

export default App