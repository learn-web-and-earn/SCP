import Navbar from "@/components/custom/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen dark:bg-gray-900">
      <Navbar />
      <Outlet /> {/* This renders the child route */}
    </div>
  );
};

export default MainLayout;
