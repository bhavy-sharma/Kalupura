import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StatSection from '@/components/home/StatsSection'
import Event from '@/components/home/Events'
import Carousel from '@/components/home/Carousel'
import MediaGallery from '@/components/home/MediaGallery'
import SearchFilter from '@/components/home/SearchFilter'
import BirthdaySection from '@/components/home/BirthdaySection'

const page = () => {
  return (
    <div>
      <Header/>
      <Carousel/>
      <BirthdaySection/>
      <SearchFilter/>
      <StatSection/>
      <Event/>
      <MediaGallery/>
      <Footer/>
    </div>
  )
}

export default page
