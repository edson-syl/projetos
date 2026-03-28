import  "../styles/global.css"
import "../styles/header.css"

import IconBarber from "../assets/icon barber.png"

import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header id="header">
      <div className="container">

        <div className="logo">
            <img src={IconBarber}></img>
          <h2>Barbearia</h2>
        </div>

        {/* BOTÃO HAMBÚRGUER */}
        <div 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* MENU */}
        <nav className={menuOpen ? "active" : ""}>
          <ul>
            <li><a href="#hero" onClick={() => setMenuOpen(false)}>Início</a></li>
            <li><a href="#services" onClick={() => setMenuOpen(false)}>Serviços</a></li>
            <li><a href="#gallery" onClick={() => setMenuOpen(false)}>Galeria</a></li>
            <li><a href="#testimonials" onClick={() => setMenuOpen(false)}>Depoimentos</a></li>
          </ul>
        </nav>

      </div>
    </header>
  );
}

export default Header;