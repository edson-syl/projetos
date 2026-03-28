import  "../styles/global.css"
import "../styles/hero.css"

function Hero() {
    return (
        <section id="hero">
            <div className="container">
                <h1>Seu estilo começa no corte certo.</h1>
                <p>Cortes modernos, atendimento de qualidade e o cuidado que você merece em cada detalhe.</p>
                <button><a target="_blank" href="https://wa.me/5581992281271?text=Olá,%20quero%20agendar%20um%20corte!" style={{color : "white", textDecoration: "none" }}>Agendar</a></button>
            </div>
            
        </section>
        
    )
}

export default Hero