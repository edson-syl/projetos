import "./Home.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const produtoDestaque = [
  "./assets/airmax_ultra01.png",
  "./assets/airmax_ultra02.png",
  "./assets/airmax_ultra03.png",
  "./assets/airmax_ultra04.png"
];

function Home() {
  const [imgIndex, setImgIndex] = useState(0);

  const nextImg = () => {
    setImgIndex((prev) => (prev + 1) % produtoDestaque.length);
  };

  const prevImg = () => {
    setImgIndex((prev) => (prev - 1 + produtoDestaque.length) % produtoDestaque.length);
  };

  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    pauseAutoPlay();
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const diff = e.clientX - startX;

    if (diff > 60) {
      prevImg();
      setIsDragging(false);
    }
    if (diff < -60) {
      nextImg();
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    resumeAutoPlay();
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    pauseAutoPlay();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const diff = e.touches[0].clientX - startX;

    if (diff > 60) {
      prevImg();
      setIsDragging(false);
    }
    if (diff < -60) {
      nextImg();
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    resumeAutoPlay();
  };

  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      nextImg();
    }, 2500);
  };

  const pauseAutoPlay = () => {
    clearInterval(intervalRef.current);
  };

  const resumeAutoPlay = () => {
    pauseAutoPlay();
    startAutoPlay();
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>A Evolução do Seu Estilo Começa Aqui</h1>
          <p>Descubra os sneakers mais desejados do momento.</p>
          <Link to="/produtos">
            <button className="btn-primary">Ver Coleção</button>
          </Link>
        </div>
      </section>

      <section className="featured">
        <div className="featured-card">

          <div
            className="carousel draggable"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              key={imgIndex}
              src={produtoDestaque[imgIndex]}
              alt="Produto destaque"
              className="carousel-img fade-animate"
            />
          </div>

          <div className="featured-info">
            <h2>Air Max Ultra</h2>
            <p>
              Tecnologia, leveza e design futurista. Perfeito para quem busca
              desempenho e estilo.
            </p>
            <Link to="/produtos">
              <button className="btn-primary">Comprar Agora</button>
            </Link>
          </div>

        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Destaques da Semana</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="./assets/airmax_01.png" alt="Tênis 1" />
            <div className="info">
              <h3>Air Max</h3>
              <span>R$ 499</span>
            </div>
          </div>

          <div className="product-card">
            <img src="./assets/classic_runner01.png" alt="Tênis 2" />
            <div className="info">
              <h3>Classic Runner</h3>
              <span>R$ 399</span>
            </div>
          </div>

          <div className="product-card">
            <img src="./assets/zoom_speed01.png" alt="Tênis 3" />
            <div className="info">
              <h3>Zoom Speed</h3>
              <span>R$ 599</span>
            </div>
          </div>
        </div>
      </section>

      <section className="promo">
        <h2>Promoção Especial</h2>
        <p>Ganhe 10% de desconto no primeiro pedido!</p>
        <button className="btn-white">Comprar Agora</button>
      </section>

    </div>
  );
}

export default Home;
