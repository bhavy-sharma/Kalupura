'use client';

import { useEffect, useState } from 'react';
import './StatsSection.css';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Load Devanagari font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Intersection Observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
      document.head.removeChild(link);
    };
  }, []);

  const statsData = [
    {
      id: 1,
      title: 'कुल परिवार',
      value: '420',
      icon: '🏡',
      color: '#10b981',
      suffix: '+'
    },
    {
      id: 2,
      title: 'वाहन',
      value: '185',
      icon: '🚜',
      color: '#f59e0b',
      suffix: '+'
    },
    {
      id: 3,
      title: 'मतदाता',
      value: '1,240',
      icon: '🗳️',
      color: '#3b82f6',
      suffix: '+'
    },
    // {
    //   id: 4,
    //   title: 'खेती योग्य भूमि',
    //   value: '850',
    //   icon: '🌾',
    //   color: '#22c55e',
    //   suffix: ' एकड़'
    // }
  ];

  return (
    <div className="stats-section">
      <div className="stats-container">
        {/* Section Header */}
        <div className="stats-header">
          <h2 className="stats-heading">गाँव की संख्याएँ</h2>
          <p className="stats-subtitle">कलुपुरा गाँव के प्रमुख आँकड़े और सांख्यिकी</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div 
              className={`stat-card ${isVisible ? 'animate' : ''}`}
              key={stat.id}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Background Pattern */}
              <div className="stat-pattern"></div>
              
              {/* Icon Container */}
              <div className="stat-icon-container">
                <div 
                  className="stat-icon"
                  style={{ 
                    background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}40)`,
                    border: `2px solid ${stat.color}30`
                  }}
                >
                  <span 
                    className="icon-text"
                    style={{ color: stat.color }}
                  >
                    {stat.icon}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="stat-content">
                <div className="stat-value-container">
                  <h3 className="stat-value">
                    {stat.value}
                    <span className="stat-suffix">{stat.suffix}</span>
                  </h3>
                </div>
                <p className="stat-title">{stat.title}</p>
              </div>

              {/* Hover Effect */}
              <div 
                className="stat-hover-effect"
                style={{ background: stat.color }}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="stats-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-dot"></div>
          <div className="decoration-line"></div>
        </div>
      </div>
    </div>
  );
};

export default Stats;