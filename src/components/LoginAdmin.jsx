import { useEffect, useState } from "react";
import "../styles/PanelAdmin.css";

export default function Administrador() {
  const [tareasPendientes, setTareasPendientes] = useState([]);
  const [todasLasTareas, setTodasLasTareas] = useState([]);
  const [vista, setVista] = useState("pendientes"); 

  // Cargar todas las tareas de todos los usuarios del localStorage
  useEffect(() => {
    const todas = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key([i]);
      if (key.startsWith("lista_")) {
        try {
          const datos = JSON.parse(localStorage.getItem(key));
          todas.push({
            usuario: key.replace("lista_", ""),
            tareas: datos,
          });
        } catch (error) {
          alert("Ha ocurrido un error");
        }
      }
    }

    setTodasLasTareas(todas);
  }, []);

  // Monstrar todas las tareas pendientes de los usuario.
  useEffect(() => {
    const pendientes = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key([i]);

      if (key.startsWith("lista_")) {
        try {
          const tareas = JSON.parse(localStorage.getItem(key));

          if (Array.isArray(tareas)) {
            const usuario = key.replace("lista_", "");

            tareas.forEach((tarea) => {
              if (!tarea.completada) {
                pendientes.push({ ...tarea, usuario });
              }
            });
          }
        } catch (error) {
          console.error(`Error leyendo ${key}:`, error);
        }
      }
    }

    setTareasPendientes(pendientes);
  }, []);  

  // Eliminar tareas de todos los usuarios
  const eliminarTarea = (usuario, index) => {
    const key = `lista_${usuario}`;
    const data = localStorage.getItem(key);

    if (!data) return;

    let tareas = JSON.parse(data);
    if (!Array.isArray(tareas)) return;

    tareas.splice(index, 1); 
    localStorage.setItem(key, JSON.stringify(tareas));

    setTodasLasTareas(prev =>
      prev.map(u =>
        u.usuario === usuario ? { ...u, tareas } : u
      )
    );
  };


  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>

      <div className="admin-buttons">
        <button
          className={vista === "pendientes" ? "active" : ""}
          onClick={() => setVista("pendientes")}
        >
          Pendientes
        </button>
        <button
          className={vista === "todas" ? "active" : ""}
          onClick={() => setVista("todas")}
        >
          Todas las tareas
        </button>
      </div>

      {vista === "pendientes" && (
        <section className="seccion-pendientes">
          <h3>Tareas Pendientes</h3>
          {tareasPendientes.length === 0 ? (
            <p>No hay tareas pendientes.</p>
          ) : (
            <ul>
              {tareasPendientes.map((tarea, index) => (
                <li key={index}>
                   <strong>{tarea.usuario}</strong>: {tarea.texto}
                </li>
              ))}
            </ul>

          )}
        </section>
      )}

      {vista === "todas" && (
        <section className="seccion-todas">
          <h3>Listas de Todos los Usuarios</h3>
          {todasLasTareas.length === 0 ? (
            <p>No hay tareas registradas.</p>
          ) : (
            todasLasTareas.map(({ usuario, tareas }, i) => (
              <div key={i} className="usuario-tareas">
                <h4>{usuario}</h4>
                <ul>
                  {tareas.map((t, j) => (
                    <li key={j}>
                      {t.texto} {t.completada ? "✅" : "⏳"}
                      <button onClick={() => eliminarTarea(usuario, j)}>
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </section>
      )}
    </div>
  );
}
