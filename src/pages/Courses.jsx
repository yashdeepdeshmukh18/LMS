import React, { useContext } from "react";
import Search from "../assets/icons/search.svg";
import { CourseContext } from "../context/CourseContext";
import CategorySection from "../Components/CategorySection"; // Import the component we made above

const Courses = () => {
  const { categoriesWithCourses } = useContext(CourseContext);

  console.log(categoriesWithCourses)

  return (
    <div className="bg-[#FBF5FF] min-h-screen">

      <div className="max-w-7xl mx-auto py-10 sm:py-12 px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            All Courses
          </h1>

          {/* Search Bar */}
          <div className="flex items-center w-full md:w-auto">
            <div className="flex items-center border border-black rounded-lg px-2 py-1 bg-white w-full sm:w-56 md:w-72">
              <div className="flex w-full">
                <img src={Search} className="w-5 md:w-8" alt="Search" />
                <input
                  type="text"
                  placeholder="search for courses"
                  className="w-full text-[#787878] font-openSans py-1 px-3 md:py-2 md:px-6 outline-none text-sm md:text-xl"
                />
              </div>
            </div>
            <button className="bg-[#BA68C8] text-[#FFFFFF] font-inter font-normal text-xl md:text-2xl leading-tight tracking-wide px-3 md:px-6 py-1 md:py-2 rounded-r-lg hover:bg-[#b61fd1]">
              Search
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-12">
          <button className="bg-[#BA68C8] font-openSans text-white px-4 py-2 rounded-full text-sm hover:bg-[#a04eb0]">
            Popular
          </button>
          <button className="border border-[#BA68C8] text-[#8300C4] font-openSans px-4 py-2 rounded-full text-sm hover:bg-[#f3e0ff]">
            Beginner
          </button>
          <button className="border border-[#BA68C8] text-[#8300C4] px-4 py-2 rounded-full text-sm hover:bg-[#f3e0ff]">
            New
          </button>
        </div>

        {/* DYNAMIC CATEGORY SECTIONS */}
        {/* We map over the array. If you have "Mathematics" and "Science" in your context, 
            this will create two separate rows. */}
        
        {categoriesWithCourses && categoriesWithCourses.length > 0 ? (
          categoriesWithCourses.map((category) => {
            
            // Merge the internal dummy arrays into one single list for this category
            // We use optional chaining (?.) and defaulting to [] to avoid crashes


            return (
              <CategorySection 
                key={category.id} 
                categoryName={category.name} 
                courses={category.courses} 
              />
            );
          })
        ) : (
          <div className="text-center py-20 text-gray-500 text-xl">
            Loading courses...
          </div>
        )}

      </div>
    </div>
  );
};

export default Courses;