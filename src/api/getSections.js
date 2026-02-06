import { supabase } from '../supabase'

export const getSections = async (courseId) => {
  const { data, error } = await supabase.functions.invoke('get-sections', {
    body: { course_id: courseId }
  })

  console.log("section data : ",data)

  if (error) throw error
  return data
}