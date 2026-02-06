import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("ocean");

  

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        setThemeName,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};


