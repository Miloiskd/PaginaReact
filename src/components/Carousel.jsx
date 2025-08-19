import React, { useEffect } from "react";
import $ from "jquery";
import pavePina from "../img/PavePiña.png";
import paveUva from "../img/PaveUva.png";
import paveLimon from "../img/PaveLimon.png";
import paveChocolate from "../img/PaveChocolate.png";
import pave1 from "../img/Pave1.jpg";
import "../styles/Carousel.css";

function Carousel() {
  useEffect(() => {
    const track = document.querySelector(".carousel-track");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let index = 0;
    const itemWidth =
      document.querySelector(".carousel-item").offsetWidth + 20;

    nextBtn.addEventListener("click", () => {
      if (index < track.children.length - 3) {
        index++;
        track.style.transform = `translateX(-${itemWidth * index}px)`;
      }
    });

    prevBtn.addEventListener("click", () => {
      if (index > 0) {
        index--;
        track.style.transform = `translateX(-${itemWidth * index}px)`;
      }
    });

    $(window).on("scroll", function () {
      let scrollBottom = $(window).scrollTop() + $(window).height();
      let documentHeight = $(document).height();
      if (scrollBottom >= documentHeight - 5) {
        $("body").addClass("tight");
        $(".arrow").fadeOut();
      } else {
        $("body").removeClass("tight");
        $(".arrow").fadeIn();
      }
    });

    $(".arrow").click(function () {
      $("html").animate(
        { scrollTop: $("html").prop("scrollHeight") },
        1200
      );
    });
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-track">
        <div className="carousel-item"><img src={pavePina} alt="Producto 1" /></div>
        <div className="carousel-item"><img src={paveUva} alt="Producto 2" /></div>
        <div className="carousel-item"><img src={paveLimon} alt="Producto 3" /></div>
        <div className="carousel-item"><img src={paveChocolate} alt="Producto 4" /></div>
        <div className="carousel-item"><img src={pave1} alt="Producto 5" /></div>
        <div className="carousel-item"><img src={pavePina} alt="Producto 6" /></div>
        <div className="carousel-item"><img src={pavePina} alt="Producto 7" /></div>
      </div>
      <div className="carousel-controls">
        <button className="prev">‹</button>
        <button className="next">›</button>
      </div>
    </div>
  );
}

export default Carousel;
