import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import logo from "../assets/logo.png";

import { AuthContext } from "../context/AuthContext"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [ isLoggedIn, setIsLoggedIn ] = useState(true);

  const { session,setSession, profile, handleGoogleLogin } = useContext(AuthContext);

  const navigate = useNavigate();

 

 

  const handleLogout = () => {
    localStorage.removeItem("sb-nebwjgdwtdpqrwokjszl-auth-token");
    setSession(null);
    navigate("/");
  };


  return (
    <nav className="w-full bg-[#F8CDFF] px-4 sm:px-6 lg:px-10 py-3">
      <div className="max-w-7xl mx-auto flex items-center">
        
        {/* Left: Hamburger + Logo */}
        <div className="flex w-full mx-auto  items-center gap-3">
          {/* Hamburger Button (Mobile Only) */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          
          <div className="flex gap-2">
            <img
              src={logo}
              alt="SmaranAI Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 object-contain"
            />

            <div className="leading-tight">
              <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-purple-700">
                SmaranAI.in
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500">
                Learn Smart with Smaran AI
              </p>
            </div>
          </div>

      
        {/* Desktop Menu - CENTERED */}
        <div className="hidden md:flex justify-center w-2/3">
          <ul className="flex items-center gap-8 text-sm lg:text-base font-medium text-gray-700">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `pb-1 ${
                    isActive
                      ? "border-b-2 border-purple-700 text-purple-700"
                      : "hover:text-purple-600"
                  }`
                }
              >
                HOME
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `pb-1 ${
                    isActive
                      ? "border-b-2 border-purple-700 text-purple-700"
                      : "hover:text-purple-600"
                  }`
                }
              >
                COURSES
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `pb-1 ${
                    isActive
                      ? "border-b-2 border-purple-700 text-purple-700"
                      : "hover:text-purple-600"
                  }`
                }
              >
                DASHBOARD
              </NavLink>
            </li>
          </ul>
        </div>


        {/* Right Section */}
        <div className="flex  items-center gap-3 ">
          <button className="font-openSans bg-purple-500 hover:bg-purple-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 transition">
            Premium <span>👑</span>
          </button>

          {/* User Avatar */}

          {!session ? (
            <button
               onClick={handleGoogleLogin}
               className="bg-white text-purple-700 hover:bg-purple-50 border border-purple-200 font-medium text-xs sm:text-sm px-4 py-2 rounded-lg transition shadow-sm"
             >
               Login
             </button>
          ) : (
              <div className="relative">

                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1"
                >

                {profile?.avatar_url ? (
                 <img
                   src={profile.avatar_url}
                   alt="User Avatar"
                   className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white shadow-sm cursor-pointer hover:opacity-90"
                 />
               ) : (
                 <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer border-2 border-white shadow-sm">
                  
                   {/* LOGIC: Check if name exists, otherwise show Spinner */}
                   {profile?.full_name ? (
                     profile.full_name.charAt(0).toUpperCase()
                   ) : (
                     // Loader (Spinner)
                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                   )}

                 </div>
               )}

                { profileOpen ?
                  <ChevronUp size={16} />
                 : <ChevronDown size={16} />
                }
                </button> 


                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg py-2 z-50">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Settings
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Help Center
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    onClick={handleLogout} >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
      
          )}

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-14 bg-white rounded-lg shadow-lg py-4 px-6 space-y-4 text-sm font-medium text-gray-700">
          <div>
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-purple-700 font-semibold" : ""
              }
            >
              HOME
            </NavLink>
          </div>
          
          <div>
            <NavLink
              to="/courses"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-purple-700 font-semibold" : ""
              }
            >
              COURSES
            </NavLink>
          </div>

          <div>
            <NavLink
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-purple-700 font-semibold" : ""
              }
            >
              DASHBOARD
            </NavLink>
          </div>

        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;




// import React, { useState, useContext } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import logo from "../assets/logo.png";
// import { AuthContext } from "../context/AuthContext"; // Ensure this path is correct

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Consume Auth Context
//   const { session, profile, handleGoogleLogin } = useContext(AuthContext);

