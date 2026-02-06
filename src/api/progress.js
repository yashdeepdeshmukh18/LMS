import { supabase } from '../supabase';

// 1. Call Edge Function to Mark Complete
export const toggleLessonCompletion = async (userId, lessonId, isComplete) => {
  try {
    const { data, error } = await supabase.functions.invoke('mark-lesson-complete', {
      body: { userId, lessonId, isComplete }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error toggling progress via Edge Function:", error);
  }
};

// 2. Call Edge Function to Get Progress
export const getUserProgress = async (userId) => {
  try {
    const { data, error } = await supabase.functions.invoke('get-user-progress', {
      body: { userId }
    });

    if (error) throw error;
    
    // The Edge Function returns { completedIds: [...] }
    return data.completedIds || [];
    
  } catch (error) {
    console.error("Error fetching progress via Edge Function:", error);
    return [];
  }
};


// 3. NEW: Calculate Progress % via Edge Function
export const getStudentProgressMap = async (userId) => {
  try {
    if (!userId) {
        console.warn("getStudentProgressMap called without userId");
        return {};
    }

    const { data, error } = await supabase.functions.invoke('get-student-progress-map', {
      // ⚠️ FIX: Explicitly stringify the body
      body: JSON.stringify({ userId: userId }) 
    });

    if (error) {
        // Log the actual error message from the Edge Function
        // It might be hidden inside error.context or error.message
        const msg = await error.context?.json() || error.message; 
        console.error("Edge Function Error:", msg);
        throw error;
    }
    
    return data || {};
    
  } catch (error) {
    console.error("Error calculating dashboard progress:", error);
    return {};
  }
};