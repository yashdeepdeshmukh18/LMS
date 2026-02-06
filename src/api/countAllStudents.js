import { supabase } from '../supabase';

export const countAllStudents = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('count-all-students', {
      method: 'GET'
    });

    if (error) throw error;
    
    // The edge function returns object like { count: 123 }
    return data.count || 0;
  } catch (error) {
    console.error('Error counting students:', error);
    return 0; // Return 0 on error so UI doesn't break
  }
};