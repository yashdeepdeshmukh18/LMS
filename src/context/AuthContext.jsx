import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { getMyCourses } from "../api/getMyCourses";
import  { getMyProfile } from "../api/getMyProfile";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) handleLoginSuccess();
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);

        if (session) {
          handleLoginSuccess();
        } else {
          setProfile(null);
          setMyCourses([]);
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  const handleLoginSuccess = async () => {
    try {
      const [courses, profile] = await Promise.all([
        getMyCourses(),
        getMyProfile(),
      ]);
      setMyCourses(courses || []);
      setProfile(profile);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        setSession,
        profile,
        setProfile,
        myCourses,
        handleGoogleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
