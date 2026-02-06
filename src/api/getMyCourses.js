import { supabase } from '../supabase'

export const getMyCourses = async () => {
  const { data, error } = await supabase.functions.invoke('get-my-courses', {
    method: 'GET' 
    // Supabase automatically attaches the "Authorization: Bearer <token>" header here
  })

  if (error) {
    console.error('API Error (My Courses):', error)
    throw error
  }

  return data
}