
import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import logo from "../img/Marca.png";

export default function Encabezado({ onLogout }) {
  const [saludo, setSaludo] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const time = currentDate.getHours();

    if (time < 12) {
      setSaludo('Buenos dias')
    } else if (time < 18) {
      setSaludo('Buenas Tardes')
    } else {
      setSaludo('Buenas noches')
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 10) {
        navbar.classList.add("small");
      } else {
        navbar.classList.remove("small");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let currdeg = 0;
    const carousel = document.querySelector(".carousel");
    const items = document.querySelectorAll(".item");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");

    const rotate = (direction) => {
      if (direction === "n") {
        currdeg -= 60;
      } else {
        currdeg += 60;
      }
      if (carousel) {
        carousel.style.transform = `rotateY(${currdeg}deg)`;
      }
      items.forEach((item) => {
        item.style.transform = `rotateY(${-currdeg}deg)`;
      });
    };

    if (next) next.addEventListener("click", () => rotate("n"));
    if (prev) prev.addEventListener("click", () => rotate("p"));

    return () => {
      if (next) next.removeEventListener("click", () => rotate("n"));
      if (prev) prev.removeEventListener("click", () => rotate("p"));
    };
  }, []);

  return (
    <header className="navbar">
          <div className="navbar-container">
            <a href="#" className="logo">
              <img src={logo} alt="PavéMood Logo" />
            </a>

            <nav className="nav-links" id="navLinks">
              <a href="#inicio" className="nav-link">Inicio</a>
              <a href="#productos" className="nav-link">Productos</a>
              <a href="#servicios" className="nav-link">Servicios</a>
              <a href="#nosotros" className="nav-link">Nosotros</a>
              <a href="#contacto" className="nav-link">Contacto</a>
            </nav>

            <div className="user-section">
              <span className="saludo">{saludo}</span> {/* Saludo aquí */}
              <button className="logout-btn" type="button" onClick={onLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </header>
      );
    }