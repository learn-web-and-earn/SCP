import React from "react";

const CTA = () => {
  return (
    <section className="relative container mx-auto my-20 px-6">
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-700 text-white rounded-3xl shadow-lg p-10 md:p-16 text-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Start Earning While Watching?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Join thousands of users who are already enjoying videos and getting
            rewarded every day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-2xl shadow-md transition">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-semibold px-6 py-3 rounded-2xl transition">
              Explore Videos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
