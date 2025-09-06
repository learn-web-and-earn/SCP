import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <>
      <section className="relative w-full h-[500px] md:h-[650px] rounded-2xl overflow-hidden container mx-auto my-4">
        {/* Background image */}
        <img
          src="/HeroBanner.png"
          alt="ClipZen Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80"></div>

        {/* Floating coins */}
        <div className="absolute top-10 left-10 text-4xl z-20 animate-bounce-slow">
          💵
        </div>
        <div className="absolute top-20 right-12 text-4xl z-20 animate-bounce-slower">
          💰
        </div>

        {/* Hero Content */}
        <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-white">
            Watch. Earn. Enjoy.
          </h1>
          <p className="text-base md:text-lg max-w-2xl mb-6 text-gray-200">
            ClipZen is a fun, engaging platform where you can watch videos,
            explore content, and earn real rewards while enjoying entertainment.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/register" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-2xl font-semibold text-white">
              Sign Up Now
            </Link>
            <Link to="/explore" className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-2xl font-semibold text-white">
              Explore Videos
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection