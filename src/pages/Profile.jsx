import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import editIcon from "../assets/icons/editIcon.svg";
import shareIcon from "../assets/icons/share.svg";

const ProfilePage = () => {

  const [isLoggedIn, setIsLoggedIn ] = useState(true);

  return (
    <div className="min-h-screen bg-[#FDF6FF]">

      {/* Top Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
  

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Left Sidebar */}
        <div className="space-y-6">

          {/* Profile Card */}
          <div className="relative bg-white rounded-2xl shadow-md p-6 ">
            
              <img src={editIcon} className="absolute top-4 right-4 cursor-pointer w-5"/>

              <div className="relative mx-auto text-center w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-white text-4xl font-semibold">
                G
              </div>
            
              <div className="flex flex-col gap-3 justify-strech">
                <h2 className="mt-5 text-center text-2xl font-semibold">G. Vyshnavi</h2>
                <p className="text font-openSans-sm mt-1">Class : 10th CBSE</p>
                <p className="text-sm font-openSans">School : XYZ Public School</p>
              </div>

            <button className="mt-4 border flex gap-2 justify-center border-purple-400 text-purple-600 px-4 py-2 rounded-lg w-full">
              <img src={shareIcon} className="w-5"/>
               Share Profile Link
            </button>
            <button className="mt-3 flex item-center mx-auto text-purple-600 underline text-sm">
              Edit Profile
            </button>
          </div>

          {/* Learning Preferences */}
          <div className="bg-white rounded-2xl flex flex-col gap-2 shadow-md p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold font-openSans">Learning Preferences</h3>
              <img src={editIcon} className="cursor-pointer w-5"/>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-openSans mb-2">Preferred Subjects :</p>
              <ul className="list-disc font-openSans font-semibold ml-5 text-purple-600 text-sm space-y-1">
                <li>Mathematics</li>
                <li>English</li>
                <li>Science</li>
              </ul>
            </div>
          </div>

          {/* About Me */}
          <div className="bg-white flex flex-col gap-3 rounded-2xl font-openSans shadow-md p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">About Me :</h3>
              <img src={editIcon} className="cursor-pointer w-5"/>
            </div>

            <p className="text-sm text-black mb-4">
              Curious learner who enjoys solving maths problems and exploring new
              concepts through visuals.
            </p>

            <p className="text-sm mb-4">📧 Contact: student@email.com</p>

            <button className="border border-purple-400 text-purple-600 px-4 py-2 rounded-lg w-full">
              +  Additional Info
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-3 font-openSans space-y-6">

          {/* Progress */}
          <h2 className="text-2xl font-semibold">Progress</h2>

          {/* Courses */}
          <div className="bg-white flex flex-col gap-3 rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Courses ⓘ</h3>
              <span className="text-[#1877F2] text-sm cursor-pointer">
                view all courses
              </span>
            </div>

            <p className="text-sm underline">
              Complete Mathematics Course, Science Explorer (Class 10),
              English Grammar Essentials
            </p>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold mb-1">Projects / Assignments ⓘ</h3>
              <p className="text-sm text-gray-600">
                Showcase your work here. Add assignments or science fair projects
                you’ve completed.
              </p>
            </div>

            <button className="border border-[#BA68C8] text-[#8300C4] px-5 py-2 rounded-lg">
              +    Add your Projects
            </button>
          </div>

          {/* Education */}
          <h2 className="text-2xl font-semibold">Education</h2>

          {/* Credentials */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold mb-1">Credentials ⓘ</h3>
              <p className="text-sm text-gray-600">
                Add your educational background to let teachers know which class
                you are studying in.
              </p>
            </div>

            <button className="border border-[#BA68C8] text-[#8300C4] px-5 py-2 rounded-lg">
              +      Add Education
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
      
    </div>
  );  
};

export default ProfilePage;
