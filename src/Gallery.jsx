import { useState, useEffect } from "react";

import GallerySlider from "./GallerySlider";

function Gallery({}) {
  const defaultVariantOnly = window.defaultVariantOnly;
  const productData = window.product_data;
  const productMedia = window.media;
  const firstSelectedVariant = window.firstSelectedVariant.title;

  const [currentVariant, setCurrentVariant] = useState(firstSelectedVariant);
  const groupByVariant = (mediaArray) => {
    return mediaArray.reduce((acc, item) => {
      const variant = item.alt || "default";
      if (!acc[variant]) {
        acc[variant] = [];
      }
      acc[variant].push(item);
      return acc;
    }, {});
  };

  useEffect(() => {
    const allRadioButtons = Array.from(
      document.getElementsByClassName("product-option-radio")
    );

    const handlers = allRadioButtons.map((radioButton) => {
      return radioButton.addEventListener("click", (e) => {
        // console.log("Click fired: ", e);

        setCurrentVariant(e.target.value);
      });
    });

    return () => {
      handlers.forEach(removeEventListener);
    };
  }, []);

  console.log(currentVariant);

  return (
    <div style={{ height: 500, width: "100%", border: "1px solid #32a1ce" }}>
      <GallerySlider />
    </div>
  );
}

export default Gallery;
