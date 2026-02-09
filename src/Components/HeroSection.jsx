import React, { useEffect, useState, useContext } from "react";
import Device from "../assets/Home.png";
import SignUpForm from "./SignUpForm";
import LoginForm from "../Components/LoginForm";
import { useNavigate } from "react-router-dom";
import { countAllStudents } from "../api/countAllStudents";

// Theme Context
import { HeroThemeContext } from "../context/themes/heroThemes";

const HeroSection = () => {
  const heroTheme = useContext(HeroThemeContext);

  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();

  const [studentCount, setStudentCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(true);

  useEffect(() => {
    const loadCount = async () => {
      setLoadingCount(true);
      const count = await countAllStudents();
      setStudentCount(count);
      setLoadingCount(false);
    };

    if (studentCount === 0) loadCount();
  }, []);

  return (
    <section
      className={`w-full py-10 sm:py-12 px-4 sm:px-6 font-openSans ${heroTheme.sectionBg}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-end gap-10">

        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left">

          {/* Heading */}
          <h1
            className={`
              font-bold tracking-[0.02em]
              text-3xl sm:text-4xl md:text-5xl lg:text-[70px]
              leading-tight lg:leading-[100px]
              ${heroTheme.headingText}
            `}
          >
            Learn
            <span
              className={`
                font-bold tracking-[0.02em]
                text-3xl sm:text-4xl md:text-5xl lg:text-[70px]
                whitespace-nowrap
                ${heroTheme.highlightText}
              `}
            >
              {" "}CBSE subjects
            </span>{" "}
            in a smart way!
          </h1>

          {/* Subheading */}
          <p
            className={`
              mt-4 text-sm sm:text-base md:text-lg max-w-xl
              mx-auto md:mx-0
              ${heroTheme.subText}
            `}
          >
            AI-powered learning designed to help students understand concepts
            faster, practice better, and score higher.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">

            <button
              onClick={() => navigate("/courses")}
              className={`
                text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3
                rounded-lg font-medium transition
                shadow-[2px_2px_2px_0px_#00000040]
                ${heroTheme.secondaryBtn}
              `}
            >
              Explore Courses
            </button>

            <button
              onClick={() => setShowSignup(true)}
              className={`
                text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3
                rounded-lg font-medium transition
                shadow-[2px_2px_2px_0px_#00000040]
                ${heroTheme.primaryBtn}
              `}
            >
              Start Learning
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-6 flex items-center justify-center md:justify-start gap-3">

            {/* Avatars */}
            <div className="flex -space-x-2">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white ${heroTheme.avatar1}`}></div>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white ${heroTheme.avatar2}`}></div>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white ${heroTheme.avatar3}`}></div>
            </div>

            {/* Student Count */}
            <p className={`text-xs sm:text-sm ${heroTheme.studentText}`}>
              {loadingCount ? (
                <span className="font-semibold text-gray-400 animate-pulse">
                  loading...
                </span>
              ) : (
                <span className="font-semibold">
                  {studentCount}+
                </span>
              )}{" "}
              students are already learning
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src={Device}
            alt="Learning Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain"
          />
        </div>
      </div>

      {/* SIGNUP MODAL */}
      <SignUpForm
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />

      {/* LOGIN MODAL */}
      <LoginForm
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
    </section>
  );
};

export default HeroSection;
