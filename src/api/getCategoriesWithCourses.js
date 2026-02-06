import { supabase } from '../supabase'

export const getCategoriesWithCourses = async () => {
  const { data, error } = await supabase.functions.invoke('get-categories-with-courses', {
    method: 'GET'
  })

  if (error) {
    console.error('API Error (Cats + Courses):', error)
    throw error
  }

  return data
}