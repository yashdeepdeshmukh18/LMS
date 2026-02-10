import { createContext, useContext } from "react";
import { ThemeContext } from "./rootTheme";

export const DashboardThemeContext = createContext();

export const DashboardThemeProvider = ({ children }) => {
  const { themeName } = useContext(ThemeContext);

  const dashboardThemes = {
    light: {
      cardBg: "bg-white",
      border: "border-purple-200",
      title: "text-gray-900",
      text: "text-gray-500",
      badge: "bg-blue-200 text-blue-700",

      outlineBtn: "border border-purple-300 text-purple-700 bg-white",

      gradientBtn:
        "bg-[linear-gradient(90deg,#4846C6_0%,#DD9AFF_100%)] text-white",
    },

    dark: {
      cardBg: "bg-[#1c1c1c]",
      border: "border-purple-800",
      title: "text-white",
      text: "text-gray-400",
      badge: "bg-purple-900 text-purple-200",

      outlineBtn: "border border-purple-700 text-purple-300 bg-transparent",

      gradientBtn:
        "bg-[linear-gradient(90deg,#6B46C1_0%,#F6AD55_100%)] text-white",
    },

    ocean: {
      cardBg: "bg-blue-50",
      border: "border-blue-200",
      title: "text-blue-900",
      text: "text-blue-700",
      badge: "bg-blue-100 text-blue-700",

      outlineBtn: "border border-blue-300 text-blue-700 bg-white",

      gradientBtn:
        "bg-[linear-gradient(90deg,#06B6D4_0%,#3B82F6_100%)] text-white",
    },

    sunset: {
      cardBg: "bg-orange-50",
      border: "border-orange-200",
      title: "text-orange-900",
      text: "text-orange-700",
      badge: "bg-orange-100 text-orange-700",

      outlineBtn: "border border-orange-300 text-orange-700 bg-white",

      gradientBtn:
        "bg-[linear-gradient(90deg,#F97316_0%,#EF4444_100%)] text-white",
    },

    forest: {
      cardBg: "bg-green-50",
      border: "border-green-200",
      title: "text-green-900",
      text: "text-green-700",
      badge: "bg-green-100 text-green-700",

      outlineBtn: "border border-green-300 text-green-700 bg-white",

      gradientBtn:
        "bg-[linear-gradient(90deg,#22C55E_0%,#84CC16_100%)] text-white",
    },

    royal: {
      cardBg: "bg-purple-50",
      border: "border-purple-200",
      title: "text-purple-900",
      text: "text-purple-700",
      badge: "bg-purple-100 text-purple-700",

      outlineBtn: "border border-purple-300 text-purple-700 bg-white",

      gradientBtn:
        "bg-[linear-gradient(90deg,#A855F7_0%,#EC4899_100%)] text-white",
    },

    candy: {
      cardBg: "bg-pink-50",
      border: "border-pink-200",
      title: "text-pink-900",
      text: "text-pink-700",
      badge: "bg-pink-100 text-pink-700",

      outlineBtn: "border border-pink-300 text-pink-700 bg-white",

      gradientBtn:
        "bg-[linear-gradient(90deg,#F472B6_0%,#FACC15_100%)] text-black",
    },

    midnight: {
      cardBg: "bg-indigo-950",
      border: "border-indigo-700",
      title: "text-white",
      text: "text-indigo-300",
      badge: "bg-indigo-900 text-indigo-200",

      outlineBtn: "border border-indigo-600 text-indigo-200 bg-transparent",

      gradientBtn:
        "bg-[linear-gradient(90deg,#4338CA_0%,#6366F1_100%)] text-white",
    },
  };

  const theme = dashboardThemes[themeName] || dashboardThemes.light;

  return (
    <DashboardThemeContext.Provider value={theme}>
      {children}
    </DashboardThemeContext.Provider>
  );
};
