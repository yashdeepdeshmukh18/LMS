import { createContext, useContext } from "react";
import { ThemeContext } from "./rootTheme";

export const NavbarThemeContext = createContext();

export const NavbarThemeProvider = ({ children }) => {
  const { themeName } = useContext(ThemeContext);

  const navbarThemes = {
    light: {
      bg: "bg-yellow-500",
      text: "text-gray-800",
      logoText: "text-purple-700",
      menuText: "text-gray-700",
      hoverText: "hover:text-purple-600",
      border: "border-purple-700",
      buttonBg: "bg-purple-500 hover:bg-purple-600",
      dropdownBg: "bg-white",
      mobileBg: "bg-white",
    },

    dark: {
      bg: "bg-gray-900",
      text: "text-gray-200",
      logoText: "text-yellow-400",
      menuText: "text-gray-300",
      hoverText: "hover:text-yellow-400",
      border: "border-yellow-400",
      buttonBg: "bg-yellow-500 hover:bg-yellow-600",
      dropdownBg: "bg-gray-800",
      mobileBg: "bg-gray-800",
    },

    ocean: {
      bg: "bg-blue-600",
      text: "text-white",
      logoText: "text-cyan-200",
      menuText: "text-blue-100",
      hoverText: "hover:text-yellow-300",
      border: "border-yellow-300",
      buttonBg: "bg-cyan-400 hover:bg-cyan-500",
      dropdownBg: "bg-blue-700",
      mobileBg: "bg-blue-700",
    },

    sunset: {
      bg: "bg-orange-500",
      text: "text-white",
      logoText: "text-yellow-200",
      menuText: "text-orange-100",
      hoverText: "hover:text-red-200",
      border: "border-red-200",
      buttonBg: "bg-red-500 hover:bg-red-600",
      dropdownBg: "bg-orange-600",
      mobileBg: "bg-orange-600",
    },

    forest: {
      bg: "bg-green-600",
      text: "text-white",
      logoText: "text-lime-200",
      menuText: "text-green-100",
      hoverText: "hover:text-yellow-200",
      border: "border-yellow-200",
      buttonBg: "bg-lime-500 hover:bg-lime-600",
      dropdownBg: "bg-green-700",
      mobileBg: "bg-green-700",
    },

    royal: {
      bg: "bg-purple-700",
      text: "text-white",
      logoText: "text-pink-200",
      menuText: "text-purple-100",
      hoverText: "hover:text-yellow-300",
      border: "border-yellow-300",
      buttonBg: "bg-pink-500 hover:bg-pink-600",
      dropdownBg: "bg-purple-800",
      mobileBg: "bg-purple-800",
    },

    candy: {
      bg: "bg-pink-500",
      text: "text-white",
      logoText: "text-white",
      menuText: "text-pink-100",
      hoverText: "hover:text-yellow-200",
      border: "border-yellow-200",
      buttonBg: "bg-yellow-400 hover:bg-yellow-500",
      dropdownBg: "bg-pink-600",
      mobileBg: "bg-pink-600",
    },

    midnight: {
      bg: "bg-indigo-900",
      text: "text-gray-200",
      logoText: "text-indigo-200",
      menuText: "text-gray-300",
      hoverText: "hover:text-white",
      border: "border-white",
      buttonBg: "bg-indigo-600 hover:bg-indigo-700",
      dropdownBg: "bg-indigo-800",
      mobileBg: "bg-indigo-800",
    },
  };

  const theme = navbarThemes[themeName] || navbarThemes.light;

  return (
    <NavbarThemeContext.Provider value={theme}>
      {children}
    </NavbarThemeContext.Provider>
  );
};
