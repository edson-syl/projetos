import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CardButton from "./components/CartButton.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Produtos from "./pages/Produtos.jsx";
import Contato from "./pages/Contato.jsx";
import Carrinho from "./pages/Carrinho.jsx";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>

      <Footer />
      <CardButton />
    </div>
  );
}

export default App;
