import { supabase } from '../supabase'

export const getInstructor = async (courseId) => {
  const { data, error } = await supabase.functions.invoke('get-instructor', {
    body: { course_id: courseId }
  })

  if (error) throw error
  return data
}