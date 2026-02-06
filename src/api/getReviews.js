import { supabase } from '../supabase'

export const getReviews = async (courseId) => {
  const { data, error } = await supabase.functions.invoke('get-reviews', {
    body: { course_id: courseId }
  })

  if (error) throw error
  return data
}