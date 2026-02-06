import React, { useEffect } from "react";
import "./SignUpForm"
import { useState } from "react";
import Device from "../assets/Home.png";
import SignUpForm from "./SignUpForm";
import LoginForm from "../Components/LoginForm";
import { useNavigate } from "react-router-dom";
import { countAllStudents } from "../api/countAllStudents";


const HeroSection = () => {

  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();

  const [studentCount, setStudentCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(true)

  useEffect(() => {
  const loadCount = async () => {
    setLoadingCount(true)
    const count = await countAllStudents()
    setStudentCount(count)
    setLoadingCount(false)
  }

  if(studentCount==0)
    loadCount()
}, [])


  return (
    <section className="w-full bg-[#FBF5FF] py-10 sm:py-12 px-4 sm:px-6 font-openSans">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-end gap-10">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          
          {/* Heading */}
          <h1 className="
            font-bold tracking-[0.02em]
            text-3xl sm:text-4xl md:text-5xl lg:text-[70px]
            leading-tight lg:leading-[100px]
          ">
            Learn
            <span className="
              text-[#8d3bb0] font-bold tracking-[0.02em]
              text-3xl sm:text-4xl md:text-5xl lg:text-[70px]
              leading-tight lg:leading-[100px] whitespace-nowrap
            "> CBSE subjects</span>{" "}
            in a smart way!
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0">
            AI-powered learning designed to help students understand concepts
            faster, practice better, and score higher.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button onClick={()=>{navigate("/courses")}} className="border border-[#440067] text-purple-600 hover:bg-purple-50 text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition shadow-[2px_2px_2px_0px_#00000040]">
              Explore Courses
            </button>
            <button
              onClick={() => setShowSignup(true)}
             className="bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition shadow-[2px_2px_2px_0px_#00000040]">
              Start Learning
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
            {/* Avatar circles */}
            <div className="flex -space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-400 border-2 border-white"></div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-500 border-2 border-white"></div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-600 border-2 border-white"></div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              
            {loadingCount ? (
              <span className="font-semibold text-gray-400 animate-pulse">
                loading...
              </span>
            ) : (
              <span className="font-semibold text-gray-800">
                {studentCount}+
              </span>
            )} students
              are already learning
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={Device}
            alt="Learning Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain"
          />
        </div>

      </div>

       <SignUpForm  isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }} />

        <LoginForm isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }} />
    </section>
  );
};

export default HeroSection;
