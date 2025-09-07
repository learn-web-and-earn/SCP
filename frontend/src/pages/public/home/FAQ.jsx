import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I earn rewards on ClipZen?",
      answer:
        "You earn rewards by watching videos. Each tier determines how much you earn per video. Higher tiers = higher rewards.",
    },
    {
      question: "Is there a daily video limit?",
      answer:
        "Yes, each tier allows up to 5 videos per day. The earning rate increases as you move up tiers.",
    },
    {
      question: "Can I upgrade my tier anytime?",
      answer:
        "Absolutely! You can upgrade your tier at any time to start earning more rewards instantly.",
    },
    {
      question: "Is ClipZen free to use?",
      answer:
        "Yes! The Basic tier is completely free. Paid tiers (Gold, Diamond) give you higher earning potential and exclusive perks.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto my-20 px-6">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Got questions? We’ve got answers! Here are the most common things our
          users ask about ClipZen.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            {/* Question */}
            <button
              className="w-full flex justify-between items-center p-4 text-left text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 transform transition ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Answer */}
            {openIndex === index && (
              <div className="p-4 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
