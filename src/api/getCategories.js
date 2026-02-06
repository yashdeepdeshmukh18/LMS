import { supabase } from '../supabase' // Shared client

export const getCategories = async () => {
  const { data, error } = await supabase.functions.invoke('get-categories', {
    method: 'GET' // A simple GET request is fine here
  })

  console.log("categories data : ",data)

  if (error) {
    console.error('API Error (Categories):', error)
    throw error
  }

  return data
}