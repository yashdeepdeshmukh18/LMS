import { supabase } from '../supabase' // Use your shared client

export const enrollCourse = async (courseId) => {
  const { data, error } = await supabase.functions.invoke('enroll-course', {
    body: { course_id: courseId }
  })
  console.log("enrol couse api : ",data);

  if (error) {
    // If the function throws an error (like "You must be logged in"), we catch it here
    throw new Error(error.message || 'Enrollment failed')
  }

  // Handle custom errors returned inside the data object (e.g. valid JSON but logic error)
  if (data && data.error) {
    throw new Error(data.error)
  }

  return data
}