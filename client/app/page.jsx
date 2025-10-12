import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StatSection from '@/components/home/StatsSection'    //  Design Change krna hai iska Abhi
import AboutSection from '@/components/home/AboutSection'    //  Design Change krna hai iska Abhi
import Carousel from '@/components/home/Carousel'

const page = () => {
  return (
    <div>
      <Header/>
      <Carousel/>
      <StatSection/>
      {/* <AboutSection/> */}
      {/* <Footer/> */}
    </div>
  )
}

export default page
