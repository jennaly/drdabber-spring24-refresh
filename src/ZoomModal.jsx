import React, { useRef, useEffect } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
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
      <div ref={galleryRef} className="modal-main-gallery">
        <div className="modal-main-gallery-slider">
          <button
            onClick={handlePrevSlide}
            className="modal-slider-button modal-slider-button-prev"
          >
            <BsArrowLeftCircle size={30} />
          </button>
          <Swiper
            ref={modalSwiperRef}
            onSlideChange={handleSlideChange}
            style={{ width: "100%", height: "100%" }}
          >
            {activeSlide &&
              activeSlide.map((asset, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={asset.src}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                    alt={asset.alt}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
          <button
            onClick={handleNextSlide}
            className="modal-slider-button modal-slider-button-next"
          >
            <BsArrowRightCircle size={30} />
          </button>
        </div>

        <div className="modal-thumbnail-gallery">
          {activeSlide &&
            activeSlide.map((asset, index) => (
              <div
                className="modal-thumbnail-asset"
                onClick={() => handleThumbnailClick(index)}
              >
                <div
                  className={clsx("modal-thumbnail-asset-overlay", {
                    "modal-thumbnail-asset-overlay-active":
                      index === activeAssetIndex,
                  })}
                ></div>
                {asset.media_type === "video" ? (
                  <img src={asset.preview_image.src}></img>
                ) : asset.media_type === "image" ? (
                  <img src={asset.src} alt={asset.alt} />
                ) : null}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ZoomModal;
