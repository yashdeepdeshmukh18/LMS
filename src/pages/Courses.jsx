import React, { useContext } from "react";
import Search from "../assets/icons/search.svg";
import { CourseContext } from "../context/CourseContext";
import CategorySection from "../Components/CategorySection";
import { CoursesThemeContext } from "../context/themes/coursesThemes";

const Courses = () => {
  const { categoriesWithCourses } = useContext(CourseContext);

  // 🎨 Theme values
  const {
    pageBg,
    headerText,
    searchBg,
    border,
    primaryBtn,
    primaryHover,
    chipBg,
    chipText,
    chipBorder,
  } = useContext(CoursesThemeContext);

  return (
    <div
      className="min-h-screen"
      style={{ background: pageBg }}
    >
      <div className="max-w-7xl mx-auto py-10 sm:py-12 px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          
          <h1
            className="text-3xl font-bold"
            style={{ color: headerText }}
          >
            All Courses
          </h1>

          {/* Search Bar */}
          <div className="flex items-center w-full md:w-auto">
            
            <div
              className="flex items-center border rounded-lg px-2 py-1 w-full sm:w-56 md:w-72"
              style={{
                background: searchBg,
                borderColor: border,
              }}
            >
              <div className="flex w-full">
                <img src={Search} className="w-5 md:w-8" alt="Search" />
                
                <input
                  type="text"
                  placeholder="search for courses"
                  className="w-full font-openSans py-1 px-3 md:py-2 md:px-6 outline-none text-sm md:text-xl bg-transparent"
                />
              </div>
            </div>

            <button
              className="font-inter font-normal text-xl md:text-2xl leading-tight tracking-wide px-3 md:px-6 py-1 md:py-2 rounded-r-lg transition"
              style={{
                background: primaryBtn,
                color: "#FFFFFF",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = primaryHover)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = primaryBtn)
              }
            >
              Search
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-12">
          
          <button
            className="font-openSans px-4 py-2 rounded-full text-sm transition"
            style={{
              background: chipBg,
              color: chipText,
            }}
          >
            Popular
          </button>

          <button
            className="font-openSans px-4 py-2 rounded-full text-sm transition"
            style={{
              border: `1px solid ${chipBorder}`,
              color: chipBorder,
            }}
          >
            Beginner
          </button>

          <button
            className="px-4 py-2 rounded-full text-sm transition"
            style={{
              border: `1px solid ${chipBorder}`,
              color: chipBorder,
            }}
          >
            New
          </button>
        </div>

        {/* Category Sections */}
        {categoriesWithCourses && categoriesWithCourses.length > 0 ? (
          categoriesWithCourses.map((category) => (
            <CategorySection
              key={category.id}
              categoryName={category.name}
              courses={category.courses}
            />
          ))
        ) : (
          <div className="text-center py-20 text-xl">
            Loading courses...
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
