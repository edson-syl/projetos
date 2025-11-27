import "./Contato.css";

function Contato() {
  return (
    <div className="contato">

      <section className="contato-hero">
        <h1>Fale Conosco</h1>
        <p>Estamos aqui para ajudar. Envie sua mensagem e retornaremos rapidamente.</p>
      </section>

      <section className="contato-container">

        <form className="form-contato">
          <h2>Envie sua Mensagem</h2>

          <label>Nome</label>
          <input type="text" placeholder="Seu nome" />

          <label>Email</label>
          <input type="email" placeholder="seu@email.com" />

          <label>Mensagem</label>
          <textarea placeholder="Digite sua mensagem" rows="5"></textarea>

          <button type="submit" className="btn-primary">Enviar Mensagem</button>
        </form>

        <div className="info-loja">
          <h2>Informações da Loja</h2>

          <div className="info-box">
            <strong>Telefone:</strong>
            <p>(11) 99999-9999</p>
          </div>

          <div className="info-box">
            <strong>Email:</strong>
            <p>contato@tenisstore.com</p>
          </div>

          <div className="info-box">
            <strong>Endereço:</strong>
            <p>Rua Exemplo, 123, São Paulo - SP</p>
          </div>
        </div>

      </section>

    </div>
  );
}

export default Contato;
