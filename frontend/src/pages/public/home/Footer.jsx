import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 pt-10 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ClipZen
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Watch. Earn. Enjoy. ClipZen is your all-in-one platform for fun
              and rewards.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li>
                <a href="#features" className="hover:text-blue-500">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-500">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-blue-500">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-500">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li>
                <a href="#help" className="hover:text-blue-500">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-500">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-blue-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-blue-500">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                <Facebook size={22} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                <Twitter size={22} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pink-500">
                <Instagram size={22} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-red-500">
                <Youtube size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 py-3 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} ClipZen. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
