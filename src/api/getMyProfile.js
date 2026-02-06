import { supabase } from '../supabase'

export const getMyProfile = async () => {
  const { data, error } = await supabase.functions.invoke('get-my-profile', {
    method: 'GET'
  })

  if (error) {
    console.error('API Error (Get Profile):', error)
    throw error
  }

  return data
}