import "./Produtos.css";
import { Link } from "react-router-dom";

const produtos = [
  { id: 1, nome: "Air Max", preco: "R$ 499", imagem: "./assets/airmax_01.png", destaque: "Novo" },
  { id: 2, nome: "Classic Runner", preco: "R$ 399", imagem: "./assets/classic_runner01.png" },
  { id: 3, nome: "Zoom Speed", preco: "R$ 599", imagem: "./assets/zoom_speed01.png", destaque: "Promoção" },
  { id: 4, nome: "Ultra Boost", preco: "R$ 699", imagem: "./assets/ultra_boost01.png" },
];

function Produtos() {
  return (
    <div className="produtos">
      <h1>Nossos Produtos</h1>
      <div className="lista-produtos">
        {produtos.map((item) => (
          <div className="produto" key={item.id}>
            {item.destaque && <span className="badge">{item.destaque}</span>}
            <img src={item.imagem} alt={item.nome} />
            <h2>{item.nome}</h2>
            <p>{item.preco}</p>
            <Link to={`/`}>
                <button>Comprar</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Produtos;
