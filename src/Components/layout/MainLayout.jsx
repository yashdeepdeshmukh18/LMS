import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const MainLayout = () => {

  console.log("mainlayout")
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar Fixed at Top */}
      <Navbar />

      {/* 2. Content (Grows to fill space) */}
      <div className="flex-1">
        <Outlet /> {/* This is where Homepage, Dashboard, etc. render */}
      </div>

      {/* 3. Footer at Bottom */}
      <Footer />
    </div>
  );
};

export default MainLayout;