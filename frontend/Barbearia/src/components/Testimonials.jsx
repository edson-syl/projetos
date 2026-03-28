import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "../styles/global.css";
import "../styles/testimonials.css";

import ImgUser1 from "../assets/user (1).jpg"
import ImgUser2 from "../assets/user (2).jpg"
import ImgUser3 from "../assets/user (3).jpg"

function Testimonials() {
  return (
    <section id="testimonials">
      <div className="container">
        <h2>O que nossos clientes dizem</h2>

        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={true}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          <SwiperSlide>
            <div className="testimonial">
              <img src={ImgUser1}></img>
              <div><p>"Melhor corte que já fiz, atendimento top!"</p>
              <h4>João Silva</h4></div>
              
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="testimonial destaque">
              <img src={ImgUser2}></img>
              <div>
                <p>"Ambiente incrível e profissional demais."</p>
                <h4>Carlos Souza</h4>
              </div>
              
              
              
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="testimonial">
              <img src={ImgUser3}></img>
              <div><p>"Virei cliente fiel, recomendo demais!"</p>
              <h4>Pedro Lima</h4></div>
              
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default Testimonials;