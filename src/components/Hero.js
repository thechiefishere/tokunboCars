import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <img src="/images/camry2018.jpg" alt="hero" />
      <div className="hero-text">
        <h1 className="hero-text-title">Clean Cool Cars</h1>
        <h4 className="hero-text-quote">We sell quality products</h4>
        <button className="btn btn-hero">SHOP NOW</button>
      </div>
    </section>
  );
};

export default Hero;
