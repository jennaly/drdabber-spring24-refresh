import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Gallery from "./Gallery.jsx";

const galleryRoot = document.getElementById("product-gallery");

if (galleryRoot) {
  const productTitle = galleryRoot.dataset.productTitle;
  const productImages = galleryRoot.dataset.productImages;

  createRoot(galleryRoot).render(
    <StrictMode>
      <Gallery productTitle={productTitle} productImages={productImages} />
    </StrictMode>
  );
}
