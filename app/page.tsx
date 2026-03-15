import React from 'react'


import { Laserlanding } from '../components/landing/landing'

import Features from '../components/landing/features'
import Testimonials from '../components/landing/testimonials'
import Faq from '../components/landing/faq'
import CtaSection from '../components/landing/cta-sections'
import Footer from '../components/shared/footer'
import FeatureCardsSection from '../components/landing/feature-card-sections'
import { Navbar } from '../components/landing/Navbar'





const page = () => {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <div className='pt-16'> 
          <Laserlanding />
      </div>
     
        {/* <TechStackSections /> */}
        <Features />
        <FeatureCardsSection />
        <Testimonials/>
        <Faq />
        <CtaSection />
       <Footer />
    </>
  )
}

export default page