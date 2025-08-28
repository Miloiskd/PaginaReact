import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/App.css";
import Encabezado from "./components/Encabezado";
import Main from "./components/Main";
import Aside from "./components/Aside";
import Categorie from "./components/Categorie";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Formulario from "./components/Formulario";
import Lista from "./components/Lista";
import PanelAdministrador from "./components/LoginAdmin"; 

export default function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarAdmin, setMostrarAdmin] = useState(false);
  const [sesionActiva, setSesionActiva] = useState(false);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  }
  const esAdmin = user?.tipo === "user-admin"; 

  useEffect(() => {
    try {
      const ses = localStorage.getItem("sesion") === "activa";
      const userStr = localStorage.getItem("usuario");

      if (ses && userStr) {
        const usu = JSON.parse(userStr);
        setSesionActiva(true);
        setUser(usu);
      }
    } catch (error) {
      console.error("Error cargando sesión:", error);
    }
  }, []);

  const handleLoginSuccess = (usuarioObj) => {
    if (!usuarioObj) return;
    localStorage.setItem("sesion", "activa");
    localStorage.setItem("usuario", JSON.stringify(usuarioObj));
    setUser(usuarioObj);
    setSesionActiva(true);
  };

  const handleLogout = () => {
    setSesionActiva(false);
    setUser(null);
    localStorage.removeItem("sesion");
    localStorage.removeItem("usuario");
  };

  if (!sesionActiva) {
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
          {user && <Lista user={user} />}
        </div>

        <footer>
          <Footer />
        </footer>
      </div>

      {/* Botón flotante de contacto */}
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
              X
            </button>
            <Formulario onClose={() => setMostrarFormulario(false)} />
          </div>
        </div>
      )}

      {esAdmin && (
        <>
          <button
            className="boton-flotante-admin"
            onClick={() => setMostrarAdmin(true)}
          >
            Panel Admin
          </button>

          {mostrarAdmin && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button
                  className="cerrar"
                  onClick={() => setMostrarAdmin(false)}
                >
                  X
                </button>
                <PanelAdministrador onClose={() => setMostrarAdmin(false)} />
              </div>
            </div>
          )}
        </>
      )}
      <button
            className="boton-flotante-darkmode"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
    </>
  );
}
