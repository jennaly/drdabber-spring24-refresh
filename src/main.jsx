import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Gallery from "./Gallery.jsx";

const galleryRoot = document.getElementById("product-gallery");

if (galleryRoot) {
  const productTitle = galleryRoot.dataset.productTitle;

  createRoot(galleryRoot).render(
    <StrictMode>
      <Gallery productTitle={productTitle} />
    </StrictMode>
  );
}
