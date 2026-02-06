import { supabase } from '../supabase'

export const updateProfile = async (updates) => {
  const { data, error } = await supabase.functions.invoke('update-profile', {
    body: updates
  })

  console.log("error : ",error)

  if (error) throw error
  return data
}