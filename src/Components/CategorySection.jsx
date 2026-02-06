import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import LeftArrow from "../assets/icons/leftArrow.svg";
import RightArrow from "../assets/icons/rightArrow.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CourseContext } from "../context/CourseContext";

// This component handles the slider for ONE category (e.g., just Mathematics)
const CategorySection = ({ categoryName, courses }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  
  // Responsive logic for this specific slider
  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);
  
  const handleNext = () => {
    if (currentIndex + itemsPerPage < courses.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const {setCourseOnView} = useContext(CourseContext);
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleViewCourse = (course)=>{
      setCourseOnView(course)
      navigate(`/view-course/${course.id}`)
  }

  if (!courses || courses.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Category Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 capitalize">
        {categoryName}
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`absolute -left-6 top-1/2 -translate-y-1/2 z-10 
          ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-110 transition-transform"}`}
        >
          <img src={LeftArrow} alt="Prev" className="w-8 h-8" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= courses.length - itemsPerPage}
          className={`absolute -right-6 top-1/2 -translate-y-1/2 z-10 
          ${
            currentIndex >= courses.length - itemsPerPage
              ? "opacity-30 cursor-not-allowed"
              : "hover:scale-110 transition-transform"
          }`}
        >
          <img src={RightArrow} alt="Next" className="w-8 h-8" />
        </button>

        {/* Slider Window */}
        <div className="overflow-hidden w-full">
          <div className="grid ml-2 md:ml-2 w-[98%] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((course) => (
                <CourseCard
                  key={course.id}
                  category={categoryName}
                  title={course.title}
                  grade={course.grade}
                  // Using static lessons as fallback if missing in JSON
                  lessons={course.lessons || 24} 
                  onView={()=>{handleViewCourse(course)}} 
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;