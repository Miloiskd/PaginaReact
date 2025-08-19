import React from "react";
import "../styles/Category.css";
import Respont from "../img/Respont.jpg"
import promo from "../img/promocion.jpg"

function Categorie() {

  return (
    <div className="Categorie">
      <span className="card__category">Compra por categoría</span>
      <div className="buttons_category">
        <a href="pagina1.html">
          <img src={Respont} alt="Repostería" width="300" />
        </a>
        <a href="pagina1.html">
          <img src={promo} alt="Repostería" width="300" />
        </a>
      </div>
    </div>
  );
}

export default Categorie;
