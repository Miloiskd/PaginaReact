import React, { useRef, useState, useEffect } from "react";
import pavePina from "../img/PavePiña.png";
import paveUva from "../img/PaveUva.png";
import paveLimon from "../img/PaveLimon.png";
import paveChocolate from "../img/PaveChocolate.png";
import pave1 from "../img/Pave1.jpg";
import "../styles/Carousel.css";

function Carousel() {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3); // Ajusta según quieras
  const images = [pavePina, paveUva, paveLimon, paveChocolate, pave1];

  const updateTransform = (index) => {
    const track = trackRef.current;
    if (track && track.children.length > 0) {
      const itemWidth = track.children[0].offsetWidth + 20; // 20px margin
      track.style.transform = `translateX(-${itemWidth * index}px)`;
    }
  };

  const next = () => {
    const maxIndex = images.length - itemsPerView;
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    updateTransform(currentIndex);
  }, [currentIndex, itemsPerView]);

  useEffect(() => {
    const handleResize = () => {
      // Aquí puedes ajustar itemsPerView según el tamaño de pantalla
      if (window.innerWidth < 600) setItemsPerView(1);
      else if (window.innerWidth < 900) setItemsPerView(2);
      else setItemsPerView(3);
      updateTransform(currentIndex);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Llamada inicial

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentIndex]);

  return (
    <div className="carousel">
      <div className="carousel-track" ref={trackRef}>
        {images.map((img, i) => (
          <div className="carousel-item" key={i}>
            <img src={img} alt={`Producto ${i + 1}`} />
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button onClick={prev} className="prev">‹</button>
        <button onClick={next} className="next">›</button>
      </div>
    </div>
  );
}

export default Carousel;
