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
import Lista from "./components/Lista";

export default function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [sesionActiva, setSesionActiva] = useState(false);
  const [user, setUser] = useState(null);

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
    //localStorage.removeItem("usuario");
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
