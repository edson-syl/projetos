import Navbar from "../components/Navbar"


import Hero from "../components/Hero"
import Promo from "../components/Promo"
import Menu from "../components/Menu"
import Testimonials from "../components/Testimonials"
import Location from "../components/Location"
import Footer from "../components/Footer"

function Home() {
  return (
    <div id>
      <Navbar />
      <Hero />
      <Promo />
      <Menu />
      <Testimonials />
      <Location />
      <Footer />
    </div>
  )
}

export default Home