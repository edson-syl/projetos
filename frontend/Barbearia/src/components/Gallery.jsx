
import "../styles/gallery.css"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

function Gallery() {
  return (
    <section id="gallery">
      <h2>Nosso Trabalho</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={2}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }}
      >
        <SwiperSlide>
          <img src="https://www.shutterstock.com/image-photo/barber-cutting-male-client-hair-600nw-2729330079.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://www.shutterstock.com/image-photo/man-barbershop-cute-black-makes-600nw-1898301925.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://www.shutterstock.com/image-photo/mens-beauty-salon-haircut-barbershop-600nw-1741799414.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://www.shutterstock.com/image-photo/man-barber-cutting-little-boys-600nw-2579603631.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://img.freepik.com/free-photo/young-man-barbershop-trimming-hair_1303-26254.jpg" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Gallery;