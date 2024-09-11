import { useState, useEffect } from "react";

import GallerySlider from "./GallerySlider";

function Gallery({}) {
  const productMedia = window.media;
  const firstSelectedVariant = window.firstSelectedVariant.title;

  const [currentVariant, setCurrentVariant] = useState(firstSelectedVariant);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const groupByVariant = (mediaArray) => {
    return mediaArray.reduce((acc, item) => {
      const variant = item.alt || "default";
      acc["default"] = [];
      if (!acc[variant]) {
        acc[variant] = [];
      }
      acc[variant].push(item);
      return acc;
    }, {});
  };

  const mediaByVariant = groupByVariant(productMedia);

  // logic to divide images to panels of 3 images
  const groupByThrees = (mediaObj) => {
    let slidesArray = [];
    let slidesIndexMap = {};

    for (let key in mediaObj) {
      const valueArray = mediaObj[key];
      slidesIndexMap[key] = slidesArray.length;

      for (let i = 0; i < valueArray.length; i += 3) {
        slidesArray.push(valueArray.slice(i, i + 3));
      }
    }

    return { slidesArray, slidesIndexMap };
  };

  const { slidesArray, slidesIndexMap } = groupByThrees(mediaByVariant);
  // console.log("media grouped by variant: ", mediaByVariant);
  // console.log("media chunked by slides of 3: ", slidesArray);
  // console.log("index reference map: ", slidesIndexMap);

  useEffect(() => {
    setCurrentIndex(slidesIndexMap[currentVariant]);
  }, [currentVariant]);

  return (
    <div style={{ height: 500, width: "100%", border: "1px solid #32a1ce" }}>
      <GallerySlider
        slidesArray={slidesArray}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}

export default Gallery;
