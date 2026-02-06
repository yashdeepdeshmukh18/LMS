import { supabase } from '../supabase' 

export const getCourseById = async (courseId) => {

  console.log("cid : ",courseId)

  const { data, error } = await supabase.functions.invoke('get-course-by-id', {
    method: 'POST', // standard for Edge Functions
    body: {courseId : courseId}
  })

  console.log("course details : ",data);

  if (error) {
    console.error('API Error:', error)
    throw error
  }

  return data
}