import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <img src="/images/camry2018.jpg" alt="hero" />
      <div className="hero-text">
        <h1 className="hero-text-title">Clean Cool Cars</h1>
        <h4 className="hero-text-quote">We sell quality products</h4>
        <button className="btn btn-hero">
          <Link to="/products" className="btn-link">
            SHOP NOW
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Hero;
