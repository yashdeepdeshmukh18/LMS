import { createContext, useContext } from "react";
import { ThemeContext } from "./rootTheme"; 
// same root theme used by navbar

export const HeroThemeContext = createContext();

export const HeroThemeProvider = ({ children }) => {
  const { themeName } = useContext(ThemeContext);

  const heroThemes = {
    light: {
      sectionBg: "bg-[#FBF5FF]",
      headingText: "text-gray-900",
      highlightText: "text-purple-700",
      subText: "text-gray-600",

      primaryBtn:
        "bg-purple-600 hover:bg-purple-700 text-white",

      secondaryBtn:
        "border border-purple-700 text-purple-600 hover:bg-purple-50",

      studentText: "text-gray-800",
      avatar1: "bg-purple-400",
      avatar2: "bg-purple-500",
      avatar3: "bg-purple-600",
    },

    dark: {
      sectionBg: "bg-gray-900",
      headingText: "text-white",
      highlightText: "text-yellow-400",
      subText: "text-gray-300",

      primaryBtn:
        "bg-yellow-500 hover:bg-yellow-600 text-black",

      secondaryBtn:
        "border border-yellow-400 text-yellow-400 hover:bg-gray-800",

      studentText: "text-gray-200",
      avatar1: "bg-yellow-400",
      avatar2: "bg-yellow-500",
      avatar3: "bg-yellow-600",
    },

    ocean: {
      sectionBg: "bg-blue-50",
      headingText: "text-blue-900",
      highlightText: "text-cyan-600",
      subText: "text-blue-700",

      primaryBtn:
        "bg-cyan-500 hover:bg-cyan-600 text-white",

      secondaryBtn:
        "border border-cyan-600 text-cyan-600 hover:bg-cyan-50",

      studentText: "text-blue-900",
      avatar1: "bg-cyan-300",
      avatar2: "bg-cyan-400",
      avatar3: "bg-cyan-500",
    },

    sunset: {
      sectionBg: "bg-orange-50",
      headingText: "text-orange-900",
      highlightText: "text-red-500",
      subText: "text-orange-700",

      primaryBtn:
        "bg-red-500 hover:bg-red-600 text-white",

      secondaryBtn:
        "border border-red-500 text-red-500 hover:bg-red-50",

      studentText: "text-orange-900",
      avatar1: "bg-orange-300",
      avatar2: "bg-orange-400",
      avatar3: "bg-red-400",
    },

    forest: {
      sectionBg: "bg-green-50",
      headingText: "text-green-900",
      highlightText: "text-lime-600",
      subText: "text-green-700",

      primaryBtn:
        "bg-lime-500 hover:bg-lime-600 text-white",

      secondaryBtn:
        "border border-lime-600 text-lime-600 hover:bg-lime-50",

      studentText: "text-green-900",
      avatar1: "bg-lime-300",
      avatar2: "bg-lime-400",
      avatar3: "bg-lime-500",
    },

    royal: {
      sectionBg: "bg-purple-50",
      headingText: "text-purple-900",
      highlightText: "text-pink-500",
      subText: "text-purple-700",

      primaryBtn:
        "bg-pink-500 hover:bg-pink-600 text-white",

      secondaryBtn:
        "border border-pink-500 text-pink-500 hover:bg-pink-50",

      studentText: "text-purple-900",
      avatar1: "bg-pink-300",
      avatar2: "bg-pink-400",
      avatar3: "bg-pink-500",
    },

    candy: {
      sectionBg: "bg-pink-50",
      headingText: "text-pink-900",
      highlightText: "text-yellow-500",
      subText: "text-pink-700",

      primaryBtn:
        "bg-yellow-400 hover:bg-yellow-500 text-black",

      secondaryBtn:
        "border border-yellow-400 text-yellow-500 hover:bg-yellow-50",

      studentText: "text-pink-900",
      avatar1: "bg-pink-300",
      avatar2: "bg-yellow-300",
      avatar3: "bg-pink-400",
    },

    midnight: {
      sectionBg: "bg-indigo-950",
      headingText: "text-white",
      highlightText: "text-indigo-300",
      subText: "text-gray-300",

      primaryBtn:
        "bg-indigo-600 hover:bg-indigo-700 text-white",

      secondaryBtn:
        "border border-indigo-400 text-indigo-300 hover:bg-indigo-900",

      studentText: "text-gray-200",
      avatar1: "bg-indigo-400",
      avatar2: "bg-indigo-500",
      avatar3: "bg-indigo-600",
    },
  };

  const theme = heroThemes[themeName] || heroThemes.light;

  return (
    <HeroThemeContext.Provider value={theme}>
      {children}
    </HeroThemeContext.Provider>
  );
};
