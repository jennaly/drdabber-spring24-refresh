import { useState, useEffect } from "react";

function Gallery() {
  const defaultVariantOnly = window.defaultVariantOnly;
  const productData = window.product_data;
  const productMedia = window.media;
  const firstSelectedVariant = window.firstSelectedVariant.title;

  useEffect(() => {
    const allRadioButtons = Array.from(
      document.getElementsByClassName("product-option-radio")
    );

    const handlers = allRadioButtons.map((radioButton) => {
      return radioButton.addEventListener("click", (e) => {
        handleVariantChange(e.target.value);
      });
    });

    return () => {
      handlers.forEach(removeEventListener);
    };
  }, []);

  const [currentVariant, setCurrentVariant] = useState(firstSelectedVariant);
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [panels, setPanels] = useState([]);

  const groupByVariant = (mediaArray) => {
    return mediaArray.reduce((acc, item) => {
      acc["default"] = [];
      const variant = item.alt || "default";
      if (!acc[variant]) {
        acc[variant] = [];
      }
      acc[variant].push(item);
      return acc;
    }, {});
  };

  const chunkPanels = (assets, panelSize = 3) => {
    const panels = [];

    for (let i = 0; i < assets.length; i += panelSize) {
      panels.push(assets.slice(i, i + panelSize));
    }
    return panels;
  };

  const updatePanels = (variant) => {
    const groupedMedia = groupByVariant(productMedia);
    console.log(groupedMedia);

    const currentVariantMedia = groupedMedia[variant] || [];
    const newPanels = chunkPanels(currentVariantMedia);
    setPanels(newPanels);
    setCurrentPanelIndex(0); // Reset to the first panel when variant changes
  };

  const handleVariantChange = (newVariant) => {
    setCurrentVariant(newVariant);
    updatePanels(newVariant);
  };

  const nextPanel = () => {
    setCurrentPanelIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % panels.length;
      return newIndex;
    });
  };

  const prevPanel = () => {
    setCurrentPanelIndex(
      (prevIndex) => (prevIndex - 1 + panels.length) % panels.length
    );
  };

  useEffect(() => {
    updatePanels(currentVariant);
  }, [currentVariant]);

  return (
    <div>
      <div className="gallery-slider">
        {panels.length > 0 && (
          <div className="panel">
            {panels[currentPanelIndex].map((item) => (
              <img key={item.id} src={item.src} alt={item.alt || "Image"} />
            ))}
          </div>
        )}
      </div>

      <div className="gallery-navigation">
        <button onClick={prevPanel}>Previous</button>
        <button onClick={nextPanel}>Next</button>
      </div>
    </div>
  );
}

export default Gallery;
