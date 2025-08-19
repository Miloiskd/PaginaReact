import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
     <footer className="footer-container">
      <div className="footer-content">
        <p>© 2025 PavéMood - Todos los derechos reservados</p>

        {/* Links que aparecen al expandirse */}
        <div className="footer-extra-links">
          <a href="#politicas">Políticas de privacidad</a> ·{" "}
          <a href="#terminos">Términos de uso</a> ·{" "}
          <a href="#contacto">Contacto</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
