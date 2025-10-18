'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './Events.css';
import { useEffect, useState } from 'react';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {

    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/kalupra/getevent");
        const data = await res.json();
        console.log("data:", data)
        setEvents(data.events);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }
    fetchEvents();
  }, [])
  const eventsData = [
    {
      id: 1,
      title: 'ग्राम उत्सव',
      date: '15 जनवरी 2024',
      description: 'वार्षिक गाँव उत्सव में सभी का स्वागत है',
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      type: 'उत्सव'
    },
    {
      id: 2,
      title: 'किसान मेला',
      date: '22 फरवरी 2024',
      description: 'आधुनिक कृषि तकनीकों पर विशेष प्रदर्शनी',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      type: 'मेला'
    },
    {
      id: 3,
      title: 'योग शिविर',
      date: '10 मार्च 2024',
      description: 'निःशुल्क योग प्रशिक्षण शिविर',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      type: 'शिविर'
    },
    {
      id: 4,
      title: 'सांस्कृतिक संध्या',
      date: '25 मार्च 2024',
      description: 'पारंपरिक नृत्य और संगीत की शाम',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      type: 'सांस्कृतिक'
    },
    {
      id: 5,
      title: 'स्वास्थ्य जांच',
      date: '5 अप्रैल 2024',
      description: 'निःशुल्क स्वास्थ्य जांच शिविर',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      type: 'स्वास्थ्य'
    },
    {
      id: 6,
      title: 'खेल प्रतियोगिता',
      date: '18 अप्रैल 2024',
      description: 'वार्षिक ग्रामीण खेल महोत्सव',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      type: 'खेल'
    }
  ];

  return (
    <div className="events-section">
      <div className="events-header">
        <h2 className="events-title">विशेष कार्यक्रम</h2>
        <p className="events-subtitle">आगामी गाँव के कार्यक्रम और उत्सव</p>
      </div>

      <Swiper
        slidesPerView={'auto'}
        spaceBetween={20}
        freeMode={true}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
        }}
        modules={[FreeMode, Mousewheel]}
        className="events-swiper"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id} className="event-slide">
            <div className="event-card">
              <div className="event-image">
                <img src={event.imageUrl} alt={event.title} />
                <div className="event-badge">{event.type}</div>
              </div>

              <div className="event-content">
                <h3 className="event-name">{event.title}</h3>
                <p className="event-date">
                  📅 {new Date(event.date).toISOString().split("T")[0]}
                </p>

                <p className="event-desc">{event.description}</p>
                {/* <button className="event-btn">अधिक जानें</button> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Events;