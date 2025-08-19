import React from "react";
import "../styles/Aside.css";
import image1 from "../img/PaveMaracuya.jpg";
import image2 from "../img/PaveLeche.jpg";
import image3 from "../img/Pave1.jpg";

function Aside() {
  return (
    <aside>
      <section className="pave-destacado">
        <p>Pavé del mes</p>
      </section>

      <div className="cards">
        <article className="card card--1">
          <div
            className="card__img"
            style={{ backgroundImage: `url(${image2})` }}
          ></div>
          <a href="#" className="card_link">
            <div
              className="card__img--hover"
              style={{ backgroundImage: `url(${image1})` }}
            ></div>
          </a>
          <div className="card__info">
            <span className="card__category">Postre</span>
            <h3 className="card__title">Pavé de Leche Klim</h3>
            <p className="card__description">
              Suave y cremoso, perfecto para endulzar cualquier momento.
            </p>
            <span className="card__by">
              Precio: <strong>$10.000</strong>
            </span>
          </div>
        </article>

        <article className="card card--2">
          <div
            className="card__img"
            style={{ backgroundImage: `url(${image1})` }}
          ></div>
          <a href="#" className="card_link">
            <div
              className="card__img--hover"
              style={{ backgroundImage: `url(${image2})` }}
            ></div>
          </a>
          <div className="card__info">
            <span className="card__category">Postre</span>
            <h3 className="card__title">Pavé de Leche Klim</h3>
            <p className="card__description">Un clásico irresistible para compartir.</p>
            <span className="card__by">
              Precio: <strong>$10.000</strong>
            </span>
          </div>
        </article>

        <article className="card card--1">
          <div
            className="card__img"
            style={{ backgroundImage: `url(${image3})` }}
          ></div>
          <a href="#" className="card_link">
            <div
              className="card__img--hover"
              style={{ backgroundImage: `url(${image3})` }}
            ></div>
          </a>
          <div className="card__info">
            <span className="card__category">Postre</span>
            <h3 className="card__title">Pavé de Leche Klim</h3>
            <p className="card__description">
              Suave y cremoso, perfecto para endulzar cualquier momento.
            </p>
            <span className="card__by">
              Precio: <strong>$10.000</strong>
            </span>
          </div>
        </article>
      </div>
    </aside>
  );
}

export default Aside;
