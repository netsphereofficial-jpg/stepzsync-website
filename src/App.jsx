import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import WhyDifferent from './components/WhyDifferent'
import RaceTypes from './components/RaceTypes'
import Social from './components/Social'
import GlobalMarathons from './components/GlobalMarathons'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhyDifferent />
        <RaceTypes />
        <Social />
        <GlobalMarathons />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
