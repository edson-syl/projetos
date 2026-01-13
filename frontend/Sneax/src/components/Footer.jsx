import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Loja de Tênis</h3>
          <p>Endereço: Rua Exemplo, 123</p>
          <p>Telefone: (11) 99999-9999</p>
          <p>Email: contato@lojatenis.com</p>
        </div>

        <div className="footer-section">
          <h3>Links</h3>
          <a href="/">Home</a><br></br>
          <a href="/produtos">Produtos</a><br/>
          <a href="/contato">Contato</a>
        </div>

        <div className="footer-section">
          <h3>Siga-nos</h3>
          <a href="#">Instagram</a><br/>
          <a href="#">Facebook</a><br/>
          <a href="#">Twitter</a>
        </div>
      </div>
      <p className="footer-bottom">© 2025 Edson. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;
