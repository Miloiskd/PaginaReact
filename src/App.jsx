import React, { useEffect, useState } from "react";
import "./styles/App.css";
import Encabezado from "./components/Encabezado";
import Main from "./components/Main";
import Aside from "./components/Aside";
import Categorie from "./components/Categorie";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Formulario from "./components/Formulario";

export default function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [sesionActiva, setSesionActiva] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const ses = localStorage.getItem("sesion") === "activa";
    const usu = JSON.parse(localStorage.getItem("usuario") || "null");
    setSesionActiva(ses);
    setUser(usu);
  }, []);

  const handleLoginSuccess = () => {
    setUser(JSON.parse(localStorage.getItem("usuario") || null))
    setSesionActiva(true)
  };

  const handleLogout = () => {
    setSesionActiva(false);
    localStorage.removeItem("sesion");
    setUser(null);
  };

  if (!sesionActiva) {
    // Mostrar el login si no hay ninguna sesión activa
    return <Login onLogin={handleLoginSuccess} />;
  }

  return (
    <>
      <div className="grid-container">
        <header className="navbar">
          <Encabezado user={user} onLogout={handleLogout} />
        </header>

        <aside className="sidebar">
          <Aside />
        </aside>

        <main>
          <Main />
        </main>

        <div className="carousel">
          <Carousel />
        </div>

        <div className="Categorie">
          <Categorie />
        </div>

        <footer>
          <Footer />
        </footer>
      </div>

      <button 
        className="boton-flotante" 
        onClick={() => setMostrarFormulario(true)}
      >
        Contáctanos
      </button>

      {mostrarFormulario && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="cerrar" 
              onClick={() => setMostrarFormulario(false)}
            >
            </button>
            <Formulario onClose={() => setMostrarFormulario(false)} />

          </div>
        </div>
      )}
    </>
  );
}
