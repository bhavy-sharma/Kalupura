'use client';

import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import './Carousel.css';

const Carousel = () => {
  const carouselImages = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'स्वागत है कलुपुरा में',
      description: 'प्रकृति की गोद में बसा एक सुंदर गाँव'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'हमारी संस्कृति',
      description: 'पुरानी परंपराएँ, नई सोच'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'ग्रामीण जीवन',
      description: 'शांति और सादगी का अनुभव'
    }
  ];

  // Load Devanagari font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="carousel-container">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        // navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
        loop={true}
        speed={800}
        grabCursor={true}
      >
        {carouselImages.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="slide-image"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              <div className="slide-overlay">
                <div className="slide-content">
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-description">{slide.description}</p>
                  <button 
                    className="explore-btn"
                    onClick={() => console.log('Explore button clicked!')}
                  >
                    गाँव घूमें
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;