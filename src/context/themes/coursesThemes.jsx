import { createContext, useContext } from "react";
import { ThemeContext } from "./rootTheme";

export const CoursesThemeContext = createContext();

export const CoursesThemeProvider = ({ children }) => {
  const { themeName } = useContext(ThemeContext);

  const coursesThemes = {
    /* ---------------- LIGHT ---------------- */
    light: {
      /* Page */
      pageBg: "#FBF5FF",
      headerText: "#1F2937",

      /* Search */
      searchBg: "#FFFFFF",
      border: "#8B1CC342",
      searchText: "#374151",

      /* Buttons */
      primaryBtn: "#A855F7",
      primaryHover: "#9333EA",

      /* Chips */
      chipBg: "#A855F7",
      chipText: "#FFFFFF",
      chipBorder: "#A855F7",

      /* Card */
      cardBg: "#FFFFFF",
      shadow: "0px 4px 12px rgba(0,0,0,0.08)",

      /* Tag */
      tagBg: "#DBEAFE",
      tagText: "#2563EB",

      /* Text */
      textPrimary: "#1F2937",
      textSecondary: "#6B7280",

      /* Gradient Button */
      gradient:
        "linear-gradient(90deg,#4846C6 0%,#DD9AFF 100%)",
    },

    /* ---------------- DARK ---------------- */
    dark: {
      pageBg: "#111827",
      headerText: "#F9FAFB",

      searchBg: "#1F2937",
      border: "#374151",
      searchText: "#E5E7EB",

      primaryBtn: "#F59E0B",
      primaryHover: "#D97706",

      chipBg: "#F59E0B",
      chipText: "#000000",
      chipBorder: "#F59E0B",

      cardBg: "#1F2937",
      shadow: "0px 4px 16px rgba(0,0,0,0.5)",

      tagBg: "#312E81",
      tagText: "#C7D2FE",

      textPrimary: "#F9FAFB",
      textSecondary: "#9CA3AF",

      gradient:
        "linear-gradient(90deg,#6366F1 0%,#A78BFA 100%)",
    },

    /* ---------------- OCEAN ---------------- */
    ocean: {
      pageBg: "#EFF6FF",
      headerText: "#1E3A8A",

      searchBg: "#FFFFFF",
      border: "#60A5FA",
      searchText: "#1E3A8A",

      primaryBtn: "#06B6D4",
      primaryHover: "#0891B2",

      chipBg: "#06B6D4",
      chipText: "#FFFFFF",
      chipBorder: "#06B6D4",

      cardBg: "#FFFFFF",
      shadow: "0px 4px 12px rgba(0,0,0,0.1)",

      tagBg: "#CFFAFE",
      tagText: "#0891B2",

      textPrimary: "#1E3A8A",
      textSecondary: "#475569",

      gradient:
        "linear-gradient(90deg,#0EA5E9 0%,#22D3EE 100%)",
    },

    /* ---------------- SUNSET ---------------- */
    sunset: {
      pageBg: "#FFF7ED",
      headerText: "#7C2D12",

      searchBg: "#FFFFFF",
      border: "#FB923C",
      searchText: "#7C2D12",

      primaryBtn: "#EF4444",
      primaryHover: "#DC2626",

      chipBg: "#EF4444",
      chipText: "#FFFFFF",
      chipBorder: "#EF4444",

      cardBg: "#FFFFFF",
      shadow: "0px 4px 12px rgba(0,0,0,0.1)",

      tagBg: "#FED7AA",
      tagText: "#C2410C",

      textPrimary: "#7C2D12",
      textSecondary: "#9A3412",

      gradient:
        "linear-gradient(90deg,#F97316 0%,#EF4444 100%)",
    },

    /* ---------------- FOREST ---------------- */
    forest: {
      pageBg: "#F0FDF4",
      headerText: "#14532D",

      searchBg: "#FFFFFF",
      border: "#4ADE80",
      searchText: "#14532D",

      primaryBtn: "#22C55E",
      primaryHover: "#16A34A",

      chipBg: "#22C55E",
      chipText: "#FFFFFF",
      chipBorder: "#22C55E",

      cardBg: "#FFFFFF",
      shadow: "0px 4px 12px rgba(0,0,0,0.1)",

      tagBg: "#DCFCE7",
      tagText: "#15803D",

      textPrimary: "#14532D",
      textSecondary: "#166534",

      gradient:
        "linear-gradient(90deg,#22C55E 0%,#4ADE80 100%)",
    },

    /* ---------------- ROYAL ---------------- */
    royal: {
      pageBg: "#FAF5FF",
      headerText: "#581C87",

      searchBg: "#FFFFFF",
      border: "#C084FC",
      searchText: "#581C87",

      primaryBtn: "#A855F7",
      primaryHover: "#9333EA",

      chipBg: "#A855F7",
      chipText: "#FFFFFF",
      chipBorder: "#A855F7",

      cardBg: "#FFFFFF",
      shadow: "0px 4px 12px rgba(0,0,0,0.1)",

      tagBg: "#F3E8FF",
      tagText: "#7E22CE",

      textPrimary: "#581C87",
      textSecondary: "#6B21A8",

      gradient:
        "linear-gradient(90deg,#A855F7 0%,#E879F9 100%)",
    },

    /* ---------------- CANDY ---------------- */
    candy: {
      pageBg: "#FFF1F2",
      headerText: "#9D174D",

      searchBg: "#FFFFFF",
      border: "#F472B6",
      searchText: "#9D174D",

      primaryBtn: "#F472B6",
      primaryHover: "#EC4899",

      chipBg: "#F472B6",
      chipText: "#FFFFFF",
      chipBorder: "#F472B6",

      cardBg: "#FFFFFF",
      shadow: "0px 4px 12px rgba(0,0,0,0.1)",

      tagBg: "#FCE7F3",
      tagText: "#BE185D",

      textPrimary: "#9D174D",
      textSecondary: "#BE185D",

      gradient:
        "linear-gradient(90deg,#F472B6 0%,#F9A8D4 100%)",
    },

    /* ---------------- MIDNIGHT ---------------- */
    midnight: {
      pageBg: "#020617",
      headerText: "#E0E7FF",

      searchBg: "#0F172A",
      border: "#4338CA",
      searchText: "#C7D2FE",

      primaryBtn: "#4F46E5",
      primaryHover: "#4338CA",

      chipBg: "#4F46E5",
      chipText: "#FFFFFF",
      chipBorder: "#4F46E5",

      cardBg: "#0F172A",
      shadow: "0px 4px 20px rgba(0,0,0,0.7)",

      tagBg: "#1E1B4B",
      tagText: "#A5B4FC",

      textPrimary: "#E0E7FF",
      textSecondary: "#A5B4FC",

      gradient:
        "linear-gradient(90deg,#4F46E5 0%,#6366F1 100%)",
    },
  };

  const theme =
    coursesThemes[themeName] || coursesThemes.light;

  return (
    <CoursesThemeContext.Provider value={theme}>
      {children}
    </CoursesThemeContext.Provider>
  );
};
