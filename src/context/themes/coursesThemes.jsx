import { createContext, useContext } from "react";
import { ThemeContext } from "./rootTheme";

export const CoursesThemeContext = createContext();

export const CoursesThemeProvider = ({ children }) => {
  const { themeName } = useContext(ThemeContext);

  const coursesThemes = {
    light: {
      pageBg: "bg-[#FBF5FF]",
      headingText: "text-gray-800",

      searchBarBg: "bg-white",
      searchBorder: "border-black",
      searchText: "text-gray-700",

      searchBtn:
        "bg-purple-500 hover:bg-purple-600 text-white",

      filterActive:
        "bg-purple-500 text-white",

      filterInactive:
        "border border-purple-500 text-purple-700 hover:bg-purple-50",
    },

    dark: {
      pageBg: "bg-gray-900",
      headingText: "text-white",

      searchBarBg: "bg-gray-800",
      searchBorder: "border-gray-600",
      searchText: "text-gray-200",

      searchBtn:
        "bg-yellow-500 hover:bg-yellow-600 text-black",

      filterActive:
        "bg-yellow-500 text-black",

      filterInactive:
        "border border-yellow-400 text-yellow-300 hover:bg-gray-800",
    },

    ocean: {
      pageBg: "bg-blue-50",
      headingText: "text-blue-900",

      searchBarBg: "bg-white",
      searchBorder: "border-blue-400",
      searchText: "text-blue-900",

      searchBtn:
        "bg-cyan-500 hover:bg-cyan-600 text-white",

      filterActive:
        "bg-cyan-500 text-white",

      filterInactive:
        "border border-cyan-500 text-cyan-600 hover:bg-cyan-50",
    },

    sunset: {
      pageBg: "bg-orange-50",
      headingText: "text-orange-900",

      searchBarBg: "bg-white",
      searchBorder: "border-orange-400",
      searchText: "text-orange-900",

      searchBtn:
        "bg-red-500 hover:bg-red-600 text-white",

      filterActive:
        "bg-red-500 text-white",

      filterInactive:
        "border border-red-400 text-red-500 hover:bg-red-50",
    },

    forest: {
      pageBg: "bg-green-50",
      headingText: "text-green-900",

      searchBarBg: "bg-white",
      searchBorder: "border-green-400",
      searchText: "text-green-900",

      searchBtn:
        "bg-lime-500 hover:bg-lime-600 text-white",

      filterActive:
        "bg-lime-500 text-white",

      filterInactive:
        "border border-lime-500 text-lime-600 hover:bg-lime-50",
    },

    royal: {
      pageBg: "bg-purple-50",
      headingText: "text-purple-900",

      searchBarBg: "bg-white",
      searchBorder: "border-purple-400",
      searchText: "text-purple-900",

      searchBtn:
        "bg-pink-500 hover:bg-pink-600 text-white",

      filterActive:
        "bg-pink-500 text-white",

      filterInactive:
        "border border-pink-500 text-pink-500 hover:bg-pink-50",
    },

    candy: {
      pageBg: "bg-pink-50",
      headingText: "text-pink-900",

      searchBarBg: "bg-white",
      searchBorder: "border-pink-400",
      searchText: "text-pink-900",

      searchBtn:
        "bg-yellow-400 hover:bg-yellow-500 text-black",

      filterActive:
        "bg-yellow-400 text-black",

      filterInactive:
        "border border-yellow-400 text-yellow-500 hover:bg-yellow-50",
    },

    midnight: {
      pageBg: "bg-indigo-950",
      headingText: "text-white",

      searchBarBg: "bg-indigo-900",
      searchBorder: "border-indigo-600",
      searchText: "text-gray-200",

      searchBtn:
        "bg-indigo-600 hover:bg-indigo-700 text-white",

      filterActive:
        "bg-indigo-600 text-white",

      filterInactive:
        "border border-indigo-400 text-indigo-300 hover:bg-indigo-900",
    },
  };

  const theme = coursesThemes[themeName] || coursesThemes.light;

  return (
    <CoursesThemeContext.Provider value={theme}>
      {children}
    </CoursesThemeContext.Provider>
  );
};
