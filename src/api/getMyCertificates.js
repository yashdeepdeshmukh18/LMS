import { supabase } from '../supabase'; 

export const getMyCertificates = async () => {
  try {
    // No body needed; the backend uses the Auth token to find the user
    const { data, error } = await supabase.functions.invoke('get-my-certificates', {
      method: 'POST', // invoke uses POST by default, but good to be explicit
    });

    console.log("get my cerficate api res : ",data)

    if (error) throw error;
    
    return { data: data.data, error: null };
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return { data: null, error };
  }
};