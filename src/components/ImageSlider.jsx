import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images, autoplaySpeed = 5500 }) => {
  // Input validation for security
  const validImages = Array.isArray(images) ? images.filter(img =>
    img && typeof img.src === 'string' && typeof img.alt === 'string'
  ) : [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Prevent out-of-bounds access
  const safeCurrentSlide = Math.max(0, Math.min(currentSlide, validImages.length - 1));

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % validImages.length);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [currentSlide, isPlaying, autoplaySpeed, images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % validImages.length);
  };

  const handleMouseEnter = () => {
    setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsPlaying(true);
  };

  return (
    <div className="image-slider" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="slider-container">
        {/* Previous Button */}
        <button
          className="slider-arrow slider-arrow-left"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          &#8249;
        </button>

        {/* Image Container */}
        <div className="slider-image-container">
          {validImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`slider-image ${index === safeCurrentSlide ? 'active' : ''}`}
              loading="lazy"
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          className="slider-arrow slider-arrow-right"
          onClick={goToNext}
          aria-label="Next image"
        >
          &#8250;
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="slider-pagination">
        {validImages.map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${index === safeCurrentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;