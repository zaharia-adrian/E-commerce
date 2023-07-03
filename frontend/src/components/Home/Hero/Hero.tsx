import React from 'react'
import { Link } from 'react-router-dom';
import './Hero.scss';
const Hero = () => {
  return (
    <div className="hero">
      <h1>Men's Clothing</h1>
      <h3>Practical solutions for daily wear</h3>
      <p>
        Discover your signature style. Explore our curated
        collection of men's clothing and accessories, showcasing modern designs
        and timeless essentials. From tailored suits to casual wear, each piece
        embodies exceptional quality and attention to detail. With easy
        navigation and outstanding customer service, we're here to elevate your
        wardrobe. Shop now and embrace the art of dressing well.
      </p>
      <Link to="/products">
        <button>Shop now</button>
      </Link>
    </div>
  );
}

export default Hero