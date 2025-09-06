import React from "react";
import { Play, Gift, Coins } from "lucide-react";

const About = () => {
  return (
    <section className="container mx-auto my-12 px-6">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          How ClipZen Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          ClipZen makes entertainment rewarding. Watch videos, enjoy content,
          and earn rewards while having fun!
        </p>
      </div>

      {/* 3 Steps */}
      <div className="grid gap-8 md:grid-cols-3 text-center">
        {/* Step 1 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <Play className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Watch Videos
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Explore trending clips, entertaining shorts, and community content.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <Coins className="w-12 h-12 text-yellow-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Earn Rewards
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Collect coins as you watch and engage with your favorite creators.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <Gift className="w-12 h-12 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Redeem & Enjoy
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Exchange your rewards for perks, gifts, and exclusive experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
