import React from "react";
import { Video, Users, Award, Shield } from "lucide-react";

const Features = () => {
  return (
    <section className="container mx-auto my-16 px-6">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Why Choose ClipZen?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          ClipZen is built to make your entertainment rewarding, safe, and
          community-driven. Here’s why our users love it.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Feature 1 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <Video className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Endless Content
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Browse trending videos, discover new creators, and enjoy nonstop
            entertainment.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <Users className="w-12 h-12 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Community First
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Join a growing community where viewers and creators connect and grow
            together.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <Award className="w-12 h-12 text-yellow-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Real Rewards
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Earn coins while watching and redeem them for exciting perks and
            gifts.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Safe & Secure
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Your data and rewards are protected with top-level security so you
            can enjoy worry-free.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
