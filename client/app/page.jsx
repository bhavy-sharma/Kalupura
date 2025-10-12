import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StatSection from '@/components/home/StatsSection'    //  Design Change krna hai iska Abhi
import Event from '@/components/home/Events'    //  Design Change krna hai iska Abhi
import Carousel from '@/components/home/Carousel'
import MediaGallery from '@/components/home/MediaGallery'

const page = () => {
  return (
    <div>
      <Header/>
      <Carousel/>
      <StatSection/>
      <Event/>
      <MediaGallery/>
      <Footer/>
    </div>
  )
}

export default page
