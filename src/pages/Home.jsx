import React from 'react'
import HeroSection from '../components/HeroSection'
import Article from './Article' 
import SolarSystem from '../components/SolarSystem'
import Team from './Team' 
import Events from './Events' // Import Events
import About from './About'
import Contact from './Contact' 

const Home = () => {
  return (
    <>
      <HeroSection />
      <About />
      <SolarSystem />
      {/* Sequence: Initiatives -> Events -> Team -> About -> Contact 
        
      */}
      <Article /> 
      <Events />
      <Team />
      <Contact />
    </>
  )
}

export default Home