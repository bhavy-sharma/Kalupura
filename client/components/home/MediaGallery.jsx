'use client';

import { useEffect, useState } from 'react';
import './MediaGallery.css';

const MediaGallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 const [mediaItems, setMediaItems] = useState([]);

 useEffect(()=>{
  const fetchMediaItems=async()=>{
    try{
      const res=await fetch("http://localhost:5000/api/v1/kalupra/getinfovillage");
      const data=await res.json();
      setMediaItems(data.infoVillage); 
    }catch(err){
      console.error("Error fetching media items:",err);
    }
  }
  fetchMediaItems();
 },[]);


  const mediaData = [
    {
      id: 1,
      type: 'image',
      title: 'ग्राम पंचायत भवन',
      description: 'हमारा सुंदर ग्राम पंचायत भवन',
      thumbnail: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      fullSize: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      type: 'image',
      title: 'गाँव का मंदिर',
      description: 'प्राचीन और आधुनिक वास्तुकला का संगम',
      thumbnail: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      fullSize: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      type: 'image',
      title: 'किसानों का समूह',
      description: 'गाँव के किसानों की सामूहिक तस्वीर',
      thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      fullSize: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      type: 'image',
      title: 'ग्रामीण परिवेश',
      description: 'शांत और सुंदर ग्रामीण वातावरण',
      thumbnail: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      fullSize: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const openModal = (media) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedia(null);
    document.body.style.overflow = 'unset';
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="media-gallery-section">
      {/* Section Header */}
      <div className="media-header">
        <h2 className="media-title">गाँव की झलक</h2>
        <p className="media-subtitle">कलुपुरा गाँव के सुंदर दृश्य और यादें</p>
      </div>

      {/* Media Grid */}
      <div className="media-grid">
        {mediaItems.map((media, index) => (
          <div 
            key={media.id || index}
            className="media-card"
            onClick={() => openModal(media)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="media-image-container">
              <img 
                src={media.imageUrl} 
                alt={media.title}
                className="media-thumbnail"
              />
              <div className="media-overlay">
                <div className="zoom-icon">🔍</div>
              </div>
            </div>
            
            <div className="media-info">
              <h3 className="media-card-title">{media.title}</h3>
              <p className="media-card-desc">{media.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Full Size View */}
      {isModalOpen && selectedMedia && (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
          <div className="modal-content">
            {/* Close Button */}
            <button className="modal-close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Media Content */}
            <div className="modal-media">
              <img 
                src={selectedMedia.imageUrl} 
                alt={selectedMedia.title}
                className="modal-image"
              />
            </div>

            {/* Media Info */}
            <div className="modal-info">
              <h3 className="modal-title">{selectedMedia.title}</h3>
              <p className="modal-description">{selectedMedia.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;