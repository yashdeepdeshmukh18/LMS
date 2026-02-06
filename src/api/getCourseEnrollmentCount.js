import { supabase } from '../supabase';

export const getCourseEnrollmentCount = async (courseId) => {
  try {
    const { data, error } = await supabase.functions.invoke('course-enrollment-count', {
      body: { courseId }
    });

    if (error) throw error;
    
    return data.count || 0;
  } catch (error) {
    console.error('Error counting enrollments:', error);
    return 0; 
  }
};