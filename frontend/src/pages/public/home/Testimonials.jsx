import React from "react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Alex Johnson",
      role: "Content Creator",
      text: "ClipZen has completely changed how I connect with my audience. I love that viewers are rewarded too!",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sophia Lee",
      role: "Viewer",
      text: "I spend hours watching fun clips and actually earn rewards for it. It’s a win-win!",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "David Kim",
      role: "Community Member",
      text: "Finally, a platform that values both creators and viewers. The community vibe is amazing.",
      img: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ];

  return (
    <section className="container mx-auto my-16 px-6">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Don’t just take our word for it — here’s what the ClipZen community
          has to say.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition text-center"
          >
            <img
              src={review.img}
              alt={review.name}
              className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-blue-500"
            />
            <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
              “{review.text}”
            </p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {review.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {review.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
