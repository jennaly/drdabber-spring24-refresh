import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import clsx from "clsx";
import "swiper/css";
import "./styles/main.css";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

export default function GallerySlider({
  slidesArray,
  currentIndex,
  setCurrentIndex,
}) {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(currentIndex, 0);
    }
  }, [currentIndex]);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const handlePrevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  console.log(currentIndex);

  return (
    <div>
      <Swiper
        ref={swiperRef}
        className="swiper"
        keyboard={true}
        navigation={true}
        modules={[Navigation, Pagination, Keyboard]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
      >
        {slidesArray.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide">
              {slide.map((asset, assetIndex) => {
                const isFirstAsset = assetIndex === 0;
                const gridArea = isFirstAsset
                  ? "1 / 1 / 3 / 2"
                  : assetIndex === 1
                  ? "1 / 2 / 2 / 3"
                  : "2 / 2 / 3 / 3";

                return (
                  <div
                    key={assetIndex}
                    style={{ gridArea }}
                    className="slide-asset-container"
                  >
                    {asset.media_type === "video" ? (
                      <video
                        className="slide-asset"
                        poster={asset.preview_image.src}
                        muted
                        playsInline
                        autoPlay
                        loop
                      >
                        <source src={asset.sources[1].url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : asset.media_type === "image" ? (
                      <img
                        src={asset.src}
                        alt={asset.alt}
                        className="slide-asset"
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {slidesArray.length > 1 && (
        <div className="swiper-controls">
          <button
            className="swiper-button swiper-button-prev"
            onClick={handlePrevSlide}
          >
            <BsArrowLeftCircle size={30} />
          </button>
          <div className="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal">
            {slidesArray.map((_, index) => (
              <span
                key={index}
                className={clsx("swiper-pagination-bullet", {
                  "swiper-pagination-bullet-active": index === currentIndex,
                })}
              ></span>
            ))}
          </div>
          <button
            className="swiper-button swiper-button-next"
            onClick={handleNextSlide}
          >
            <BsArrowRightCircle size={30} />
          </button>
        </div>
      )}
    </div>
  );
}
