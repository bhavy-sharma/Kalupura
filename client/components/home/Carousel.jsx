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
      imageUrl: '/img1.jpeg',
      title: '',
      description: ''
    },
    {
      id: 2,
      imageUrl: '/img2.jpeg',
      title: '',
      description: ''
    },
    {
      id: 3,
      imageUrl: '/img3.jpeg',
      title: '',
      description: ''
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