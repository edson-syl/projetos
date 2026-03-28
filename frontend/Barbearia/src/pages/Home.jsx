import Header from "../components/Header"
import Hero from "../components/Hero"
import Services from "../components/Services"
import About from "../components/About"
import Gallery from "../components/Gallery"
import Testimonials from "../components/Testimonials"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import ButtonZap from "../components/ButtonZap"


function Home() {
    return (
        <> 
        
           <Header /> 
           <ButtonZap />
           <Hero />
           <Services />
           <About />
           <Gallery />
           <Testimonials />
           <Contact />
           <Footer />
        </>
    )
}

export default Home