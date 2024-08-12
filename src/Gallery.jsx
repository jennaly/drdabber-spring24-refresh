import { useState } from "react";

function Gallery({ productTitle, productImages }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{productTitle}</h1>
    </>
  );
}

export default Gallery;
