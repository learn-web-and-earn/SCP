import React from "react";

const LoadingBar = ({ loading = false }) => {
  if (!loading) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-1 bg-gray-700 overflow-hidden z-50">
      <div
        className="h-full bg-blue-500"
        style={{
          width: "30%",
          animation: "loadingBar 1.5s linear infinite",
        }}
      />
      {/* Inline keyframes so no Tailwind config is required */}
      <style>
        {`
          @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingBar;
