import React from "react";
import paveLimon from "../img/PaveLimon.png";
import paveChocolate from "../img/PaveChocolate.png";
import paveMaracuya from "../img/PaveMaracuya.jpg";
import "../styles/Main.css";

function Main() {
    return (
    <main>
      <article className="Presentation">
        <div className="presentation-content">
          <h2 className="presentation-title">¿Qué es el pavé?</h2>
          <p className="presentation-text">
            El <strong>PAVÉ</strong> es un postre tradicional de <strong>Valledupar</strong>
            que consiste en capas de crema blanca (100% hecha por nosotros)
            intercaladas con galleta dulce, arequipe y chocolate.
            Nuestra misión es llevar este <strong>sabor local</strong> a todo el país,
            manteniendo la esencia artesanal que lo hace único.
          </p>
          <blockquote className="presentation-quote">
            “Un postre que transforma cada bocado en un momento especial.”
          </blockquote>
        </div>
      </article>
    </main>
    )
}

export default Main