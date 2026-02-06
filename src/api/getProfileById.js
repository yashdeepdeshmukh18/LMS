// src/api/getProfileById.js
import { supabase } from '../supabase';

export const getProfileById = async (userId) => {
  try {
    const { data, error } = await supabase.functions.invoke('get-profile-by-id', {
      body: { userId }
    });

    if (error) throw error;
    
    // The edge function returns { full_name: "Name" }
    // or sometimes wraps it in data depending on how you structured the return.
    // Based on the code above, it returns the object directly.
    return data; 
    
  } catch (error) {
    console.error("Error fetching profile via Edge Function:", error);
    return null;
  }
};