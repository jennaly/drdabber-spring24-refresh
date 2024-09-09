import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

// Import Swiper styles
import "swiper/css";
import "./styles/main.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

export default function GallerySlider() {
  const [ourSwiperInstance, setSwiperInstance] = useState();
  const [currentIndex, setCurrentIndex] = useState(3);

  const swiperRef = useRef();

  useEffect(() => {
    // some type of logic to find the image index of the current selected variant

    // ourSwiperInstance.slideTo(index);
    swiperRef.current.slideTo(currentIndex);
  }, [currentIndex]);

  return (
    <>
      <Swiper
        style={{
          height: "100%",
          width: "100%",
        }}
        loop={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        // onSwiper={(swiper) => setSwiperInstance(swiper)}
      >
        <SwiperSlide>Slide 1 - index 0</SwiperSlide>
        <SwiperSlide>Slide 2 - index 1</SwiperSlide>
        <SwiperSlide>Slide 3 - index 2</SwiperSlide>
        <SwiperSlide>Slide 4 - index 3</SwiperSlide>

        <button
          className="swiper-button swiper-button-prev"
          onClick={() => swiperRef.current.slidePrev()}
        >
          <BsArrowLeftCircle size={30} />
        </button>

        <button
          className="swiper-button swiper-button-next"
          onClick={() => swiperRef.current.slideNext()}
        >
          <BsArrowRightCircle size={30} />
        </button>
      </Swiper>
    </>
  );
}
