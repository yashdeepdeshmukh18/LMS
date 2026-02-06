import { supabase } from "../supabase";

export async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.access_token) {

    

    return {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    };
  }

  return {
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    "Content-Type": "application/json",
  };
}
