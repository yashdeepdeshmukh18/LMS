import { supabase } from '../supabase' 

export const getAllCourses = async () => {
  const { data, error } = await supabase.functions.invoke('get-all-courses', {
    method: 'POST', // standard for Edge Functions
  })

  // console.log("course details : ",data);

  if (error) {
    console.error('API Error:', error)
    throw error
  }

  return data
}