// ===============================
// CourseDetailTheme.jsx (Separate Theme Page)
// ===============================

import { createContext, useContext } from "react";
import { ThemeContext } from "./rootTheme";

export const CourseDetailThemeContext = createContext();

export const CourseDetailThemeProvider = ({ children }) => {
  const { themeName } = useContext(ThemeContext);

  const courseDetailThemes = {
    light: {
      pageBg: "bg-[#FEF7FF]",
      cardBg: "bg-white border-purple-200",
      textPrimary: "text-gray-900",
      textSecondary: "text-gray-600",
      tabBg: "bg-[#F9D8FF]",
      tabActive: "bg-[#DD9AFF] text-black",
      tabInactive: "text-black hover:bg-[#EAC1FF]",
      buttonPrimary:
        "bg-[linear-gradient(90deg,#4846C6_0%,#DD9AFF_100%)] text-white",
      buttonSecondary:
        "border border-[#8B1CC342] text-[#8B1CC3] bg-white",
      avatarBg: "bg-purple-500",
    },

    dark: {
      pageBg: "bg-[#0f0f0f]",
      cardBg: "bg-[#1c1c1c] border-purple-800",
      textPrimary: "text-white",
      textSecondary: "text-gray-400",
      tabBg: "bg-[#2a2a2a]",
      tabActive: "bg-purple-700 text-white",
      tabInactive: "text-gray-300 hover:bg-purple-900",
      buttonPrimary:
        "bg-[linear-gradient(90deg,#6B46C1_0%,#F6AD55_100%)] text-white",
      buttonSecondary:
        "border border-purple-700 text-purple-300 bg-transparent",
      avatarBg: "bg-purple-700",
    },

    ocean: {
      pageBg: "bg-blue-50",
      cardBg: "bg-white border-blue-200",
      textPrimary: "text-blue-900",
      textSecondary: "text-blue-700",
      tabBg: "bg-blue-100",
      tabActive: "bg-blue-500 text-white",
      tabInactive: "text-blue-900 hover:bg-blue-200",
      buttonPrimary:
        "bg-[linear-gradient(90deg,#06B6D4_0%,#3B82F6_100%)] text-white",
      buttonSecondary:
        "border border-blue-300 text-blue-700 bg-white",
      avatarBg: "bg-blue-500",
    },

    sunset: {
      pageBg: "bg-orange-50",
      cardBg: "bg-white border-orange-200",
      textPrimary: "text-orange-900",
      textSecondary: "text-orange-700",
      tabBg: "bg-orange-100",
      tabActive: "bg-orange-500 text-white",
      tabInactive: "text-orange-900 hover:bg-orange-200",
      buttonPrimary:
        "bg-[linear-gradient(90deg,#F97316_0%,#EF4444_100%)] text-white",
      buttonSecondary:
        "border border-red-300 text-red-600 bg-white",
      avatarBg: "bg-orange-500",
    },

    forest: {
      pageBg: "bg-green-50",
      cardBg: "bg-white border-green-200",
      textPrimary: "text-green-900",
      textSecondary: "text-green-700",
      tabBg: "bg-green-100",
      tabActive: "bg-green-600 text-white",
      tabInactive: "text-green-900 hover:bg-green-200",
      buttonPrimary:
        "bg-[linear-gradient(90deg,#22C55E_0%,#84CC16_100%)] text-white",
      buttonSecondary:
        "border border-lime-300 text-green-700 bg-white",
      avatarBg: "bg-green-600",
    },

    royal: {
      pageBg: "bg-purple-50",
      cardBg: "bg-white border-purple-200",
      textPrimary: "text-purple-900",
      textSecondary: "text-purple-700",
      tabBg: "bg-purple-100",
      tabActive: "bg-purple-600 text-white",
      tabInactive: "text-purple-900 hover:bg-purple-200",
      buttonPrimary:
        "bg-[linear-gradient(90deg,#A855F7_0%,#EC4899_100%)] text-white",
      buttonSecondary:
        "border border-pink-300 text-purple-700 bg-white",
      avatarBg: "bg-purple-600",
    },

    candy: {
      pageBg: "bg-pink-50",
      cardBg: "bg-white border-pink-200",
      textPrimary: "text-pink-900",
      textSecondary: "text-pink-700",
      tabBg: "bg-pink-100",
      tabActive: "bg-pink-500 text-white",
      tabInactive: "text-pink-900 hover:bg-pink-200",
      buttonPrimary:
        "bg-[linear-gradient(90deg,#F472B6_0%,#FACC15_100%)] text-black",
      buttonSecondary:
        "border border-yellow-300 text-pink-700 bg-white",
      avatarBg: "bg-pink-500",
    },

    midnight: {
      pageBg: "bg-indigo-950",
      cardBg: "bg-indigo-900 border-indigo-700",
      textPrimary: "text-white",
      textSecondary: "text-indigo-300",
      tabBg: "bg-indigo-800",
      tabActive: "bg-indigo-600 text-white",
      tabInactive: "text-indigo-200 hover:bg-indigo-700",
      buttonPrimary:
        "bg-[linear-gradient(90deg,#4338CA_0%,#6366F1_100%)] text-white",
      buttonSecondary:
        "border border-indigo-500 text-indigo-200 bg-transparent",
      avatarBg: "bg-indigo-600",
    },
  };

  const theme =
    courseDetailThemes[themeName] || courseDetailThemes.light;

  return (
    <CourseDetailThemeContext.Provider value={theme}>
      {children}
    </CourseDetailThemeContext.Provider>
  );
};


