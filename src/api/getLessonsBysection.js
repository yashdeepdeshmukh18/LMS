import { supabase } from '../supabase'; 

export const getLessonsBySection = async (sectionId) => {
    console.log("sectionId : ",sectionId)
  try {
    const { data, error } = await supabase.functions.invoke('get-lessons-by-section', {
      body: { sectionId },
    });

    console.log("getLessonsBySectionAPI : ",data);

    if (error) throw error;
    
    // The edge function wraps the result in a "data" property
    return { data: data.data, error: null };
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return { data: null, error };
  }
};