import "../styles/global.css"
import "../styles/footer.css"


function Footer() {
  return (
    <footer id="footer">
      <div className="container footer-content">

        <div className="footer-brand">
          <h2>Barbearia</h2>
          <p>Corte de qualidade e atendimento premium.</p>
        </div>

        <div className="footer-links">
          <h3>Links</h3>
          <ul>
            <li><a href="#home">Início</a></li>
            <li><a href="#services">Serviços</a></li>
            <li><a href="#gallery">Galeria</a></li>
            <li><a href="#testimonials">Depoimentos</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contato</h3>
          <p>📞 (81) 99999-9999</p>
          <p>📍 Rua Exemplo, 123</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Barbearia - Todos os direitos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;