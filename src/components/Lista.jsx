import { useEffect, useState } from "react";
import "../styles/Lista.css"

export default function Lista({ user }) {

  // Estados de componentes 
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");
  const [cargando, setCargando] = useState(false);

  const storageKey = user?.usuario ? `lista_${user.usuario.toLowerCase().trim()}` : null;
  const Completadas_storageKey = user?.usuario ? `completadas_${user.usuario.toLowerCase().trim()}` : null;
  const inCompletadas_storageKey = user?.usuario ? `completadas_${user.usuario.toLowerCase().trim()}` : null;


  // Se cargan por defecto las tareas en dado cada que existan por cada usuario
  useEffect(() => {
    if (!storageKey) return;
    setCargando(true);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTareas(Array.isArray(parsed) ? parsed : []);
      } else {
        setTareas([]);
      }
    } catch (error) {
      setTareas([]);
    } finally {
      setCargando(false);
    }
  }, [storageKey]);

  // Función para agregar tareas 
  const agregarTarea = (e) => {
    e.preventDefault();
    const texto = nuevaTarea.trim();
    if (!texto) return;

    const nuevasTareas = [
      ...tareas,
      {
        id: crypto.randomUUID(),
        texto,
        completada: false,
        fecha: new Date().toISOString()
      }
    ];

    setTareas(nuevasTareas);
    setNuevaTarea("");

    localStorage.setItem(storageKey, JSON.stringify(nuevasTareas));
  };

  if (!user?.usuario) {
    return null;
  }

  //Marcar tareas como completadas/Incompletas
  const toggleTarea = (id) => {
    setTareas((prevTareas) => {
      const nuevasTareas = prevTareas.map(tarea =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      );
      const usuario = JSON.parse(localStorage.getItem("usuario"))?.usuario;
      if (usuario) {
        localStorage.setItem(`lista_${usuario}`, JSON.stringify(nuevasTareas));
      }
      return nuevasTareas;
    });
  };


  /*
    const eliminarTarea = (id) => {
      const nuevasTareas = tareas.filter(tarea => tarea.id !== id);
      console.log(nuevasTareas);
      setTareas(nuevasTareas);
      localStorage.setItem(storageKey, JSON.stringify(nuevasTareas))
      localStorage.setItem(Completadas_storageKey, JSON.stringify(nuevasTareas))
      localStorage.setItem(inCompletadas_storageKey, JSON.stringify(nuevasTareas))  
    };
  
  */
 // Eliminar todas las tareas completadas.
  const borrarCompletadas = () => {
    const nuevasTareas = tareas.filter(tarea => !tarea.completada);
    setTareas(nuevasTareas);
    localStorage.setItem(storageKey, JSON.stringify(nuevasTareas))
    localStorage.setItem(Completadas_storageKey, JSON.stringify(nuevasTareas))
    localStorage.setItem(inCompletadas_storageKey, JSON.stringify(nuevasTareas))
  };

  // Mostrar todas las tareas completas.
  const completas = () => {
    if (!storageKey) return;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        const completadas = parsed.filter(tarea => tarea.completada);
        setTareas(Array.isArray(completadas) ? completadas : []);
      } else {
        setTareas([]);
      }
    } catch (error) {
      setTareas([]);
    }
  };

  // Mostrar todas las tareas completas e incompletas.
  const Todastareas = () => {
    if (!storageKey) return;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTareas(Array.isArray(parsed) ? parsed : []);
      } else {
        setTareas([]);
      }
    } catch (error) {
      setTareas([]);
    }
  };

  // Monstrar todas las tareas incompletas.
  const incompletas = () => {
    if (!storageKey) return;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        const incompletas = parsed.filter(tarea => !tarea.completada);
        setTareas(Array.isArray(incompletas) ? incompletas : []);
      } else {
        setTareas([]);
      }
    } catch (error) {
      setTareas([]);
    }
  };

  // Editar tareas ya creadas.
  const editarTareas = (id, nuevotexto) => {
    const nuevasTareas = tareas.map(tarea => {
      if (tarea.id === id) {
        return { ...tarea, texto: nuevotexto }
      }
    });
    setTareas(nuevasTareas);
    localStorage.setItem(storageKey, JSON.stringify(nuevasTareas))
  };


  return (
    <div className="lista-tareas">
      <h2>Lista de tareas de {user.usuario}</h2>

      <form onSubmit={agregarTarea} className="form-tarea">
        <input
          type="text"
          value={nuevaTarea}
          onChange={e => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea..."
          className="input-tarea"
        />
        <button type="submit" className="btn-agregar">
          Agregar
        </button>
      </form>

      <ul className="tareas-list">
        {tareas.length === 0 ? (
          <li className="no-tareas">No hay tareas aún</li>
        ) : (
          tareas.map(tarea => (
            <li key={tarea.id} className={`tarea-item ${tarea.completada ? 'completada' : ''}`}>
              <input
                type="checkbox"
                checked={tarea.completada}
                onChange={() => toggleTarea(tarea.id)}
                className="checkbox-tarea"
              />
              <span className="texto-tarea">{tarea.texto}</span>
              <button
                onClick={() => {
                  const nuevoTexto = prompt("Editar tarea:", tarea.texto);
                  if (nuevoTexto !== null) editarTareas(tarea.id, nuevoTexto);
                }}
                className="btn-editar"
              >
                Editar
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="controles-lista">
        <span className="contador">
          Pendientes: {tareas.filter(t => !t.completada).length}
        </span>
        <div className="botones-filtro">
          <button
            onClick={borrarCompletadas}
            className="btn-limpiar"
            disabled={!tareas.some(t => t.completada)}
          >
            Borrar completadas
          </button>
          <button onClick={completas} className="btn-completadas">
            Tareas Completas
          </button>
          <button onClick={incompletas} className="btn-incompletadas">
            Tareas Incompletas
          </button>
          <button onClick={Todastareas} className="btn-incompletadas">
            Todas las tareas
          </button>
        </div>
      </div>
    </div>
  );
}
