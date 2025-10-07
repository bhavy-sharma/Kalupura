import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'    //  Design Change krna hai iska Abhi
import StatSection from '@/components/home/StatsSection'    //  Design Change krna hai iska Abhi
import AboutSection from '@/components/home/AboutSection'    //  Design Change krna hai iska Abhi

const page = () => {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <StatSection/>
      <AboutSection/>
      <Footer/>
    </div>
  )
}

export default page