//   const [profileOpen, setProfileOpen] = useState(false);

//   const navigate = useNavigate();

 

//   const handleLogin = () => {
//     localStorage.setItem("isLoggedIn", "true");
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     localStorage.setItem("isLoggedIn", "false");
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   return (
//     <nav className="w-full bg-[#F8CDFF] px-4 sm:px-6 lg:px-10 py-3">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
        
//         {/* Left: Logo */}
//         <div className="flex items-center gap-2">
//           <Link to="/" className="flex items-center gap-2">
//             <img
//               src={logo}
//               alt="SmaranAI Logo"
//               className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 object-contain"
//             />
//             <div className="leading-tight">
//               <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-purple-700">
//                 SmaranAI.in
//               </h1>
//               <p className="text-[10px] sm:text-xs text-gray-500">
//                 Learn Smart with Smaran AI
//               </p>
//             </div>
//           </Link>
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex items-center gap-6 lg:gap-10 text-sm lg:text-base font-medium text-gray-700">
//           <li>
//             <Link to="/" className="hover:text-purple-600 transition">
//               HOME
//             </Link>
//           </li>
//           <li>
//             <Link to="/courses" className="hover:text-purple-600 transition">
//               COURSES
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard" className="hover:text-purple-600 transition">
//               DASHBOARD
//             </Link>
//           </li>
//         </ul>

//         {/* Right Section */}
//         <div className="flex items-center gap-3 sm:gap-4">
//           <button className="font-openSans bg-purple-500 hover:bg-purple-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 transition shadow-sm">
//             Premium <span>👑</span>
//           </button>

//           {/* ... inside Navbar.jsx return ... */}

//           {/* AUTH LOGIC START */}
//           {!session ? (
//             // 1. SHOW LOGIN BUTTON IF NO SESSION
//             <button
//               onClick={handleGoogleLogin}
//               className="bg-white text-purple-700 hover:bg-purple-50 border border-purple-200 font-medium text-xs sm:text-sm px-4 py-2 rounded-lg transition shadow-sm"
//             >
//               Login
//             </button>
//           ) : (
//             // 2. SHOW AVATAR IF SESSION EXISTS
//             <Link to="/dashboard">
//               {profile?.avatar_url ? (
//                 <img
//                   src={profile.avatar_url}
//                   alt="User Avatar"
//                   className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white shadow-sm cursor-pointer hover:opacity-90"
//                 />
//               ) : (
//                 <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer border-2 border-white shadow-sm">
                  
//                   {/* LOGIC: Check if name exists, otherwise show Spinner */}
//                   {profile?.full_name ? (
//                     profile.full_name.charAt(0).toUpperCase()
//                   ) : (
//                     // Loader (Spinner)
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   )}

//                 </div>
//               )}
//             </Link>
//           )}
//           {/* AUTH LOGIC END */}

//           {/* Hamburger Button (Mobile Only) */}
//           <button
//             className="md:hidden text-gray-700 focus:outline-none ml-1"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <svg
//               className="w-7 h-7"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {menuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden mt-4 bg-white rounded-xl shadow-xl py-4 px-6 space-y-4 text-sm font-medium text-gray-700 border border-purple-100">
//           <Link
//             to="/"
//             onClick={() => setMenuOpen(false)}
//             className="block hover:text-purple-600"
//           >
//             HOME
//           </Link>
//           <Link
//             to="/courses"
//             onClick={() => setMenuOpen(false)}
//             className="block hover:text-purple-600"
//           >
//             COURSES
//           </Link>
//           <Link
//             to="/dashboard"
//             onClick={() => setMenuOpen(false)}
//             className="block hover:text-purple-600"
//           >
//             DASHBOARD
//           </Link>

//           {/* Mobile Login Button (Only if not logged in) */}
//           {!session && (
//             <div className="pt-2 border-t border-gray-100">
//               <button
//                 onClick={() => {
//                   handleGoogleLogin();
//                   setMenuOpen(false);
//                 }}
//                 className="w-full text-center bg-purple-100 text-purple-700 py-2 rounded-lg font-semibold"
//               >
//                 Login with Google
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
