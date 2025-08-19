import React from "react";
import "../styles/Body.css";
import paveLimon from "../img/PaveLimon.png";
import paveChocolate from "../img/PaveChocolate.png";
import paveMaracuya from "../img/PaveMaracuya.jpg";

function Body() {
  return (
    <main className="body-container">
      <section id="productos" className="productos-grid">
        <div className="producto-card">
          <img src={paveLimon} alt="Pavé Limón" />
          <h3>Pavé Limón</h3>
        </div>
        <div className="producto-card">
          <img src={paveChocolate} alt="Pavé Chocolate" />
          <h3>Pavé Chocolate</h3>
        </div>
        <div className="producto-card">
          <img src={paveMaracuya} alt="Pavé Maracuyá" />
          <h3>Pavé Maracuyá</h3>
        </div>
      </section>
    </main>
  );
}

export default Body;
