// import React, { useRef } from "react";

// const ZoomModal = ({ activeAsset, activeSlide, setShowZoomModal }) => {
//   console.log("current asset's alt", activeAsset.alt);
//   console.log("current slide", activeSlide);

//   const handleCloseModal = () => {
//     setShowZoomModal(false);
//     document.body.classList.remove("overflow-y-hidden");
//   };
//   return (
//     <div
//       style={{
//         background: "blue",
//         opacity: 0.6,
//         height: "100vh",
//         width: "100vw",
//         position: "fixed",
//         zIndex: "200",
//         top: 0,
//         left: 0,
//       }}
//     >
//       test
//       <button onClick={handleCloseModal}>close modal</button>
//     </div>
//   );
// };

// export default ZoomModal;
import React, { useState, useRef, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";

const ZoomModal = ({
  activeAsset,
  activeSlide,
  setShowZoomModal,
  children,
}) => {
  const modalRef = useRef(null);
  const galleryRef = useRef(null);

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

  const modalStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  const galleryStyle = {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    maxWidth: "48rem",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
  };

  // const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div ref={modalRef} style={modalStyle} onClick={handleCloseModal}>
      <div ref={galleryRef} style={galleryStyle}>
        {/* <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          loop={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
          </SwiperSlide>
        </Swiper> */}
      </div>
    </div>
  );
};

export default ZoomModal;
