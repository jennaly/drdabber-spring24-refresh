import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

// Import Swiper styles
import "swiper/css";
import "./styles/main.css";

// import required modules
import { Navigation, Pagination, Keyboard } from "swiper/modules";

export default function GallerySlider({
  slidesArray,
  currentIndex,
  setCurrentIndex,
}) {
  const [ourSwiperInstance, setSwiperInstance] = useState();

  const swiperRef = useRef();

  useEffect(() => {
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
        navigation={true}
        pagination={true}
        keyboard={true}
        modules={[Navigation, Pagination, Keyboard]}
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        // onSwiper={(swiper) => setSwiperInstance(swiper)}
      >
        {slidesArray.map((slide) => {
          return (
            <SwiperSlide>
              {slide.map((asset) => {
                if (asset.media_type === "video") {
                  return <p>{asset.sources[0].url}</p>;
                }
                if (asset.media_type === "image") {
                  return <p>{asset.src}</p>;
                }
              })}
            </SwiperSlide>
          );
        })}

        {slidesArray.length > 1 && (
          <div>
            <button
              className="swiper-button swiper-button-prev"
              onClick={() => {
                if (currentIndex == 0) {
                  swiperRef.current.slideTo(slidesArray.length - 1);
                  setCurrentIndex(slidesArray.length - 1);
                } else {
                  swiperRef.current.slideTo(currentIndex - 1);
                  setCurrentIndex(currentIndex - 1);
                }
              }}
            >
              <BsArrowLeftCircle size={30} />
            </button>
            <button
              className="swiper-button swiper-button-next"
              onClick={() => {
                if (currentIndex == slidesArray.length - 1) {
                  swiperRef.current.slideTo(0);
                  setCurrentIndex(0);
                } else {
                  swiperRef.current.slideTo(currentIndex + 1);
                  setCurrentIndex(currentIndex + 1);
                }
              }}
            >
              <BsArrowRightCircle size={30} />
            </button>
          </div>
        )}
      </Swiper>
    </>
  );
}
