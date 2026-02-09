
import React from "react";
import Navbar from "../Components/Navbar";
import HeroSection from "../Components/HeroSection";
import Footer from "../Components/Footer";
import { HeroThemeProvider } from "../context/themes/heroThemes"




const HomePage = () => {
  return (
    <div className="min-h-screen">
    <HeroThemeProvider>

      <HeroSection />
    </HeroThemeProvider>
    </div>
  );
};

export default HomePage;
