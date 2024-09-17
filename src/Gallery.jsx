import { useState, useEffect, useMemo } from "react";
import GallerySlider from "./GallerySlider";
import "./styles/main.css";

function Gallery() {
  const productMedia = window.media;
  const firstSelectedVariant = window.firstSelectedVariant.title.toLowerCase();

  const [currentVariant, setCurrentVariant] = useState(firstSelectedVariant);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const allRadioButtons = Array.from(
      document.getElementsByClassName("product-option-radio")
    );

    const handleClick = (e) => {
      const variantButtonValue = e.target.value.toLowerCase();
      setCurrentVariant(variantButtonValue);
    };

    allRadioButtons.forEach((button) =>
      button.addEventListener("click", handleClick)
    );

    return () => {
      allRadioButtons.forEach((button) =>
        button.removeEventListener("click", handleClick)
      );
    };
  }, []);

  const groupByVariant = (mediaArray) => {
    const result = mediaArray.reduce(
      (acc, item) => {
        const variant = (item.alt || "default").toLowerCase();

        if (variant === "default") {
          if (!acc.defaultGroup.default) {
            acc.defaultGroup.default = [item];
          } else {
            acc.defaultGroup.default.push(item);
          }
        } else {
          if (!acc.otherGroups[variant]) {
            acc.otherGroups[variant] = [item];
          } else {
            acc.otherGroups[variant].push(item);
          }
        }

        return acc;
      },
      { defaultGroup: {}, otherGroups: {} }
    );

    return { ...result.defaultGroup, ...result.otherGroups };
  };

  const mediaByVariant = useMemo(
    () => groupByVariant(productMedia),
    [productMedia]
  );

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

  const { slidesArray, slidesIndexMap } = useMemo(
    () => groupByThrees(mediaByVariant),
    [mediaByVariant]
  );

  useEffect(() => {
    setCurrentIndex(slidesIndexMap[currentVariant] || 0);
  }, [currentVariant, slidesIndexMap]);

  return (
    <div className="gallery-container">
      <GallerySlider
        slidesArray={slidesArray}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}

export default Gallery;
