import React from "react";
import HeroSection from "./HeroSection";
import About from "./About";
import Features from "./Features";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="p-2">
      <HeroSection />
      <About />
      <Features />
      <Testimonials />
      <CTA />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
