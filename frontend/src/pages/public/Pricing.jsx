import React from "react";
import { Check, Play, Coins } from "lucide-react";

const Pricing = () => {
  const tiers = [
    {
      name: "Basic",
      price: "$0",
      videos: "Up to 5 videos/day",
      earning: "Low rewards per video",
      benefits: ["Community Access", "Earn while watching"],
      highlight: false,
    },
    {
      name: "Gold",
      price: "$9.99/mo",
      videos: "Up to 5 videos/day",
      earning: "Higher rewards per video",
      benefits: [
        "All Basic features",
        "Exclusive Gold-only bonuses",
        "Priority community perks",
      ],
      highlight: true,
    },
    {
      name: "Diamond",
      price: "$19.99/mo",
      videos: "Up to 5 videos/day",
      earning: "Maximum rewards per video",
      benefits: [
        "All Gold features",
        "VIP rewards & gifts",
        "Early access to new features",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="container mx-auto my-20 px-6">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Choose Your Tier
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          All tiers let you watch up to <strong>5 videos per day</strong>, but
          the higher your tier, the more rewards you earn per video.
        </p>
      </div>

      {/* Tier Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={`p-8 rounded-2xl shadow-md transition transform hover:scale-105 ${
              tier.highlight
                ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            }`}
          >
            {/* Tier Name */}
            <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
            <p className="text-4xl font-extrabold mb-6">{tier.price}</p>

            {/* Core Details */}
            <div className="mb-6 space-y-3">
              <p className="flex items-center justify-center gap-2">
                <Play className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                {tier.videos}
              </p>
              <p className="flex items-center justify-center gap-2">
                <Coins className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                {tier.earning}
              </p>
            </div>

            {/* Benefits List */}
            <ul className="space-y-3 mb-6">
              {tier.benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Check
                    className={`w-5 h-5 ${
                      tier.highlight ? "text-white" : "text-green-500"
                    }`}
                  />
                  {benefit}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              className={`w-full px-6 py-3 rounded-xl font-semibold transition ${
                tier.highlight
                  ? "bg-white text-yellow-600 hover:bg-gray-100"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              {tier.highlight ? "Go Gold" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
