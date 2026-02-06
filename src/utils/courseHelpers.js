// src/utils/courseHelpers.js
import { getSections } from "../api/getSections";
import { getLessonsBySection } from "../api/getLessonsBySection"; // Assuming you have this exported

export const fetchFullCourseStructure = async (courseId) => {
  try {
    // 1. Fetch all sections
    const sections = await getSections(courseId);
    if (!sections) return [];

    // 2. Fetch lessons for ALL sections in parallel
    const structureWithLessons = await Promise.all(
      sections.map(async (section,i) => {
        const { data: lessons } = await getLessonsBySection(section.id);
        
        // 3. Transform DB Lessons to Frontend Sidebar Format
        const formattedLessons = (lessons || []).map(lesson => {
          // Parse content_data safely
          let contentData = lesson.content_data || {};
          if (typeof contentData === "string") {
            try { contentData = JSON.parse(contentData); } catch(e) {}
          }

          return {
            id: lesson.id,
            title: lesson.title,
            contentType: lesson.content_type, // 'video', 'article', 'assignment', 'quiz'
            orderIndex: lesson.order_index,
            
            // Map DB fields to UI fields based on type
            videoUrl: lesson.content_type === 'video' ? contentData.url : null,
            duration: lesson.content_type === 'video' ? contentData.duration : null,
            
            // For Article
            textbook: lesson.content_type === 'article' ? contentData : null,
            
            // For Quiz/Assignment
            quizData: (lesson.content_type === 'quiz' || lesson.content_type === 'assignment') 
              ? contentData 
              : null,
              
            transcripts: contentData.transcripts || null
          };
        });

        // Return the Chapter Object
        return {
          chapterId: `ch${i + 1}`,
          chapterTitle: section.title,
          lessons: formattedLessons.sort((a, b) => a.orderIndex - b.orderIndex)
        };
      })
    );

    return structureWithLessons;
  } catch (error) {
    console.error("Failed to build course structure:", error);
    return [];
  }
};