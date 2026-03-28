import  "../styles/global.css"
import "../styles/services.css"

function Services() {
    return (
        <section id="services">
            <div className="container">
                <h2>Nossos Serviços</h2>
                <div className="cards">
                    <div className="card">
                        <h3>Corte</h3>
                        <p>Corte moderno com acabamento preciso e atenção aos detalhes.</p>
                        <p className="price">R$ 30</p>
                    </div>
                    <div className="card">
                        <h3>Barba</h3>
                        <p>Modelagem completa com alinhamento e finalização profissional.</p>
                        <p className="price">R$ 25</p>
                    </div>
                    <div className="card" id="destaque">
                        <h3>Combo</h3>
                        <p>Corte e barba com estilo completo e visual renovado.</p>
                        <p className="price">R$ 50</p>
                    </div>
                </div>
            </div>
            
            
        </section>
    )
}

export default Services