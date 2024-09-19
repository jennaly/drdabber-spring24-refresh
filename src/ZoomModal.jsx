import React, { useRef, useEffect } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import clsx from "clsx";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ZoomModal = ({
  activeSlide,
  activeAssetIndex,
  setActiveAssetIndex,
  setShowZoomModal,
}) => {
  const modalSwiperRef = useRef(null);
  const modalRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (modalSwiperRef.current && modalSwiperRef.current.swiper) {
      modalSwiperRef.current.swiper.slideTo(activeAssetIndex, 0);
    }
  }, [activeAssetIndex]);

  useEffect(() => {
    document.body.classList.add("overflow-y-hidden");
    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, []);

  const handleCloseModal = (e) => {
    if (galleryRef.current && !galleryRef.current.contains(e.target)) {
      setShowZoomModal(false);
    }
  };

  const handlePrevSlide = () => {
    if (modalSwiperRef.current && modalSwiperRef.current.swiper) {
      modalSwiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (modalSwiperRef.current && modalSwiperRef.current.swiper) {
      modalSwiperRef.current.swiper.slideNext();
    }
  };

  const handleThumbnailClick = (index) => {
    if (modalSwiperRef.current && modalSwiperRef.current.swiper) {
      modalSwiperRef.current.swiper.slideTo(index);
    }
  };

  const handleSlideChange = (swiper) => {
    setActiveAssetIndex(swiper.activeIndex);
  };

  return (
    <div ref={modalRef} className="modal-container" onClick={handleCloseModal}>
      <button onClick={handleCloseModal}>
        <IoIosCloseCircleOutline className="modal-close-button" />
      </button>

      <div ref={galleryRef} className="modal-main-gallery">
        <div className="modal-main-gallery-slider">
          <button
            onClick={handlePrevSlide}
            className="modal-slider-button modal-slider-button-prev"
          >
            <BsArrowLeftCircle className="model-nav-button" />
          </button>
          <Swiper
            ref={modalSwiperRef}
            onSlideChange={handleSlideChange}
            keyboard={true}
            navigation={true}
            modules={[Navigation, Pagination, Keyboard]}
            style={{ width: "100%", height: "100%" }}
          >
            {activeSlide &&
              activeSlide.map((asset, index) => (
                <SwiperSlide key={index} className="flex-centered">
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
                      className="slide-asset"
                      src={asset.src}
                      alt={asset.alt}
                    />
                  ) : null}
                </SwiperSlide>
              ))}
          </Swiper>
          <button
            onClick={handleNextSlide}
            className="modal-slider-button modal-slider-button-next"
          >
            <BsArrowRightCircle className="model-nav-button" />
          </button>
        </div>

        <div className="modal-thumbnail-gallery">
          {activeSlide &&
            activeSlide.map((asset, index) => (
              <div
                className="modal-thumbnail-asset-container"
                onClick={() => handleThumbnailClick(index)}
              >
                <div
                  className={clsx("modal-thumbnail-asset-overlay", {
                    "modal-thumbnail-asset-overlay-active":
                      index === activeAssetIndex,
                  })}
                ></div>
                {asset.media_type === "video" ? (
                  <img
                    src={asset.preview_image.src}
                    className="modal-thumbnail-asset"
                  ></img>
                ) : asset.media_type === "image" ? (
                  <img
                    src={asset.src}
                    alt={asset.alt}
                    className="modal-thumbnail-asset"
                  />
                ) : null}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ZoomModal;
