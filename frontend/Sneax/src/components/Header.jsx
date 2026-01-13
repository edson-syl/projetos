import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Sneax</Link>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/contato">Contato</Link>
      </nav>

      <div className="carrinho">
        <Link to="/carrinho" className="carrinho-icon">
          <FaShoppingCart size={24} />
          <span className="cart-badge">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
