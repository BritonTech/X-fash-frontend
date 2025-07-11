// Carousel.jsx
import React, { useContext, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoreContext } from '../../Context/StoreContext';
import './Carousel.css'; // Import the CSS

const transitionTime = 3000;

const Carousel = () => {
  const { carouselImages, url } = useContext(StoreContext);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, transitionTime);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (carouselImages.length > 0 && !isPaused) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [carouselImages, isPaused]);

  if (!carouselImages || carouselImages.length === 0) {
    return <div className="carousel-loading">Loading Carousel...</div>;
  }
  console.log("carouselImages", carouselImages);

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Image */}
      <AnimatePresence>
        <motion.img
          key={carouselImages[current]._id}
          src={carouselImages[current].image}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 2.5 }}
          className="carousel-image"
          style={{
            width: "100%",           // make it responsive to container
            height: "auto",          // keep aspect ratio
            objectFit: "cover",      // or "contain", depending on your goal
            borderRadius: "12px",    // optional
            maxHeight: "400px"       // or any limit you'd like
          }}
        />
      </AnimatePresence>

      {/* Dot Indicators */}
      <div className="carousel-dots">
        {carouselImages.map((img, index) => (
          <button
            key={img._id}
            className={`carousel-dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
