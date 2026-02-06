import { supabase } from "../supabase";

export default function GoogleButton() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback",
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      style={{
        padding: "12px 16px",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      Continue with Google
    </button>
  );
}
