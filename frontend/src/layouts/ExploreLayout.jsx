import React from "react";
import { Outlet } from "react-router-dom";

const ExploreLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen dark:bg-gray-900">
      <Outlet /> {/* This renders the child route */}
    </div>
  );
};

export default ExploreLayout;
