import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

import { getAllCourses } from "../api/getAllCourses";
import { getCategories } from "../api/getCategories";
import { enrollCourse } from "../api/enrollCourse";
import { getInstructor } from "../api/getInstructor";
import { getReviews } from "../api/getReviews";
import { getSections } from "../api/getSections";
import { getLessonsBySection } from "../api/getLessonsBySection";
import { getMyCertificates } from "../api/getMyCertificates";

import { getCategoriesWithCourses } from "../api/getCategoriesWithCourses";

export const CourseContext = createContext(null);

export const CourseProvider = ({ children }) => {
  const { session, handleGoogleLogin } = useContext(AuthContext);

  // Data
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesWithCourses, setCategoriesWithCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [enrollingId, setEnrollingId] = useState(null);

  // Modals
  const [showInstructorModal, setShowInstructorModal] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState(null);
  const [loadingInstructor, setLoadingInstructor] = useState(false);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentReviews, setCurrentReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const [showCurriculumModal, setShowCurriculumModal] = useState(false);
  const [currentSections, setCurrentSections] = useState([]);
  const [expandedSectionId, setExpandedSectionId] = useState(null);
  const [currentLessons, setCurrentLessons] = useState([]);
  const [loadingSections, setLoadingSections] = useState(false);
  const [loadingLessons, setLoadingLessons] = useState(false);

  const [showCertModal, setShowCertModal] = useState(false);
  const [myCertificates, setMyCertificates] = useState([]);
  const [loadingCerts, setLoadingCerts] = useState(false);


  const [courseOnView,setCourseOnView]=useState([]);





  // Load public data
  useEffect(() => {
    loadPublicData();
  }, []);

  const loadPublicData = async () => {
    try {
      const [allCourses, allCats,allCatsWithCourses] = await Promise.all([
        getAllCourses(),
        getCategories(),
        getCategoriesWithCourses(),
      ]);
      setCourses(allCourses || []);
      setCategories(allCats || []);
      setCategoriesWithCourses(allCatsWithCourses || [])
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!session) {
      alert("Please login");
      handleGoogleLogin();
      return;
    }

    try {
      setEnrollingId(courseId);
      await enrollCourse(courseId);
      alert("Enrolled successfully");
    } catch (err) {
      alert(err.message);
    } finally {
      setEnrollingId(null);
    }
  };

 


  return (
    <CourseContext.Provider
      value={{
        courses,
        categories,
        categoriesWithCourses,
        loading,
        selectedCategory,
        setSelectedCategory,
        enrollingId,
        handleEnroll,

        // Modals
        showInstructorModal,
        setShowInstructorModal,
        currentInstructor,
        loadingInstructor,

        showReviewModal,
        currentReviews,
        loadingReviews,

        showCurriculumModal,
        currentSections,
        expandedSectionId,
        currentLessons,

        showCertModal,
        myCertificates,
        loadingCerts,


        courseOnView,
        setCourseOnView,

      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
