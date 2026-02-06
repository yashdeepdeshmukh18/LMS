import { useEffect } from "react";
import { supabase } from "../supabase";

export default function AuthCallback() {
  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Session error:", error.message);
        return;
      }

      const accessToken = data.session?.access_token;

      if (accessToken) {
        // ✅ Store token in localhost
        localStorage.setItem("supabase_token", accessToken);
        console.log("Access token stored in localStorage");
      }

      console.log("Logged in user:", data.session.user);

      // redirect after login
      window.location.href = "/";
    };

    handleAuth();
  }, []);

  return <p>Signing you in...</p>;
}
