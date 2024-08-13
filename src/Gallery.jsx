import { useState } from "react";

function Gallery({ productTitle }) {
  const [count, setCount] = useState(0);
  console.log(window.product_data);
  console.log(window.media);

  return (
    <>
      <h1>{productTitle}</h1>
    </>
  );
}

export default Gallery;
