import "./Carrinho.css";
import { Link } from "react-router-dom";

function Carrinho() {
  const produtos = [
    {
      id: 1,
      nome: "Air Max Ultra",
      preco: 499,
      img: "/assets/airmax_ultra01.png",
      quantidade: 1,
    },
    {
      id: 2,
      nome: "Classic Runner",
      preco: 399,
      img: "/assets/airmax_ultra02.png",
      quantidade: 2,
    },
  ];

  const total = produtos.reduce(
    (acc, p) => acc + p.preco * p.quantidade,
    0
  );

  return (
    <div className="carrinho-container">
      <h1>Seu Carrinho</h1>

      <div className="lista-produtos">
        {produtos.map((p) => (
          <div className="produto-carrinho" key={p.id}>
            <img src={p.img} alt={p.nome} />

            <div className="info">
              <h3>{p.nome}</h3>
              <p className="preco">R$ {p.preco}</p>

              <div className="quantidade">
                <button>-</button>
                <span>{p.quantidade}</span>
                <button>+</button>
              </div>
            </div>

            <button className="remover">Remover</button>
          </div>
        ))}
      </div>

      <div className="resumo">
        <h2>Resumo</h2>
        <p>Total: <strong>R$ {total}</strong></p>
        <button className="finalizar">Finalizar Compra</button>
        <Link to="/produtos">
          <button className="continuar">Continuar Comprando</button>
        </Link>
      </div>
    </div>
  );
}

export default Carrinho;
