import { supabase } from '../supabase'

export const updateProfile = async (updates) => {
  // We send the 'updates' object (e.g., { full_name: "New Name", bio: "New Bio" })
  const { data, error } = await supabase.functions.invoke('update-profile', {
    method: 'POST',
    body: updates
  })

  if (error) {
    console.error('API Error (Update Profile):', error)
    throw error
  }

  return data
}